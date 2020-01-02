import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopTwentyComponent } from './components/top-twenty/top-twenty.component';
import { LastDecadeComponent } from './components/last-decade/last-decade.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: '', redirectTo: 'top-twenty', pathMatch: 'full' },
  { path: 'top-twenty', component: TopTwentyComponent },
  { path: 'last-decade', component: LastDecadeComponent },
  { path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
