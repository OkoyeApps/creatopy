import React from 'react';
import { Projects } from '../types';

interface ProjectDetailsProps {
    project : Projects
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({project}) => {
    const displayProjectDetails = () => {
        return (
            <div key={"project_" + project.id}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <p>Created by : {project.createdBy}</p>
                <ul className="other-books">
                    {
                        project.Users.map((user, i) => {
                          return   <li key={"project_user_" + i}>{`${user.firstName} ${user.lastName}`}</li>
                        })
                    }
                </ul>
            </div>
        );
    };
    return (
        <div id="book-details">
            { displayProjectDetails()}
        </div>
    );
};

export default (ProjectDetails);