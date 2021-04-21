
// components
import OpenProjectList from './components/OpenProjectList';
import AddProject from './components/AddProject';
import MyProjectList from './components/MyProjectList'


const App = () => {

  
  return (
    <div id="main">
      <h1>Open Source Projects</h1>
      <OpenProjectList />
      <hr />
      <h1>My Projects</h1>
      <MyProjectList />
      <AddProject />
    </div>
  );
};

export default App;
