import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Home from "./Home";
import { motion } from "framer-motion";
import { TbLogout } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      try {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  return (
    <div>
      {value ? (
        <Home />
      ) : (
        <div className="relative flex items-center gap">
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-green-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "viveksahu_ce_2021@ltce.in" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <AiOutlinePlus />
                    </p>
                  </Link>
                )}

                {user && (
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={logout}
                  >
                    Log Out &nbsp; &nbsp;
                    <TbLogout />
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;
