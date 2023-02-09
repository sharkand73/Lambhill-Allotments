export const storeGuest = (guest) => {
    const guestLevel = guest ? guest.level : 0;
    sessionStorage.setItem('guest', guest);
    }