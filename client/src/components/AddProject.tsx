import { useState } from 'react';
import { CREATEPROJECT, getPersonalProjects, GETOPENPROJECTS} from '../queries/project.queries';
import { useMutation } from '@apollo/client';
import { CreateProject } from '../types';
const AddProject = () => {
    const [formValues, setFormValues] = useState<Record<string, string>>();
    const [createProject, ] = useMutation(CREATEPROJECT, {refetchQueries : [{query : getPersonalProjects}, {query : GETOPENPROJECTS}]});

    const handleChange = (e: any) => {
        setFormValues({
            ...formValues, [e.target.name]: e.target.value
        });
    };
    const submitForm = async (e: any) => {
        e.preventDefault();
        try {
            let dataToPost = formValues as Object;
            if (!dataToPost ||
                !dataToPost.hasOwnProperty("title")
                || !dataToPost.hasOwnProperty("description")
            ) {
                return alert("please all fields are required");
            } else {
                let postData = dataToPost as CreateProject;
                 await createProject({
                    variables: {
                        title: postData.title,
                        description: postData.description
                    }
                });
            }
        } catch (error) {
            alert("registration failed");
            console.log(error);
        }
    };
    return (
        <form id="add-book" onSubmit={submitForm} >
            <div>
                <div>
                    <label>Title:</label>
                    <input name="title" type="text" className="form-control" onChange={handleChange} />
                </div>
                <div className="txt_area_right">
                    <label>Description:</label>
                    <textarea name="description" className="form-control" rows={3} cols={3} onChange={handleChange}></textarea>

                </div>
            </div>
            <button>+</button>
        </form>
    );
};


export default AddProject;