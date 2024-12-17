import React, { useState } from "react";
import { useGetSearchTrackResultQuery } from "../../api/apiSlice";
import SearchResult from "./SearchResult";
import SearchInput from "./SearchInput";
import styles from "./Search.module.css";

const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const {
    data: searchResults = [],
    isLoading,
    isError
  } = useGetSearchTrackResultQuery(searchInput, {
    skip: !searchInput
  });

  //   console.log("Search Results Structure:", JSON.stringify(searchResults, null, 2));
  //   console.log("Search Query:", searchInput);
  //   console.log("Search Results:", searchResults);
  //   console.log("search Is Loading:", isLoading);

  // Transform search results to match UI structure
  const searchTrackResults = searchResults.map((result: any) => ({
    id: result.id,
    name: result.name,
    cover: result.album.images[0]?.url || ""
  }));

  const handleClearSearch = () => {
    setSearchInput("");
  };

  if (isError) return <div>Error loading search results</div>;

  return (
    <div className={styles.searchContainer}>
      {/* Input Component */}
      <SearchInput value={searchInput} onChange={setSearchInput} onClear={handleClearSearch} />

      {/* Render results */}
      {!isLoading && searchInput && searchTrackResults.length > 0 && (
        <SearchResult results={searchTrackResults} />
      )}

      {/* Show message if no results are found */}
      {!isLoading && searchInput && searchTrackResults.length === 0 && (
        <div className={styles.noResults}>
          <h2>No results found</h2>
        </div>
      )}
    </div>
  );
};

export default Search;
