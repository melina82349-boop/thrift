
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [page, setPage] = useState("login");

  if (page === "signup") {
    return <Signup onBackToLogin={() => setPage("login")} />;
  }

  return <Login onCreateAccount={() => setPage("signup")} />;
}

export default App;
