import React, { useState } from "react";
import Lottie from "lottie-react";
import CustomButton from "./CustomButton";
import NotFound from "../img/nonfound.svg";

const HomeCard = ({
  title,
  subTitle,
  type,
  organization,
  shift,
  requirements,
  img,
  telegramUrl,
  data,
}) => {
  const [items, setItems] = useState([]);

  return (
    <div>
      {/* for mobile */}

      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            className="p-6 md:hidden bg-white border rounded-lg mt-6"
            key={item?.id}
          >
            <div className="flex items-center justify-center font-medium gap-4">
              <div>
                <img
                  src={item?.imageURL}
                  className="w-14 md:w-[15%] mb-3 border rounded-full overflow-hidden"
                />
              </div>
              <div>
                <p>{item.title}</p>
                <p className=" text-sm  text-gray-400">Type: {item.type}</p>
              </div>
            </div>
            <p className=" text-justify text-gray-500 mt-6">
              {item.description}
            </p>
            <div className="  mt-4">
              <a href="https://t.me/shubh007123" target="_blank">
                <CustomButton
                  text={"Apply Job"}
                  bgColor={"lightBlue"}
                  textColor={"white"}
                  width={"full"}
                />
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="md:hidden w-full flex flex-col items-center justify-center">
          {/* <img src={NotFound} className="h-340" /> */}
          <img src={NotFound} alt="item not found" />
          <p className=" text-xl mt-12">Jobs not found</p>
        </div>
      )}

      {/* for computer */}

      {data && data.length > 0 ? (
        data.map((item) => (
          <div className="hidden w-full md:flex mt-8" key={item?.id}>
            <div className="w-full bg-white rounded-lg p-8">
              <div className="flex w-full gap-12 items-center justify-between">
                <div className=" w-full flex flex-col">
                  <div className=" flex gap-7">
                    <img
                      src={item?.imageURL}
                      className="w-20 mb-3 border rounded-full overflow-hidden"
                    />
                    <div>
                      <p className=" text-xl font-bold">{item.title}</p>{" "}
                      <div className=" flex gap-10">
                        <div className=" flex-col mt-3">
                          <p className=" text-gray-500">Type</p>
                          <p className=" font-semibold">{item.type}</p>
                        </div>
                        {/* <div className=" flex-col mt-3">
                      <p className=" text-gray-500">Shift</p>
                      <p className=" font-semibold">{shift}</p>
                    </div> */}
                        <div className=" flex-col mt-3">
                          <p className=" text-gray-500">Organization</p>
                          <p className=" font-semibold">{item.organization}</p>
                        </div>
                        {/* <div className=" flex-col mt-3">
                      <p className=" text-gray-500">Requirements</p>
                      <p className=" font-semibold">{requirements}</p>
                    </div> */}
                      </div>
                    </div>
                    <p className=" text-lg font-semibold"></p>
                  </div>

                  {/* <div className=" w-full flex justify-between items-center gap-10">
                    <p className=" w-full text-gray-500 text-sm mt-3 w-[70%]">
                      {item.description}
                    </p>
                    <div>
                      <a href="https://t.me/shubh007123">
                        <CustomButton
                          text={"Apply Job"}
                          bgColor={"lightBlue"}
                          textColor={"white"}
                        />
                      </a>
                    </div>
                  </div> */}

                  <div className=" w-full flex items-center justify-between">
                    <p className=" w-[85%] mt-6 text-gray-600">
                      {item.description}
                    </p>
                    <CustomButton
                      text={"Apply Job"}
                      bgColor={"lightBlue"}
                      textColor={"white"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full hidden md:flex flex-col min-h-7xl items-center justify-center">
          {/* <img src={NotFound} className="h-340" /> */}
          {/* <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p> */}
          <img src={NotFound} alt="item_not_found" />
          <p className=" text-2xl mt-16">Job not found</p>
        </div>
      )}
    </div>
  );
};

export default HomeCard;
