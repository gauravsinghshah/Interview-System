import "./App.css";
import Cards from "./components/Cards";
import Student from "./components/Student";

function App() {
  return (
    <div className="h-screen">
      {/* <Student /> */}
      <Cards
        role="Software"
        status="new"
        companyName="Amazon"
        detail="Remote"
        salaryMin={145}
        salaryMax={200}
      />
    </div>
  );
}

export default App;
