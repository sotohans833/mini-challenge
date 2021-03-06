export const SearchBar = ({ onChange, onClick, value }) => {
  return (
    <>
      <div className='flex items-center justify-center w-full'>
        <input type='text' className='search' placeholder='Search for a gif' onChange={onChange} value={value} />
        <button className='ml-2 button button-blue' onClick={onClick}>
          Search
        </button>
      </div>
    </>
  );
};
