import ClassConnect from "./components/ClassConnect";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">ClassConnect</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <ClassConnect />
      </main>
      <footer className="bg-secondary text-muted py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 ClassConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
