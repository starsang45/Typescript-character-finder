import React from 'react';

// Type definition for Character (we'll probably want to move this to a shared types file later, but for now duplicate or import)
// Ideally, we should have a types.ts, but I'll define it here for the component's needs or import if I create a types file.
// Let's create a types file first in the next step or define it locally.
// For now, I'll inline the type to match the existing one, or better yet, I will create a refined plan to extract types.
// I will just define the props interface here.

export interface Character {
  char_id: number;
  name: string;
  birthday: string;
  occupation: string[];
  img: string;
  status: string;
  nickname: string;
  appearance: number[];
  portrayed: string;
  category: string;
  better_call_saul_appearance: number[];
}

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  return (
    <div className='character-card' onClick={() => onClick(character)}>
      <div className='card-inner'>
        <div className='card-front'>
          <img src={character.img} alt={character.name} />
        </div>
        <div className='card-back'>
          <h1>{character.name}</h1>
          <ul>
            <li>
              <strong>Actor Name:</strong> {character.portrayed}
            </li>
            <li>
              <strong>Nickname:</strong> {character.nickname}
            </li>
            <li>
              <strong>Birthday:</strong> {character.birthday}
            </li>
            <li>
              <strong>Status:</strong> {character.status}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
