import React from "react";
import {
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import RecentJobs from "./RecentJobs";
import FeaturedJobs from "./FeaturedJobs";
import { useStateValue } from "../context/StateProvider";
import AddJobForm from "./AddJobForm";

const Joblist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const isRecentJobsActive =
    location.pathname === "/recentJobs" || location.pathname === "/";

  const isAddJobActive = location.pathname === "/addJob";
  const isFeaturedJobs = location.pathname === "/featuredJobs";

  const handleRecentJobsClick = () => {
    navigate("/recentJobs");
  };

  const handleFeaturedJobsClick = () => {
    navigate("/featuredJobs");
  };

  const handleAddJobClick = () => {
    navigate("/addJob");
  };

  return (
    <div>
      <div className="mt-36 flex flex-col justify-center items-center">
        <div className=" flex flex-col justify-center items-center text-center">
          <p className="text-3xl font-semibold">New Jobs</p>

          <p className="mt-6 md:w-[500px] text-lighttextGray">
            Post a job to tell us about your project. We'll quickly match you
            with the right freelancers.
          </p>
          <div className="mt-4 flex justify-center gap-5 shadow-lg p-2 rounded-xl">
            <p
              onClick={handleRecentJobsClick}
              className={`px-4 py-2 rounded-xl cursor-pointer ${
                isRecentJobsActive ? "bg-lightBlue text-white" : ""
              }`}
            >
              Recent Jobs
            </p>
            <p
              onClick={handleFeaturedJobsClick}
              className={`px-4 py-2 rounded-xl cursor-pointer ${
                isFeaturedJobs ? "bg-lightBlue text-white" : ""
              }`}
            >
              Featured Jobs
            </p>
            {user && (
              <p
                onClick={handleAddJobClick}
                className={`border px-4 py-2 rounded-xl cursor-pointer ${
                  isAddJobActive ? "bg-lightBlue text-white" : ""
                }`}
              >
                Add Jobs
              </p>
            )}
          </div>
        </div>

     
      </div>
     
    </div>
  );
};

export default Joblist;
