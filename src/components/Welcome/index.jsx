import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from '../../utils/capitalize';
import { editName } from '../../slices/authSlice';
const Welcome = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const firstname = capitalize(auth.firstName);
  const lastname = capitalize(auth.lastName);
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {`${firstname + ' ' + lastname + '!'}`}
      </h1>
      <button className="edit-button" onClick={() => dispatch(editName())}>
        Edit Name
      </button>
    </div>
  );
};

export default Welcome;
