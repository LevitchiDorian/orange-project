import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./Pages/MainPage";
// Importează alte pagini pe care le vei adăuga

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* Aici poți adăuga alte rute */}
      </Routes>
    </Router>
  );
};

export default App;
