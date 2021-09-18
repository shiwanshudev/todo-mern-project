import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Card from "./Card";

export const TodoList = () => {
  // state
  const [todos, setTodos] = useState([]);

  // API call to fetch todos
  const fetchTodos = async () => {
    try {
      const foundTodos = await axios.get(process.env.REACT_APP_API_URI);
      setTodos(foundTodos.data);
    } catch (error) {
      console.log("Error fetching data!");
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URI}/${id}`
      );
      setTodos((prevTodos) => prevTodos.filter((obj) => obj._id !== id));
      toast.success(response.data);
    } catch (error) {
      toast.error(error.data);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        {todos.map((todo) => (
          <Card todoObj={todo} onDelete={handleDelete} key={todo._id} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
