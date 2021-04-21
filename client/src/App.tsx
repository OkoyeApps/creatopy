  
import React, { Component } from 'react';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

class App extends Component {
  render() {
    const selected = "true";
    return (
            <div id="main">
                <h1>Open Source Projects</h1>
                <BookList />
                <hr/>
                <h1>My Projects</h1>
                <BookList />
                <AddBook />
            </div>
    );
  }
}

export default App;
