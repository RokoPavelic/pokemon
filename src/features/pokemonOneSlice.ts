import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokeAPI } from "pokeapi-types";
import { RootState } from "../app/store";

export interface pokemonOneState {
  value: PokeAPI.Pokemon | undefined;
  pokemonOneID: string;
}

const initialState: pokemonOneState = {
  value: undefined,
  pokemonOneID: "",
};

export const pokemonOneSlice = createSlice({
  name: "pokemonOne",
  initialState,
  reducers: {
    setPokemonOne: (state, action: PayloadAction<PokeAPI.Pokemon>) => {
      state.value = action.payload;
    },
    setPokemonOneID: (state, action: PayloadAction<number>) => {
      state.pokemonOneID = action.payload.toString();
    },
  },
});

export const { setPokemonOne, setPokemonOneID } = pokemonOneSlice.actions;

export const selectPokemonOne = (state: RootState) => state.pokemonOne.value;

export const selectPokemonOneID = (state: RootState) =>
  state.pokemonOne.pokemonOneID;

export default pokemonOneSlice.reducer;
