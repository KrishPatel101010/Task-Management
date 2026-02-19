import { Routes, Route, Navigate } from "react-router-dom";
import { Login, SignUp } from "./modules/auth/index";
import Task from "./modules/tasks/Task";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-up" />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/tasks" element={<Task />}></Route>
      </Routes>
    </>
  );
}
