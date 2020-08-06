import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { SubDomainGuard } from './subDomain.guard';
import { HttpClientModule } from '@angular/common/http';
import { SubDomainService } from './subDomain.service';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { InvalidDomainComponent } from './invalid-domain/invalid-domain.component';
import { ClientsService } from './telemedicine-client/telemedicine-clients.service';
import { TelemedicineClientComponent } from './telemedicine-client/telemedicine-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';
import { PlatformModule } from './platform/platform.module';



/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    InvalidDomainComponent,
    TelemedicineClientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    MatAutocompleteModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    PlatformModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [
    SubDomainGuard,
    SubDomainService,
    ClientsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
