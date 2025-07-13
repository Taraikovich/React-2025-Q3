import React, { Component } from 'react';
import './App.css';
import ErrorBoundaryTest from './components/ErrorBoundaryTest';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import type { PokemonType } from './types/PokemonType';
import PokemonCard from './components/PokemonCard';
import PokemonList from './components/PokemonList';

class App extends Component<
  object,
  {
    searchTerm: string;
    pokemon: PokemonType | null;
    error: Error | null;
    loading: boolean;
    pokemonList: PokemonType[];
    throwError: boolean;
  }
> {
  state = {
    searchTerm: '',
    pokemon: null as PokemonType | null,
    error: null as Error | null,
    loading: false,
    pokemonList: [] as PokemonType[],
    throwError: false,
  };

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm }, () => {
        this.fetchPokemon(savedSearchTerm);
      });
    } else {
      this.fetchAllPokemon();
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm.trim()) {
      localStorage.setItem('searchTerm', searchTerm);
      this.fetchPokemon(searchTerm);
    } else {
      this.setState({ pokemon: null, error: null });
      this.fetchAllPokemon();
    }
  };

  fetchPokemon = async (name: string) => {
    if (!name.trim()) return;

    this.setState({ loading: true, error: null, pokemon: null });

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      if (!response.ok) throw new Error('Pokémon not found');

      const data: PokemonType = await response.json();
      this.setState({ pokemon: data });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error : new Error('An error occurred'),
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchAllPokemon = async () => {
    this.setState({
      loading: true,
      error: null,
      pokemonList: [],
      pokemon: null,
    });
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=20'
      );
      if (!response.ok) throw new Error('Failed to fetch Pokémon list');

      interface PokemonListResult {
        name: string;
        url: string;
      }

      interface PokemonListResponse {
        results: PokemonListResult[];
      }

      const listData: PokemonListResponse = await response.json();
      const pokemonDetails: PokemonType[] = await Promise.all(
        listData.results.map(async (pokemon: PokemonListResult) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      this.setState({ pokemonList: pokemonDetails });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error : new Error('An error occurred'),
        pokemonList: [],
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  throwTestError = () => {
    this.setState({ throwError: true });
  };

  render() {
    const { searchTerm, pokemon, error, loading, pokemonList, throwError } =
      this.state;

    if (throwError) {
      throw new Error('Test error triggered during render');
    }

    if (error) {
      throw error;
    }

    return (
      <div className="app-container">
        <h1>Pokémon Search</h1>
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={this.handleInputChange}
          onSearchSubmit={this.handleSubmit}
        />
        <ErrorBoundaryTest onThrowError={this.throwTestError} />
        {loading && <LoadingSpinner />}
        {pokemon && <PokemonCard pokemon={pokemon} />}
        {!pokemon && pokemonList.length > 0 && (
          <PokemonList pokemonList={pokemonList} />
        )}
      </div>
    );
  }
}

export default App;
