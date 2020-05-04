import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Version1Component } from './version1/version1.component';
import { Version2Component } from './version2/version2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from "@angular/material/paginator";
import {PokemonDetailsDialogComponent} from "./version2/dialog/pokemonDetailsDialog.component";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AppComponent,
    Version1Component,
    Version2Component,
    HomeComponent,
    PokemonDetailsDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
  ApiService],
  bootstrap: [AppComponent],
  entryComponents: [PokemonDetailsDialogComponent]
})
export class AppModule { }
