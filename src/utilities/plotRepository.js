import { collection, doc, getDocs, setDoc, 
    //getDoc, addDoc,  deleteDoc, where, orderBy 
} 
    from "firebase/firestore";
import { db } from "../firebase";

const plotCollection = 'plots';
const plotRef = collection(db, plotCollection);

export const getPlots = async function() {
    try {
        const plotsSnapshot = await getDocs(plotRef)
        let plots = [];
        plotsSnapshot.docs.forEach(s => {
            let plot = s.data();
            plot.id = s.id;
            plots.push(plot);
        });
        return plots;
    }
    catch(err){
        console.error(err.message);
        return [];
    }
}

export const setPlot = async function(plot) {
    try {
            const docRef = doc(db, plotCollection, plot.id);
            console.log(plot.tenants);
            await setDoc(docRef, plot);
    }
    catch(err){
        console.error(err.message);
    }
}