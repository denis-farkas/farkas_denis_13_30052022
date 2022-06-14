import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  firstName: '',
  lastName: '',
  updateUser: false,
};
const url = process.env.REACT_APP_API_URL;

export const getUser = createAsyncThunk('user/getUser', async (token) => {
  const user = await axios({
    method: 'post',
    url: `${url}/profile`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).catch((err) => console.log(err));
  return { body: user.data.body, status: user.status };
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ data }) => {
    const res = await axios({
      method: 'put',
      url: `${url}/profile`,
      headers: {
        authorization: `Bearer ${data.token}`,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    }).catch((err) => console.log(err));
    return res.status;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editName: (state) => {
      state.editName = true;
      return state;
    },
    resetUser: (state) => {
      state = { firstName: '', lastName: '', editName: false };
      return state;
    },
    abort: (state) => {
      state.editName = false;
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      return {
        ...state,
        firstName: action.payload.body.firstName,
        lastName: action.payload.body.lastName,
        id: action.payload.body.id,
        createdAt: action.payload.body.createdAt,
        updatedAt: action.payload.body.updatedAt,
        status: action.payload.status,
        editName: false,
      };
    });
    builder.addCase(getUser.rejected, () => {
      console.log('rejected');
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    });
  },
});

export const { editName, resetUser, abort } = userSlice.actions;

export default userSlice.reducer;
