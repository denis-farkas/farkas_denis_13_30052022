import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bank from '../components/Bank';
import UpdateName from '../components/UpdateName';
import Welcome from '../components/Welcome';
import Home from './Home';

import { getUser } from '../slices/authSlice';

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const editName = auth.editName;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(token));
  }, [token, dispatch]);
  if (token !== null) {
    return (
      <>
        <main className="main bg-dark">
          {editName ? <UpdateName /> : <Welcome />}
          <Bank />
        </main>
      </>
    );
  } else {
    return <Home />;
  }
};

export default Profile;
