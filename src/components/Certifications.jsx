import React, { useState, useEffect } from "react";
import * as contentful from "contentful";
import './Certifications.css';


const client = contentful.createClient({
  space: process.env.REACT_APP_SPACE,
  environment: process.env.REACT_APP_ENVIRONMENT,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  
});

function Certifications() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [setSelectedCertifications] = useState(null); 

  useEffect(() => {
    client.getEntries({
        content_type: 'certificaciones'
      })
      .then((response) => setData(response.items))
      .catch(console.error)
  }, []);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleCertificationsClick = (Certification) => {
    setSelectedCertifications(Certification);
  };

  return (
    <div id="Certifications" className="Certifications">
        <div>
            <h1>
                Certificaciones y Habilidades con Tecnologias{" "}
                <button onClick={handleToggle}>{expanded ? "-" : "+"}</button>{" "}
                </h1>
            </div>
      {expanded && (
        <React.Fragment>
        <ul>
          {data.map((item) => (
            <li key={item.sys.id} onClick={() => handleCertificationsClick(item)}>
              <div className="Certification">
                <img
                  src={item.fields.certificacionr.fields.file.url.replace("http://", "https://")}
                  alt={item.fields.nombreDeCertificacion}>
                </img>
                <div className="Certification-info">
                  <h2>{item.fields.nombreDeCertificacion} <br></br> {item.fields.fechaDeEmisionCertificacion}</h2><br></br>
                  <a href={item.fields.urlcertificado} rel="noreferrer" target="_blank" className="certificationButton">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-certificate" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
   <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path>
   <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path>
   <path d="M6 9l12 0"></path>
   <path d="M6 12l3 0"></path>
   <path d="M6 15l2 0"></path>
</svg>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        </React.Fragment>
      )}


     
    </div>
  );
}

export default Certifications;
