import { StarwarsService } from '../../services/starwars.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Starship } from '../../interfaces/starship.interface';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent implements OnInit {

  public starships: Starship[] = [];

  constructor(private starwarsService: StarwarsService, private router: Router) {}

  ngOnInit(): void {
    this.getStarships();
  }

  async getStarships() {
    try {
      this.starships = await this.starwarsService.getStarships();
      this.starships.forEach(ship => {
        ship.id = ship.url.split('/').reverse()[1];
      })
    } catch (error) {
      console.log(error);
    }
  }

  public viewShip(id: string) {
    this.router.navigate(['/starships', id]);
  }

}
