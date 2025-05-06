import { FC, RefObject, FormEvent } from "react";
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
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      handleClearSearch();
    }
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
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
        onInput={handleInput}
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
