export const fetchUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      const userInfo = JSON.parse(storedUser);
      
      // Add a fallback photoURL if it's missing
      if (!userInfo.photoURL) {
        userInfo.photoURL = null; // Will use default profile image
      }
      
      return userInfo;
    } else {
      localStorage.removeItem("user");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user from localStorage:", error);
    localStorage.removeItem("user");
    return null;
  }
};