import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 border-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 border-secondary',
    accent: 'bg-accent text-white hover:bg-accent/90 border-accent',
    outline: 'bg-transparent text-primary border-primary hover:bg-primary/10',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 border-transparent'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium
    rounded-input border transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-primary/20
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]} ${sizes[size]} ${className}
  `.trim();

  const content = (
    <>
      {loading && <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />}
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
    </>
  );

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;