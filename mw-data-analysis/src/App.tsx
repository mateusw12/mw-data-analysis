import "./App.css";
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
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
