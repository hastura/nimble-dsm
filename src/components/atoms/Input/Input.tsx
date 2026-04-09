import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  pseudoState?: 'focus' | 'disabled' | 'error';
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  className,
  pseudoState,
  errorMessage,
  ...props
}) => {
  const figmaMeta = JSON.stringify({
    component: 'Input',
    props: { label, placeholder: props.placeholder, state: pseudoState ?? 'default' },
  });

  const inputClass = [
    styles.input,
    pseudoState === 'focus'    ? styles.inputFocus    : '',
    pseudoState === 'error'    ? styles.inputError    : '',
    pseudoState === 'disabled' ? styles.inputDisabled : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelClass = [
    styles.label,
    pseudoState === 'focus' ? styles.labelFocus : '',
    pseudoState === 'error' ? styles.labelError : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={styles.inputWrapper}
      data-figma-meta={figmaMeta}
      style={pseudoState === 'disabled' ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
    >
      {label && <label className={labelClass}>{label}</label>}
      <input
        className={inputClass}
        disabled={pseudoState === 'disabled' || props.disabled}
        readOnly={!!pseudoState}
        {...props}
      />
      {pseudoState === 'error' && errorMessage && (
        <span className={styles.errorMsg}>{errorMessage}</span>
      )}
    </div>
  );
};
