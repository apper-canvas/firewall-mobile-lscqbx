import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <motion.div
          initial={false}
          animate={{
            backgroundColor: checked ? '#5B4FE3' : '#ffffff',
            borderColor: checked ? '#5B4FE3' : '#d1d5db'
          }}
          transition={{ duration: 0.15 }}
          className="w-5 h-5 border-2 rounded flex items-center justify-center"
        >
          <motion.div
            initial={false}
            animate={{
              scale: checked ? 1 : 0,
              opacity: checked ? 1 : 0
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <ApperIcon name="Check" className="w-3 h-3 text-white" />
          </motion.div>
        </motion.div>
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
};

export default Checkbox;