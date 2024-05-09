import React, {useState, useEffect} from 'react';
import Search from "../../components/Search";
import GridList from "../GridList";
import {Video} from "../../interfaces";
import {useAppContext} from "../../context";


const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const {data: contextData} = useAppContext();
  const [dataExported, setDataExported] = useState<any[]>(contextData);


  const handleSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (search) {
      const results = contextData.filter((item: Video) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setDataExported(results);
    } else {
      setDataExported(contextData); // Restore original data when search is empty
    }
  }, [search]);


  useEffect(() => {
    setDataExported(contextData);
  }, [contextData]);


  return (
    <div className='home-page'>
      <Search value={search} onChange={handleSearch}/>
      {!search ? (
        <>
          <section className='section trending-section'>
            <h2 className='section-title'>Trending</h2>
            <GridList data={dataExported.filter(item => item.isTrending)}
                      isTrending/>
          </section>
          <section className="section recommended-section">
            <h2 className='section-title'>Recommended for you</h2>
            <GridList data={dataExported}/>
          </section>
        </>
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

export default Home;
