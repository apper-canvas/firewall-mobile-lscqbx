import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorState = ({ 
  title = "Something went wrong", 
  message = "Unable to load data. Please try again.", 
  onRetry,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`text-center py-12 ${className}`}
    >
      <motion.div
        animate={{ 
          rotate: [0, -10, 10, -10, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} icon="RefreshCw">
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;