import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [style.width.px]="size()"
      [style.height.px]="size()"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" class="fill-ink" />
      <circle cx="16" cy="16" r="6" class="fill-gold" />
    </svg>
  `,
  host: { class: 'inline-flex shrink-0' },
})
export class Logo {
  size = input(24);
}
