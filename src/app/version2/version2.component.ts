import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from "../services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PokemonDetailsDialogComponent} from "./dialog/pokemonDetailsDialog.component";
import {PokemonDetails} from "../model/pokemondetails.model";

@Component ({
  selector: 'app-version2',
  templateUrl: './version2.component.html',
  styleUrls: ['./version2.component.css']
})

export class Version2Component implements OnInit {
  maxAmountOfPokemon: number = 0; // Variable filled when we call getPokemon first time -> count
  pokeDataArray = [];
  dataSource: MatTableDataSource<string>;
  displayedColumns: string[] = ['name', 'details'];
  currentPage: number = 0;
  currentPageSize: number = 10;
  name: string[];

  filterValue = 'PokeName';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  event: Event;


  constructor(private api: ApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getPokemon(0, 10).subscribe(resp => {
      this.maxAmountOfPokemon = resp.count;
      this.api.getPokemon(0, this.maxAmountOfPokemon).subscribe(resp => {
        for (let i = 0; i < resp.results.length; i++) {
          this.pokeDataArray.push(resp.results[i].name);
        }
        console.log('Pokemon data array', this.pokeDataArray);
        this.dataSource = new MatTableDataSource<string>(this.pokeDataArray);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  applyFilter() {
    console.log('Filter name: ', this.filterValue);
    if (filterValue === '' || filterValue === null) {
          this.getPokemon();
        } else {
          this.ELEMENT_DATA = [];
          this.dataSource = new MatTableDataSource<PokeNames>(this.ELEMENT_DATA);
          this.service.getFilteredPokeName().subscribe(res => {
            for (let i = 0; i < res.results.length; i++) {
              this.ELEMENT_DATA.push(new PokeNames(res.results[i].name));
              this.dataSource = new MatTableDataSource<PokeNames>(this.ELEMENT_DATA);
            }
            this.dataSource.filter = filterValue.trim().toLowerCase();
          });
        }
  }

  openDetailsDialog(pokemonName: string): void {
    this.dialog.open(PokemonDetailsDialogComponent, {
      autoFocus: true,
      height: '200 px',
      width: '100 px',
      data: {'name': pokemonName},
      disableClose: true,
    });
  }

  onPageChange (event: any): void{
    this.currentPage = event.pageIndex;
    this.currentPageSize = event.pageSize;
  }

}
