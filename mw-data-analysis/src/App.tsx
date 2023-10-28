import "./App.css";
import BaseLayout from "./components/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <BaseLayout>
          <Routes></Routes>
        </BaseLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
