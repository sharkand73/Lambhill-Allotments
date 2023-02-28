import { query, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const peopleCollection = 'people';
const peopleRef = collection(db, peopleCollection);

// Gets a list of all people from the people collection
export const getPeople = async function(){
    try {
        const peopleSnapshot = await getDocs(peopleRef)
        const people = peopleSnapshot.docs.map(d => d.data());
        return people;
    }
    catch(err){
        alert(err.message);
        return [];
    }
}

// Gets a person from the people collection by their nickname
export const getPerson = async function(uid){
    try {
        const docRef = doc(db, peopleCollection, uid);
        const docSnapshot = await getDoc(docRef);
        return docSnapshot ? docSnapshot.data(): null;    
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}

// Adds a person to the people collection
export const addPerson = async function(person){
    try {
        await addDoc(peopleRef, { 
            firstName: person.firstName, 
            lastName: person.lastName, 
            dateJoined: person.dateJoined,
            address: person.address,
            phoneNumber: person.phoneNumber,
            email: person.email,
            altEmail: person.altEmail, 
            onWaitingList: person.onWaitingList,
            joinedWaitingList: person.joinedWaitingList,
            plots: person.plots
        });
    }
    catch(err){
        alert(err.message);
    }
}

// Updates a person in the people collection
export const updatePerson = async function(person){
    try {
        const docRef = doc(db, peopleCollection, person.uid);
        await updateDoc(docRef, { 
            firstName: person.firstName, 
            lastName: person.lastName, 
            dateJoined: person.dateJoined,
            address: person.address,
            phoneNumber: person.phoneNumber,
            email: person.email,
            altEmail: person.altEmail, 
            onWaitingList: person.onWaitingList,
            waitingListPosition: person.waitingListPosition,
            joinedWaitingList: person.joinedWaitingList,
            plots: person.plots
        });
    }
    catch(err){
        alert(err.message);
    }
}

// Deletes a person from the people collection
export const deletePerson = async function(uid){
    try {
        const docRef = doc(db, peopleCollection, uid);
        await deleteDoc(docRef);
    }
    catch(err){
        alert(err.message);
    }
}

// Gets all current plotholders
export const getPlotHolders = async function(){
    try {
        const q = query(peopleRef, where('onWaitingList', '==', false));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty){
            return null;
        }
        return querySnapshot.docs.map(d => d.data());  
    }
    catch (err){
        alert(err.message);
    }
}

// Gets the current waiting list 
export const getWaitingList = async function(){
    try {
        const q = query(peopleRef, where('onWaitingList', '==', true)
        , orderBy('joinedWaitingList', 'desc'));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty){
            return null;
        }   
        return querySnapshot.docs.map(d => d.data());
    }
    catch (err){
        console.log(err.message);
        alert(err.message);
    }
}

// Finds people by a given plot name
export const findByPlotName = async function(plotName){
    const people = await getPeople();
    // TODO: this might not work
    return people.filter(p => {
        let plots = p.plots.split(',');
        return plots.indexOf(plotName) != -1;
    });        
}

//export { getPeople, getPerson, addPerson, updatePerson, deletePerson, findByPlotName, getPlotholders, getWaitingList };