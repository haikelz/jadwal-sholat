import { SearchFilter } from "src/interfaces";

const SearchFilter = ({ setSearchTerm }: SearchFilter) => {
  return (
    <input
      className="font-semibold px-3 py-1 rounded-md bg-gray-50 dark:bg-gray-700 border-2 focus:border-4 border-blue-500"
      type="text"
      placeholder="Search...."
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
    />
  );
};

export default SearchFilter;
