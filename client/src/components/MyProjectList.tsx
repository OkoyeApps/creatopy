// components
import ProjectDetails from './ProjectDetails';
import { useQuery } from '@apollo/client';
import { useState, } from 'react';

//queries
import { getPersonalProjects } from '../queries/project.queries';
import { Project } from '../types';



const MyProjectList = () => {
    const { loading, data } = useQuery(getPersonalProjects);
    const [activeProject, setActiveProject] = useState<number | null>(null);

    const displayProjects = () => {
        let projectArray = data.myProjects as Project[];
        return projectArray.map((project, i) => {
            return (
                <li key={"project_open_" + i} onClick={(e) => setActiveProject(project.id as number)}>
                    <div className="project-content">
                        {project.title}
                        {/* {project.Users.length && <i className="fas fa-user-circle fa-lg user-icon"><span>{project.Users.length}</span></i>} */}
                    </div>
                    <div className="overlay">
                        <div className="text">View</div>
                    </div>
                </li>
            );
        });
    };

    if (loading) return <h4>Fetching participating projects...</h4>;

    return (
        <div>
            <h1>My Projects</h1>
            <ul id="book-list">
                {
                    (data && data.myProjects) ? displayProjects() : <h4>You are not participating in any project currently, kindly use the join button on open projects</h4>
                }
            </ul>
            {
                activeProject && <ProjectDetails projectId={activeProject} />
            }
        </div>
    );
};

export default MyProjectList;