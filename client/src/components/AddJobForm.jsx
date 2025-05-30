import React, { useState } from "react";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllJobData, saveItem } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Loader from "./Loader";
import { MdDelete } from "react-icons/md";
const AddJobForm = () => {
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [featured, setFeatured] = useState(false);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);  const [isLoading, setIsLoading] = useState(false);
  const [{ jobData }, dispatch] = useStateValue();
  const [{ user }] = useStateValue();
    // List of authorized email addresses that can add jobs
  const authorizedEmails = ['roneet780@gmail.com', 'recruiter@company.com'];
    // Check if the current user is authorized
  const isAuthorized = () => {
    // No user is logged in
    if (!user) return false;
    
    // Get email from the user object based on its structure
    const userEmail = user.email || (user.providerData && user.providerData[0]?.email);
    
    // Check if the email is in the authorized list
    return userEmail && (
      authorizedEmails.includes(userEmail) || 
      userEmail === "roneet780@gmail.com"
    );
  };

  const handleFeatureTrue = () => {
    setFeatured(true);
  };

  const handleFeatureFalse = () => {
    setFeatured(false);
  };
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Calculate upload progress but we're not displaying it in the UI
        // Could be used later for progress indicators
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !description || !imageAsset || !type || !organization) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          description: description,
          type: type,
          featured: featured,
          organization: organization,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setDescription("");
    setType("");
    setOrganization("")
  };

  const fetchData = async () => {
    await getAllJobData().then((data) => {
      dispatch({
        type: actionType.SET_JOB,
        jobData: data,
      });
    });
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center">      <div className=" mt-16">
        <p className="text-2xl font-medium text-center">Add a Job</p>
      </div>
      {user && isAuthorized() ? (
        <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
          {fields && (
            <p
              className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
                alertStatus === "danger"
                  ? "bg-red-400 text-red-800"
                  : "bg-emerald-400 text-emerald-800"
              }`}
            >
              {msg}
            </p>
          )}

          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <p className="text-gray-500 hover:text-gray-700">
                          Click here to upload
                        </p>
                      </div>
                      <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative h-full">                      <img
                        src={imageAsset}
                        alt="uploaded job image"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                        onClick={deleteImage}
                      >
                        <MdDelete className=" text-white" />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give me a title..."
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <input
              type="text"
              required
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Organiztion Name"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add Description"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <input
              type="text"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Type"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full">
            <select
              onChange={(e) => setFeatured(e.target.value)}
              className="outline-none w-full text-base border-b border-gray-200 p-2 rounded-md cursor-pointer"
            >
              <option value="other" className="bg-white w-full">
                Is Featured
              </option>

              <option
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                onClick={handleFeatureTrue}
              >
                True
              </option>

              <option
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                onClick={handleFeatureFalse}
              >
                False
              </option>
            </select>
          </div>

          <div className="flex items-center w-full">
            <button
              type="button"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-lightBlue px-12 py-2 rounded-lg text-lg text-white font-semibold"
              onClick={saveDetails}
            >
              Save
            </button>
          </div>        </div>
      ) : (        <div className="text-center py-6">
          <p className="text-red-500 font-semibold mb-2">You don't have rights to add jobs</p>
          <p className="text-gray-600 mb-4">Only specific authorized users can add job listings</p>          {user ? (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
              <p className="text-yellow-800 text-sm mb-2">Your current account: {user.email || (user.providerData && user.providerData[0]?.email) || "Unknown email"}</p>
              <p className="text-gray-600 text-xs">This email address is not authorized to add job listings.</p>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
              <p className="text-blue-800">Please login to continue</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddJobForm;
