import { FC, RefObject } from "react";
import SearchIcon from "../../../../../assets/SVG/Search.svg";
import styles from "./SearchAssets.module.css";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleClearSearch: () => void;
  setIsSearching: (isSearching: boolean) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

/**
 * SearchBar component with input and clear functionality
 */
const SearchBar: FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  handleClearSearch,
  setIsSearching,
  inputRef,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);

    // Always show the dropdown when typing
    setIsSearching(true);

    // Clear selected asset if the search field is emptied
    if (newValue === "") {
      handleClearSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <img src={SearchIcon} alt="Search" />
      <input
        ref={inputRef}
        type="search"
        placeholder="Search Assets"
        onFocus={() => setIsSearching(true)}
        onChange={handleInputChange}
        value={searchTerm}
      />
      {searchTerm && (
        <button
          className={styles.clearButton}
          onClick={handleClearSearch}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
