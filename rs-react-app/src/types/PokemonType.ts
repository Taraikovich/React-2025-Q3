type PokemonType = {
  name: string;
  sprites: {
    front_default: string | null;
  };
  height: number;
  weight: number;
  types: { type: { name: string } }[];
};

export type { PokemonType };
