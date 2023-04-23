import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from './tooltip.component';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { TooltipPosition } from './tooltip-position.enum';

@Component({
  template: `
    <ng-template #testTooltip><div>Custom Template</div></ng-template>
    <app-tooltip #tooltip [tooltipTemplate]="testTooltip" />
  `,
})
class WrapperComponent {
  @ViewChild('tooltip', { static: true })
  tooltipComponentRef!: TooltipComponent;
}

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapperComponent, TooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tooltip with text', () => {
    component.tooltipText = 'Test';
    component.left = 100;
    component.top = 200;

    fixture.detectChanges();

    const tooltipElement = fixture.debugElement.query(By.css('.tooltip'));
    const tooltipNativeElement = tooltipElement.nativeElement as HTMLDivElement;
    expect(tooltipNativeElement.textContent).toEqual(component.tooltipText);
    expect(tooltipElement.styles['left']).toEqual(`${component.left}px`);
    expect(tooltipElement.styles['top']).toEqual(`${component.top}px`);
  });

  it('should render tooltip with position top', () => {
    component.position = TooltipPosition.TOP;
    fixture.detectChanges();

    const tooltipElement = fixture.debugElement.query(
      By.css('.tooltip.position-top')
    );
    expect(tooltipElement).toBeDefined();
  });

  it('should render tooltip with template', () => {
    const wrapperfixture = TestBed.createComponent(WrapperComponent);
    wrapperfixture.detectChanges();

    const tooltipElementContent = wrapperfixture.debugElement.query(
      By.css('.tooltip div')
    ).nativeElement as HTMLDivElement;
    expect(tooltipElementContent.textContent).toEqual('Custom Template');
  });
});
