import * as contentful from "contentful";
import React, { useState, useEffect } from "react";
import "./Introduccion.css";



const client = contentful.createClient({
  space: "m50dx8rsupt2",
  accessToken: "UchwU0LEtcJi9a7a5xHfK9WtrcWaBzVebcJKOmiIkAc",
});

function Introduccion() {
  const [data, setData] = useState({});
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    client
      .getEntries({
        content_type: "portafolieer",
      })
      .then((response) => setData(response.items[0].fields))
      .catch(console.error);
  }, []);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="introduccion" id="introduction">
      <div className="introduccion-header">
        <h1>Quien Soy  <button onClick={handleToggle}>{expanded ? "-" : "+"}</button> </h1>
      </div>
      {expanded && (
        <React.Fragment>
          <h1 className="nombre">{data.nombre}</h1>
          <h2 className="apellido">{data.apellido}</h2>
          <p className="descripcion">{data.descripcionmi}</p>
        </React.Fragment>
      )}
    </div>
  );
}

export default Introduccion;