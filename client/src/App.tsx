import { useState } from 'react';
import OpenProjectList from './components/OpenProjectList';
import AddProject from './components/AddProject';
import MyProjectList from './components/MyProjectList';
import Modal from './components/Modal';
import { useAppSelector } from './store/store.hook';
import { RootState } from './store/store';
import PasswordRest from './components/ResetPassword';


const App = () => {
  const [resetPassword, toggleReset] = useState<boolean>(false);
  const { access_token, authDetail } = useAppSelector((state: RootState) => state.authentication);

  if (!access_token || access_token === '') return <Modal />;

  return (
    <>
      <div id="main">
        <nav className="navbar" onClick={(e) => toggleReset(true)}>
          <div className="avatar">
            {`${authDetail.firstName?.charAt(0)} ${authDetail.lastName?.charAt(0)}`}
          </div>
        </nav>
        <h1>Public Projects</h1>
        <OpenProjectList />
        <hr />

        {access_token && <MyProjectList />}
      </div>
      <AddProject />
      {resetPassword && <PasswordRest toggleModal={toggleReset}/>}
    </>
  );
};

export default App;
