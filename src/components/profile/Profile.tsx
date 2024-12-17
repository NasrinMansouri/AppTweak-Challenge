import React, { useState, useEffect } from "react";

import { useGetUserQuery } from "../../api/apiSlice";
import Style from "./Profile.module.css";
import close from "../../icons/close.svg";
import defaultProfile from "../../icons/defaultProfile.svg";

const Profile = () => {
  const { data: user, isLoading, isError } = useGetUserQuery();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isSidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSidebarOpen]);

  if (isLoading) {
    return null;
  }

  if (isError || !user) {
    return <div>Error loading user information</div>;
  }

  return (
    <div className={Style.mainContainer}>
      {/* Trigger Button */}
      <button onClick={toggleSidebar} className={Style.triggerBtn}>
        <img
          src={user.images?.[0]?.url || defaultProfile}
          alt="User Profile"
          className={Style.profileImg}
        />
      </button>

      {/* Sidebar */}
      <div className={`${Style.sidebar} ${!isSidebarOpen ? Style.sidebarClosed : ""}`}>
        {/*  Header */}
        <div className={Style.sidebarHeader}>
          <button onClick={toggleSidebar} className={Style.closeBtn}>
            <img src={close} alt="Close" />
          </button>
          <div>
            <img
              src={user.images?.[0]?.url || defaultProfile}
              alt="User Profile"
              className={Style.imgSlider}
            />
          </div>
        </div>
        <div className={Style.divider}></div>

        {/* User Details */}
        <div>
          <div className={Style.aboutContainer}>
            <p className={Style.detail}>{user.display_name}</p>
          </div>
          <div className={Style.aboutContainer}>
            <p className={Style.detail}>{user.email}</p>
          </div>
          <div className={Style.aboutContainer}>
            <p className={Style.detail}>{user.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
