import { motion } from 'framer-motion';

const PriorityIndicator = ({ priority, size = 'md', className = '' }) => {
  const priorities = {
    low: { color: '#4ECDC4', label: 'Low' },
    medium: { color: '#FFE66D', label: 'Medium' },
    high: { color: '#FF6B6B', label: 'High' },
    urgent: { color: '#E74C3C', label: 'Urgent' }
  };

  const sizes = {
    sm: 'w-2 h-6',
    md: 'w-1 h-8',
    lg: 'w-1.5 h-10'
  };

  const priorityData = priorities[priority] || priorities.low;

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`${sizes[size]} rounded-full ${className}`}
      style={{ backgroundColor: priorityData.color }}
      title={`Priority: ${priorityData.label}`}
    />
  );
};

export default PriorityIndicator;