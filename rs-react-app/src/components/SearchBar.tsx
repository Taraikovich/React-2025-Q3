import { Component } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

class SearchBar extends Component<SearchBarProps> {
  render() {
    const { searchTerm, onSearchTermChange, onSearchSubmit } = this.props;
    return (
      <form onSubmit={onSearchSubmit} aria-label="Pokémon search form">
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchTermChange}
          placeholder="Enter Pokémon name (e.g., Ditto)"
          aria-label="Search for a Pokémon by name"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;
