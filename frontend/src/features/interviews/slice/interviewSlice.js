import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as interviewApi from '../api/interviewApi.js';
import { getErrorMessage } from '@/utils/apiError.js';

const initialState = {
  sessions: [],
  currentSession: null,
  listStatus: 'idle',
  detailStatus: 'idle',
  mutationStatus: 'idle',
  error: null,
};

export const fetchSessions = createAsyncThunk(
  'interviews/fetchSessions',
  async (_, { rejectWithValue }) => {
    try {
      return await interviewApi.fetchInterviewSessions();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Failed to load sessions'));
    }
  },
);

export const fetchSessionById = createAsyncThunk(
  'interviews/fetchSessionById',
  async (id, { rejectWithValue }) => {
    try {
      return await interviewApi.fetchInterviewSession(id);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Failed to load session'));
    }
  },
);

export const createSession = createAsyncThunk(
  'interviews/createSession',
  async (payload, { rejectWithValue }) => {
    try {
      return await interviewApi.createInterviewSession(payload);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Failed to create session'));
    }
  },
);

export const deleteSession = createAsyncThunk(
  'interviews/deleteSession',
  async (id, { rejectWithValue }) => {
    try {
      await interviewApi.deleteInterviewSession(id);
      return id;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Failed to delete session'));
    }
  },
);

const interviewSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    clearInterviewError(state) {
      state.error = null;
    },
    clearCurrentSession(state) {
      state.currentSession = null;
      state.detailStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.listStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchSessionById.pending, (state) => {
        state.detailStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchSessionById.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.currentSession = action.payload;
      })
      .addCase(fetchSessionById.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.error = action.payload;
      })

      .addCase(createSession.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.sessions = [action.payload, ...state.sessions];
        state.currentSession = action.payload;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload;
      })

      .addCase(deleteSession.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.sessions = state.sessions.filter((s) => s.id !== action.payload);
        if (state.currentSession?.id === action.payload) {
          state.currentSession = null;
        }
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearInterviewError, clearCurrentSession } = interviewSlice.actions;
export default interviewSlice.reducer;

export const selectInterviewSessions = (state) => state.interviews.sessions;
export const selectCurrentSession = (state) => state.interviews.currentSession;
export const selectInterviewListStatus = (state) => state.interviews.listStatus;
export const selectInterviewDetailStatus = (state) => state.interviews.detailStatus;
export const selectInterviewMutationStatus = (state) => state.interviews.mutationStatus;
export const selectInterviewError = (state) => state.interviews.error;
