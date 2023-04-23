import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './ui/tooltip/tooltip.directive';
import { TooltipComponent } from './ui/tooltip/tooltip.component';
import { HotkeyComponent } from './ui/hotkey/hotkey.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TooltipDirective, TooltipComponent, HotkeyComponent],
  exports: [TooltipDirective, HotkeyComponent],
})
export class SharedModule {}
