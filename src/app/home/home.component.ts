import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Game } from 'app/shared/game.model';
import { HomeDetailModalComponent } from './home-detail-modal/home-detail-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

  
export class HomeComponent implements OnInit {


  @ViewChild('homeDetailModal') homeDetailModal: HomeDetailModalComponent;

  gamesViews: Game[] = [];
  gamesSale: Game[] = [];
  gamesBest: Game[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() { 
    this.api.getGames().subscribe((data: Game[]) => {
      this.gamesViews = data.sort((a,b) => b.views - a.views).slice(0, 6);
      this.gamesSale = data.sort((a,b) => b.sale - a.sale).slice(0, 4);
      this.gamesBest = data.sort((a,b) => b.copiesSold - a.copiesSold).slice(0, 4);
    },  
      (error: Error) => {
        console.log('err', error);
      });
  }


  showDM(id: number): void {
    this.homeDetailModal.show(id);
  }

  
}
  


