
import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';
import { fetchPokemonList, fetchPokemonByNameOrId } from '../services/pokemonService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react';

interface PokemonSelectorProps {
  onPokemonSelect: (pokemon: Pokemon) => void;
  side: 'player' | 'computer';
}

const PokemonSelector = ({ onPokemonSelect, side }: PokemonSelectorProps) => {
  const [pokemonList, setPokemonList] = useState<{name: string, url: string}[]>([]);
  const [filteredList, setFilteredList] = useState<{name: string, url: string}[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadPokemon = async () => {
      setLoading(true);
      try {
        // Fetch all 898 Pokémon (as of Gen 8)
        const results = await fetchPokemonList(898, 0);
        setPokemonList(results);
        setFilteredList(results.slice(0, itemsPerPage));
      } catch (error) {
        console.error('Error loading Pokémon list:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPokemon();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pokemonList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(filtered.slice(0, itemsPerPage));
      setPage(1);
    } else {
      setFilteredList(pokemonList.slice(0, itemsPerPage));
    }
  }, [searchTerm, pokemonList]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    const newItems = searchTerm
      ? pokemonList
          .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(start, end)
      : pokemonList.slice(start, end);
    
    setFilteredList([...filteredList, ...newItems]);
    setPage(nextPage);
  };

  const handleSelectPokemon = async (pokemonName: string) => {
    setLoading(true);
    try {
      const pokemon = await fetchPokemonByNameOrId(pokemonName);
      if (pokemon) {
        setSelectedPokemon(pokemon);
        onPokemonSelect(pokemon);
      }
    } catch (error) {
      console.error('Error selecting Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomPokemon = async () => {
    setLoading(true);
    try {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemonName = pokemonList[randomIndex].name;
      const pokemon = await fetchPokemonByNameOrId(randomPokemonName);
      if (pokemon) {
        setSelectedPokemon(pokemon);
        onPokemonSelect(pokemon);
      }
    } catch (error) {
      console.error('Error selecting random Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPokemonName = (name: string) => {
    return name.split('-')[0].replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <div className="w-full max-w-md p-4 bg-gba-panel rounded-none shadow-gba transition-all animate-fade-in border-4 border-gba-dark">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Rechercher un Pokémon..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 font-gba"
            disabled={loading}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gba-dark" />
        </div>
        <Button 
          onClick={handleRandomPokemon} 
          variant="outline" 
          size="icon" 
          className="flex-shrink-0"
          disabled={loading}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-bounce-light">
            <img 
              src="/images/pokeball.png" 
              alt="Loading..." 
              className="w-16 h-16 animate-spin"
              onError={(e) => {
                e.currentTarget.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
              }}
            />
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto h-64 scrollbar-thin border-4 border-gba-dark rounded-none p-2 bg-gba-light shadow-gba-inner">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredList.map((pokemon) => {
              const pokeId = pokemon.url.split('/')[pokemon.url.split('/').length - 2];
              return (
                <Button
                  key={pokemon.name}
                  variant={selectedPokemon?.name === pokemon.name ? "default" : "outline"}
                  className={`h-auto py-2 flex flex-col items-center justify-center transition-all hover:bg-gba-primary`}
                  onClick={() => handleSelectPokemon(pokemon.name)}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}
                    alt={pokemon.name}
                    className="w-16 h-16 object-contain pixelated" 
                    loading="lazy"
                  />
                  <span className="text-xs mt-1 truncate w-full text-center font-gba">
                    {formatPokemonName(pokemon.name)}
                  </span>
                </Button>
              );
            })}
          </div>
          
          {filteredList.length < (searchTerm ? 
            pokemonList.filter(p => p.name.includes(searchTerm.toLowerCase())).length : 
            pokemonList.length) && (
            <Button 
              onClick={handleLoadMore} 
              variant="secondary" 
              className="w-full mt-2 font-gba text-xs" 
              disabled={loading}
            >
              Charger plus
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const getTypeColor = (type: string): string => {
  switch (type) {
    case 'fire':
      return 'bg-pokemon-fire';
    case 'water':
      return 'bg-pokemon-water';
    case 'grass':
      return 'bg-pokemon-grass';
    case 'electric':
      return 'bg-pokemon-electric';
    case 'ice':
      return 'bg-gba-blue';
    case 'fighting':
      return 'bg-gba-red';
    case 'poison':
      return 'bg-gba-purple';
    case 'ground':
      return 'bg-gba-brown';
    case 'flying':
      return 'bg-gba-light-blue';
    case 'psychic':
      return 'bg-gba-pink';
    case 'bug':
      return 'bg-gba-lime';
    case 'rock':
      return 'bg-gba-brown';
    case 'ghost':
      return 'bg-gba-purple';
    case 'dragon':
      return 'bg-gba-purple';
    case 'dark':
      return 'bg-gba-dark';
    case 'steel':
      return 'bg-gba-gray';
    case 'fairy':
      return 'bg-gba-pink';
    default:
      return 'bg-gba-gray';
  }
};

export default PokemonSelector;
