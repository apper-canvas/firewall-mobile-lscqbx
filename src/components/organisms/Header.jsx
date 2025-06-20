import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';

const Header = () => {
  const handleAddTask = () => {
    // TODO: Implement add task functionality
    console.log('Add task clicked');
  };

  const handleSettings = () => {
    // TODO: Implement settings functionality
    console.log('Settings clicked');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 z-40"
    >
      <div className="flex items-center justify-between max-w-full gap-4">
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

        {/* Header Controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search Bar */}
          <div className="hidden md:block">
            <SearchBar 
              placeholder="Search tasks..."
              className="w-64"
            />
          </div>

          {/* Add Task Button */}
          <Button
            variant="primary"
            size="md"
            onClick={handleAddTask}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={16} />
            <span className="hidden sm:inline">Add Task</span>
          </Button>

          {/* Settings Button */}
          <Button
            variant="ghost"
            size="md"
            onClick={handleSettings}
            className="p-2"
          >
            <ApperIcon name="Settings" size={20} />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;