import React from 'react';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

// const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));

// Defin page routes here and in the const path for them to appear inside default
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
// rename this below
const WorkProfile = React.lazy(() => import('./views/Pages/WorkProfile/WorkProfile'));
const Login = React.lazy(()=> import('./views/Pages/Login/Login'));
const CalendarEntryOverview = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/CalendarEntryOverview/CalendarEntryOverview'));
const CalendarViewOverview = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/CalendarViewOverview/CalendarViewOverview'));

const CalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/CalendarView'));
const UserAccount = React.lazy(()=> import('./views/Pages/UserAccount/UserAccount'))
const PaymentInformation = React.lazy(()=> import('./views/Pages/PaymentInformation/PaymentInformaton'))

// Entry Calendar views
const AECalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/AECalendarEntry/AECalendarEntry'));
const AMCalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/AMCalendarEntry/AMCalendarEntry'));
const CCCalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/CCCalendarEntry/CCCalendarEntry'));
const CMCalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/CMCalendarEntry/CMCalendarEntry'));
const COCalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/COCalendarEntry/COCalendarEntry'));
const CRCalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/CRCalendarEntry/CRCalendarEntry'));
const CSCalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/CSCalendarEntry/CSCalendarEntry'));
const DMCalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/DMCalendarEntry/DMCalendarEntry'));
const GACalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/GACalendarEntry/GACalendarEntry'));
const GPCalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/GPCalendarEntry/GPCalendarEntry'));
const GSCalendarEntry = React.lazy(()=> import('./views/Pages/Calendar/CalendarEntry/GSCalendarEntry/GSCalendarEntry'));


// Presonal Calendar views

const AECalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/AECalendarView/AECalendarView'));
const AMCalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/AMCalendarView/AMCalendarView'));
const CCCalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/CCCalendarView/CCCalendarView'));
const CMCalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/CMCalendarView/CMCalendarView'));
const COCalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/COCalendarView/COCalendarView'));
const CRCalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/CRCalendarView/CRCalendarView'));
const CSCalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/CSCalendarView/CSCalendarView'));
const DMCalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/DMCalendarView/DMCalendarView'));
const GACalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/GACalendarView/GACalendarView'));
const GPCalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/GPCalendarView/GPCalendarView'));
const GSCalendarView = React.lazy(()=> import('./views/Pages/Calendar/CalendarView/GSCalendarView/GSCalendarView'));


const routes = [
    { path: '/', name: 'Home', component: DefaultLayout, exact: true },
    { path: '/login', exact: true,  name: 'Login Page', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/workprofile', name: 'Work Profile', component: WorkProfile,  exact: true},
    { path: '/useraccount', name: 'User Account', component: UserAccount,  exact: true},
    { path: '/paymentinformation', name: 'Payment Information', component: PaymentInformation,  exact: true},

    // Calendar Entry
    { path: '/calendarEntryOverview', name: 'Entry Overview', component: CalendarEntryOverview,  exact: true},
    { path: '/CalendarView', name: 'Calendar View', component: CalendarView,  exact: true},
    { path: '/AMCalendarEntry', name: 'Academic medicine Entry', component: AMCalendarEntry,  exact: true},
    { path: '/AECalendarEntry', name: 'Anaesthesia Entry', component: AECalendarEntry,  exact: true},
    { path: '/CCCalendarEntry', name: 'Community child health Entry', component: CCCalendarEntry,  exact: true},
    { path: '/CMCalendarEntry', name: "Children's mental health Entry", component: CMCalendarEntry,  exact: true},
    { path: '/COCalendarEntry', name: 'Clinical oncology Entry', component: COCalendarEntry,  exact: true},
    { path: '/CRCalendarEntry', name: 'Clinical radiology Entry', component: CRCalendarEntry,  exact: true},
    { path: '/CSCalendarEntry', name: 'Cardiothoracic surgery Entry', component: CSCalendarEntry,  exact: true},
    { path: '/DMCalendarEntry', name: 'Dermatology Entry', component: DMCalendarEntry,  exact: true},
    { path: '/GACalendarEntry', name: 'Gastrology Entry', component: GACalendarEntry,  exact: true},
    { path: '/GPCalendarEntry', name: 'General practice Entry', component: GPCalendarEntry,  exact: true},
    { path: '/GSCalendarEntry', name: 'General surgery Entry', component: GSCalendarEntry,  exact: true},

    // Calendar View
    { path: '/calendarViewOverview', name: 'View Overview', component: CalendarViewOverview,  exact: true},
    { path: '/AMCalendarView', name: 'Academic medicine View', component: AMCalendarView,  exact: true},
    { path: '/AECalendarView', name: 'Anaesthesia View', component: AECalendarView,  exact: true},
    { path: '/CCCalendarView', name: 'Community child health View', component: CCCalendarView,  exact: true},
    { path: '/CMCalendarView', name: "Children's mental health View", component: CMCalendarView,  exact: true},
    { path: '/COCalendarView', name: 'Clinical oncology View', component: COCalendarView,  exact: true},
    { path: '/CRCalendarView', name: 'Clinical radiology View', component: CRCalendarView,  exact: true},
    { path: '/CSCalendarView', name: 'Cardiothoracic surgery View', component: CSCalendarView,  exact: true},
    { path: '/DMCalendarView', name: 'Dermatology View', component: DMCalendarView,  exact: true},
    { path: '/GACalendarView', name: 'Gastrology View', component: GACalendarView,  exact: true},
    { path: '/GPCalendarView', name: 'General practice View', component: GPCalendarView,  exact: true},
    { path: '/GSCalendarView', name: 'General surgery View', component: GSCalendarView,  exact: true},


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