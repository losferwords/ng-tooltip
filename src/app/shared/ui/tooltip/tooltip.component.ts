import { Component, Input, TemplateRef } from '@angular/core';
import { TooltipPosition } from './tooltip-position.enum';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  tooltipText: string = '';
  @Input() tooltipTemplate: TemplateRef<unknown> | null = null;
  left: number = 0;
  top: number = 0;
  position: TooltipPosition = TooltipPosition.BOTTOM;
}
