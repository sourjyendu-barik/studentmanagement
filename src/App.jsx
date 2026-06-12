import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
