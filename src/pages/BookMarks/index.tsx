import React, {useEffect, useState} from 'react';
import {Video} from "../../interfaces";
import data from "../../data.json";
import Search from "../../components/Search";
import GridList from "../GridList";
import {useAppContext} from "../../context";

const BookMarks = () => {
  const [search, setSearch] = useState<string>("");
  const {data: contextData} = useAppContext();

  const [moviesData, setMoviesData] = useState<Video[]>([]);
  const [tvSeriesData, setTvSeriesData] = useState<Video[]>([]);


  useEffect(() => {
    setMoviesData(contextData.filter((item: Video) => item.category === "Movie" && item.isBookmarked));
    setTvSeriesData(contextData.filter((item: Video) => item.category === "TV Series" && item.isBookmarked));
  }, [contextData]);

  useEffect(() => {
    if (search) {
      const movieResults = moviesData.filter((item: Video) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      const tvSeriesResults = tvSeriesData.filter((item: Video) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setMoviesData(movieResults);
      setTvSeriesData(tvSeriesResults);
    } else {
      setMoviesData(contextData.filter((item: Video) => item.category === "Movie" && item.isBookmarked));
      setTvSeriesData(contextData.filter((item: Video) => item.category === "TV Series" && item.isBookmarked));
    }
  }, [search, contextData]);

  return (
    <div className='bookmarks-page'>
      ss
      <Search value={search} onChange={(value) => setSearch(value)}/>
      {!search ? (
        <section className="section recommended-section">
          <h2 className='section-title'>Bookmarked Movies</h2>
          {moviesData.length === 0 && <h3 className='empty-state'>No Bookmarks Movies found!</h3>}
          <GridList data={moviesData}/>

          <h2 className='section-title'>Bookmarked TV Series</h2>

          {tvSeriesData.length === 0 && <h3 className='empty-state'>No Bookmarks TV Series found!</h3>}
          <GridList data={tvSeriesData}/>
        </section>
      ) : (
        <>
          <div className="search-results">
            {(moviesData.length + tvSeriesData.length) > 0 && (
              <h3 className='search-title'>Found {moviesData.length + tvSeriesData.length} results for ‘{search}’</h3>
            )}
            <GridList data={moviesData.concat(tvSeriesData)}/>
          </div>
          {moviesData.length + tvSeriesData.length === 0 && (
            <h2 className="section-title">Nothing to search.</h2>
          )}
        </>
      )}
    </div>
  );
};

export default BookMarks;
