import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="py-3">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
