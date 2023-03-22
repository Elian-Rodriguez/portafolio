// Importa los módulos y recursos necesarios
import React, { useState, useEffect } from "react";
import * as contentful from "contentful";
import backgroundVideo from "../assets/video.mp4";
import profileImage from "../assets/image.png";
import './Header.css'


// Crea una instancia del cliente de Contentful
const client = contentful.createClient({
  space: "m50dx8rsupt2",
  environment: "master",
  accessToken: "UchwU0LEtcJi9a7a5xHfK9WtrcWaBzVebcJKOmiIkAc",
});

// Define el componente Header
function Header() {
  // Inicializa los estados del componente
  const [dataPersons, setDataPerson] = useState([]);
  const [data, setData] = useState({
    nombre: "Elian Rodriguez Benitez",
    apellido: "Desarrollador Backend",
    foto: profileImage,
  });

  // Obtén los datos de Contentful al cargar el componente
  useEffect(() => {
    client
      .getEntries({
        content_type: "portafolieer",
      })
      .then((response) => setDataPerson(response.items))
      .catch(console.error);
  }, []);

  // Actualiza los datos del componente si se obtienen datos de Contentful
  useEffect(() => {
    if (dataPersons.length > 0) {
      setData(dataPersons[0]["fields"]);
    }
  }, [dataPersons]);

  // Actualiza la imagen de perfil si hay una URL de imagen disponible
  let imageProfile = null;
  if (data["foto"] && data["foto"]["fields"] && data["foto"]["fields"]["file"] && data["foto"]["fields"]["file"]["url"]){
    imageProfile = data["foto"]["fields"]["file"]["url"];
  }
  


  // Renderiza el componente
  return (
    <header className="header" >
      {/* Renderiza el video de fondo */}
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>

      {/* Renderiza la imagen de perfil */}
      <div className="profile-image">
        <img src={imageProfile} alt="Profile" />
      </div>

      {/* Renderiza el nombre y apellido */}
      <div className="text-wrapper">
        <h1>{data["nombre"]}</h1>
        <p>{data["apellido"]}</p>
      </div>
    </header>
  );
}

// Exporta el componente Header
export default Header;