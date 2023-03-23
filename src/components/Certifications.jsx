import React, { useState, useEffect } from "react";
import * as contentful from "contentful";
import './Certifications.css';
//import CertificationPopup from "./CertificationPopup";

const client = contentful.createClient({
  space: "m50dx8rsupt2",
  environment: "master",
  accessToken: "UchwU0LEtcJi9a7a5xHfK9WtrcWaBzVebcJKOmiIkAc",
});

function Certifications() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  /*const [selectedCertification, setSelectedCertifications] = useState(null); */

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

 /* const handleCertificationsClick = (Certification) => {
    setSelectedCertifications(Certification);
  };*/

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
                  src={item.fields.certificacionr.fields.file.url}
                  alt={item.fields.nombreDeCertificacion}>
                </img>
                <div className="Certification-info">
                  <h2>{item.fields.nombreDeCertificacion} - {item.fields.fechaDeEmisionCertificacion}</h2>
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
