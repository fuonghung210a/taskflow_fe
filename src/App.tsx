import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastProvider } from "./common/ToastProvider";
import { lazy } from "react";
import { PrivateRoute } from "./components/auth/PrivateRoute";

const Login = lazy(() =>
  import("./pages/Login").then((module) => ({ default: module.Login })),
);

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              
            </Route>
          </Routes>
        </ToastProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
