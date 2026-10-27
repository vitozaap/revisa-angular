import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  imports: [ButtonModule, SidebarModule],
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  sidebarId = input.required<string>();
}
