import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { pokemonApi } from './pokemonAPI'
import counterReducer from "../features/counter/counterSlice";
import pokemonOneReducer from "../features/pokemonOneSlice";
import pokemonTwoReducer from "../features/pokemonTwoSlice";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
