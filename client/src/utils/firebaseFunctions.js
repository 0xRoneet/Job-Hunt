import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
  } from "firebase/firestore";
  import { firestore } from "../pages/config";
  
  // Saving new Item
  export const saveItem = async (data) => {
    await setDoc(doc(firestore, "jobData", `${Date.now()}`), data, {
      merge: true,
    });
  };



  //get all jobs
  export const getAllJobData = async () => {
    const items = await getDocs(
      query(collection(firestore, "jobData"), orderBy("id", "desc"))
    );
  
    return items.docs.map((doc) => doc.data());
  };