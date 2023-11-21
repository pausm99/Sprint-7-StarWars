import { StarwarsService } from './../../services/starwars.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Starship } from '../../interfaces/starship.interface';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent implements OnInit {

  public starships: Starship[] = [];

  constructor(private starwarsService: StarwarsService) {}

  ngOnInit(): void {
    this.getStarships();
  }

  async getStarships() {
    try {
      this.starships = await this.starwarsService.getStarships();
    } catch (error) {
      console.log(error);
    }
  }


}
