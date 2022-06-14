import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/login`, {
        email: values.email,
        password: values.password,
      });
      if (values.checked) {
        localStorage.setItem('email', values.email);
      } else {
        localStorage.removeItem('email');
      }

      sessionStorage.setItem('token', data.body.token);

      return data.body.token;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/fetchUserDatas',
  async (token) => {
    let response = await axios({
      method: 'post',
      url: `${url}/profile`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).catch((err) => console.error(err));
    return { body: response.data.body, status: response.status };
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
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
    }).catch((error) => console.log(error.response));
    return res.status;
  }
);

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    token: sessionStorage.getItem('token'),
    loginStatus: '',
    loginError: '',
    isLogged: false,
    firstName: '',
    lastName: '',
    id: '',
    createdAt: '',
    updatedAt: '',
    status: '',
    editName: false,
  },

  reducers: {
    logoutUser(state, action) {
      return {
        ...state,
        token: '',
        loginStatus: '',
        loginError: '',
        isLogged: false,
        firstName: '',
        lastName: '',
        id: '',
        createdAt: '',
        updatedAt: '',
        status: '',
        editName: false,
      };
    },
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
    remember: (state) => {
      const recordEmail = localStorage.getItem('email');
      if (recordEmail) {
        state.email = recordEmail;
        return state;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: 'pending' };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        sessionStorage.setItem('isLogged', true);
        return {
          ...state,
          token: action.payload,
          loginStatus: 'success',
          loginError: '',
          isLogged: true,
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        token: '',
        loginStatus: 'rejected',
        loginError: action.payload.message,
      };
    });
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

export const { logoutUser, editName, resetUser, abort } = authSlice.actions;

export default authSlice.reducer;
