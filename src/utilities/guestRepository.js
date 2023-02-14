import { query, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, where } from "firebase/firestore";
import { db } from "../firebase";

const guestCollection = 'users';
const guestsRef = collection(db, guestCollection);
const authProvider = 'local';

// Gets a guest from the guests (users) collection by its uid
const getGuest = async function(uid){
    try {
        const docRef = doc(db, guestCollection, uid);
        const docSnapshot = await getDoc(docRef);
        if(!docSnapshot){
            return null;
        }
        return docSnapshot.data();  
    }
    catch(err){
        alert(err.message);
    }
}

// Adds a guest to the guests (users) collection
const addGuest = async function(guest){
    try {
        await addDoc(guestsRef, { 
            uid: guest.uid, 
            userName: guest.userName, 
            authProvider, 
            email: guest.email, 
            level: guest.level 
        });
    }
    catch(err){
        alert(err.message);
    }
}

// Updates a guest in the guests (users) collection
const updateGuest = async function(guest){
    try {
        const docRef = doc(db, guestCollection, guest.uid);
        await updateDoc(docRef, { 
            userName: guest.userName, 
            authProvider, 
            email: guest.email, 
            level: guest.level 
        });
    }
    catch(err){
        alert(err.message);
    }
}

// Deletes a guest from the guests (users) collection
const deleteGuest = async function(uid){
    try {
        const docRef = doc(db, guestCollection, uid)
        await deleteDoc(docRef, uid);
    }
    catch(err){
        alert(err.message);
    }
}


// Finds a guest by userName
const findGuestByUserName = async(userName) => {
    try {
        const q = query(guestsRef, where('userName', '==', userName));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty){
            return null;
        }
        return querySnapshot.docs[0].data();  
    }
    catch (err){
        alert(err.message);
    }
}

// finds a guest by email address
const findGuestByEmail = async(email) => {
    try {
        const q = query(guestsRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty){
            return null;
        }   
        return querySnapshot.docs[0].data();
    }
    catch (err){
        alert(err.message);
    }
}

export { getGuest, addGuest, updateGuest, deleteGuest, findGuestByEmail, findGuestByUserName };