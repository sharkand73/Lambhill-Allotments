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
    {title: 'Plots', link: '/members/plots', level: 2},
    {title: 'Plotholders', link: '/members/plotholders', level: 2},
    {title: 'WaitingList', link: '/members/waitinglist', level: 2}
];

export const getEmptyPerson = (onWaitingList) => ({ 
    firstName: "", 
    lastName: "", 
    nickName: "",
    dateJoined: new Date().toISOString().slice(0,10),
    address: "",
    phoneNumber: "",
    email: "",
    altEmail: "", 
    onWaitingList,
    isPlotHolder: !onWaitingList,
    joinedWaitingList: new Date().toISOString().slice(0,10),
    plots: ""
});

export const getEmptyPlot = () => {
    return ({
        id: "",
        description: "",
        area: 0,
        distance: 0,
        gradient: "slope",
        occupied: true,
        fee: 45,
        tenants: []
    });
}

export const stringStartsWith = function(mainString, subString){
    if (!subString){
        return true;
    }
    const l = subString.length;
    return mainString.slice(0, l).toLowerCase() === subString.toLowerCase();
}