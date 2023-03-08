import React from "react";
import "./ProjectPopup.css";

function ProjectPopup({ project, onClose }) {
  return (

    <div className="popup-overlay-project">
      <div className="popup-content-project">
        <div className="popup-header-project">
          <h1>{project.fields.nombreproyecto}</h1>
          <button onClick={onClose}>X</button>
        </div>
        <div className="popup-body-project">
          <div className="popup-left-project">
            <img
              src={project.fields.videoproyecto.fields.file.url}
              alt={project.fields.nombreproyecto}
            />
            
          </div>
          <div className="popup-right-project">
            <h2>Descripcion</h2>
            <p>{project.fields.descripcionCurso}</p>
            <br></br>
            <h3>Fecha Elaboracion:</h3> <h4> {project.fields.fechadeElaboracion}</h4>
            
          </div>
          <br></br>
        </div>
        <div className="popup-body-footer-project">
          <h3>{project.fields.problemaSolucionar}</h3>
         
          </div>
      </div>
    </div>
  );
}

export default ProjectPopup;
