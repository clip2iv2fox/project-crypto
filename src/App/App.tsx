import "./App.css"; // импорт стилей

import Market from "@pages/Market";

import CoinPage from "@pages/CoinPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {   
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Market />} />
        <Route path="/coin" element={<CoinPage />} />
        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </BrowserRouter>   
  ); 
};

// Экспортируем компонент
export default App;