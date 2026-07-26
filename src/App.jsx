import React from 'react';
import Hero from "./hero";
import Features from "./components/Features";

function App() {
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-blue-500/30">
      {/* You can add a Navbar here later */}
      <Hero />
      <Features />
    </div>
  );
}

export default App;
