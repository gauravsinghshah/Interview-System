import "./App.css";
import About from "./components/About";
import Box from "./components/Box";
import Cards from "./components/Cards";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Recruiter from "./components/Recruiter";
import Student from "./components/Student";

function App() {
  return (
    <div className="h-screen bg-[#010409]">
      <Navbar />
      <Hero />
      <About />
      {/* <Student /> */}
      {/* <Recruiter /> */}
    </div>
  );
}

export default App;
