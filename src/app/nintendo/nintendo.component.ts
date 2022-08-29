import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from '../shared/game.model';
import { Developer } from '../shared/developer.model';
import { ApiService } from '../shared/api.service';
import { NintendoDetailModalComponent } from './nintendo-detail-modal/nintendo-detail-modal.component';
import { Category } from 'app/shared/category.model';


@Component({
  selector: 'app-nintendo',
  templateUrl: './nintendo.component.html',
  styleUrls: ['./nintendo.component.css']
})
export class NintendoComponent implements OnInit {
  
  games: Game[] = [];
  searchName: string;
  searchDeveloper: string;
  searchPrice1: number;
  searchPrice2: number;
  searchCategory: string;
  selectedCategories: string[] = [];
  title: string;
  developers: Developer [] = [];
  categories: Category [] = [];
  rows: number = 0;

  @ViewChild('nintendoDetailModal') nintendoDetailModal: NintendoDetailModalComponent;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.selectedCategories = [];
    this.getDevelopers();
    this.getCategories();
    this.api.getGamesPlatform('nintendo').subscribe((data: Game[]) => {

      this.games = data;
      this.rows = data.length;
      this.searchPrice1 = 1;
      this.searchPrice2 = Math.max(...data.map(o => o.price), 0);
    },  
      (error: Error) => {
        console.log('err', error);
      });


    }

  getDevelopers() {
    this.api.getDevelopers()
      .subscribe((data: Developer[]) => {
        this.developers = data;
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  getCategories() {
    this.api.getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  onChange(name: string, isChecked: boolean) {

    var copy = [...this.selectedCategories]

    if (isChecked) {
      copy.push(name);
    } else {
      const index = copy.indexOf(name);
      copy.splice(index, 1);
    }
    
    this.selectedCategories = [...copy]
  }

  showDM(id: number): void {
    this.nintendoDetailModal.show(id);
  }
}
