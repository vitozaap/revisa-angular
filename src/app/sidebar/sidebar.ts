import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PIcon } from '@primeicons/angular/p-icon';
import type { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { type Menu, MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { Header } from '../header/header';
import { Logo } from '../logo/logo';

interface SidebarRoutes {
  label: string;
  path: string;
  icon: string;
}

@Component({
  imports: [
    AvatarModule,
    Header,
    Logo,
    MenuModule,
    PIcon,
    RouterLink,
    RouterLinkActive,
    SidebarModule,
  ],
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
})
export class AppSidebar {
  private router = inject(Router);

  sidebarId = 'app-sidebar';

  userName = 'Victor Santos';
  // dev, e-mail de exemplo enquanto não há sessão do usuário
  userEmail = 'victor.santos@email.com';

  // O e-mail vira o cabeçalho do grupo, no estilo padrão do p-menu
  userMenuItems: MenuItem[] = [
    {
      label: this.userEmail,
      items: [
        { separator: true },
        {
          label: 'Sair',
          icon: 'sign-out',
          // Mesmo padrão do item "Delete" nos exemplos de menu das docs do PrimeNG
          linkClass:
            'text-red-500! dark:text-red-400! [&_.p-menu-item-icon]:text-red-500! dark:[&_.p-menu-item-icon]:text-red-400!',
          //dev, por enquanto só volta para o login; depois vai encerrar a sessão no back
          command: () => this.router.navigate(['/login']),
        },
      ],
    },
  ];
  routes: SidebarRoutes[] = [
    {
      label: 'Home',
      path: '/home',
      icon: 'home',
    },
    {
      label: 'Minhas análises',
      path: '/history',
      icon: 'book',
    },
    {
      label: 'Meu currículo',
      path: '/resume',
      icon: 'file',
    },
  ];

  // O p-menu sempre alinha pela esquerda do botão; aqui ele é movido para terminar na ponta direita do botão.
  // Com a sidebar colapsada o botão é menor que o menu, então fica a posição padrão.
  alignToButtonEnd(menu: Menu) {
    const button = menu.target?.getBoundingClientRect();
    const container = menu.container;
    if (!button || !container || button.width < container.offsetWidth) return;
    container.style.left = `${button.right - container.offsetWidth + window.scrollX}px`;
  }

  get initials() {
    // Pedi para IA para me ajudar com essa, serve apenas para pegar as inicias do nome para gerar o avatar
    return this.userName
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
