import React from 'react';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

// const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));

// Defin page routes here and in the const path for them to appear inside default
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const UserProfile = React.lazy(() => import('./views/Pages/UserProfile/UserProfile'));
const Login = React.lazy(()=> import('./views/Pages/Login/Login'));
const CalenderOverview = React.lazy(()=> import('./views/Pages/Calender/CalenderOverview/CalenderOverview'));



const routes = [
    { path: '/', name: 'Home', component: DefaultLayout, exact: true },
    { path: '/login', exact: true,  name: 'Login Page', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/userprofile', name: 'UserProfile', component: UserProfile,  exact: true},
    { path: '/calenderOverview', name: 'CalendarOverview', component: CalenderOverview,  exact: true},

    // { path: '/theme', name: 'Theme', component: Colors, exact: true },
    // { path: '/theme/colors', name: 'Colors', component: Colors },
    // { path: '/theme/typography', name: 'Typography', component: Typography },
    // { path: '/base', name: 'Base', component: Cards, exact: true },
    // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
    // { path: '/base/cards', name: 'Cards', component: Cards },
    // { path: '/base/carousels', name: 'Carousel', component: Carousels },
    // { path: '/base/collapses', name: 'Collapse', component: Collapses },
    // { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
    // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
    // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
    // { path: '/base/navbars', name: 'Navbars', component: Navbars },
    // { path: '/base/navs', name: 'Navs', component: Navs },
    // { path: '/base/paginations', name: 'Paginations', component: Paginations },
    // { path: '/base/popovers', name: 'Popovers', component: Popovers },
    // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
    // { path: '/base/spinners', name: 'Spinners', component: SpinnersB4 },
    // { path: '/base/switches', name: 'Switches', component: Switches },
    // { path: '/base/tabs', name: 'Tabs', component: Tabs },
    // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
    // { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
    // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
    // { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
    // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
    // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
    // { path: '/buttons/loading-buttons', name: 'Loading Buttons', component: LoadingButtons },
    // { path: '/charts', name: 'Charts', component: Charts },
    // { path: '/editors', name: 'Editors', component: CodeEditors, exact: true },
    // { path: '/editors/code-editors', name: 'Code Editors', component: CodeEditors },
    // { path: '/editors/text-editors', name: 'Text Editors', component: TextEditors },
    // { path: '/forms', name: 'Forms', component: BasicForms, exact: true },
    // { path: '/forms/advanced-forms', name: 'Advanced Forms', component: AdvancedForms },
    // { path: '/forms/basic-forms', name: 'Basic Forms', component: BasicForms },
    // { path: '/forms/validation-forms', name: 'Form Validation', component: ValidationForms },
    // { path: '/google-maps', name: 'Google Maps', component: GoogleMaps },
    // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
    // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
    // { path: '/icons/flags', name: 'Flags', component: Flags },
    // { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
    // { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
    // { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
    // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
    // { path: '/notifications/badges', name: 'Badges', component: Badges },
    // { path: '/notifications/modals', name: 'Modals', component: Modals },
    // { path: '/notifications/toastr', name: 'Toastr', component: Toastr },
    // { path: '/plugins', name: 'Plugins', component: Calendar, exact: true },
    // { path: '/plugins/calendar', name: 'Calendar', component: Calendar },
    // { path: '/plugins/draggable', name: 'Draggable Cards', component: Draggable },
    // { path: '/plugins/spinners', name: 'Spinners', component: Spinners },
    // { path: '/tables', name: 'Tables', component: Tables, exact: true },
    // { path: '/tables/data-table', name: 'Data Table', component: DataTable },
    // { path: '/tables/tables', name: 'Tables', component: Tables },
    // { path: '/widgets', name: 'Widgets', component: Widgets },
    // { path: '/apps', name: 'Apps', component: Compose, exact: true },
    // { path: '/apps/email', name: 'Email', component: Compose, exact: true },
    // { path: '/apps/email/compose', name: 'Compose', component: Compose },
    // { path: '/apps/email/inbox', name: 'Inbox', component: Inbox },
    // { path: '/apps/email/message', name: 'Message', component: Message },
    // { path: '/apps/invoicing', name: 'Invoice', component: Invoice, exact: true },
    // { path: '/apps/invoicing/invoice', name: 'Invoice', component: Invoice },
    // { path: '/users', exact: true,  name: 'Users', component: Users },
    // { path: '/users/:id', exact: true, name: 'User Details', component: User }
  ];
  
  export default routes;