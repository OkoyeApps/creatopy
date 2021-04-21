
// components
import OpenProjectList from './components/OpenProjectList';
import AddProject from './components/AddProject';
import MyProjectList from './components/MyProjectList';
import Modal from './components/Modal';


const App = () => {

  
  return (
    <div id="main">
      <Modal/>
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
