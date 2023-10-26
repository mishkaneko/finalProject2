import { MatchModule } from './match/match.module';
import { MatchesRoutingModule } from './matches.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';
import { ButtonModule, TableModule, UtilitiesModule } from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MatchesComponent],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    MatchModule,
    TableModule,
    UtilitiesModule,
    FontAwesomeModule,
    ButtonModule,
  ],
  exports: [MatchesComponent],
})
export class MatchesModule {}
