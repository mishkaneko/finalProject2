import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Users',
  },
  {
    name: 'Drivers',
    url: '/drivers',
    iconComponent: { name: 'cil-bike' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Passengers',
    url: '/passengers',
    iconComponent: { name: 'cil-walk' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Rides',
  },
  {
    name: 'Matches',
    url: '/matches',
    iconComponent: { name: 'cil-search' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Content & Communication',
  },
  {
    name: 'Content',
    url: '/content',
    iconComponent: { name: 'cil-pen' },
  },
  {
    name: 'Notifications & Alerts',
    url: '/noti',
    iconComponent: { name: 'cil-bell' },
  },
  {
    name: 'Feedbacks',
    url: '/feedback',
    iconComponent: { name: 'cil-voice-over-record' },
  },
  {
    name: 'Support & Help Desk',
    url: '/support',
    iconComponent: { name: 'cil-chat-bubble' },
  },
  {
    name: 'Blacklist',
    url: '/support',
    iconComponent: { name: 'cil-ban' },
  },
  {
    title: true,
    name: 'Others',
  },
  {
    name: 'Finance',
    url: '/financial',
    iconComponent: { name: 'cil-dollar' },
  },
  {
    name: 'Reports & Analytics',
    url: '/reports',
    iconComponent: { name: 'cil-bar-chart' },
  },
  {
    name: 'Security',
    url: '/security',
    iconComponent: { name: 'cil-lock-locked' },
  },
  {
    name: 'System Settings',
    url: '/system',
    iconComponent: { name: 'cil-cog' },
  },
];
