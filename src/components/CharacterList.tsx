import React, { useEffect, useState } from 'react';
import CharacterCard, { type Character } from './CharacterCard';
import CharacterDetail from './CharacterDetail';
import SearchBar from './SearchBar';

function CharacterList(): React.ReactElement {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOption, setSortOption] = useState('Default');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    fetch('/characters.json')
      .then((res) => res.json())
      .then((data) => setCharacters(data))
      .catch((err) => console.error('Failed to fetch characters:', err));
  }, []);

  const filteredCharacters = characters.filter((char) => {
    const matchesSearch = 
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.nickname.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'All' || char.status === filterStatus;

    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortOption === 'Name') {
      return a.name.localeCompare(b.name);
    }
    return 0; // Default order (by ID usually)
  });

  return (
    <div className="container">
      <h1>Breaking Bad</h1>
      
      <SearchBar 
        searchTerm={searchTerm} 
        onSearch={setSearchTerm}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
      />

      {filteredCharacters.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>No one? SAY MY NAME.</p>
      ) : (
        <section className="cards">
          {filteredCharacters.map((char) => (
            <CharacterCard 
              key={char.char_id} 
              character={char} 
              onClick={setSelectedCharacter} 
            />
          ))}
        </section>
      )}

      {selectedCharacter && (
        <CharacterDetail 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      )}
    </div>
  );
}

export default CharacterList;
