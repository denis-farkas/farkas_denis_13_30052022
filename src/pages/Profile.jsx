import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bank from '../components/Bank';
import UpdateName from '../components/UpdateName';
import Welcome from '../components/Welcome';

import { getUser } from '../slices/authSlice';

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const editName = auth.editName;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(token));
  }, [token, dispatch]);

  return editName ? (
    <>
      <main className="main bg-dark">
        <UpdateName />
        <Bank />
      </main>
    </>
  ) : (
    <main className="main bg-dark">
      <Welcome />
      <Bank />
    </main>
  );
};

export default Profile;
