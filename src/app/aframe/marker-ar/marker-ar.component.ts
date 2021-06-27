import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marker-ar',
  templateUrl: './marker-ar.component.html',
  styleUrls: ['./marker-ar.component.scss']
})
export class MarkerArComponent implements OnInit {
  showContent = false;
  constructor() { }
  ngOnInit(): void {
    setTimeout(() => this.showContent = true, 2000);
  }
}
