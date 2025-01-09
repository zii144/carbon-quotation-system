import SignIn from "./sign-in/SignIn";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import QuotationForm from "./pages/QuotationForm";
import "./App.css";

import FullScreenLayout from "./shared-theme/FullScreenLayout";

function App() {
  return (
    <FullScreenLayout>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/quotation" element={<QuotationForm />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<div>頁面不存在</div>} />
      </Routes>
    </FullScreenLayout>
  );
}

export default App;
