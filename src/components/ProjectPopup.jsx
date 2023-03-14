import React from "react";
import ReactMarkdown from 'react-markdown';
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
          <div>
            <img
              src={project.fields.videoproyecto.fields.file.url}
              alt={project.fields.nombreproyecto}
            />
            </div>

            <div>
              <h3>
                <ReactMarkdown>{project.fields.problemaSolucionar.toString()}</ReactMarkdown>
                </h3>
            </div>
            
          </div>
          <div className="popup-right-project">

            <div><h2>Descripcion</h2></div>
            
            <div>
              <p><ReactMarkdown>{project.fields.descripcionCurso.toString()}</ReactMarkdown></p>
              </div>
            <br></br>
            <div>
            <h3>Fecha Elaboracion:</h3> <h4> {project.fields.fechadeElaboracion}</h4>
            </div>
            
          </div>
          <br></br>
        </div>
        <div className="popup-body-footer-project">
  <div>
  <a href={project.fields.ulrlrepositorio} rel="noreferrer" target="_blank" className="github"> 
    Repositorio 
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
      <path strokeWidth="2" />
    </svg>
  </a>          
    <br /><br />
    {project.fields.urlproductivo && (
      <a href={project.fields.urlproductivo} rel="noreferrer" target="_blank" className="production">
        Proyecto Desplegado
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rocket" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3"></path>
          <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3"></path>
          <path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        </svg>
                </a>
                )}
          </div>
         
          </div>
      </div>
    </div>
  );
}

export default ProjectPopup;
