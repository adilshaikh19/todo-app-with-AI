import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState(getStoredTodos());
  const navigate = useNavigate();

  function getStoredTodos() {
    let data = localStorage.getItem("todos");
    let json = JSON.parse(data);

    if (json) {
      return json;
    }
    return [];
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

    setTodos([...todos, { task: task,date:date, completed: false }]);
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
        style={{ width: "900px", backgroundColor: "lightblue" }}
      >
        <h2 className="text-center mb-2">My Todo</h2>
        <form className="d-flex" onSubmit={handleSubmit}>
          <input className="form-control me-2" placeholder="Add" name="task" />
          <input className="form-control me-2" type="date" name="date" />
          <button className="btn btn-outline-success" type="submit">
            Add Todo
          </button>
        </form>
          {todos.map((todo, index) => (
            <div
              key={index}
              className="rounded mt-4 p-2 d-flex"
              style={{
                backgroundColor: todo.completed ? "lightgreen" : "lightgray",
              }}
            >
              <div className="me-auto">{todo.task}</div>
              <div className="me-auto">{todo.date}</div>
              <div>
                <i
                  className={
                    "h5 me-5" +
                    (todo.completed ? "bi bi-check-square" : "bi bi-square")
                  }
                  style={{ cursor: "pointer" }}
                  onClick={() => changeTaskStatus(index)}
                ></i>
                <i
                  className="bi bi-trash text-danger h5"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteTask(index)}
                ></i>
                <button
                  className="btn btn-outline-primary ms-3"
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
