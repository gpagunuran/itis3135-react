import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter, Routes, Route } from "react-router";
import Layout from "./Layout.jsx";
import Introduction from "./Introduction.jsx";
import Contract from "./Contract.jsx";
import Students from "./Students.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/students" element={<Students />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);