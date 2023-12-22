import React, { useEffect } from "react";
import Cursor from "../../component/Helper/Cursor";
import { useNavigate, useLocation } from "react-router-dom";
import { allMessage } from "../../component/Helper/LogicServer";
import { ToastContainer } from "react-toastify";
import axios from "axios";

export default function Roles() {
  const { toastMessage, message } = allMessage();
  const location = useLocation();
  const redirect = useNavigate();

  const userIdFromRegistration = location.state?.userId;

  useEffect(() => {
    const registrationMessage = localStorage.getItem("registrationMessage");

    if (registrationMessage) {
      toastMessage("success", registrationMessage);
      localStorage.removeItem("registrationMessage");
    }
  }, [location.state]);

  const handleRoleSelection = (role) => {
    axios
      .post(
        "https://project-ii-server.vercel.app/api/assign-role",
        {
          userId: userIdFromRegistration,
          role: role,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("roleMessagge", `Welcome to become a ${role}`);
        const userId = res.data.userId;
        redirect("/login", { state: { userId: userId } });
      })
      .catch((error) => {
        toastMessage("error", error);
        console.error(error);
      });
  };

  return (
    <>
      <Cursor />
      <div className="roles">
        <div className="roles-container-seller">
          <div className="seller" onClick={() => handleRoleSelection("Seller")}>
            <span className="material-symbols-outlined">add_business</span>
            <span className="roles-text">Seller</span>
          </div>
          <div className="swap"></div>
        </div>
        <div className="roles-container-buyer">
          <div className="buyer" onClick={() => handleRoleSelection("Buyer")}>
            <span className="material-symbols-outlined">add_shopping_cart</span>
            <span className="roles-text">Buyer</span>
          </div>
          <div className="swap"></div>
        </div>
      </div>
      {message && <ToastContainer />}
    </>
  );
}
