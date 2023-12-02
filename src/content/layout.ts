import { RouteDefinition } from '../components/Router';
import { SidebarDefinition } from '../components/sidebar/Sidebar';
import { once, prop } from '../utils/fp';


const HomeRoute = once(() => import('../components/routes/home/HomeRoute').then(prop('default')));
const AboutRoute = once(() => import('../components/routes/about/AboutRoute').then(prop('default')));
const PapersRoute = once(() => import('../components/routes/papers/PapersRoute').then(prop('default')));
const ProjectsRoute = once(() => import('../components/routes/ProjectsRoute').then(prop('default')));
const BlogsRoute = once(() => import('../components/routes/BlogsRoute').then(prop('default')));
const WorkoutRoute = once(() => import('../components/routes/WorkoutRoute').then(prop('default')));

interface AppDefinition extends RouteDefinition, SidebarDefinition {}

export const appDefinition: AppDefinition[] = [
  { key: 'Home', route: HomeRoute },
  { key: 'Papers', route: PapersRoute },
  { key: 'Blogs', route: BlogsRoute },
  {
    key: 'Projects',
    route: ProjectsRoute,
    children: [
      { key: 'Regularized-GradientTD', args: { owner: 'rlai-lab' }},
      { key: 'validtyped' },
      { key: 'simplytyped' },
      { key: 'maybetyped' },
    ]
  },
  { key: 'About', route: AboutRoute },
  { key: 'Workouts', route: WorkoutRoute as any, private: true }
];
