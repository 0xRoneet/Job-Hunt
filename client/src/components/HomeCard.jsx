import React from "react";
import CustomButton from "./CustomButton";
import NotFound from "../img/nonfound.svg";

const HomeCard = ({
  data,
}) => {
  return (
    <div>
      {/* for mobile */}
      {data && data.length > 0 ? (
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {data.map((item) => (
            <div
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              key={item?.id}
            >
              <div className="flex items-center font-medium gap-3">
                <div>
                  <img
                    src={item?.imageURL}
                    className="w-12 h-12 border rounded-full overflow-hidden object-cover"
                    alt={item.title || "Job"}
                  />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-gray-400">Type: {item.type}</p>
                </div>
              </div>
              <div className="h-16 overflow-hidden mt-3">
                <p className="text-xs text-gray-500 line-clamp-3">
                  {item.description}
                </p>
              </div>
              <div className="mt-3">
                <a href="https://t.me/shubh007123" target="_blank" rel="noreferrer">
                  <CustomButton
                    text={"Apply Job"}
                    bgColor={"lightBlue"}
                    textColor={"white"}
                    width={"full"}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="md:hidden w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="item not found" />
          <p className="text-xl mt-12">Jobs not found</p>
        </div>
      )}

      {/* for desktop */}
      {data && data.length > 0 ? (
        <div className="hidden w-full md:flex flex-row flex-wrap gap-4 mt-8">
          {data.map((item) => (
            <div className="md:w-[48%] lg:w-[31%] bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300" key={item?.id}>
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item?.imageURL}
                    className="w-16 h-16 border rounded-full object-cover"
                    alt={item.title || "Job listing"}
                  />
                  <div>
                    <p className="text-xl font-bold">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.organization}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 mb-4">
                  <div className="flex-col">
                    <p className="text-gray-500 text-sm">Type</p>
                    <p className="font-semibold">{item.type}</p>
                  </div>
                  <div className="flex-col">
                    <p className="text-gray-500 text-sm">Organization</p>
                    <p className="font-semibold">{item.organization}</p>
                  </div>
                </div>                <div className="h-24 overflow-hidden text-ellipsis">
                  <p className="text-gray-600 text-sm line-clamp-4">
                    {item.description}
                  </p>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <a href="https://t.me/shubh007123" target="_blank" rel="noreferrer">
                    <CustomButton
                      text={"Apply Job"}
                      bgColor={"lightBlue"}
                      textColor={"white"}
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full hidden md:flex flex-col min-h-7xl items-center justify-center">
          <img src={NotFound} alt="item not found" />
          <p className="text-2xl mt-16">Job not found</p>
        </div>
      )}
    </div>
  );
};

export default HomeCard;
