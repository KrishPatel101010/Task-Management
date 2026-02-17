import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./features/auth/SignUp";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-up"></Navigate>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
      </Routes>
    </>
  );
}
