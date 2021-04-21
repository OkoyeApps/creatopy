// components
import ProjectDetails from './ProjectDetails';
import { useQuery } from '@apollo/client';
import { useState, } from 'react';

//queries
import { getOpenProjects } from '../queries/project.queries';
import { Projects } from '../types';



const OpenProjectList = () => {
    const { loading, error, data } = useQuery(getOpenProjects);
    const [singleProject, setSingleProject] = useState<Projects>();

    const displayProjects = () => {
        let projectArray = data.openProjects as Projects[];
        return projectArray.map((project, i) => {
            return (
                <li key={"project_open_" + i}  onClick={(e) => setSingleProject(project)}>
                    <div className="project-content">
                        {project.title}
                        <i className="fas fa-user-circle fa-lg user-icon"><span>{project.Users.length}</span></i>
                    </div>
                    <div className="overlay">
                        <div className="text">Join</div>
                    </div>
                </li>
            );
        });
    };
    return (
        <div>
            <ul id="book-list">
                {
                    (!loading && data) ? displayProjects() : <h4>Fetching projects...</h4>
                }
            </ul>
            {
                singleProject && <ProjectDetails project={singleProject} />
            }
        </div>
    );
};

export default OpenProjectList;