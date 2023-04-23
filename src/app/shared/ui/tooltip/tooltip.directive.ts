import {
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { Hotkeys } from '../../const/hotkeys';
import { FunctionalKeys } from '../../enum/functional-keys.enum';
import { TooltipPosition } from './tooltip-position.enum';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input() tooltip: string | TemplateRef<unknown> = '';
  @Input() tooltipPosition: TooltipPosition = TooltipPosition.BOTTOM;

  private componentRef: ComponentRef<TooltipComponent> | null = null;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.show();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const hotkeysForTooltip = new Set(Hotkeys.showAllTooltips);
    const pressedKeys = new Set<string>();

    pressedKeys.add(event.key.toLowerCase());
    if (hotkeysForTooltip.has(FunctionalKeys.SHIFT) && event.shiftKey) {
      pressedKeys.add(FunctionalKeys.SHIFT);
    }
    if (hotkeysForTooltip.has(FunctionalKeys.ALT) && event.altKey) {
      pressedKeys.add(FunctionalKeys.ALT);
    }
    if (hotkeysForTooltip.has(FunctionalKeys.CTRL) && event.ctrlKey) {
      pressedKeys.add(FunctionalKeys.CTRL);
    }
    if (hotkeysForTooltip.has(FunctionalKeys.CMD) && event.metaKey) {
      pressedKeys.add(FunctionalKeys.CMD);
    }

    if (
      pressedKeys.size === hotkeysForTooltip.size &&
      [...pressedKeys].every((key) => hotkeysForTooltip.has(key))
    ) {
      this.show();
    } else {
      this.hide();
    }
  }

  @HostListener('document:keyup')
  onKeyup() {
    this.hide();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hide();
  }

  ngOnDestroy(): void {
    this.hide();
  }

  show(): void {
    if (this.componentRef === null) {
      this.componentRef =
        this.viewContainerRef.createComponent(TooltipComponent);
      const hostView = this.componentRef
        .hostView as EmbeddedViewRef<TooltipComponent>;
      const componentElement = hostView.rootNodes[0] as HTMLElement;
      document.body.appendChild(componentElement);

      if (typeof this.tooltip === 'string') {
        this.componentRef.instance.tooltipText = this.tooltip;
      } else {
        this.componentRef.instance.tooltipTemplate = this.tooltip;
      }

      this.componentRef.instance.position = this.tooltipPosition;

      const { top, bottom, left, right } =
        this.elementRef.nativeElement.getBoundingClientRect();

      switch (this.tooltipPosition) {
        case TooltipPosition.TOP:
          this.componentRef.instance.left = (right - left) / 2 + left;
          this.componentRef.instance.top = top;
          break;
        case TooltipPosition.BOTTOM:
        default:
          this.componentRef.instance.left = (right - left) / 2 + left;
          this.componentRef.instance.top = bottom;
      }
    }
  }

  hide(): void {
    if (this.componentRef !== null) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
