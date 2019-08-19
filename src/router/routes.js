const loadView = viewPath => () => import(`@views/${viewPath}`)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView('Home'),
  },
]

export default routes
