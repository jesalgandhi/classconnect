import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ClassSelection from "./components/ClassSelection";
import ClassConnect from "./components/ClassConnect";
import UniversityForm from "./components/UniversityForm";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Show the back button only if not on the home page
  const showBackButton = location.pathname !== "/";

  return (
    <header className="bg-primary text-white py-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bungee text-text hover:text-white">
          <a href="/">ClassConnect</a>
        </h1>
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-text bg-secondary hover:bg-accent py-2 px-4 rounded"
          >
            ← Back
          </button>
        )}
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<UniversityForm />} />
            <Route
              path="/university/:universityId/classes/:classId"
              element={<ClassConnect />}
            />
            <Route
              path="/university/:universityId/classes"
              element={<ClassSelection />}
            />
          </Routes>
        </main>
        <footer className="bg-secondary text-muted py-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 ClassConnect. All rights reserved (not really).</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
