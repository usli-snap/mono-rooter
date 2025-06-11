import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Existing properties
  button = { text: 'Submit', type: 'primary' };
  accordionItems = [
    { title: 'Accordion 1', content: 'Content from service' },
    { title: 'Accordion 2', content: 'More content' },
  ];

  // Add these properties
  dropdownItems = [
    { text: 'Home', icon: 'fa fa-home', action: () => console.log('Home clicked') },
    { text: 'Settings', icon: 'fa fa-cog', action: () => console.log('Settings clicked') },
    {
      text: "Settings",
      "icon": "fas fa-cog",
      action: () => console.log('Settings clicked'),
      subItems: [
        { "label": "Profile", "icon": "fas fa-user", "link": "/profile" },
        { "label": "Security", "icon": "fas fa-shield-alt", "link": "/security" }
      ]
    },
    { text: 'Logout', icon: 'fa fa-sign-out', action: () => console.log('Logout clicked') },
  ];


  tabs = [
    { title: 'Tab 1', content: 'Content from service' },
    { title: 'Tab 2', content: 'More content' },
  ];

  modal = {
    title: 'Service Modal',
    content: 'Content from service',
  };
}
