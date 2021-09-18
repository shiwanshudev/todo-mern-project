import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const foundTodos = await axios.get(process.env.REACT_APP_API_URI);
      //   console.log(foundTodos.data);
      setTodos(foundTodos.data);
    } catch (error) {
      console.log("Error fetching data!");
    }
  };
  return (
    <div className="container">
      <div className="row">
        {todos.map((todo) => (
          <Card todoObj={todo} key={todo._id} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
