import { Component } from 'react';
import type { PokemonType } from '../types/PokemonType';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemonList: PokemonType[];
}

class PokemonList extends Component<PokemonListProps> {
  render() {
    const { pokemonList } = this.props;
    return (
      <div className="pokemon-list">
        <h2>All Pokémon</h2>
        <div className="pokemon-grid">
          {pokemonList.map((poke) => (
            <PokemonCard key={poke.name} pokemon={poke} />
          ))}
        </div>
      </div>
    );
  }
}

export default PokemonList;
