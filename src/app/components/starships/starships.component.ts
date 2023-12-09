import { StarwarsService } from '../../services/starwars/starwars.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Starship } from '../../interfaces/starship.interface';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, InfiniteScrollModule],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent implements OnInit {

  public starships: Starship[] = [];
  private page: number = 1;
  public loadMore: boolean = true;

  constructor(private starwarsService: StarwarsService, private router: Router) {}

  ngOnInit(): void {
    this.getStarships();
  }

  public getStarships() {
    this.starwarsService.getStarships(this.page)
        .subscribe({
          next: (data) => {
            this.starships = this.starships.concat(data.results);
            this.starships.forEach(ship => {
              ship.id = ship.url.split('/').reverse()[1];
            });
          },
          error: (error) => {
            //should not load more Starships
            if (error.status === 404) this.loadMore = false;
          }
        });
  }

  public loadMoreStarships() {
    if (this.loadMore) {
      this.page++;
      this.getStarships();
    }
  }

  public viewShip(id: string) {
    this.router.navigate(['/starships', id]);
  }
}
