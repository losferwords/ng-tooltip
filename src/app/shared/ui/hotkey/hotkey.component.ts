import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hotkey',
  templateUrl: './hotkey.component.html',
  styleUrls: ['./hotkey.component.scss']
})
export class HotkeyComponent {
  @Input() hotkeys: string[] = [];
}
