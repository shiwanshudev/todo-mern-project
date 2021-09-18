import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={TodoList} />
        <Route path="/add" exact component={AddTodo} />
        <Route path="/update/:id" exact component={EditTodo} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
