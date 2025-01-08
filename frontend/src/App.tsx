import SignIn from "./sign-in/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import QuotationForm from "./pages/QuotationForm";
import "./App.css";

import FullScreenLayout from "./shared-theme/FullScreenLayout";

function App() {
  return (
    <Router>
      <FullScreenLayout>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/quotation" element={<QuotationForm />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<div>頁面不存在</div>} />
        </Routes>
      </FullScreenLayout>
    </Router>
  );
}

export default App;
