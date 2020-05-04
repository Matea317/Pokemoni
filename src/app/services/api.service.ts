import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiService {
  private localUrl = 'https://pokeapi.co/api/v2/pokemon';
  private typeUrl = 'https://pokeapi.co/api/v2/type';

  constructor(private http: HttpClient) { }


  getPokemon(offset: number, limit: number) {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/?offset=' + offset.toString() + '&limit=' + limit.toString());
  }

  getDetails (url:string){
    return this.http.get(url);
  }
  getFilteredPokeName (name:string)  {
    return this.http.get(this.localUrl + '/' + name);
  }
  getFilteredPokeType (type:string) {
    return this.http.get(this.typeUrl + '/' + type);
  }

}
