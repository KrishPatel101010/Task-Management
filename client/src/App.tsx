import { Routes, Route, Navigate } from "react-router-dom";
import { Login, SignUp } from "./modules/auth/components/index";
import { TaskList } from "./modules/tasks/components/index";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-up" />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/tasks" element={<TaskList />}></Route>
      </Routes>
    </>
  );
}
