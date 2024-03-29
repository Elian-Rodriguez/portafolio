import * as contentful from "contentful";
import React, { useState, useEffect } from "react";
import "./Projects.css";
import ProjectPopup from "./ProjectPopup"

const client = contentful.createClient({
  space: process.env.REACT_APP_SPACE,
  environment: process.env.REACT_APP_ENVIRONMENT,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});

function Projects() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [selectedProject, setselectedProject] = useState(null);

  useEffect(() => {
    client
      .getEntries({
        content_type: "proyectos",
      })
      .then((response) => setData(response.items))
      .catch(console.error);
  }, []);



  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleProjectClick = (project) => {
    setselectedProject(project);
  };

  return (
    <div className="projects" id="projects">
      <div className="project-header">
        <h1>
          Proyectos <button onClick={handleToggle}>{expanded ? "-" : "+"}</button>{" "}
        </h1>
        {expanded && (
          <ul className="project-list">
            {data.map((item) => (
              <li key={item.sys.id} onClick={() => handleProjectClick(item)}>
                <div className="project">
                  {item.fields.videoproyecto ? (
                    <img
                      src={item.fields.videoproyecto.fields.file.url}
                      alt={item.fields.nombreproyecto}
                      controls
                    ></img>
                  ) : (
                    <img
                      src={item.fields.iconoproyecto.fields.file.url.replace("http://", "https://")}
                      alt={item.fields.nombreproyecto}
                      className="project-image"
                    ></img>
                  )}
                  <div className="project-info">
                    <h2>{item.fields.nombreproyecto}</h2>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

{selectedProject && (
        <ProjectPopup
          project={selectedProject}
          onClose={() => setselectedProject(null)}
        />
      )}
      </div>
    </div>
  );
}

export default Projects;
