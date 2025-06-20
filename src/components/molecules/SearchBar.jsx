import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  value = '', 
  onChange, 
  placeholder = 'Search tasks...', 
  onClear,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange('');
    }
  };

  return (
    <motion.div
      animate={{
        scale: isFocused ? 1.02 : 1,
      }}
      transition={{ duration: 0.15 }}
      className={`relative ${className}`}
    >
      <ApperIcon 
        name="Search" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-input
                   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                   transition-all duration-200 ease-out placeholder:text-gray-400"
        {...props}
      />
      {value && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1
                     text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100
                     transition-colors"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default SearchBar;