import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar'
import Introduction from './components/Introduction';
import Education from './components/Education';
import Footer from './components/Footer';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact'
import { isMobile } from 'react-device-detect';

function App() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    if (isMobile) {
      const metaViewport = document.createElement('meta');
      metaViewport.setAttribute('name', 'viewport');
      metaViewport.setAttribute('content', 'width=1200, initial-scale=1.0, user-scalable=yes');
      document.head.appendChild(metaViewport);
    }
    setPageLoaded(true);
  }, []);
  
  return (
    <div className="App">
      {pageLoaded ? (
        <>
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
            {/**/}
          </div>
          <div>
            <Contact />
          </div>
          <div>
            <Footer />
          </div>
        </>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default App;
