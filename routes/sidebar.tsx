/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute{
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean
}

export function routeIsActive (pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

const routes: IRoute[] = [
  {
    path: '/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
    exact: true,
  },
  {
    path: '/dashboard/forms',
    icon: 'FormsIcon',
    name: 'Forms',
  },
  {
    path: '/dashboard/cards',
    icon: 'CardsIcon',
    name: 'Cards',
  },
  {
    path: '/dashboard/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
  },
  {
    path: '/dashboard/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
  },
  {
    path: '/dashboard/modals',
    icon: 'ModalsIcon',
    name: 'Modals',
  },
  {
    path: '/dashboard/tables',
    icon: 'TablesIcon',
    name: 'Tables',
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/dashboard/login',
        name: 'Login',
      },
      {
        path: '/dashboard/create-account',
        name: 'Create account',
      },
      {
        path: '/dashboard/forgot-password',
        name: 'Forgot password',
      },
      {
        path: '/dashboard/404',
        name: '404',
      },
      {
        path: '/dashboard/blank',
        name: 'Blank',
      },
    ],
  },
]

export type {IRoute}
export default routes
