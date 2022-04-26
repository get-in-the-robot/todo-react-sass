import TextInput from './TextInput';

const SearchBar = ({ onSearch, className, placeholder }) => {
  const searchHandler = (event) => {
    onSearch(event.target.value.toLowerCase());
  };

  return (
    <TextInput
      onChange={searchHandler}
      className={className}
      placeholder={placeholder}
      type="search"
    />
  );
};

export default SearchBar;
