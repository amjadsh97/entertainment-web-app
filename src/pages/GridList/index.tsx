import React from 'react';
import {iconBookmarkEmpty, iconBookmarkFull, iconPlay} from "../../assets";
import {useAppContext} from "../../context";

interface Thumbnail {
  small: string;
  medium?: string;
  large: string;
}

interface Video {
  title: string;
  thumbnail: {
    trending?: Thumbnail;
    regular: Thumbnail;
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending?: boolean;
}

interface GridListProps {
  data: Video[];
  isTrending?: boolean;
}

const GridList: React.FC<GridListProps> = ({data, isTrending}) => {
  const {data: contextData, setData} = useAppContext();

  const handleBookmark = (item: Video) => {
    const updatedData = contextData.map(video => {
      if (video.title === item.title) {
        return {...video, isBookmarked: !video.isBookmarked};
      }
      return video;
    });
    setData(updatedData);
  };

  return (
    <div className={`cards-wrapper ${!isTrending ? "grid" : ""}`}>
      {data.map((item: Video, index: number) => (
        <article className={`card ${isTrending ? "card-overlay" : "stacked-card"}`} key={index}>
          <div className='image-wrapper'>
            <picture>
              {item.isTrending && item.thumbnail.trending && (
                <>
                  <source srcSet={require(`../../assets/${item.thumbnail.trending.large}`)}
                          media='(min-width: 1170px)'/>
                  <img src={require(`../../assets/${item.thumbnail.trending.small}`)} alt=''/>
                </>
              )}
              {!item.isTrending && (
                <>
                  <source srcSet={require(`../../assets/${item.thumbnail.regular.large}`)} media='(min-width: 1170px)'/>
                  <source srcSet={require(`../../assets/${item.thumbnail.regular.medium}`)} media='(min-width: 768px)'/>
                  <img src={require(`../../assets/${item.thumbnail.regular.small}`)} alt=''/>
                </>
              )}
            </picture>
            <button className="play-action">
              <img src={iconPlay} alt='Play'/>
              <span className={'button-text'}>Play</span>
            </button>
          </div>
          <div className='card-details'>
            <div className='card-row'>
              <span className='card-date'>{item.year}</span>
              <span className='card-category'>{item.category}</span>
              <span className='card-rating'>{item.rating}</span>
            </div>
            <h3 className='card-title'>{item.title}</h3>
          </div>
          <div className='card-bookmark' onClick={() => handleBookmark(item)}>
            {item.isBookmarked ? <img src={iconBookmarkFull} alt='Bookmarked'/> :
              <img src={iconBookmarkEmpty} alt='Not Bookmarked'/>}
          </div>

        </article>
      ))}
    </div>
  );
};

export default GridList;
