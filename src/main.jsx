import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter, Routes, Route } from "react-router"; // Changed to HashRouter
import Layout from "./Layout.jsx";
import Introduction from "./Introduction.jsx";
import Contract from "./Contract.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter> {/* Changed from BrowserRouter */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/contract" element={<Contract />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);