import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import HomeCard from "../components/HomeCard";
import AddJobForm from "../components/AddJobForm";
import { BiSearch } from "react-icons/bi";

function FindJob() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const featured = new URLSearchParams(location.search).get("featured");
  // const [setsetIsVisible, set] = useState(true);

  const [isRecentJobsActive, setIsRecentJobsActive] = useState(true);
  const [isFeaturedJobs, setIsFeaturedJobs] = useState(false);
  const [isAddJobActive, setIsAddJobActive] = useState(false);

  const navigate = useNavigate();
  const [{ jobData, user }, dispatch] = useStateValue();
  const [filteredJobs, setFilteredJobs] = useState(jobData);

  const [searchField, setSearchField] = useState("");

  const handleSearch = () => {
    // Redirect to /findjob with the searchField value as a query parameter
    // setsetIsVisible(false);
    navigate(`/findjob?search=${searchField}`);
  };

  const handleInputChange = (e) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    let updatedJobs = jobData;

    if (search) {
      updatedJobs = jobData?.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (featured) {
      updatedJobs = updatedJobs?.filter((job) => job.featured === true);
      setIsFeaturedJobs(true);
      setIsRecentJobsActive(false);
      setIsAddJobActive(false);
    }

    setFilteredJobs(updatedJobs);
  }, [jobData, search, featured]);

  const handleFeaturedJobsClick = () => {
    const featuredJobs = jobData.filter((job) => job.featured === true);
    setIsFeaturedJobs(true);
    setIsRecentJobsActive(false);
    setIsAddJobActive(false);
    setFilteredJobs(featuredJobs);
  };

  const handleRecentJobsClick = () => {
    navigate("/findJob");
    setIsFeaturedJobs(false);
    setIsRecentJobsActive(true);
    setIsAddJobActive(false);
    setFilteredJobs(jobData);
  };

  const handleAddJobClick = () => {
    // navigate("/addJob");
    setIsFeaturedJobs(false);
    setIsRecentJobsActive(false);
    setIsAddJobActive(true);
  };

  return (
    <div className="md:p-8 md:px-48 p-7">
      <p className="text-center text-2xl md:text-[4rem] font-semibold my-32 leading-tight">
        Join our world-class team of creators &{" "}
        <span className="text-lightBlue">dreamers</span>
      </p>
      <div className="mt-36 flex flex-col justify-center items-center mb-16">
        <div className=" flex flex-col justify-center items-center text-center">
          <p className="text-3xl font-semibold">New Jobs</p>

          <p className="mt-6 md:w-[500px] text-lighttextGray">
            Post a job to tell us about your project. We'll quickly match you
            with the right freelancers.
          </p>
          <div className="mt-4 flex justify-center gap-5 shadow-lg p-2 rounded-xl">
            <p
              className={`px-4 py-2 rounded-xl cursor-pointer ${
                isRecentJobsActive ? "bg-blue-500 text-white" : ""
              }`}
              onClick={handleRecentJobsClick}
            >
              Recent Jobs
            </p>
            <p
              className={`px-4 py-2 rounded-xl cursor-pointer ${
                isFeaturedJobs ? "bg-blue-500 text-white" : ""
              }`}
              onClick={handleFeaturedJobsClick}
            >
              Featured Jobs
            </p>
            {user && (
              <p
                className={`border px-4 py-2 rounded-xl cursor-pointer ${
                  isAddJobActive ? "bg-blue-500 text-white" : ""
                }`}
                onClick={handleAddJobClick}
              >
                Add Jobs
              </p>
            )}
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-center gap-4 w-full bg-white px-5 py-4 rounded-lg ">
        {/* <a href="#">
            <CustomButton
              text={"Find Job"}
              bgColor={"lightBlue"}
              textColor={"white"}
            />
          </a>

          <a href="#">
            <CustomButton text={"Post Job"} hoverColor={"lightBlue"} />
          </a> */}
        <BiSearch className="" />
        <form
          action=""
          className=" w-full flex items-center justify-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            placeholder="Job Title"
            className=" w-full hover:shadow-md focus:outline-none h-full"
            value={searchField}
            onChange={handleInputChange}
          />
          <button
            className=" w-32 h-full bg-blue-500 text-white py-2 rounded-lg px-2"
            type="submit"
          >
            Find Job
          </button>
        </form>
      </div>

      {search && (
        <p className="text-center text-xl md:text-[2rem] font-semibold mt-16">
          Search results for: <span className="text-lightBlue">{search}</span>
        </p>
      )}
      {isFeaturedJobs && (
        <p className="text-center text-xl md:text-[2rem] font-semibold mt-16">
          Featured Jobs
        </p>
      )}
      {isRecentJobsActive && (
        <p className="text-center text-xl md:text-[2rem] font-semibold mt-16">
          Recent Jobs
        </p>
      )}
      {isAddJobActive ? (
        <div>
          <p className="text-center text-xl md:text-[2rem] font-semibold mt-16">
            
          </p>
          <AddJobForm />
        </div>
      ) : (
        <HomeCard data={filteredJobs} />
      )}
    </div>
  );
}

export default FindJob;
