import { shallowEqual } from "@babel/types";
import React from "react";
import Loader from "../Loader/Loader";

/** Пропсы, которые принимает компонент WithLoader */
export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({ loading, children }) => {
  return (
    <div style={{ position: "relative" }}>
      {children}
      <div style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
       }}>
        {loading && <Loader/>}
      </div>
    </div>
  );
};


export default React.memo(WithLoader, (prevProps, nextProps) => {
  return shallowEqual(prevProps, nextProps);
});