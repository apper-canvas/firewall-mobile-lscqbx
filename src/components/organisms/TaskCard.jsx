import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import PriorityIndicator from '@/components/molecules/PriorityIndicator';
import TaskTag from '@/components/molecules/TaskTag';

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  onTagRemove,
  selected = false,
  onSelect,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const getDueDateColor = (dateString) => {
    if (!dateString) return 'text-gray-500';
    
    const date = new Date(dateString);
    if (isPast(date) && !isToday(date)) return 'text-error';
    if (isToday(date)) return 'text-warning';
    return 'text-gray-600';
  };

  const priorityColors = {
    low: '#4ECDC4',
    medium: '#FFE66D', 
    high: '#FF6B6B',
    urgent: '#E74C3C'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isHovered ? 1.02 : 1
      }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        group relative bg-white rounded-card shadow-card border-l-4 
        transition-all duration-200 ease-out
        ${task.status === 'completed' ? 'opacity-60' : ''}
        ${selected ? 'ring-2 ring-primary/20 bg-primary/5' : ''}
        ${isHovered ? 'shadow-card-hover' : ''}
        ${className}
      `.trim()}
      style={{ borderLeftColor: priorityColors[task.priority] }}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Priority Indicator */}
          <PriorityIndicator priority={task.priority} />
          
          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <Checkbox
                    checked={task.status === 'completed'}
                    onChange={() => onToggleComplete(task.Id)}
                  />
                  <h3 className={`font-semibold text-gray-900 truncate ${
                    task.status === 'completed' ? 'line-through text-gray-500' : ''
                  }`}>
                    {task.title}
                  </h3>
                </div>
                
                {task.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 ml-8">
                    {task.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <AnimatePresence>
                {(isHovered || selected) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-1"
                  >
                    <Button
                      onClick={() => onEdit(task)}
                      icon="Edit2"
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-primary"
                    />
                    <Button
                      onClick={() => onDelete(task.Id)}
                      icon="Trash2"
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-error"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Task Meta */}
            <div className="flex items-center justify-between gap-4 ml-8">
              <div className="flex items-center gap-4">
                {/* Due Date */}
                {task.dueDate && (
                  <div className={`flex items-center gap-1 text-xs ${getDueDateColor(task.dueDate)}`}>
                    <ApperIcon name="Calendar" className="w-3 h-3" />
                    <span>{formatDueDate(task.dueDate)}</span>
                  </div>
                )}

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    {task.tags.slice(0, 3).map((tag, index) => (
                      <TaskTag
                        key={`${tag}-${index}`}
                        tag={tag}
                        removable={isHovered}
                        onRemove={() => onTagRemove && onTagRemove(task.Id, tag)}
                      />
                    ))}
                    {task.tags.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{task.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Completion Date */}
              {task.completedAt && (
                <div className="text-xs text-success flex items-center gap-1">
                  <ApperIcon name="CheckCircle" className="w-3 h-3" />
                  <span>Completed {format(new Date(task.completedAt), 'MMM d')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Selection Indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
        >
          <ApperIcon name="Check" className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskCard;