import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByID: builder.query({
      query: (id: string) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonByIDQuery } = pokemonApi;
