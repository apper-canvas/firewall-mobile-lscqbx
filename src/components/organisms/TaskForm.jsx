import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import ApperIcon from '@/components/ApperIcon';

const TaskForm = ({ 
  task = null, 
  onSubmit, 
  onCancel, 
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
        tags: task.tags || []
      });
    }
  }, [task]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the errors and try again');
      return;
    }

    try {
      const submitData = {
        ...formData,
        dueDate: formData.dueDate || null
      };
      
      await onSubmit(submitData);
      
      if (!task) {
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          dueDate: '',
          tags: []
        });
        setTagInput('');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to save task');
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-card shadow-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {task ? 'Edit Task' : 'Create New Task'}
        </h2>
        {onCancel && (
          <Button
            onClick={onCancel}
            variant="ghost"
            icon="X"
            size="sm"
          />
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Task Title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter task title..."
          error={errors.title}
          required
        />

        <FormField
          type="textarea"
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Add task description (optional)..."
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            type="select"
            label="Priority"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            options={priorityOptions}
            required
          />

          <FormField
            type="date"
            label="Due Date"
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            error={errors.dueDate}
          />
        </div>

        {/* Tags Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagKeyPress}
              placeholder="Add tag and press Enter..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <Button
              type="button"
              onClick={addTag}
              icon="Plus"
              variant="outline"
              size="sm"
            >
              Add
            </Button>
          </div>
          
          {formData.tags.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formData.tags.map((tag, index) => (
                <motion.span
                  key={`${tag}-${index}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-pill"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <ApperIcon name="X" className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              variant="ghost"
              disabled={loading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            loading={loading}
            icon={task ? "Save" : "Plus"}
          >
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;