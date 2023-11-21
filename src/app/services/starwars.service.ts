import { Injectable } from '@angular/core';
import { Starship } from '../interfaces/starship.interface';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {

  private apiUrl = 'https://swapi.py4e.com/api/';

  constructor() { }

  public async getStarships(): Promise<Starship[]> {
    try {
      const response = await fetch(this.apiUrl + 'starships');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      const data = responseData.results;
      console.log(data);

      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }


}
