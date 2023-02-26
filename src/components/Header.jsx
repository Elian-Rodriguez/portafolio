import backgroundVideo from "../assets/video.mp4";
import profileImage from "../assets/image.png";
import './Header.css'

import * as contentful from "contentful";
import React, { useState, useEffect } from "react";


const client = contentful.createClient({
  space: "m50dx8rsupt2",
  accessToken: "UchwU0LEtcJi9a7a5xHfK9WtrcWaBzVebcJKOmiIkAc",
});

var profileImagePublic = profileImage ;

function Header() {
  const [dataPersons, setDataPerson] = useState([]);
  const [data, setData] = useState({"nombre":"Elian Rodriguez Benitez","apellido":"Desarrollador Backend","foto":profileImagePublic});
  

  useEffect(() => {
    client
      .getEntries({
        content_type: "portafolieer",
      })
      .then((response) => setDataPerson(response.items))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (dataPersons.length > 0) {
      setData(dataPersons[0]["fields"]);
    }
  }, [dataPersons]);
  profileImagePublic =profileImage ;

  return (
    <header className="header">
      
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>
    <div className="profile-image">
      <img src={profileImagePublic} alt="Profile" />
      
    </div>
    <div className="text-wrapper">
      <h1>{data["nombre"]}</h1>
      <p>{data["apellido"]}</p>
    </div>
  </header>
 
 );
}
export default Header;