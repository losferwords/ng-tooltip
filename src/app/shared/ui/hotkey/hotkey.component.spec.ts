import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeyComponent } from './hotkey.component';
import { By } from '@angular/platform-browser';
import { FunctionalKeys } from '../../enum/functional-keys.enum';

describe('HotkeyComponent', () => {
  let component: HotkeyComponent;
  let fixture: ComponentFixture<HotkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotkeyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text keys', () => {
    component.hotkeys = ['a', 't'];
    fixture.detectChanges();

    const keyElements = fixture.debugElement.queryAll(By.css('div'));
    expect(keyElements.length).toEqual(2);
    expect(
      (keyElements[0].nativeElement as HTMLDivElement).textContent
    ).toEqual('a');
    expect(
      (keyElements[1].nativeElement as HTMLDivElement).textContent
    ).toEqual('t');
  });

  it('should render keys with functional keys', () => {
    component.hotkeys = [FunctionalKeys.SHIFT, 'a'];
    fixture.detectChanges();

    let keyElements = fixture.debugElement.queryAll(By.css('div'));
    expect(keyElements.length).toEqual(2);
    expect(
      (keyElements[0].nativeElement as HTMLDivElement).textContent
    ).toEqual('⇧ Shift');
    expect(
      (keyElements[1].nativeElement as HTMLDivElement).textContent
    ).toEqual('a');

    component.hotkeys = [FunctionalKeys.CTRL, FunctionalKeys.ALT, 'a'];
    fixture.detectChanges();
    keyElements = fixture.debugElement.queryAll(By.css('div'));
    expect(keyElements.length).toEqual(3);
    expect(
      (keyElements[0].nativeElement as HTMLDivElement).textContent
    ).toEqual('Ctrl');
    expect(
      (keyElements[1].nativeElement as HTMLDivElement).textContent
    ).toEqual('Alt');
    expect(
      (keyElements[2].nativeElement as HTMLDivElement).textContent
    ).toEqual('a');
  });
});
