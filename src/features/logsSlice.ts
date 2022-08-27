import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";

export interface logsState {
  logs: string[];
  lastLog: string;
}

const initialState: logsState = {
  logs: [],
  lastLog: "",
};

export const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs: (state, action: PayloadAction<string>) => {
      state.logs = [...state.logs, action.payload];
    },

    setLastLog: (state, action: PayloadAction<string>) => {
      state.lastLog = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogs, setLastLog } = logsSlice.actions;

export const selectLogs = (state: RootState) => state.logs.logs;
export const selectLastLog = (state: RootState) => state.logs.lastLog;

export default logsSlice.reducer;
