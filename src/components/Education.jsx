import React, { useState, useEffect } from "react";
import * as contentful from "contentful";
import './Education.css';
import CoursePopup from "./CoursePopup";

const client = contentful.createClient({
  space: "m50dx8rsupt2",
  environment: "master",
  accessToken: "UchwU0LEtcJi9a7a5xHfK9WtrcWaBzVebcJKOmiIkAc",
});

function Education() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    client.getEntries({
        content_type: 'cursos'
      })
      .then((response) => setData(response.items))
      .catch(console.error)
  }, []);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div id="education" className="education">
      <h1>
        Educación y Formación{" "}
        <button onClick={handleToggle}>{expanded ? "-" : "+"}</button>{" "}
      </h1>
      {expanded && (
        <ul>
          {data.map((item) => (
            <li key={item.sys.id} onClick={() => handleCourseClick(item)}>
              <div className="course">
                <img
                  src={item.fields.imagenCertificado.fields.file.url}
                  alt={item.fields.nombrecurso}
                ></img>
                <div className="course-info">
                  <h2>{item.fields.nombrecurso}</h2>
                  
                  
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedCourse && (
        <CoursePopup
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}

export default Education;
