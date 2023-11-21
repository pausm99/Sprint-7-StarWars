import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarshipsComponent } from '../../components/starships/starships.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, StarshipsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
