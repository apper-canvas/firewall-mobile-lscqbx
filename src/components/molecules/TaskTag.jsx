import { motion } from 'framer-motion';
import Badge from '@/components/atoms/Badge';

const TaskTag = ({ tag, onRemove, removable = false, className = '' }) => {
  const tagData = typeof tag === 'string' 
    ? { name: tag, color: '#64748b' }
    : tag;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={className}
    >
      <Badge
        color={tagData.color}
        removable={removable}
        onRemove={onRemove}
      >
        {tagData.name}
      </Badge>
    </motion.div>
  );
};

export default TaskTag;