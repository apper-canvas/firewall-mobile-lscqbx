import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  required = false,
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-4 py-3 bg-white border rounded-input
    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
    transition-all duration-200 ease-out
    placeholder:text-gray-400
    ${error ? 'border-error' : 'border-gray-200'}
    ${className}
  `.trim();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;