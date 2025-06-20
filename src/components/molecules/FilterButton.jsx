import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const FilterButton = ({ 
  active = false, 
  count, 
  children, 
  icon,
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        flex items-center justify-between w-full px-3 py-2 text-sm font-medium
        rounded-input transition-all duration-200 ease-out
        ${active 
          ? 'bg-primary text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
        ${className}
      `.trim()}
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon && <ApperIcon name={icon} className="w-4 h-4" />}
        <span>{children}</span>
      </div>
      {count !== undefined && (
        <motion.span
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`
            px-2 py-0.5 text-xs rounded-full font-medium
            ${active 
              ? 'bg-white/20 text-white' 
              : 'bg-gray-200 text-gray-600'
            }
          `.trim()}
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  );
};

export default FilterButton;