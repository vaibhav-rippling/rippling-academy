export const apiKey = "AIzaSyDmux6_-6XXPGbVGtyJEm6lGodB5J7V4l8";
export const trendingVideosEndpoint =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key={apiKey}";
export const searchQueryEndpoint =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q={searchTerm}&type=video&key={apiKey}";
export const searchVideoByIdEndpoint =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id={videoId}&maxResults=50&key={apiKey}";
