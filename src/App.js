import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar'
import Introduction from './components/Introduction';
//import Skills from './components/Skills';
//import Projects from './components/Projects';
//import Experience from './components/Experience';
import Education from './components/Education';
//import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Introduction />
      {/*<Skills />
      <Projects />
      <Experience />
      <Education />
      {/*<Contact />*/}
  <Footer />
    </div>
  );
}

export default App;
