import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./features/auth/SignUp";
import Login from "./features/auth/Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-up"></Navigate>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </>
  );
}
