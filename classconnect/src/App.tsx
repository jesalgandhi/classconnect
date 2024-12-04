import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClassSelection from "./components/ClassSelection";
import ClassConnect from "./components/ClassConnect";
import UniversityForm from "./components/UniversityForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <header className="bg-primary text-white py-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">ClassConnect</h1>
          </div>
        </header>
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<UniversityForm />} />
            <Route path="/university/:universityId/classes/:classId" element={<ClassConnect />} />
            <Route path="/university/:universityId/classes" element={<ClassSelection />} />
          </Routes>
        </main>
        <footer className="bg-secondary text-muted py-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 ClassConnect. All rights reserved(not really).</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
