export const storeGuest = (guest) => {
    localStorage.setItem('guest', JSON.stringify(guest));
    }

export const getData = () => {
    const jsonGuest = localStorage.getItem('guest');
    const guest = JSON.parse(jsonGuest);
    const guestLevel = guest ? guest.level : 0;
    return {guest, guestLevel};
    }

export const navItems = [
    {title: 'Home', link: '/', level: 0},
    {title: 'About', link: 'about', level: 0},
    {title: 'Events', link: 'events', level: 0},
    {title: 'Contact', link: 'contact', level: 0},
    {title: 'Map', link: 'map', level: 1},
    {title: 'Plotholders', link: 'plotholders', level: 2}
];