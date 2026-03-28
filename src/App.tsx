import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <h1>Dwud Interiors</h1>
        <p>Modern React website starter built with Vite and TypeScript.</p>
        <a href="https://vitejs.dev/guide/" className="cta" target="_blank" rel="noreferrer">
          Open Vite docs
        </a>
      </header>
      <section className="features">
        <div className="card">
          <h2>Fast Build</h2>
          <p>Vite provides instant server start and optimized builds.</p>
        </div>
        <div className="card">
          <h2>React Ready</h2>
          <p>Type-safe components with React 18 and TypeScript.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
