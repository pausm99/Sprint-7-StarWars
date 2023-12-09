import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarwarsService } from '../../../../services/starwars/starwars.service';

type Film = {
  id: string;
  title: string;
  episode: string;
  imageUrl: string;
}

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent implements OnChanges {

  @Input() filmsURLs: string[] = [];

  public filmsArray: Film[] = [];

  constructor(public starWarsService: StarwarsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmsURLs'] && changes['filmsURLs'].currentValue) this.getFilms();
  }

  getFilms() {
    this.filmsURLs.forEach(filmURL => {
      const filmID = filmURL.split("/").filter(segment => segment !== "").pop();
      this.starWarsService.getFilm(filmURL)
          .subscribe(
            {
              next: (res) => {
                console.log(res);
                const film: Film = {
                  id: filmID!,
                  imageUrl: '',
                  title: res.title,
                  episode: 'Episode ' + res.episode_id
                }
                this.getFilmPicture(filmID!, film);
                this.filmsArray.push(film);
              }
            }
          )
    })
  }

  async getFilmPicture(id: string, film: Film): Promise<void> {
    try {
      film.imageUrl = await this.starWarsService.getFilmPicture(id);
    } catch (error) {
      film.imageUrl = '../../../../assets/images/not-found-starship.jpeg';
    }
  }


}
