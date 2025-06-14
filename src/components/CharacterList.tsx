// CharacterList.tsx
// This component fetches character data from the local characters.json file
// and renders them as a list of cards including image, name, and nickname.
// Users can filter the character list in real-time by typing into the search bar.

import React, { useEffect, useState } from 'react';

// Type definition for each character object
type Character = {
  char_id: number; // Unique identifier for the character
  name: string;
  birthday: string;
  occupation: string[]; // Array of character's occupations
  img: string; // URL to character's profile image
  status: string;
  nickname: string;
  appearance: number[]; // Seasons in which character appeared (Breaking Bad)
  portrayed: string; // Actor's name who portrayed the character
  category: string;
  better_call_saul_appearance: number[];
};

function CharacterList(): React.ReactElement {
  // State for all characters fetched from the JSON file
  const [characters, setCharacters] = useState<Character[]>([]);

  // State for the user's current search input
  const [searchTerm, setSearchTerm] = useState('');

  // State for the currently selected character (for detail view)
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // useEffect hook runs only once after component mounts
  // Fetches data from public/characters.json and stores it in state
  useEffect(() => {
    fetch('/characters.json')
      .then((res) => res.json())
      .then((data) => setCharacters(data))
      .catch((err) => console.error('Failed to fetch characters:', err));
  }, []);

  // Filter characters based on whether name or nickname includes the search term (case-insensitive)
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    char.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wrapper">
      <h1>BREAKING BAD</h1>

      {/* Search bar input that updates the searchTerm state on every keystroke */}
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Updates state on user input
      />

      {/* If no characters match the search term, show a message */}
      {filteredCharacters.length === 0 ? (
        <p className="no-results">No one? SAY MY NAME.</p>
      ) : (
        // Render each filtered character as a card
        <ul className="character-list">
          {filteredCharacters.map((char) => (
            <li
              className="character-card"
              key={char.char_id}
              onClick={() => setSelectedCharacter(char)} // Clicking sets selected character
              style={{ cursor: 'pointer' }}
            >
              <img src={char.img} alt={char.name} className="character-img" />
              <div className="character-info">
                <h3>{char.name}</h3>
                <p>{char.nickname}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Character detail view shown when one is selected */}
      {selectedCharacter && (
        <div className="character-detail">
          <h2>{selectedCharacter.name}</h2>
          <img src={selectedCharacter.img} alt={selectedCharacter.name} />
          <p><strong>Birthday:</strong> {selectedCharacter.birthday}</p>
          <p><strong>Status:</strong> {selectedCharacter.status}</p>
          <p><strong>Portrayed by:</strong> {selectedCharacter.portrayed}</p>
          <p><strong>Occupation:</strong> {selectedCharacter.occupation.join(', ')}</p>

          {/* Button to close detail view */}
          <button onClick={() => setSelectedCharacter(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default CharacterList;
