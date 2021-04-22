import OpenProjectList from './components/OpenProjectList';
import AddProject from './components/AddProject';
import MyProjectList from './components/MyProjectList';
import Modal from './components/Modal';
import { useAppSelector } from './store/store.hook';
import { RootState } from './store/store';


const App = (props: any) => {
  const { access_token } = useAppSelector((state: RootState) => state.authentication);

  if (!access_token || access_token === '') return <Modal />;
  
  return (
    <>
      <div id="main">

        <h1>Public Projects</h1>
        <OpenProjectList />
        <hr />

        {access_token && <MyProjectList />}
      </div>
      <AddProject />
    </>
  );
};

export default App;
