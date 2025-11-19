import React, { useState } from "react";

export default function TodoApp() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
	e.preventDefault();

	if (!input.trim()) {
	  setError("Please enter a todo item");
	  return;
	}

	const newTodo = { id: Date.now(), text: input.trim() };
	setTodos((prev) => [...prev, newTodo]);

	setInput("");
	setError("");
  };

  const handleEdit = (id, currentText) => {
	const newText = window.prompt("Edit your todo", currentText);
	if (newText === null) return;

	const trimmed = newText.trim();
	if (!trimmed) return;

	setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
  };

  const handleDelete = (id) => {
	const confirmed = window.confirm("Are you sure you want to delete this todo?");
	if (!confirmed) return;

	setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
	<div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
	  <h1 style={{color: 'red', fontSize: '50px'}}>Todo App</h1>

	  <form onSubmit={handleSubmit}>
		<input
		  type="text"
		  placeholder="Enter your todo..."
		  value={input}
		  onChange={(e) => setInput(e.target.value)}
		  style={{ width: "70%", padding: "8px" }}
		/>
		<button type="submit" style={{ marginLeft: "10px", backgroundColor: "red", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }}>Add Todo</button>
	  </form>

	  {error && <p style={{ color: "red" }}>{error}</p>}

	  <div style={{ marginTop: "20px" }}>
		{todos.length === 0 ? (
		  <p>The todo list is empty.</p>
		) : (
		  todos.map((todo) => (
			<div
			  key={todo.id}
			  style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "8px 0",
				borderBottom: "1px solid #ccc"
			  }}
			>
			  <span>{todo.text}</span>

			  <div>
				<button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
				<button
				  onClick={() => handleDelete(todo.id)}
				  style={{ marginLeft: "10px" }}
				>
				  Delete
				</button>
			  </div>
			</div>
		  ))
		)}
	  </div>
	</div>
  );
}