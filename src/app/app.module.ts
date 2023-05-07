import { MatchDetailDrawerComponent } from './routes/components/admin/list-match/match-detail-drawer/match-detail-drawer.component';
import { ListMatchComponent } from './routes/components/admin/list-match/list-match.component';
import { AdminComponent } from './routes/components/admin/admin.component';
import { FixtureResultComponent } from './routes/components/fixture-result/fixture-result.component';
import { HomeDrawerComponent } from './routes/components/home/partials/home-drawer/home-drawer.component';
import { DrawerFormBaseComponent } from './routes/components/form/drawer-form-base/drawer-form-base.component';
import { NavBarComponent } from './routes/components/nav-bar/nav-bar.component';
import { HomeComponent } from './routes/components/home/home.component';
import { LoginComponent } from './login/login.component';
import { ShirtDemoComponent } from './shirt-demo/shirt-demo.component';
import { AddShirtComponent } from './add-shirt/add-shirt.component';
import { ListShirtsComponent } from './list-shirts/list-shirts.component';
import { FooterComponent } from './footer/footer.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './routes/components/dashboard/dashboard.component';
import { ClubInformationComponent } from './routes/components/club-information/club-information.component';
import { PlayerListComponent } from './routes/components/admin/player-list/player-list.component';
import { PlayerDrawerComponent } from './routes/components/admin/player-list/partials/player-drawer/player-drawer.component';
import { ShirtRegisterComponent } from './routes/components/shirt-register/shirt-register.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ListShirtsComponent,
    AddShirtComponent,
    FooterComponent,
    ShirtDemoComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    FixtureResultComponent,
    NavBarComponent,
    DrawerFormBaseComponent,
    HomeDrawerComponent,
    // Admin
    AdminComponent,
    ListMatchComponent,
    MatchDetailDrawerComponent,
    ClubInformationComponent,
    // PaginationComponent,
    PlayerListComponent,
    PlayerDrawerComponent,
    ShirtRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
  ],
  providers: [
    // { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_I18N, useValue: 'vi-VN' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
