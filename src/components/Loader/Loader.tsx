import React from "react";

import { shallowEqual } from "@babel/types";
import "./Loader.scss";

/** Возможные значения размера лоадера */
export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

/** Пропсы, которые принимает компонент Loader */
export type LoaderProps = {
  /**
   * Идет ли загрузка.
   * По умолчанию - true, для удобства использования
   * Если false, то лоадер не должен отображаться
   */
  loading?: boolean;
  /**
   * Размер лоадера.
   * По умолчанию - LoaderSize.m
   */
  size?: LoaderSize;
  /**
   * Дополнительный класс лоадера.
   */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}) => {
  if (!loading) return null;

  const borderWidth =
    size === LoaderSize.l ? "6px" : size === LoaderSize.m ? "4.5px" : "3px";
  const height =
    size === LoaderSize.l ? "50px" : size === LoaderSize.m ? "30px" : "15px";
  const width =
    size === LoaderSize.l ? "50px" : size === LoaderSize.m ? "30px" : "15px";

  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        border: `${borderWidth} solid 
          ${className === "b" ? "rgba(52, 58, 64, 0.3)" : "#6C757D"}`,
        borderRadius: "50%",
        borderTop: `${borderWidth} solid transparent`,
        width,
        height,
        transform: "rotate(135deg)",
        animation: "load2 1s infinite ease",
      }}
    ></div>
  );
};

export default React.memo(Loader, (prevProps, nextProps) => {
  return shallowEqual(prevProps, nextProps);
});
