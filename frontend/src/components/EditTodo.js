import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const EditTodo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState("");
  const history = useHistory();

  // fetch todo
  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const foundTodo = await axios.get(
        `${process.env.REACT_APP_API_URI}/${id}`
      );
      setTitle(foundTodo.data.title);
      setTodo(foundTodo.data.todo);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  // update todo in db

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}/update/${id}`,
        {
          title,
          todo,
        }
      );
      history.push("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-2">Edit Todo</h1>
      <ToastContainer />
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
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
