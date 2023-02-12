import { query, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const peopleCollection = 'people';
const peopleRef = collection(db, peopleCollection);

// Gets a list of all people from the people collection
export const getPeople = async function(){
    try {
        const people = await getDocs(peopleRef).map(d => d.data());
        return people;
    }
    catch(err){
        alert(err.message);
        return [];
    }
}

// Gets a person from the people collection by their uid
export const getPerson = async function(uid){
    try {
        // TODO: fix this
        const person = await getDoc(peopleRef.docs[uid])
        return person;  
    }
    catch(err){
        alert(err.message);
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
        // TODO: fix this
        await updateDoc(peopleRef.docs[person.uid], { 
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
        // TODO: fix this
        await deleteDoc(peopleRef.docs[uid]);
    }
    catch(err){
        alert(err.message);
    }
}

// Gets all current plotholders
const getPlotholders = async function(){
    try {
        const q = query(peopleRef, where('onWaitingList', '==', false));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty){
            return null;
        }
        // TODO: do we need map?
        return querySnapshot.docs.map(d => d.data());  
    }
    catch (err){
        alert(err.message);
    }
}

// Gets the current waiting list 
const getWaitingList = async function(){
    try {
        const q = query(peopleRef, where('onWaitingList', '==', true), orderBy('waitingListPosition', 'asc'));
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

// Finds people by a given plot name
const findByPlotName = async function(plotName){
    const people = await getPeople();
    // TODO: this might not work
    return people.filter(p => p.plots.indexOf(plotName) != -1);
}

export { getPeople, getPerson, addPerson, updatePerson, deletePerson, findByPlotName, getPlotholders, getWaitingList };