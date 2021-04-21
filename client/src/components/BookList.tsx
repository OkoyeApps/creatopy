import React, { Component } from 'react';

// components
import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props : any){
        super(props);
        const property = props.property;
    }
    displayBooks(){
        let array = Array.from({length: 14}, () => "Dummy Project");
            return array.map(project => {
                return (
                    <li>
                        <div className="project-content">
                            {project}
                            <i className="fas fa-user-circle fa-lg user-icon"><span>8</span></i>
                        </div>
                        <div className="overlay">
                            <div className="text">Join</div>
                        </div>
                    </li>
                )
            })
    }
    render(){
        return(
            <div>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
                <BookDetails />
            </div>
        );
    }
}

export default BookList;