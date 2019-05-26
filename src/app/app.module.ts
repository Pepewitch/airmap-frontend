import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageAnimatorComponent } from './components/image-animator/image-animator.component';
import { HomeComponent } from './views/home/home.component';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import { HeightSelectorComponent } from './components/height-selector/height-selector.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageAnimatorComponent,
    HomeComponent,
    HeightSelectorComponent,
    DateSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
