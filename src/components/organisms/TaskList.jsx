import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import ApperIcon from '@/components/ApperIcon';

const TaskList = ({ 
  tasks = [], 
  onToggleComplete, 
  onEdit, 
  onDelete,
  onTagRemove,
  onBulkAction,
  loading = false,
  className = '' 
}) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.Id));
    }
  };

  const handleBulkComplete = async () => {
    if (selectedTasks.length > 0 && onBulkAction) {
      await onBulkAction('complete', selectedTasks);
      setSelectedTasks([]);
      setBulkMode(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTasks.length > 0 && onBulkAction) {
      await onBulkAction('delete', selectedTasks);
      setSelectedTasks([]);
      setBulkMode(false);
    }
  };

  const exitBulkMode = () => {
    setBulkMode(false);
    setSelectedTasks([]);
  };

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const activeTasks = tasks.filter(task => task.status === 'active');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Bulk Actions Header */}
      <AnimatePresence>
        {bulkMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-card"
          >
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedTasks.length === tasks.length && tasks.length > 0}
                onChange={handleSelectAll}
                label={`${selectedTasks.length} selected`}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleBulkComplete}
                icon="CheckCircle"
                variant="outline"
                size="sm"
                disabled={selectedTasks.length === 0}
              >
                Mark Complete
              </Button>
              <Button
                onClick={handleBulkDelete}
                icon="Trash2"
                variant="outline"
                size="sm"
                disabled={selectedTasks.length === 0}
                className="text-error hover:text-error border-error/20 hover:bg-error/5"
              >
                Delete
              </Button>
              <Button
                onClick={exitBulkMode}
                icon="X"
                variant="ghost"
                size="sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Tasks ({tasks.length})
          </h2>
          {tasks.length > 1 && !bulkMode && (
            <Button
              onClick={() => setBulkMode(true)}
              icon="CheckSquare"
              variant="ghost"
              size="sm"
              className="text-gray-500"
            >
              Select
            </Button>
          )}
        </div>
        
        {activeTasks.length > 0 && completedTasks.length > 0 && (
          <div className="text-sm text-gray-500">
            {activeTasks.length} active, {completedTasks.length} completed
          </div>
        )}
      </div>

      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div className="space-y-3">
          {activeTasks.length > 0 && completedTasks.length > 0 && (
            <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
              <ApperIcon name="Circle" className="w-5 h-5 text-primary" />
              Active Tasks ({activeTasks.length})
            </h3>
          )}
          
          <motion.div layout className="space-y-3">
            <AnimatePresence>
              {activeTasks.map((task, index) => (
                <motion.div
                  key={task.Id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskCard
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onTagRemove={onTagRemove}
                    selected={bulkMode && selectedTasks.includes(task.Id)}
                    onSelect={bulkMode ? () => handleSelectTask(task.Id) : undefined}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-600 flex items-center gap-2">
            <ApperIcon name="CheckCircle" className="w-5 h-5 text-success" />
            Completed Tasks ({completedTasks.length})
          </h3>
          
          <motion.div layout className="space-y-3">
            <AnimatePresence>
              {completedTasks.map((task, index) => (
                <motion.div
                  key={task.Id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskCard
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onTagRemove={onTagRemove}
                    selected={bulkMode && selectedTasks.includes(task.Id)}
                    onSelect={bulkMode ? () => handleSelectTask(task.Id) : undefined}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TaskList;