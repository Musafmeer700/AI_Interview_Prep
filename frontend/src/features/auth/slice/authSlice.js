import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authApi from '../api/authApi.js';
import { getErrorMessage } from '@/utils/apiError.js';
import { clearStoredToken, getStoredToken, setStoredToken } from '@/utils/storage.js';

const initialState = {
  user: null,
  token: getStoredToken(),
  status: 'idle',
  error: null,
  initialized: false,
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.registerUser(credentials);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Registration failed'));
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.loginUser(credentials);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Login failed'));
    }
  },
);

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.fetchCurrentUser();
      return { user: data.user };
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Failed to load profile'));
    }
  },
);

export const bootstrapAuth = createAsyncThunk(
  'auth/bootstrap',
  async (_, { dispatch, getState }) => {
    const { token } = getState().auth;
    if (!token) return null;
    const result = await dispatch(fetchMe());
    if (fetchMe.rejected.match(result)) {
      clearStoredToken();
      return null;
    }
    return result.payload;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      clearStoredToken();
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.status = 'loading';
      state.error = null;
    };
    const setRejected = (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    };

    builder
      .addCase(register.pending, setPending)
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        setStoredToken(action.payload.token);
      })
      .addCase(register.rejected, setRejected)

      .addCase(login.pending, setPending)
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        setStoredToken(action.payload.token);
      })
      .addCase(login.rejected, setRejected)

      .addCase(fetchMe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null;
        state.token = null;
        state.error = action.payload;
        clearStoredToken();
      })

      .addCase(bootstrapAuth.pending, (state) => {
        state.status = 'loading';
        state.initialized = false;
      })
      .addCase(bootstrapAuth.fulfilled, (state) => {
        state.status = 'succeeded';
        state.initialized = true;
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        state.status = 'idle';
        state.initialized = true;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token && state.auth.user);
export const selectAuthLoading = (state) => state.auth.status === 'loading';
export const selectAuthInitialized = (state) => state.auth.initialized;
export const selectAuthError = (state) => state.auth.error;

