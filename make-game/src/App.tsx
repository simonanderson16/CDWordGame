import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Welcome!</h1>
      <Link to="/create">Create a Game</Link>
      <Link to="/games">All Games</Link>
    </div>
  );
}

export default App;
