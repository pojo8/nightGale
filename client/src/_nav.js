export default {
  items: [
    {
  
      name: 'Search',
      url: '/base',
      icon: 'cui-magnifying-glass',
      children: [
        {
          name: 'Shift Search',
      url: '/theme/colors',
      icon: 'icon-event',
        },
        {
          name: 'Hospital search',
      url: '/theme/typography',
      icon: 'cui-magnifying-glass',
        },
        {
          name: 'Region search',
      url: '/theme/typography',
      icon: 'fa fa-street-view',
        },
      
    ]}
    ,
    {
      title: true,
      name: 'User account',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'User profile',
      url: '/base',
      icon: 'cui-user',
      children: [
        {
          name: 'User account',
          url: '/useraccount',
          icon: 'icon-user',
        },
        {
          name: 'Payment infromation',
          url: '/paymentinformation',
          icon: "fa fa-bank",
        },]
    },
    {
      name: 'Work profile',
      url: '/workprofile',
      icon: 'fa fa-hospital-o',
      children: [
        {
          name: 'Work specification',
          url: '/workprofile',
          icon: 'fa fa-user-md',
        },]
    },
    {
      name: 'Settings',
      url: '/base',
      icon: 'cui-cog',
      children: [
        {
          name: 'User account',
          url: '/base/breadcrumbs',
          icon: 'icon-user',
        },
        {
          name: 'Notification',
          url: '/base/carousels',
          icon: 'cui-bell',
        },
        
        {
          name: 'Privacy',
          url: '/base/spinners',
          icon: 'fa fa-circle-o-notch',
        },
      ],
    },
    
    {
      name: 'Time breakdown',
      url: '/charts',
      icon: 'icon-pie-chart',
      children: [
        {
          name: 'Weekly audit',
          url: '/calenderWeekView',
          icon: 'icon-pie-chart'
        },
        {
          name: 'Monthly audit',
          url: '/calenderMonthView',
          icon: 'icon-pie-chart'
        },
      ]
    },
    
    {
      title: true,
      name: 'Time mangement',
    },
    {
      name: 'Calender',
      url: '/calenderOverview',
      icon: 'icon-calendar',
      children: [
        {
          name: 'Calender Overview',
          url: '/calenderOverview',
          icon: 'icon-pie-chart',
        },
        {
          name: 'Calender View',
          url: '/calenderView',
          icon: 'icon-calendar',
        },
        {
          name: 'Weekly calender',
          url: '/calenderWeekView',
          icon: 'icon-calendar'
        },
        {
          name: 'Monthly calender',
          url: '/calenderMonthView',
          icon: 'icon-calendar'
        },
      ]
    },
    {
      name: 'Google Maps',
      url: '/google-maps',
      icon: 'icon-map',
      badge: {
        variant: 'danger',
        text: 'PRO'
      }
    },
    {
      title: true,
      name: 'Time audit',
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star',
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      title: true,
      name: 'Invoices',
    },
   
    
    {
      name: 'Invoice',
      url: '/tables',
      icon: 'icon-list',
      children: [
        {
          name: 'Edit pay rate',
          url: '/tables/data-table',
          icon: 'cui-graph',
        },
        {
          name: 'Generate invoice',
          url: '/tables/tables',
          icon: 'icon-wallet'
        }
      ]
    },

    {
      name: 'Log out',
      url: '/apps',
      icon: 'cui-account-logout',
      
    },
    {
      divider: true,
      class: 'm-2'
    },
    {
      title: true,
      name: 'Labels'
    },
    {
      name: 'Label danger',
      url: '',
      icon: 'fa fa-circle',
      label: {
        variant: 'danger'
      },
    },
    {
      name: 'Label info',
      url: '',
      icon: 'fa fa-circle',
      label: {
        variant: 'info'
      }
    },
    {
      name: 'Label warning',
      url: '',
      icon: 'fa fa-circle',
      label: {
        variant: 'warning'
      }
    },
  ]
};
