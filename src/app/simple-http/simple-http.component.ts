import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-simple-http',
  templateUrl: './simple-http.component.html',
  styleUrls: ['./simple-http.component.css']
})
export class SimpleHttpComponent implements OnInit {
  data: Object;
  error: Object;
  loading: boolean;

  constructor(private http: Http) {  }

  makeRequest(){
    this.loading = true;
    this.data = null;
    this.http.get('http://jsonplaceholder.typicode.com/posts/1').subscribe(
      res => { this.data = res.json(); this.loading = false; },
      err => { this.error = err; this.loading = false; }
    )
  }

  ngOnInit() {
  }

}
