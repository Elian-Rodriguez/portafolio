import React, { useState, useEffect } from "react";
import * as contentful from "contentful";
import './Education.css'
const client = contentful.createClient({
    space: "m50dx8rsupt2",
    environment: "master",
    accessToken: "UchwU0LEtcJi9a7a5xHfK9WtrcWaBzVebcJKOmiIkAc",
    
  });

function Education() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    client.getEntries({
        content_type: 'cursos'
      })
      .then((response) => setData(response.items))
      .catch(console.error)
  }, []);
console.log(data)
const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div id="education">
      <h1>Educacion y Formacion  <button onClick={handleToggle}>{expanded ? "-" : "+"}</button>  </h1>
      <h2></h2>
      {expanded && (
        <React.Fragment>
      <ul>
        {data.map((item) => (
          <li key={item.sys.id}>
            <h2>{item.fields.nombrecurso}</h2>
            <p>{item.fields.fechaExpedicion}</p>
            <p>{item.fields.descripcionCurso}</p>
            <img src={item.fields.imagenCertificado.fields.file.url} alt={item.fields.nombrecurso}></img>
            
            {/* Otros campos del tipo de contenido */}
          </li>
        ))}
      </ul>
      </React.Fragment>
      )}
    </div>
  );
}

export default Education;