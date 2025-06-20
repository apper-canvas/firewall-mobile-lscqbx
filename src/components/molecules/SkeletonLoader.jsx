import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3, type = 'task' }) => {
  const shimmerVariants = {
    initial: { backgroundPosition: '-200px 0' },
    animate: { 
      backgroundPosition: '200px 0',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear'
      }
    }
  };

  const TaskSkeleton = () => (
    <div className="bg-white rounded-card p-6 shadow-card">
      <div className="flex items-start gap-4">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="w-1 h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
          style={{
            backgroundSize: '400px 100%'
          }}
        />
        <div className="flex-1 space-y-3">
          <motion.div 
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"
            style={{
              backgroundSize: '400px 100%'
            }}
          />
          <motion.div 
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2"
            style={{
              backgroundSize: '400px 100%'
            }}
          />
          <div className="flex gap-2">
            <motion.div 
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-pill w-16"
              style={{
                backgroundSize: '400px 100%'
              }}
            />
            <motion.div 
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-pill w-20"
              style={{
                backgroundSize: '400px 100%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TaskSkeleton />
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;