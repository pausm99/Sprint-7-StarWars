import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarwarsService } from '../../../../services/starwars/starwars.service';

type Pilot = {
  id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})
export class PilotsComponent implements OnChanges {

  @Input() pilotsURLs: string[] = [];

  public pilotsArray: Pilot[] = [];

  constructor(public starWarsService: StarwarsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pilotsURLs'] && changes['pilotsURLs'].currentValue) this.getPilots();
  }

  getPilots() {
    this.pilotsURLs.forEach(pilotURL => {
      //split by "/", delete the last "/"" which is an empty segment, get the last element with the pop() function
      const pilotID = pilotURL.split("/").filter(segment => segment !== "").pop();
      this.starWarsService.getPilot(pilotURL)
          .subscribe(
            {
              next: (res) => {
                console.log(res);
                const pilot: Pilot = {
                  id: pilotID!,
                  imageUrl: '',
                  name: res.name
                }
                this.getPilotPicture(pilotID!, pilot);
                this.pilotsArray.push(pilot);
              }
            }
          )
    })
  }

  async getPilotPicture(id: string, pilot: Pilot): Promise<void> {
    try {
      pilot.imageUrl = await this.starWarsService.getPilotPicture(id);
    } catch (error) {
      pilot.imageUrl = '../../../../assets/images/not-found-pilot.jpeg';
    }
  }

}
