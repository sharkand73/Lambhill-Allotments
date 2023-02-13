import { auth } from "../firebase";
import { findGuestByUserName } from "./guestRepository";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addGuest } from "./guestRepository";

const logInWithUserNameAndPassword = async(userName, password) => {
    const guest = await findGuestByUserName(userName);
    const email = guest ? guest.email : null;
    try {
        console.log("Signing in...");
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (err){
        console.error(err);
        alert(err.message);
    }
}

const registerWithEmailAndPassword = async(guestModel) => {
    try {
        console.log("Registering...");
        const res = await createUserWithEmailAndPassword(auth, guestModel.email, guestModel.password);
        guestModel.uid = res.user.uid;
        await addGuest(guestModel);
    }
    catch (err){
        console.error(err);
        alert(err.message);
    }
}

const logout = () => {
    signOut(auth);
}

export { logInWithUserNameAndPassword, registerWithEmailAndPassword, logout };