import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastProvider } from "./common/ToastProvider";
import { lazy } from "react";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { AuthProvider } from "./providers/AuthProvider";

const Login = lazy(() =>
  import("./pages/LoginPage").then((module) => ({ default: module.Login })),
);

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}></Route>
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
