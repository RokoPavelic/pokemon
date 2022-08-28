import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokeAPI } from "pokeapi-types";
import { RootState } from "../app/store";

export interface pokemonTwoState {
  value: PokeAPI.Pokemon | undefined;
  pokemonTwoID: string;
}

const initialState: pokemonTwoState = {
  value: undefined,
  pokemonTwoID: "",
};

export const pokemonTwoSlice = createSlice({
  name: "pokemonTwo",
  initialState,
  reducers: {
    setPokemonTwo: (state, action: PayloadAction<PokeAPI.Pokemon>) => {
      state.value = action.payload;
    },
    setPokemonTwoID: (state, action: PayloadAction<number>) => {
      state.pokemonTwoID = action.payload.toString();
    },
  },
});

export const { setPokemonTwo, setPokemonTwoID } = pokemonTwoSlice.actions;

export const selectPokemonTwo = (state: RootState) => state.pokemonTwo.value;

export const selectPokemonTwoID = (state: RootState) =>
  state.pokemonTwo.pokemonTwoID;

export default pokemonTwoSlice.reducer;
