import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';
import { NouisliderModule } from 'ng2-nouislider';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TemplateComponent } from './template/template.component';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { AmazingTimePickerModule } from 'amazing-time-picker'; // this line you need
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { NgModule, Component, OnInit, Inject, Renderer, ElementRef, ViewChild} from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxPaginationModule } from 'ngx-pagination';
/* Our Components
---------------------------------------------------*/

import { PagesRoutingModule } from './page.routing'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RtcMediaCaptureModule } from '../@core/rtc-media-capture/rtc-media-capture.module'

@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    Ng2SmartTableModule ,
    PagesRoutingModule,
    NouisliderModule,
    PagesRoutingModule,
    RtcMediaCaptureModule,
    AngularFontAwesomeModule,
    JWBootstrapSwitchModule,
    AmazingTimePickerModule,
    NgxPaginationModule 
  ],
  declarations: [
    LoginComponent,
    HomeComponent,
  ],
})
export class PageModule { 

}