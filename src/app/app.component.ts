import { Component } from '@angular/core';
import { Hotkeys } from './shared/const/hotkeys';
import { TooltipPosition } from './shared/ui/tooltip/tooltip-position.enum';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  destroyed = new Subject<void>();
  showAllTooltipsHotkey = [...Hotkeys.showAllTooltips];
  TooltipPosition = TooltipPosition;
  isSmallScreen: boolean = false;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.isSmallScreen = true;
            return;
          }
        }
        this.isSmallScreen = false;
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
