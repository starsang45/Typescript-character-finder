import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    onSearch: (term: string) => void;
    filterStatus: string;
    onFilterStatusChange: (status: string) => void;
    sortOption: string;
    onSortOptionChange: (sort: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    searchTerm, 
    onSearch, 
    filterStatus, 
    onFilterStatusChange, 
    sortOption, 
    onSortOptionChange 
}) => {
    return (
        <section className="search">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="search-controls">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search characters"
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                        autoFocus
                    />
                    <div className="filters">
                        <select 
                            value={filterStatus} 
                            onChange={(e) => onFilterStatusChange(e.target.value)}
                            className="form-control"
                        >
                            <option value="All">All Status</option>
                            <option value="Alive">Alive</option>
                            <option value="Deceased">Deceased</option>
                            <option value="Presumed dead">Presumed Dead</option>
                        </select>
                        
                        <select 
                            value={sortOption} 
                            onChange={(e) => onSortOptionChange(e.target.value)}
                            className="form-control"
                        >
                            <option value="Default">Default</option>
                            <option value="Name">Name (A-Z)</option>
                        </select>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default SearchBar;
