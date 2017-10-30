import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SearchResult } from '../models/search-result.model';

@Injectable()
export class YouTubeSearchService {

  constructor(
    private http: Http,
    @Inject('YOUTUBE_API_KEY') private apiKey: string,
    @Inject('YOUTUBE_API_URL') private apiUrl: string
  )
  {

  }

  search(query: string){
   const params: string = [
     `q=${query}`,
     `key=${this.apiKey}`,
     `part=snippet`,
     `type=video`,
     `maxResults=10`
   ].join('&');
   const queryUrl = `${this.apiUrl}?${params}`;
   return this.http.get(queryUrl).map((response) => {
      return (<any>response.json()).items.map(item => {
      console.log("raw item", item);
       return new SearchResult({
         id: item.id.videoId,
         title: item.snippet.title,
         description: item.snippet.description,
         thumbnailUrl: item.snippet.thumbnails.high.url
        })
      })
    })
  }
}
