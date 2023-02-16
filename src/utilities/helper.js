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
    {title: 'About', link: '/about', level: 0},
    {title: 'Events', link: '/events', level: 0},
    {title: 'Contact', link: '/contact', level: 0},
    {title: 'Map', link: '/members/map', level: 1},
    {title: 'Plotholders', link: '/members/plotholders', level: 2},
    {title: 'WaitingList', link: '/members/waitinglist', level: 2},
];

export const getEmptyPerson = () => ({ 
    firstName: "", 
    lastName: "", 
    dateJoined: new Date().toISOString().slice(0,10),
    address: "",
    phoneNumber: "",
    email: "",
    altEmail: "", 
    onWaitingList: false,
    waitingListPosition: 0,
    joinedWaitingList: null,
    plots: ""
});

export const people = [
    {
        firstName: 'Andrew',
        lastName: 'Sharkey'
    },
    {
        firstName: 'Sean',
        lastName: 'McnNamara'
    },
    {
        firstName: 'Frank',
        lastName: 'Hall'
    },
    {
        firstName: 'Ania',
        lastName: 'Neisser'
    },
    {
        firstName: 'Stephen',
        lastName: 'Finch'
    },
    {
        firstName: 'Heather',
        lastName: 'Read'
    },
    {
        firstName: 'Nikki',
        lastName: 'Newbert'
    }
];