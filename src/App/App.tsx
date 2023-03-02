import "./App.css";
import Market from "@pages/Market";
import CoinPage from "@pages/CoinPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Market />} />
        <Route path="/coin">
          <Route path=":id" element={<CoinPage />}/>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;