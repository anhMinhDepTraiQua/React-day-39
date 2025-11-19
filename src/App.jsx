import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./pages/TodoApp";
function App() {
  return (
    <BrowserRouter >
      <Routes>
<Route path="/" element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
