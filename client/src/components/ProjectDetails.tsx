import React from 'react';
import { Project } from '../types';
import {GETSINGLEPROJECT} from '../queries/project.queries';
import {useQuery} from '@apollo/client';

interface ProjectDetailsProps {
    projectId : number
}

interface QueryResult {
    project : Project
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({projectId}) => {
    const {loading, data} = useQuery<QueryResult>(GETSINGLEPROJECT, {variables : {id : projectId}});

    if(loading) return <h1>Fetching project details...</h1>

    const displayProjectDetails = () => {
        return data &&  (
            <div key={"project_" + data.project?.id}>
                <h2>{data.project?.title} </h2> 
                <p style={{textAlign : 'right'}}>Created by : {data.project?.createdBy}</p>
                <p>{data.project?.description}</p>
                <br /> <br />
                <p>Participating Users</p>
                <hr />
                <ul className="other-books">
                    {
                        data.project?.Users.map((user, i) => {
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