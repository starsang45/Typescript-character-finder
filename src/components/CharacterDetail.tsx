import React from 'react';
import { type Character } from './CharacterCard'; // Assuming we export it or use a types file

interface CharacterDetailProps {
    character: Character;
    onClose: () => void;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>&times;</span>
                <div className="detail-header">
                    <h2>{character.name}</h2>
                    <span className={`status ${character.status === 'Alive' ? 'alive' : 'deceased'}`}>
                        {character.status}
                    </span>
                </div>
                <div className="detail-body">
                    <img src={character.img} alt={character.name} className="detail-img" />
                    <div className="detail-info">
                        <p><strong>Nickname:</strong> {character.nickname}</p>
                        <p><strong>Portrayed by:</strong> {character.portrayed}</p>
                        <p><strong>Birthday:</strong> {character.birthday}</p>
                        <p><strong>Occupation:</strong> {character.occupation.join(', ')}</p>
                        <p><strong>Seasons:</strong> {character.appearance.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetail;
