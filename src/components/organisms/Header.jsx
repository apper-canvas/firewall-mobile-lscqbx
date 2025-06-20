import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';

const Header = ({ onSearch, onQuickAdd, searchValue = '' }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 z-40"
    >
      <div className="flex items-center justify-between max-w-full">
        {/* Logo and Brand */}
        <motion.div 
          className="flex items-center gap-3 flex-shrink-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
            <p className="text-xs text-gray-500">Organize & Complete</p>
          </div>
        </motion.div>

        {/* Search Bar - Center */}
        <div className="flex-1 max-w-md mx-6 min-w-0">
          <SearchBar
            value={searchValue}
            onChange={onSearch}
            placeholder="Search tasks..."
            className="w-full"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button
            onClick={onQuickAdd}
            icon="Plus"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            Add Task
          </Button>
          <Button
            onClick={onQuickAdd}
            icon="Plus"
            variant="primary"
            className="sm:hidden"
            size="sm"
          />
          
          {/* Settings/Profile placeholder for future */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Settings"
          >
            <ApperIcon name="Settings" className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;