import React from "react";
import HomeCard from "./HomeCard";
import Avatar1 from "../images/avatars/av1.json";
import Avatar2 from "../images/avatars/av2.json";
import { useStateValue } from "../context/StateProvider";
import { Link } from 'react-router-dom';

const FeaturedJobs = () => {
  const [{ jobData }, dispatch] = useStateValue();

  // Filter featured jobs
  const featuredJobs = jobData?.filter((n) => n.featured === true)?.slice(0, 3);

  return (
    <div className=" mt-16 w-full">
      <p className=" text-2xl font-medium  text-center">Featured Jobs</p>

      <HomeCard data={featuredJobs} />

      <div className="flex items-end justify-end">
        {/* Use Link from react-router-dom to navigate to /findjob with the featured filter */}
        <Link to="/findjob?featured=true">
          <button className="mr-0 mt-3 hover:text-lightPrimary cursor-pointer">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedJobs;
