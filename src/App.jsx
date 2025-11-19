import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./pages/TodoApp";
function App() {
  return (
    <BrowserRouter basename="/React-day-39" >
      <Routes>
        <Route path="/" element={<TodoApp />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
