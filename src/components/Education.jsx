import React, { useState, useEffect } from "react";
import * as contentful from "contentful";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Education.css';
import CoursePopup from "./CoursePopup";

const client = contentful.createClient({
  space: process.env.REACT_APP_SPACE,
  environment: process.env.REACT_APP_ENVIRONMENT,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    dotsClass: "slick-dots custom-dots",
    autoplay: true, // agregamos esta propiedad para habilitar el autoplay
    autoplaySpeed: 4500 // establecemos el tiempo entre cada cambio de slide en 2 segundos
   
};

  return (
    <div id="education" className="education">
      <h1>
        Educación y Formación{" "}
        <button onClick={handleToggle}>{expanded ? "-" : "+"}</button>{" "}
      </h1>
      {expanded && (
        <Slider {...settings}>
          {data.map((item) => (
            <div className="education-container">
            <div key={item.sys.id} onClick={() => handleCourseClick(item)}>
              <div className="course">
                <img
                  src={item.fields.imagenCertificado.fields.file.url}
                  alt={item.fields.nombrecurso}>
                </img>
                <div className="course-info">
                  <h2>{item.fields.nombrecurso}</h2>
                </div>
              </div>
            </div>
            </div>
          ))}
        </Slider>
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