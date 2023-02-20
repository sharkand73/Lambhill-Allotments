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

export const getPeople = () => [
    {
        uid: '1',
        firstName: 'Andrew',
        lastName: 'Sharkey',
        dateJoined: '2017-04-03',
        address: "1 Fake Street, Glasgow, G1 1AB",
        phoneNumber: "07712 345678",
        email: "fakeguy@fake.com",
        altEmail: "", 
        onWaitingList: false,
        waitingListPosition: 0,
        joinedWaitingList: null,
        plots: "Plot40"
    },
    {
        uid: '2',
        firstName: 'Sean',
        lastName: 'McNamara',
        dateJoined: '2018-05-01',
        address: "1 Fake Street, Glasgow, G1 1AB",
        phoneNumber: "07712 345678",
        email: "fakeguy@fake.com",
        altEmail: "", 
        onWaitingList: false,
        waitingListPosition: 0,
        joinedWaitingList: null,
        plots: "Plot16, plot17"
    },
    {
        uid: '3',
        firstName: 'Frank',
        lastName: 'Hall',
        dateJoined: '2012-02-01',
        address: "1 Fake Street, Glasgow, G1 1AB",
        phoneNumber: "07712 345678",
        email: "fakeguy@fake.com",
        altEmail: "", 
        onWaitingList: false,
        waitingListPosition: 0,
        joinedWaitingList: null,
        plots: "Plot4, plot44"
    },
    {
        uid: '4',
        firstName: 'Ania',
        lastName: 'Neisser',
        dateJoined: '2018-05-01',
        address: "1 Fake Street, Glasgow, G1 1AB",
        phoneNumber: "07712 345678",
        email: "fakeguy@fake.com",
        altEmail: "", 
        onWaitingList: false,
        waitingListPosition: 0,
        joinedWaitingList: null,
        plots: "Plot16, plot17"
    },
    {
        uid: '5',
        firstName: 'Stephen',
        lastName: 'Finch',
        dateJoined: '2019-05-01',
        address: "1 Fake Street, Glasgow, G1 1AB",
        phoneNumber: "07712 345678",
        email: "fakeguy@fake.com",
        altEmail: "", 
        onWaitingList: false,
        waitingListPosition: 0,
        joinedWaitingList: null,
        plots: "Plot3, plot67"
    },
    {
        uid: '6',
        firstName: 'Heather',
        lastName: 'Read',
        dateJoined: '2019-03-01',
        address: "1 Fake Street, Glasgow, G1 1AB",
        phoneNumber: "07712 345678",
        email: "fakeguy@fake.com",
        altEmail: "", 
        onWaitingList: false,
        waitingListPosition: 0,
        joinedWaitingList: null,
        plots: "Plot64"
    },
    {
        uid: '7',
        firstName: 'Nikki',
        lastName: 'Newbert',
        dateJoined: '2018-02-01',
        address: "1 Fake Street, Glasgow, G1 1AB",
        phoneNumber: "07712 345678",
        email: "fakeguy@fake.com",
        altEmail: "", 
        onWaitingList: false,
        waitingListPosition: 0,
        joinedWaitingList: null,
        plots: "Plot21"
    }
];