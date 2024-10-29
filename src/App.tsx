import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./pages/components/DashboardLayout"; // Import the DashboardLayout
import ErrorPage from "./pages/error/error_page";
import HomePage from "./pages/home/page/home_page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap HomePage with DashboardLayout */}
        <Route 
          path="/" 
          element={
            <DashboardLayout>
              <HomePage />
            </DashboardLayout>
          } 
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
