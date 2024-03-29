import React from "react";
import "./CoursePopup.css";
import ReactMarkdown from 'react-markdown';

function CoursePopup({ course, onClose }) {
  return (
    <div className="popup-overlay-course">
      <div className="popup-content-course">
        <div className="popup-header" is="popup-header-project">
          <h1>{course.fields.nombrecurso}</h1>
          <button onClick={onClose}>X</button>
        </div>
        <div className="popup-body">
          <div className="popup-left">
            <img
              src={course.fields.imagenCertificado.fields.file.url.replace("http://", "https://")}
              alt={course.fields.nombrecurso}
            />
          </div>
          <div className="popup-right">
            <h2>Contenido o Descripcion</h2>
            <p>
            <ReactMarkdown>
            {course.fields.descripcionCurso.toString()}
            </ReactMarkdown>
            </p>
            <h3>Fecha de expedición: {course.fields.fechaExpedicion}</h3>
            <h4>Empresa:  {course.fields.institucion}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePopup;
