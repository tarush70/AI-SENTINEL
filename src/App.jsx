import React from 'react';
import Hero from "./hero";
import Features from "./components/Features";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BackgroundWrapper>
      <Navbar />
      <Hero />
      <Features />
    </BackgroundWrapper>
  );
}

export default App;
