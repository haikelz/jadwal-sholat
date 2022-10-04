import { HandleChange, SearchBar } from "@/src/interfaces";

const SearchBar = ({ setSearchTerm }: SearchBar) => {
  const handleChange = (event: HandleChange) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      className="font-semibold w-[250px] px-3 py-1 rounded-md bg-gray-50 dark:bg-gray-700 border-2 border-solid focus:outline-none ease-in-out transition bg-clip-padding focus:ring-blue-600 border-gray-400 focus:border-blue-600 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
      type="text"
      placeholder="Search...."
      onChange={handleChange}
    />
  );
};

export default SearchBar;
