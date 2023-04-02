import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { InfomationGuildComponent } from './infomation-guild/infomation-guild.component';
import { HomeComponent } from './home/home.component';
import { ErrorUrlComponent } from './error-url/error-url.component';


@NgModule({
    declarations: [HeaderComponent, FooterComponent, BannerComponent, InfomationGuildComponent, HomeComponent, ErrorUrlComponent],
  exports: [
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    InfomationGuildComponent,
  ],
    imports: [
        CommonModule,
        SharedRoutingModule
    ]
})
export class SharedModule { }
