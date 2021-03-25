import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },

  {
    title: 'Pooja',
    icon: 'layout-outline',
    children: [
      {
        title: 'Add Pooja',
        link: '/pooja/add-pooja',
      },
      {
        title: 'Pooja List',
        link: '/pooja/list',
      },
    ],
  },

  {
    title: 'Article',
    icon: 'layout-outline',
    children: [
      {
        title: 'Add Article',
        link: '/article/add-article',
      },
      {
        title: 'Article List',
        link: '/article/list',
      },
    ],
  },
  {
    title: 'About',
    icon: 'layout-outline',
    link: '/about',
  },
];


