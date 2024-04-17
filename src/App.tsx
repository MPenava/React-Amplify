import "./App.css";
import { Router } from "@routes";
import AuthContext from "../src/providers/context/AuthContext";

function App() {
  return (
    <AuthContext>
      <>
        <Router />
      </>
    </AuthContext>
  );
}

export default App;
