import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ConfirmDialog = ({ 
  isOpen = false, 
  onClose, 
  onConfirm, 
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  type = "default", // default, danger
  loading = false 
}) => {
  if (!isOpen) return null;

  const iconMap = {
    default: { name: 'AlertCircle', color: 'text-primary' },
    danger: { name: 'AlertTriangle', color: 'text-error' }
  };

  const buttonVariant = type === 'danger' ? 'accent' : 'primary';
  const icon = iconMap[type] || iconMap.default;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-card shadow-xl max-w-md w-full p-6"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="mb-4"
            >
              <ApperIcon 
                name={icon.name} 
                className={`w-12 h-12 mx-auto ${icon.color}`} 
              />
            </motion.div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={onClose}
                variant="ghost"
                disabled={loading}
              >
                {cancelLabel}
              </Button>
              <Button
                onClick={onConfirm}
                variant={buttonVariant}
                loading={loading}
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmDialog;