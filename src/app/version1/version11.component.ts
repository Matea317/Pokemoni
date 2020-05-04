import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import {PokemonDetails} from "../model/pokemondetails.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";


class PokeTemp {
  name: string = '';
  type: string = '';
  experience: string = '';
  height: string = '';
  weight: string = '';
  signature: string = '';
}

@Component({
  selector: 'app-version1',
  templateUrl: './version11.component.html',
  styleUrls: ['./version1.component.css']
})

export class Version11Component implements OnInit {
  totalPokemon: number = 0;
  offset: number = 0;
  limit: number = 10;
  searchByName: string = '';
  searchByType: string = '';
  pokeDataArray: PokemonDetails [] = [];
  dataSource: MatTableDataSource<PokemonDetails>;
  displayedColumns: string[] = ['name', 'type', 'heightWeight', 'signature', 'experience'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: PageEvent;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {

    this.api.getPokemon(this.offset, this.limit).subscribe(data => {
      let resp = data.results;
      this.totalPokemon = data.count;
      console.log(resp);
      for (let i = 0; i < resp.length; i++) {
        this.api.getDetails(resp[i].url).subscribe(details => {

          this.pokeDataArray.push(this.addPokemon(details));
          this.dataSource = new MatTableDataSource<PokemonDetails>(this.pokeDataArray, this.paginator);

        });
      }
    });
  }

  onPageChange (event: any): void {
    if (!this.searchByType){
      this.pokeDataArray = [];
      console.log("PageEvent", event)
      this.offset = this.limit * event.pageIndex;
      this.limit = event.pageSize;
      this.api.getPokemon(this.offset, this.limit).subscribe(pageChangeResponse => {
        let resp = pageChangeResponse.results;
        console.log(resp);
        for (let i = 0; i < resp.length; i++) {
          this.api.getDetails(resp[i].url).subscribe(pageChangeDetails => {
            this.pokeDataArray.push(this.addPokemon(pageChangeDetails));
            this.dataSource = new MatTableDataSource<PokemonDetails>(this.pokeDataArray, this.paginator);
          });
        }
      })
    }
    else {
      this.pokeDataArray = [];
      this.api.getFilteredPokeType(this.searchByType).subscribe(pageChangeResponse => {
        let resp = pageChangeResponse.results;
        console.log(resp);
        for (let i = 0; i < resp.length; i++) {
          this.api.getDetails(resp[i].url).subscribe(pageChangeDetails => {
            this.pokeDataArray.push(this.addPokemon(pageChangeDetails));
            this.dataSource = new MatTableDataSource<PokemonDetails>(this.pokeDataArray);
          });
        }
      })
    }
  }

  /*onFilter(): void
  {

    if ((this.name.length > 0) && ((this.type == '') || (this.type == null)))
    {
      this.api.getFilteredPokeName(this.name.toLowerCase).subscribe(response =>
      {
        let details = new PokeTemp();

        details.experience = response.base_experience;
        details.height = response.height;
        details.weight = response.weight;
        for (let j = 0; j < response.types.length; j++) {
          details.type += response.types[j].type.name + ', ';
        }

        details.type = details.type.slice(0, -2);

        for (let k = 0; k < response.abilities.length; k++) {
          details.signature +=  response.abilities[k].ability.name + ', ';
        }

        details.signature = details.signature.slice(0, -2);

        this.pokeDataArray = [];
        this.pokeDataArray.push(details);
        this.dataSource = new MatTableDataSource<PokemonDetails>(this.pokeDataArray);
      })
      )
    }

    if((this.type.length > 0) && ((this.name == '') || (this.name == null)))
    {
      this.api.getFilteredPokeType(this.type.toLoweCase).subscribe (typeResponse =>

      )
    }
  } */

  public searchPokemonSubmit(): void
  {
    if (this.searchByName.length > 0 && this.searchByType.length == 0) {
      this.pokeDataArray = [];
      this.searchPokemonByName(this.searchByName);
      this.totalPokemon = 1;
    } else if (this.searchByName.length == 0 && this.searchByType.length > 0) {
      this.api.getFilteredPokeType(this.searchByType.toLowerCase()).subscribe(data => {
        console.log('type search data', data);
        this.pokeDataArray = [];
        this.totalPokemon = data.pokemon.length;
        for (let i = 0; i < data.pokemon.length; i++) {
          this.api.getDetails(data.pokemon[i].pokemon.url).subscribe(details => {
            this.pokeDataArray.push(this.addPokemon(details));
          });
        }
        this.dataSource = new MatTableDataSource<PokemonDetails>(this.pokeDataArray);

      });
    } else {
      console.log('Invalid request!')
    }
  }



  private searchPokemonByName(name:string){
    this.api.getFilteredPokeName(name.toLowerCase()).subscribe(pokemon => {

      this.pokeDataArray.push(this.addPokemon(pokemon));
      this.dataSource = new MatTableDataSource<PokemonDetails>(this.pokeDataArray);
    })
  }

  private getAbilities(vars): any
  {
    let ability:string = '';
    for (let i = 0; i < vars.length; i++) {
      ability +=  vars[i].ability.name + ', ';
    }
    return ability.slice(0, -2);
  }

  private getTypes(types): any
  {
    let type:string ='';
    for (let i = 0; i < types.length; i++) {
      type += types[i].type.name + ', ';
    }
    return type.slice(0, -2);
  }

  private addPokemon(details):any
  {
    let pokemonDetails = new PokemonDetails();
    pokemonDetails.name = details.name;
    pokemonDetails.weight = details.weight;
    pokemonDetails.height = details.height;
    pokemonDetails.experience = details.base_experience;
    pokemonDetails.signature = this.getAbilities(details.abilities);
    pokemonDetails.type = this.getTypes(details.types);
    return pokemonDetails
  }

}










