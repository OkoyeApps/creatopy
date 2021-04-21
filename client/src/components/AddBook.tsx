import React, { Component } from 'react';

class AddBook extends Component {
    constructor(props : any){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }
    
    submitForm(e : any){
        e.preventDefault()
        // use the addBookMutation
        // this.props.addBookMutation({
        //     variables: {
        //         name: this.state.name,
        //         genre: this.state.genre,
        //         authorId: this.state.authorId
        //     },
        //     refetchQueries: [{ query: getBooksQuery }]
        // });
    }
    render(){
        return(
            <form id="add-book" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                    <label>Project name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Project type:</label>
                    <input type="text" onChange={ (e) => this.setState({ genre: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={ (e) => this.setState({ authorId: e.target.value }) } >
                        <option>Select author</option>
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default AddBook;