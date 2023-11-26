import "./App.css";
import CreateAnalytics from "./components/createAnalytics";
import ErrorPage from "./components/error";
import Home from "./components/home";
import BaseLayout from "./components/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewAnalytics from "./components/viewAnalytics";
import About from "./components/about";

function App() {
  return (
    <>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/analytics/create" element={<CreateAnalytics />} />
            <Route path="/analytics/view" element={<ViewAnalytics />} />
            <Route path="/about-us" element={<About />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
