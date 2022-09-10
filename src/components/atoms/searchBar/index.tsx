import { HandleChange, SearchBar } from "@/src/interfaces";

const SearchBar = ({ setSearchTerm }: SearchBar) => {
  const handleChange = (event: HandleChange) => {
    setSearchTerm(event.target.value);
  };
  /**
   * <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
   */
  return (
    <input
      className="font-semibold px-3 py-1 rounded-md bg-gray-50 dark:bg-gray-700 border-2 border-solid focus:outline-none ease-in-out transition bg-clip-padding focus:ring-blue-600 border-gray-300 focus:border-blue-600 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
      type="text"
      placeholder="Search...."
      onChange={handleChange}
    />
  );
};

export default SearchBar;
