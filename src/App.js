import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./TodoList";
import TaskSuggestions from "./TaskSuggestions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/suggestions/:task" element={<TaskSuggestions />} />
      </Routes>
    </Router>
  );
}

export default App;
