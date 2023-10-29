import "./App.css";
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
            <Route path="/" Component={Home} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
