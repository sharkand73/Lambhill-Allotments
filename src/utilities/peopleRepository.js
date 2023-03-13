import { query, collection, doc, getDocs, getDoc, addDoc, setDoc, deleteDoc, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const peopleCollection = 'people';
const peopleRef = collection(db, peopleCollection);

// Gets a list of all people from the people collection
export const getPeople = async function(){
    try {
        const peopleSnapshot = await getDocs(peopleRef)
        let people = [];
        peopleSnapshot.docs.forEach(s => {
            let person = s.data();
            person.id = s.id;
            people.push(person);
        });
        //console.log(people);
        return people;
    }
    catch(err){
        console.error(err.message);
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
        console.error(err.message);
        return null;
    }
}

// Adds /updates a person to the people collection
export const setPerson = async function(person, id){
    try {
        if (id){
            const docRef = doc(db, peopleCollection, id);
            let personWithoutId = {...person};
            delete personWithoutId.id;
            await setDoc(docRef, personWithoutId);
        }
        else {
            await addDoc(peopleRef, person);
            //window.location.reload(false);
        }
    }
    catch(err){
        console.error(err.message);
    }
}

// Deletes a person from the people collection
export const deletePerson = async function(id){
    try {
        const docRef = doc(db, peopleCollection, id);
        await deleteDoc(docRef);
    }
    catch(err){
        console.error(err.message);
    }
}

// Adds the plot name (id) to the field 'plots' in the person object
export const addPlotToPerson = async function(person, plot){
    const id = person.id;
    const plotName = plot.id;
    let personPlotNames = person.plots ? person.plots : "";
    let plotNamesArray = personPlotNames ? personPlotNames.split(', '): [];
    if (plotNamesArray.indexOf(plotName) !== -1) return;
    plotNamesArray.push(plotName);
    person.plots = plotNamesArray.join(', ');
    person.isPlotHolder = true;
    if (plotNamesArray.length === 1){
        person.dateJoined = new Date().toISOString().slice(0,10);
    }
    await setPerson(person, id);
} 

// removes the plot name (id) from the field 'plots' in the person object
export const removePlotFromPerson = async function(person, plot){
    const id = person.id;
    const plotName = plot.id;
    let personPlotNames = person.plots ? person.plots : "";
    let plotNamesArray = personPlotNames.split(', ');
    const i = plotNamesArray.indexOf(plotName)
    if (i === -1) return;
    plotNamesArray.splice(i, 1);
    person.plots = plotNamesArray.join(', ');
    if (!plotNamesArray.length && person.onWaitingList){
        person.isPlotHolder = false;
    }
    await setPerson(person, id);
} 

//
export const switchToWaitingList = async function(person){
    if (person.plots) {
        alert("This person has plots");
        return;
    }
    person.onWaitingList = true;
    person.isPlotHolder = false;
    person.joinedWaitingList = new Date().toISOString().slice(0,10);
    await setPerson(person, person.id);
}

//
export const switchToPlotHolders = async function(person){
    if (!person.plots) {
        alert("This person doesn't have a plot yet");
        return;
    }
    person.isPlotHolder = true;
    person.onWaitingList = false;
    await setPerson(person, person.id);
}

// Gets all current plotholders - not in use
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
        console.error(err.message);
    }
}

// Gets the current waiting list  - not in use
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
        console.error(err.message);
    }
}

// Finds people by a given plot name = not in use
export const findByPlotName = async function(plotName){
    const people = await getPeople();
    // TODO: this might not work
    return people.filter(p => {
        let plots = p.plots.split(',');
        return plots.indexOf(plotName) !== -1;
    });        
}

//export { getPeople, getPerson, addPerson, updatePerson, deletePerson, findByPlotName, getPlotholders, getWaitingList };