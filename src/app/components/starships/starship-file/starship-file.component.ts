import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarwarsService } from '../../../services/starwars/starwars.service';
import { Starship } from '../../../interfaces/starship.interface';
import { PilotsComponent } from './pilots/pilots.component';
import { FilmsComponent } from './films/films.component';

@Component({
  selector: 'app-starship-file',
  standalone: true,
  imports: [CommonModule, PilotsComponent, FilmsComponent],
  templateUrl: './starship-file.component.html',
  styleUrl: './starship-file.component.scss'
})
export class StarshipFileComponent implements OnInit {

  public pilotsLoaded: boolean = false;
  public filmsLoaded: boolean = false;

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

  public pilots: string[] = [];
  public films: string[] = [];

  constructor(private route: ActivatedRoute, private starwarsService: StarwarsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.starshipID = params.get('id')!;
    });

    this.getStarship(this.starshipID);
  }

  public getStarship(id: string) {
    this.starwarsService.getStarship(id)
        .subscribe({
          next: async (data) => {
            this.starship = data;
            this.pilots = this.starship.pilots;
            this.films = this.starship.films;
            await this.getStarshipPicture(id);
            this.filmsLoaded = true;
            this.pilotsLoaded = true;
          },
          error: (error) => console.log(error)
        })
  }

  async getStarshipPicture(id: string) {
      try {
        this.starship.imageURL = await this.starwarsService.getStarshipPicture(id);
      } catch (error) {
        this.starship.imageURL = '../../../assets/images/not-found-starship.jpeg';
      }
  }
}
