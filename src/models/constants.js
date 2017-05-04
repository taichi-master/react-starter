var pkg = require("json-loader!package.json");

export const app = {
  name: pkg.cfg.name,
  version: pkg.version,
  getUrl: {
    features: index => `/api/features${typeof index !== 'undefined' ? `?index=${index}` : ''}`
  }
};

export const menuItems = [
  {name:'Home', url:'/', icon: 'home'},
  {name:'About', url:'/about', icon: 'info-circle'},
  {name:'Dropdown 1', submenu: [
    {name: 'Option 1', url:'/opt1', icon: 'question'},
    {name: 'Submenu', icon: 'question', submenu: [
      {name: 'Submenu-option 1', url:'/', icon: 'home'},
      {name: 'Submenu', submenu: [
        {name: 'Submenu-option 1', url:'/', icon: 'home'},
        {name: 'Submenu-option 2', url:'/about', icon: 'info-circle'},
      ]},
    ]}
  ]},
  {name:'Dropdown 2', submenu: [
    {name: 'Submenu', icon: 'question', submenu: [
      {name: 'Submenu-option 1', url:'/', icon: 'home'},
      {name: 'Submenu-option 2', url:'/about', icon: 'info-circle'},
    ]},
    {name: 'Option 1', url:'/opt1', icon: 'question'},
    {name: 'Option 2', url:'/opt2', icon: 'question'}
  ]}
];

export const footLinks = [
  {name: `${app.name} v${app.version}`, url:'/about'},
  {name: 'Disclaimer', url:'/disclaimer'},
  {name: 'Support', url:'/support'},
  {name: 'Feedback', url:'/feedback'},
  {name: 'Contact us', url:'/contact'}
];
