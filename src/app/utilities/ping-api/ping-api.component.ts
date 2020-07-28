import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ping-api',
  templateUrl: './ping-api.component.html',
  styleUrls: ['./ping-api.component.scss']
})
export class PingApiComponent implements OnInit {
  responseJson: object;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(environment.recipesApi).subscribe(
      res => this.responseJson = res
    );
  }

}
