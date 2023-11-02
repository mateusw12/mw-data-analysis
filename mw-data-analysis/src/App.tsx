import "./App.css";
import CreateAnalytics from "./components/createAnalytics";
import ErrorPage from "./components/error";
import Home from "./components/home";
import BaseLayout from "./components/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/analytics/create" element={<CreateAnalytics />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
