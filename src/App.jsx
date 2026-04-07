import "./App.css";
import About from "./components/About";
import Box from "./components/Box";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Recruiter from "./components/Recruiter";
import Student from "./components/Student";


function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#010409]">
      <Navbar />
      <Hero />
      <About />
      <Student />
      <Recruiter />
      <Footer />
    </div>
  );
}

export default App;
