import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarwarsService } from '../../../services/starwars.service';
import { Starship } from '../../../interfaces/starship.interface';

@Component({
  selector: 'app-starship-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starship-file.component.html',
  styleUrl: './starship-file.component.scss'
})
export class StarshipFileComponent implements OnInit {

  public starshipID: string = '';

  public starship: Starship = {
    id: '',
    name: '',
    model: '',
    manufacturer: '',
    cost_in_credits: '',
    length: '',
    max_atmosphering_speed: '',
    crew: '',
    passengers: '',
    cargo_capacity: '',
    consumables: '',
    hyperdrive_rating: '',
    MGLT: '',
    starship_class: '',
    pilots: [],
    films: [],
    created: '',
    edited: '',
    url: '',
    imageURL: ''
  };

  constructor(private route: ActivatedRoute, private starwarsService: StarwarsService) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.starshipID = params.get('id')!;
      });

      this.getStarship(this.starshipID);
      this.getStarshipPicture(this.starshipID);

  }

  async getStarship(id: string) {
    try {
      this.starship = await this.starwarsService.getStarship(id);
      console.log(this.starship);
    } catch (error) {
      console.log(error);
    }
  }

  async getStarshipPicture(id: string) {
    try {
      this.starship.imageURL = await this.starwarsService.getStarshipPicture(id);
      console.log(this.starship);
    } catch (error) {
      console.log(error);
    }
  }

}
