import * as contentful from "contentful";
import React, { useState, useEffect } from "react";
import "./Education.css";



const client = contentful.createClient({
    space: "m50dx8rsupt2",
    accessToken: "UchwU0LEtcJi9a7a5xHfK9WtrcWaBzVebcJKOmiIkAc",
});

function Education() {
  const [data, setData] = useState({});
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    client
      .getEntries({
        content_type: "cursos",
      })
      .then((response) => setData(response.items))
      .catch(console.error);
  }, []);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  console.log("cursos")
  console.log(data)
  return (
    
        <React.Fragment>
          <h1 >{data}</h1>
          <h2 >{data}</h2>
        </React.Fragment>
     
  );
}

export default Education;