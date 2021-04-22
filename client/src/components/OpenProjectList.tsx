// components
import { useQuery, useMutation } from '@apollo/client';

//queries
import { GETOPENPROJECTS, JOINPROJECT, getPersonalProjects } from '../queries/project.queries';
import { Project } from '../types';

interface ProjectQuery {
    projects: Project[];
}

const OpenProjectList = () => {
    const { loading, data } = useQuery<ProjectQuery>(GETOPENPROJECTS);
    const [joinProject] = useMutation(JOINPROJECT, {
        refetchQueries:
            [{ query: getPersonalProjects },
            { query: GETOPENPROJECTS }]
    });
    const displayProjects = () => {
        let projectArray = data?.projects;
        return projectArray && projectArray.map((project: any, i: number) => {
            let id = (project.id as any) as string;
            return (
                <li key={"project_open_" + i} onClick={(e) => joinProject({ variables: { projectId: id } })}>
                    <div className="project-content">
                        {project.title}
                    </div>
                    <div className="overlay">
                        <div className="text">Join</div>
                    </div>
                </li>
            );
        });
    };
    if (loading) return <h4>Fetching projects...</h4>;
    return (
        <div>
            <ul id="book-list">
                {
                    (data && data.projects) ? displayProjects() : <h4>No open projects currently, you can use the form below to create one</h4>
                }
            </ul>
        </div>
    );
};

export default OpenProjectList;