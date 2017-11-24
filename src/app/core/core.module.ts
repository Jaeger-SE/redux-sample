import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from './modal/modal.module';
import { LoggerService } from './services/logger.service';

@NgModule({
  imports: [CommonModule, ModalModule],
  providers: [LoggerService]
})
export class CoreModule {}
