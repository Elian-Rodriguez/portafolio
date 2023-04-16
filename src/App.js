import React, { useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar'
import Introduction from './components/Introduction';
import Education from './components/Education';
import Footer from './components/Footer';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import { isMobile } from 'react-device-detect';

function App() {
  useEffect(() => {
    if (isMobile) {
      const metaViewport = document.createElement('meta');
      metaViewport.setAttribute('name', 'viewport');
      metaViewport.setAttribute('content', 'width=1200, initial-scale=1.0, user-scalable=yes');
      document.head.appendChild(metaViewport);
    }
  }, []);
  
  return (
    <div className="App">
      <div>
      <Header />
      </div>
      <div>
      <Navbar />
      </div>
      <div>
      <Introduction />
      </div>
      <div>
      <Certifications />
      </div>
      <div>
      <Projects />
      </div>
      <div>
      <Education />
      </div>
      <div>
      <br />
      {/*<Experience />*/}
      {/*<Contact />*/}
      </div>
      <div>
      <Footer />
      </div>
    </div>
  );
}

export default App;
