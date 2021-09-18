import { Link } from "react-router-dom";

const Card = (props) => {
  const { title, todo, _id } = props.todoObj;

  return (
    <div className="col-md-6 mt-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{todo}</p>
          <Link to={`/update/${_id}`} className="btn btn-primary me-1">
            Edit Todo
          </Link>
          <button
            onClick={(e) => props.onDelete(_id)}
            className="btn btn-danger"
          >
            Delete Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
