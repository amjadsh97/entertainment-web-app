interface Thumbnail {
  small: string;
  medium?: string;
  large: string;
}

export interface Video {
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