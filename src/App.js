import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar'
import Introduction from './components/Introduction';
import Education from './components/Education';
import Footer from './components/Footer';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
//import Experience from './components/Experience';
//import Contact from './components/Contact';


function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Introduction />
      <Certifications />
      <Projects />
      <Education />
      <br></br>
     
      
      {/*<Experience />*/}
      
      {/*<Contact />*/}
  <Footer />
    </div>
  );
}

export default App;
