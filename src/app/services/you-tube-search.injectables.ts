import {  YouTubeSearchService  } from './you-tube-search.service';

export const youTubeSearchInjectables: Array<any> = [
  {provide: YouTubeSearchService, useClass: YouTubeSearchService},
  {provide: 'YOUTUBE_API_KEY', useValue: "AIzaSyAiGjRHRWBL0KwBVOpA4yfZ8fl7CDmZCQQ"},
  {provide: 'YOUTUBE_API_URL', useValue: "https://www.googleapis.com/youtube/v3/search"}
];
