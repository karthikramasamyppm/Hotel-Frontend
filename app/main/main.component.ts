import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  hotels: any[] = [];
  filterString = '';

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.mainService.getHotels().subscribe((hotelsResponse) => {
      this.hotels = hotelsResponse;
    });
  }

}
