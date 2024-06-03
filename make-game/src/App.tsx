import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div>
      <h1>Hoos Spelling: Admin Home</h1>
      <Link to="/create">
        <Button>Create a Game</Button>
      </Link>
      <Link to="/games">
        <Button>All Games</Button>
      </Link>
    </div>
  );
}

export default App;
