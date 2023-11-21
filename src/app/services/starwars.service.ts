import { Starship } from './../interfaces/starship.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {

  private apiUrl = 'https://swapi.py4e.com/api/';
  private imageApiUrl = 'https://starwars-visualguide.com/assets/img/starships/';

  constructor() { }

  public async getStarships(): Promise<Starship[]> {
    try {
      const response = await fetch(this.apiUrl + 'starships');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      const data = responseData.results;

      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  public async getStarship(id: string): Promise<Starship> {
    try {
      const response = await fetch(this.apiUrl + 'starships/' + id)

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      const data = responseData;

      return data;

    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  public async getStarshipPicture(id: string): Promise<string> {
    try {
      const response = await fetch(this.imageApiUrl + id + '.jpg');
      const responseData = await response.blob();
      const imageUrl = URL.createObjectURL(responseData);
      // imageUrl ahora contiene la URL de la imagen que puedes asignar a una propiedad en tu componente
      console.log('Imagen cargada correctamente:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }


}
