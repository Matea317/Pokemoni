import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";


@Component({
  selector: 'pokemon-details-dialog-component',
  templateUrl: './pokemonDetailsDialog.component.html'
})
export class PokemonDetailsDialogComponent implements OnInit{
  weight: string;
  height: string;
  types: Array<string> = [];
  abilities: Array<string> = [];
  half_dmg_from: Array<string> = [];
  half_dmg_to: Array<string> = [];
  double_dmg_from: Array<string> = [];
  double_dmg_to: Array<string> = [];
  no_dmg_from: Array<string> = [];
  no_dmg_to: Array<string> = [];

  constructor(
    private service: ApiService,
    private dialog: MatDialogRef<PokemonDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log('Ovo je dialog', this.data);
    this.service.getFilteredPokeName(this.data.name).subscribe(data => {
      console.log('ovo je data za stare podatke', data);
      this.height = data.height;
      this.weight = data.weight;
      for (let i = 0; i < data.types.length; i++) {
        this.types += data.types[i].type.name + ', ';
      }
      for (let i = 0; i < data.abilities.length; i++) {
        this.abilities += data.abilities[i].ability.name + ', ';
      }
      for (let i = 0; i < data.types.length; i++) {
        this.service.getFilteredPokeType(data.types[i].type.name).subscribe(typeData => {
          console.log('ovo je za tajp i nove', typeData);
          for (let j = 0; j < typeData.damage_relations.double_damage_from.length; j++) {
            this.double_dmg_from += typeData.damage_relations.double_damage_from[j].name + ', ';
          }
          for (let j = 0; j < typeData.damage_relations.double_damage_to.length; j++) {
            this.double_dmg_to += typeData.damage_relations.double_damage_to[j].name + ', ';
          }
          for (let j = 0; j < typeData.damage_relations.half_damage_from.length; j++) {
            this.half_dmg_from += typeData.damage_relations.half_damage_from[j].name + ', ';
          }
          for (let j = 0; j < typeData.damage_relations.half_damage_to.length; j++) {
            this.half_dmg_to += typeData.damage_relations.half_damage_to[j].name + ', ';
          }
          for (let j = 0; j < typeData.damage_relations.no_damage_from.length; j++) {
            this.no_dmg_from += typeData.damage_relations.no_damage_from[j].name + ', ';
          }
          for (let j = 0; j < typeData.damage_relations.no_damage_to.length; j++) {
            this.no_dmg_to += typeData.damage_relations.no_damage_to[j].name + ', ';
          }
        })
      }
    });
  }
  onClose(){
    this.dialog.close();
  }
}


