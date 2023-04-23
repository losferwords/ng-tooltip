# NgTooltip

This is the Test Project with Angular Tooltip Directive Example

## Demo

[Try it](https://losferwords.github.io/ng-tooltip/ng-tooltip)

## How to use

**[tooltip]** directive allows user to render tooltip with text or custom content.

**Text:**
```
<div [tooltip]="'Text content'">Element with simple text tooltip</div>
```

**Custom content with ng template as an input**
```
<div [tooltip]="templateImageTooltip">Custom</div>

<ng-template #templateImageTooltip>
  <img src="image.jpg" />
  <any-component />
</ng-template>
```

**You can also set position for tooltip from TooltipPosition enum:**
* TooltipPosition.BOTTOM (by default)
* TooltipPosition.TOP
```
<div [tooltip]="'Text content'" [tooltipPosition]="TooltipPosition.TOP">Tooltip on top</div>
```

**All active tooltips can be opened by hotkeys defined in showAllTooltips array:**
```
//shared/const/hotkeys.ts
export const showAllTooltips = [
  FunctionalKeys.SHIFT,
  FunctionalKeys.CMD,
  'a',
];
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
