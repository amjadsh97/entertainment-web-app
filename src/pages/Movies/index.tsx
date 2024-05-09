import React, {useEffect, useState} from 'react';
import Search from "../../components/Search";
import data from "../../data.json";
import GridList from "../GridList";
import {Video} from "../../interfaces";
import {useAppContext} from "../../context";

const Movies = () => {
  const [search, setSearch] = useState<string>("");
  const {data: contextData} = useAppContext();
  const moviesData = contextData.filter(item => item.category === "Movie")
  const [dataExported, setDataExported] = useState<any[]>([]);

  useEffect(() => {
    if (search) {
      const results = moviesData.filter((item: Video) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setDataExported(results);
    } else {
      setDataExported(moviesData.filter(item => item.category === "Movie")); // Restore original data when search is empty
    }
  }, [search]);


  useEffect(() => {
    setDataExported(moviesData);
  }, [contextData]);

  return (
    <div className='movies-page'>
      <Search value={search} onChange={(value) => setSearch(value)}/>
      {!search ? (
        <section className="section recommended-section">
          <h2 className='section-title'>Movies</h2>
          <GridList data={dataExported}/>
        </section>
      ) : (
        <>
          <div className="search-results">
            {dataExported.length > 0 &&
							<h3 className='search-title'>Found {dataExported.length} results for ‘{search}’</h3>}
            <GridList data={dataExported}/>
          </div>
          {dataExported.length === 0 && (
            <>
              <h2 className="section-title">
                Nothing to search.
              </h2>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Movies;
