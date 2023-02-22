import React from "react";
import classNames from 'classnames';
import './Input.scss'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({ value, onChange, className, disabled, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const inputClasses = classNames('input', className, {
    'input_disabled': disabled,
  });

  return (
    <input 
      className={inputClasses}
      type="text" 
      value={value} 
      onChange={handleChange} 
      disabled={disabled}
      {...props} 
    />
  );
};
