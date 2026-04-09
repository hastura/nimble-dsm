import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  pseudoState?: 'hover' | 'active' | 'disabled';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  pseudoState,
  className,
  ...props 
}) => {
  const buttonClass = [
    styles.button,
    styles[variant],
    pseudoState ? styles[`${variant}_${pseudoState}`] : '',
    pseudoState === 'disabled' ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].join(' ').trim();

  // Metadata for "Copy to Figma" Bridge
  const figmaMeta = JSON.stringify({
    component: "Button",
    props: {
      variant,
      state: pseudoState || 'default',
      label: typeof children === 'string' ? children : 'Button'
    }
  });

  return (
    <button 
      className={buttonClass} 
      data-figma-meta={figmaMeta}
      disabled={pseudoState === 'disabled' || props.disabled}
      {...props}
    >
      {children}
    </button>
  );
};

