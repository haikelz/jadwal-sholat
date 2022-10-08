import { HandleChange, SearchBar } from "@/src/interfaces";

const SearchBar = ({ setSearchTerm }: SearchBar) => {
  const handleChange = (event: HandleChange) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      className="w-[250px] rounded-md border-2 border-solid border-gray-400 bg-gray-50 bg-clip-padding px-3 py-1 font-semibold transition ease-in-out focus:border-blue-600 focus:outline-none focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500"
      type="text"
      placeholder="Search...."
      onChange={handleChange}
    />
  );
};

export default SearchBar;
