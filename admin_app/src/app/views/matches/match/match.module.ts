import { CancelToastModule } from './../../../../components/cancel-toast/cancel-toast.module';
import { SaveToastModule } from './../../../../components/save-toast/save-toast.module';
import { MatchesRoutingModule } from './../matches.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match.component';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  UtilitiesModule,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MatchComponent],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    CardModule,
    FormModule,
    FormsModule,
    GridModule,
    ButtonModule,
    FontAwesomeModule,
    SaveToastModule,
    CancelToastModule,
    UtilitiesModule,
  ],
  exports: [MatchComponent],
})
export class MatchModule {}
