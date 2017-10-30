import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { SearchResult } from '../../models/search-result.model';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import { YouTubeSearchService } from '../../services/you-tube-search.service';

@Component({
  selector: 'app-search-bar',
  template: `<input type="text" class="form-control" placeholder="Search" autofocus>`,
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YouTubeSearchService, private el: ElementRef) { }

  ngOnInit() {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
    .map((e: any) => e.target.value)
    .filter((text: string) => text.length > 1)
    .debounceTime(250)
    .do(() => this.loading.emit(true))
    .map((query: string) => this.youtube.search(query))
    .switch()
    .subscribe(
      (results: SearchResult[])=>{
      this.loading.emit(false);
      this.results.emit(results); },
      (err: any) => {
       console.log(err);
       this.loading.emit(false);
      },
      () => { 
      this.loading.emit(false);
      }
    )
  }
}
