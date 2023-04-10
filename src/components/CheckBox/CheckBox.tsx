import { shallowEqual } from "@babel/types";
import React from "react";
import './CheckBox.scss'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, disabled, ...rest }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <input
      className="checkbox"
      type="checkbox"
      onChange={handleChange}
      disabled={disabled}
      {...rest}
    />
  );
};

export default React.memo(CheckBox, (prevProps, nextProps) => {
  return shallowEqual(prevProps, nextProps);
});