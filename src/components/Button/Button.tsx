import React from "react";

import classNames from "classnames";

import { Loader, LoaderSize } from "../Loader/Loader";
import "./Button.scss";

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  className,
  disabled,
  style,
  ...props
}) => {
  const buttonClasses = classNames("button", className, {
    button_disabled: disabled || loading,
  });

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
      style={style}
    >
      {loading && (
        <div className="loading_text">
          <Loader className={"b"} size={LoaderSize.s} />
        </div>
      )}
      {children}
    </button>
  );
};
