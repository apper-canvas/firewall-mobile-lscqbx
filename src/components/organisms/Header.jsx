import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Header = () => {
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
      </div>
    </motion.header>
  );
};

export default Header;