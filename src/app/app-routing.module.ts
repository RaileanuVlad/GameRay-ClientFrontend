import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PcComponent } from './pc/pc.component';
import { XboxComponent } from './xbox/xbox.component';
import { NintendoComponent } from './nintendo/nintendo.component';
import { PsComponent } from './ps/ps.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'pc', component: PcComponent },
  { path: 'nintendo', component: NintendoComponent },
  { path: 'playstation', component: PsComponent },
  { path: 'xbox', component: XboxComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
