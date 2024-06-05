import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>Page not found!</h1>
      <Link to="/">Return Home</Link>
    </div>
  );
};

export default Error;
