import { Component } from 'react';
import type { PokemonType } from '../types/PokemonType';

interface PokemonCardProps {
  pokemon: PokemonType;
}

class PokemonCard extends Component<PokemonCardProps> {
  render() {
    const { pokemon } = this.props;
    return (
      <div className="pokemon-card">
        <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        {pokemon.sprites.front_default ? (
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        ) : (
          <p>No image available</p>
        )}
        <p>Height: {pokemon.height / 10} m</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
        <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
      </div>
    );
  }
}

export default PokemonCard;
