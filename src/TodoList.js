import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState(getStoredTodos());
  const navigate = useNavigate();

  function getStoredTodos() {
    let data = localStorage.getItem("todos");
    let json = JSON.parse(data);
    return json ? json : [];
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(event) {
    event.preventDefault();
    const task = event.target.task.value;
    const date = event.target.date.value;

    if (!task) {
      alert("Enter a valid task");
      return;
    }

    setTodos([...todos, { task: task, date: date, completed: false }]);
    event.target.reset();
  }

  function changeTaskStatus(index) {
    let newTodo = [...todos];
    newTodo[index].completed = !newTodo[index].completed;
    setTodos(newTodo);
  }

  function deleteTask(index) {
    let newTodo = [...todos];
    newTodo.splice(index, 1);
    setTodos(newTodo);
  }

  function goToSuggestions(task) {
    navigate(`/suggestions/${encodeURIComponent(task)}`);
  }

  return (
    <div className="container my-5">
      <div
        className="mx-auto rounded border p-4"
        style={{ width: "900px", backgroundColor: "#F5F5F5" }}
      >
        <h2 className="text-center mb-4">My Todo</h2>

        <form className="d-flex mb-4" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            placeholder="Add Task"
            name="task"
          />
          <input className="form-control me-2" type="date" name="date" />
          <button className="btn btn-outline-success" type="submit">
            Add Todo
          </button>
        </form>

        {/* Header Row */}
        <div
          className="row font-weight-bold mb-2"
          style={{
            backgroundColor: "#28282B",
            color: "white",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <div className="col-4">Task</div>
          <div className="col-3">Due Date</div>
          <div className="col-2">Actions</div>
          <div className="col-3">Suggestions</div>
        </div>

        {/* Todo Items */}
        {todos.map((todo, index) => (
          <div
            key={index}
            className="row align-items-center rounded p-2 mb-2"
            style={{
              backgroundColor: todo.completed ? "lightgreen" : "white",
            }}
          >
            <div className="col-4">{todo.task}</div>
            <div className="col-3">{todo.date}</div>
            <div className="col-2">
              <i
                className={
                  "h5 me-3" +
                  (todo.completed ? " bi bi-check-square" : " bi bi-square")
                }
                style={{ cursor: "pointer" }}
                onClick={() => changeTaskStatus(index)}
              ></i>
              <i
                className="bi bi-trash text-danger h5"
                style={{ cursor: "pointer" }}
                onClick={() => deleteTask(index)}
              ></i>
            </div>
            <div className="col-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => goToSuggestions(todo.task)}
              >
                Get Suggestions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
