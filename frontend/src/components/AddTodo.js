import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URI}/add`, {
        title,
        todo,
      })
      .then((response) => {
        console.log(response);
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-2">Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="todo-title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="todo-title"
            placeholder="Todo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Todo
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
