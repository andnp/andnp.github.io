import { RouteDefinition } from '../components/Router';
import { SidebarDefinition } from '../components/sidebar/Sidebar';


import AboutRoute from '../components/routes/about/AboutRoute';
import HomeRoute from '../components/routes/home/HomeRoute';
import PapersRoute from '../components/routes/papers/PapersRoute';
import ProjectsRoute from '../components/routes/ProjectsRoute';

interface AppDefinition extends RouteDefinition, SidebarDefinition {}

export const appDefinition: AppDefinition[] = [
  { key: 'Home', route: HomeRoute },
  { key: 'Papers', route: PapersRoute },
  {
    key: 'Projects',
    route: ProjectsRoute,
    children: [
      { key: 'validtyped' },
      { key: 'simplytyped' },
      { key: 'maybetyped' },
    ]
  },
  { key: 'About', route: AboutRoute },
];
