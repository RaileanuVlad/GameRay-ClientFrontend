import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginModalComponent } from './header/login-modal/login-modal.component';
import { CartModalComponent } from './header/cart-modal/cart-modal.component';
import { RegisterModalComponent } from './header/register-modal/register-modal.component';
import { HomeDetailModalComponent } from './home/home-detail-modal/home-detail-modal.component';
import { PcComponent } from './pc/pc.component';
import { PcDetailModalComponent } from './pc/pc-detail-modal/pc-detail-modal.component';
import { NintendoComponent } from './nintendo/nintendo.component';
import { NintendoDetailModalComponent } from './nintendo/nintendo-detail-modal/nintendo-detail-modal.component';
import { PsComponent } from './ps/ps.component';
import { PsDetailModalComponent } from './ps/ps-detail-modal/ps-detail-modal.component';
import { XboxComponent } from './xbox/xbox.component';
import { XboxDetailModalComponent } from './xbox/xbox-detail-modal/xbox-detail-modal.component';
import { HomeComponent } from './home/home.component';
import { SearchPipe } from './shared/search.pipe';
import { DeveloperPipe } from './shared/developer.pipe';
import { PricePipe } from './shared/price.pipe';
import { CategoryPipe } from './shared/category.pipe';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { ErrorInterceptor } from './shared/error.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { CodesPipe } from './shared/codes.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    CartModalComponent,
    RegisterModalComponent,
    HomeComponent,
    HomeDetailModalComponent,
    PcComponent,
    PcDetailModalComponent,
    NintendoComponent,
    NintendoDetailModalComponent,
    PsComponent,
    PsDetailModalComponent,
    XboxComponent,
    XboxDetailModalComponent,
    SearchPipe,
    DeveloperPipe,
    PricePipe,
    CategoryPipe,
    CodesPipe,
    ProfileComponent
  ],
  imports: [
    AppRoutingModule,

    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [SearchPipe, DeveloperPipe, PricePipe, CategoryPipe, CodesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
