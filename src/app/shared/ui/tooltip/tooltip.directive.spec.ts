import { Component, DebugElement } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipComponent } from './tooltip.component';

@Component({
  template: `
    <button [tooltip]="'Test text'">Text</button>
    <button [tooltip]="templateImageTooltip">Custom</button>

    <ng-template #templateImageTooltip>
      <div>Custom text</div>
    </ng-template>
  `,
})
class TooltipTestComponent {}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TooltipTestComponent>;
  let directives: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TooltipDirective, TooltipTestComponent, TooltipComponent],
    }).createComponent(TooltipTestComponent);

    fixture.detectChanges();

    directives = fixture.debugElement.queryAll(By.directive(TooltipDirective));
  });

  it('should render text directive', () => {
    const dir = directives[0].nativeElement as HTMLElement;
    dir.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(document.body.querySelector('.tooltip')?.textContent).toEqual(
      'Test text'
    );

    dir.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(document.body.querySelector('.tooltip')).toBeNull();
  });

  it('should render template directive', () => {
    const dir = directives[1].nativeElement as HTMLElement;
    dir.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(document.body.querySelector('.tooltip div')?.textContent).toEqual(
      'Custom text'
    );

    dir.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(document.body.querySelector('.tooltip')).toBeNull();
  });

  it('should render text directive on top', () => {
    const dir = directives[0].nativeElement as HTMLElement;
    dir.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(document.body.querySelector('.tooltip')?.textContent).toEqual(
      'Test text'
    );

    dir.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(document.body.querySelector('.tooltip')).toBeNull();
  });
});
