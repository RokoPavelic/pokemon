import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { pokemonApi } from "./pokemonAPI";
import pokemonOneReducer from "../features/pokemonOneSlice";
import pokemonTwoReducer from "../features/pokemonTwoSlice";
import logsSliceReducer from "../features/logsSlice";

export const store = configureStore({
  reducer: {
    logs: logsSliceReducer,
    pokemonOne: pokemonOneReducer,
    pokemonTwo: pokemonTwoReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
