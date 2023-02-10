export const storeGuest = (guest) => {
    localStorage.setItem('guest', JSON.stringify(guest));
    }

export const getData = () => {
    const jsonGuest = localStorage.getItem('guest');
    const guest = JSON.parse(jsonGuest);
    const guestLevel = guest ? guest.level : 0;
    return {guest, guestLevel};
    }