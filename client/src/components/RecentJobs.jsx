import React, { useState } from "react";
import HomeCard from "./HomeCard";

import AddJobForm from "./AddJobForm";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const RecentJobs = () => {
  const [{ jobData }, dispatch] = useStateValue();



  return (
    <div className=" mt-16">
      <p className="text-2xl font-medium text-center">Recent Jobs</p>

      <HomeCard data={jobData?.slice(0, 3)} />
      <div className=" flex items-end justify-end">
        <a href="/findjob">
          <button className=" mr-0 mt-3 hover:text-lightPrimary cursor-pointer">
            View All
          </button>
        </a>
      </div>
    </div>
  );
};

export default RecentJobs;
