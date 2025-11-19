import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <div>
      <BrowserRouter basename="React-day-39">
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
