import React, { useState } from 'react';


interface StateProps {
    name: string,
    genre: string,
    authorId: string;
}

const AddProject = () => {
    const [formValues, setFormValues] = useState<StateProps>();

    const handleChange = (e: any) => {

    };
    const submitForm = (e: any) => {
        e.preventDefault();
        // use the addBookMutation
        // this.props.addBookMutation({
        //     variables: {
        //         name: this.state.name,
        //         genre: this.state.genre,
        //         authorId: this.state.authorId
        //     },
        //     refetchQueries: [{ query: getBooksQuery }]
        // });
    };
    return (
        <form id="add-book" onSubmit={submitForm} >
            <div className="field">
                <label>Title:</label>
                <input type="text" onChange={(e) => handleChange({ name: e.target.value })} />
            </div>
            <div className="field">
                <label>Description:</label>
                <textarea rows={3} cols={3} onChange={handleChange}></textarea>
            </div>
            <button>+</button>
        </form>
    );
};


export default AddProject;