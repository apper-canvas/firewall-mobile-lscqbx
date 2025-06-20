import { motion } from 'framer-motion';
import { useState } from 'react';
import FilterButton from '@/components/molecules/FilterButton';
import ApperIcon from '@/components/ApperIcon';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  taskCounts = {},
  availableTags = [],
  className = '' 
}) => {
  const [isTagsExpanded, setIsTagsExpanded] = useState(true);

  const statusFilters = [
    { key: 'all', label: 'All Tasks', icon: 'List', count: taskCounts.all },
    { key: 'active', label: 'Active', icon: 'Circle', count: taskCounts.active },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle', count: taskCounts.completed }
  ];

  const priorityFilters = [
    { key: 'urgent', label: 'Urgent', icon: 'AlertTriangle', color: '#E74C3C' },
    { key: 'high', label: 'High Priority', icon: 'ArrowUp', color: '#FF6B6B' },
    { key: 'medium', label: 'Medium Priority', icon: 'Minus', color: '#FFE66D' },
    { key: 'low', label: 'Low Priority', icon: 'ArrowDown', color: '#4ECDC4' }
  ];

  const sortOptions = [
    { key: 'dueDate', label: 'Due Date', icon: 'Calendar' },
    { key: 'priority', label: 'Priority', icon: 'AlertCircle' },
    { key: 'createdAt', label: 'Created Date', icon: 'Clock' }
  ];

  const handleStatusFilter = (status) => {
    onFilterChange({ ...filters, status });
  };

  const handlePriorityFilter = (priority) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    onFilterChange({ ...filters, priority: newPriorities });
  };

  const handleTagFilter = (tag) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const handleSortChange = (sortBy) => {
    const newSortOrder = filters.sortBy === sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    onFilterChange({ ...filters, sortBy, sortOrder: newSortOrder });
  };

  const clearAllFilters = () => {
    onFilterChange({
      status: 'all',
      tags: [],
      priority: [],
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = filters.status !== 'all' || 
                          filters.tags.length > 0 || 
                          filters.priority.length > 0;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-64 bg-white border-r border-gray-200 overflow-y-auto p-6 ${className}`}
    >
      <div className="space-y-6">
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllFilters}
              className="text-xs text-primary hover:text-primary/80 font-medium"
            >
              Clear All
            </motion.button>
          )}
        </div>

        {/* Status Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
          <div className="space-y-1">
            {statusFilters.map((filter) => (
              <FilterButton
                key={filter.key}
                active={filters.status === filter.key}
                count={filter.count}
                icon={filter.icon}
                onClick={() => handleStatusFilter(filter.key)}
              >
                {filter.label}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Priority Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Priority</h3>
          <div className="space-y-1">
            {priorityFilters.map((filter) => (
              <FilterButton
                key={filter.key}
                active={filters.priority.includes(filter.key)}
                icon={filter.icon}
                onClick={() => handlePriorityFilter(filter.key)}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: filter.color }}
                  />
                  {filter.label}
                </div>
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        {availableTags.length > 0 && (
          <div>
            <button
              onClick={() => setIsTagsExpanded(!isTagsExpanded)}
              className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3 hover:text-gray-900 transition-colors"
            >
              <span>Tags</span>
              <motion.div
                animate={{ rotate: isTagsExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ApperIcon name="ChevronDown" className="w-4 h-4" />
              </motion.div>
            </button>
            
            <motion.div
              initial={false}
              animate={{ 
                height: isTagsExpanded ? 'auto' : 0,
                opacity: isTagsExpanded ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-1">
                {availableTags.slice(0, 8).map((tag) => (
                  <FilterButton
                    key={tag}
                    active={filters.tags.includes(tag)}
                    onClick={() => handleTagFilter(tag)}
                  >
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Tag" className="w-3 h-3" />
                      {tag}
                    </div>
                  </FilterButton>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Sort Options */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Sort By</h3>
          <div className="space-y-1">
            {sortOptions.map((option) => (
              <FilterButton
                key={option.key}
                active={filters.sortBy === option.key}
                icon={option.icon}
                onClick={() => handleSortChange(option.key)}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {filters.sortBy === option.key && (
                    <ApperIcon 
                      name={filters.sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                      className="w-3 h-3" 
                    />
                  )}
                </div>
              </FilterButton>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;