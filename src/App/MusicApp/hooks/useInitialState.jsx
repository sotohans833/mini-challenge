import { useState, useRef } from 'react';
import { FetchData } from '../helpers/FetchData';

export const useInitialState = () => {
  const [searchArtist, setSearchArtist] = useState('');
  const [songData, setSongData] = useState(() => {
    const data = localStorage.getItem('songData');
    return data ? JSON.parse(data) : [];
  });
  const [currentSong, setCurrentSong] = useState(0);

  const handleChange = (e) => {
    setSearchArtist(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    FetchData(searchArtist).then(({ data: { data } }) => {
      setSongData(data);
      localStorage.setItem('songData', JSON.stringify(data));
    });

    setSearchArtist('');
  };

  const audioRef = useRef(new Audio());

  return { searchArtist, handleChange, handleSubmit, songData, audioRef, currentSong, setCurrentSong };
};
