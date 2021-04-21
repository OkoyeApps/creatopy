import React, { Component } from 'react';

class BookDetails extends Component {
    displayBookDetails(){
        return(
            <div>
                <h2>Dummy Project</h2>
                <p>open source</p>
                <p>Okoye Emmanuel</p>
                <p>All projects by this author:</p>
                <ul className="other-books">
                    <li>Dummy 1</li>
                    <li>Dummy 2</li>
                    <li>Dummy 3</li>
                </ul>
            </div>
        );
    }
    render(){
        return(
            <div id="book-details">
                { this.displayBookDetails() }
            </div>
        );
    }
}

export default (BookDetails);