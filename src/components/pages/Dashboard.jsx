import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import taskService from '@/services/api/taskService';
import Header from '@/components/organisms/Header';
import FilterSidebar from '@/components/organisms/FilterSidebar';
import TaskList from '@/components/organisms/TaskList';
import TaskForm from '@/components/organisms/TaskForm';
import ConfirmDialog from '@/components/organisms/ConfirmDialog';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import EmptyState from '@/components/molecules/EmptyState';
import Button from '@/components/atoms/Button';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });

  const [filters, setFilters] = useState({
    status: 'all',
    tags: [],
    priority: [],
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Load tasks
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await taskService.getAll();
      setTasks(result);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    // Priority filter
    if (filters.priority.length > 0) {
      filtered = filtered.filter(task => filters.priority.includes(task.priority));
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(task => 
        task.tags?.some(tag => filters.tags.includes(tag))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
          bValue = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
          break;
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority] || 0;
          bValue = priorityOrder[b.priority] || 0;
          break;
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [tasks, searchQuery, filters]);

  // Calculate task counts for sidebar
  const taskCounts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(t => t.status === 'active').length,
    completed: tasks.filter(t => t.status === 'completed').length
  }), [tasks]);

  // Get available tags
  const availableTags = useMemo(() => {
    const tagSet = new Set();
    tasks.forEach(task => {
      task.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [tasks]);

  // Task CRUD operations
  const handleCreateTask = async (taskData) => {
    setFormLoading(true);
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowForm(false);
      toast.success('Task created successfully!');
    } catch (error) {
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    setFormLoading(true);
    try {
      const updatedTask = await taskService.update(editingTask.Id, taskData);
      setTasks(prev => prev.map(t => t.Id === updatedTask.Id ? updatedTask : t));
      setEditingTask(null);
      setShowForm(false);
      toast.success('Task updated successfully!');
    } catch (error) {
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find(t => t.Id === taskId);
    if (!task) return;

    try {
      const newStatus = task.status === 'completed' ? 'active' : 'completed';
      const updatedTask = await taskService.update(taskId, { status: newStatus });
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
      
      if (newStatus === 'completed') {
        toast.success('Task completed! 🎉');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = (taskId) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Task',
      message: 'Are you sure you want to delete this task? This action cannot be undone.',
      confirmLabel: 'Delete',
      type: 'danger',
      onConfirm: async () => {
        try {
          await taskService.delete(taskId);
          setTasks(prev => prev.filter(t => t.Id !== taskId));
          toast.success('Task deleted successfully');
        } catch (error) {
          toast.error('Failed to delete task');
        } finally {
          setConfirmDialog({ isOpen: false });
        }
      }
    });
  };

  const handleBulkAction = async (action, taskIds) => {
    if (action === 'delete') {
      setConfirmDialog({
        isOpen: true,
        title: 'Delete Tasks',
        message: `Are you sure you want to delete ${taskIds.length} task${taskIds.length > 1 ? 's' : ''}? This action cannot be undone.`,
        confirmLabel: 'Delete All',
        type: 'danger',
        onConfirm: async () => {
          try {
            await taskService.bulkDelete(taskIds);
            setTasks(prev => prev.filter(t => !taskIds.includes(t.Id)));
            toast.success(`${taskIds.length} task${taskIds.length > 1 ? 's' : ''} deleted successfully`);
          } catch (error) {
            toast.error('Failed to delete tasks');
          } finally {
            setConfirmDialog({ isOpen: false });
          }
        }
      });
    } else if (action === 'complete') {
      try {
        await taskService.bulkUpdate(taskIds, { status: 'completed' });
        setTasks(prev => prev.map(t => 
          taskIds.includes(t.Id) 
            ? { ...t, status: 'completed', completedAt: new Date().toISOString() }
            : t
        ));
        toast.success(`${taskIds.length} task${taskIds.length > 1 ? 's' : ''} marked as completed! 🎉`);
      } catch (error) {
        toast.error('Failed to update tasks');
      }
    }
  };

  const handleTagRemove = async (taskId, tagToRemove) => {
    const task = tasks.find(t => t.Id === taskId);
    if (!task) return;

    try {
      const updatedTags = task.tags.filter(tag => tag !== tagToRemove);
      const updatedTask = await taskService.update(taskId, { tags: updatedTags });
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
    } catch (error) {
      toast.error('Failed to remove tag');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleQuickAdd = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-full flex">
        <div className="w-64 bg-white border-r border-gray-200 p-6">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-6">
          <SkeletonLoader count={5} />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorState
          title="Failed to load tasks"
          message={error}
          onRetry={loadTasks}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex overflow-hidden">
      {/* Sidebar */}
      <FilterSidebar
        filters={filters}
        onFilterChange={setFilters}
        taskCounts={taskCounts}
        availableTags={availableTags}
      />
{/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {showForm ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-8"
                >
                  <TaskForm
                    task={editingTask}
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    onCancel={closeForm}
                    loading={formLoading}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredTasks.length === 0 ? (
                    <EmptyState
                      title={searchQuery ? "No tasks found" : "No tasks yet"}
                      description={
                        searchQuery 
                          ? "Try adjusting your search or filters to find tasks."
                          : "Create your first task to get started with organizing your work."
                      }
                      actionLabel="Add Task"
                      onAction={handleQuickAdd}
                      icon={searchQuery ? "Search" : "CheckSquare"}
                    />
                  ) : (
                    <TaskList
                      tasks={filteredTasks}
                      onToggleComplete={handleToggleComplete}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onTagRemove={handleTagRemove}
                      onBulkAction={handleBulkAction}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        type={confirmDialog.type}
      />
    </div>
  );
};

export default Dashboard;