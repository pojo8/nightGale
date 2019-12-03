import React from 'react';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

// const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));

// Defin page routes here and in the const path for them to appear inside default
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
// rename this below
const WorkProfile = React.lazy(() => import('./views/Pages/WorkProfile/WorkProfile'));
const Login = React.lazy(()=> import('./views/Pages/Login/Login'));
const CalenderOverview = React.lazy(()=> import('./views/Pages/Calender/CalenderOverview/CalenderOverview'));
const CalenderView = React.lazy(()=> import('./views/Pages/Calender/CalenderView/CalendarView'));
const UserAccount = React.lazy(()=> import('./views/Pages/UserAccount/UserAccount'))
const PaymentInformation = React.lazy(()=> import('./views/Pages/PaymentInformation/PaymentInformaton'))

// Personal Calendar views
const AECalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/AECalenderView/AECalendarView'));
const AMCalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/AMCalenderView/AMCalendarView'));
const CCCalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/CCCalenderView/CCCalendarView'));
const CMCalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/CMCalenderView/CMCalendarView'));
const COCalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/COCalenderView/COCalendarView'));
const CRCalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/CRCalenderView/CRCalendarView'));
const CSCalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/CSCalenderView/CSCalendarView'));
const DMCalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/DMCalenderView/DMCalendarView'));
const GACalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/GACalenderView/GACalendarView'));
const GPCalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/GPCalenderView/GPCalendarView'));
const GSCalendar = React.lazy(()=> import('./views/Pages/Calender/PersonalCalendars/GSCalenderView/GSCalendarView'));


const routes = [
    { path: '/', name: 'Home', component: DefaultLayout, exact: true },
    { path: '/login', exact: true,  name: 'Login Page', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/workprofile', name: 'Work Profile', component: WorkProfile,  exact: true},
    { path: '/useraccount', name: 'User Account', component: UserAccount,  exact: true},
    { path: '/paymentinformation', name: 'Payment Information', component: PaymentInformation,  exact: true},



    { path: '/calenderOverview', name: 'Calendar Overview', component: CalenderOverview,  exact: true},
    { path: '/calenderView', name: 'Calendar View', component: CalenderView,  exact: true},
    { path: '/AMcalenderView', name: 'Academic medicine', component: AMCalendar,  exact: true},
    { path: '/AEcalenderView', name: 'Anaesthesia', component: AECalendar,  exact: true},
    { path: '/CCcalenderView', name: 'Community child health', component: CCCalendar,  exact: true},
    { path: '/CMcalenderView', name: "Children's mental health", component: CMCalendar,  exact: true},
    { path: '/COcalenderView', name: 'Clinical oncology', component: COCalendar,  exact: true},
    { path: '/CRcalenderView', name: 'Clinical radiology', component: CRCalendar,  exact: true},
    { path: '/CScalenderView', name: 'Cardiothoracic surgery', component: CSCalendar,  exact: true},
    { path: '/DMcalenderView', name: 'Dermatology', component: DMCalendar,  exact: true},
    { path: '/GAcalenderView', name: 'Gastrology', component: GACalendar,  exact: true},
    { path: '/GPcalenderView', name: 'General practice', component: GPCalendar,  exact: true},
    { path: '/GScalenderView', name: 'General surgery', component: GSCalendar,  exact: true},


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