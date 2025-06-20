import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center bg-background">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center p-8"
      >
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <ApperIcon name="FileQuestion" className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have wandered off. 
          Let's get you back to organizing your tasks!
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => navigate(-1)} variant="ghost" icon="ArrowLeft">
            Go Back
          </Button>
          <Button onClick={() => navigate('/')} icon="Home">
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;