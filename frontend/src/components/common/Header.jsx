import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import commonContext from "../../contexts/common/commonContext";
import AccountForm from "../form/Accountform";
import cartContext from "../../contexts/cart/cartContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useOutsideClose from "../../hooks/useOutsideClose";
import httpClient from "../../httpClient";
import { RiFileList3Line } from "react-icons/ri";
import Profile from "./Profile";
import { FiMail } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import logo from "../../assets/header.png";

const Header = () => {
  const { toggleForm, setFormUserInfo, userLogout, toggleProfile } =
    useContext(commonContext);
  const { cartItems, setCartItems } = useContext(cartContext);
  const [isSticky, setIsSticky] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const curPath = location.pathname;
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const windowWidth = window.innerWidth;
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  useEffect(() => {
    const handleIsSticky = () =>
      window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);
    const handleIsScrolled = () =>
      window.scrollY >= 1 ? setIsScrolled(true) : setIsScrolled(false);

    window.addEventListener("scroll", handleIsSticky);
    window.addEventListener("scroll", handleIsScrolled);

    return () => {
      window.removeEventListener("scroll", handleIsSticky);
      window.removeEventListener("scroll", handleIsScrolled);
    };
  }, [isSticky, isScrolled]);

  const updatestatus = () => {
    httpClient.put("/doc_status", { email: localStorage.getItem("email") });
    userLogout();
  };

  useEffect(() => {
    {
      localStorage.getItem("email") &&
        localStorage.getItem("email") !== "undefined" &&
        httpClient
          .post("/get_cart", { email: localStorage.getItem("email") })
          .then((res) => {
            setCartItems(res.data.cart);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [localStorage.getItem("email")]);

  const dropdownRef = useRef();
  const sidebarRef = useRef();

  useOutsideClose(dropdownRef, () => setShowDropdown(false));
  useOutsideClose(sidebarRef, () => setSideBarOpen(false));

  const handleLoginClick = () => {
    setIsSignup(false);
    toggleForm(true);
  };

  const handleRegisterClick = () => {
    setIsSignup(true);
    toggleForm(true);
  };

  return (
    <>
      {localStorage.getItem("username") &&
        localStorage.getItem("username") !== "undefined" &&
        localStorage.getItem("usertype") === "patient" && (
          // contact-header
          // flex justify-between items-center  border-b-[1px] border-blue-8 h-full transition-all duration-300 ease-out max-[950px]:py-4 max-[950px]:px-8 max-xs:p-4  ${isScrolled ? "hidden opacity-0 py-0 h-0" : "visible opacity-100 py-4 px-40"}
          // hidden md:flex justify-between items-center px-4 lg:px-40 py-4 border-b border-blue-800
          //         transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 invisible p-0' : 'h-full opacity-100 visible'}
          // className={`flex justify-between items-center py-4 px-40 C h-full max-[950px]:px-8 max-[950px]:py-4 max-xs:p-4 ${
          //     isScrolled
          //       ? ""
          //       : ""
          //   }`}
          <div
            className={`overflow-x-hidden flex justify-between items-center py-4 px-40 border-b-[1px] border-blue-8 h-full transition-all duration-300 ease-out max-lg:px-5 max-sm:px-8 max-sm:py-4 max-xs:p-4 ${
              isScrolled ? "opacity-0 h-0 p-0" : ""
            }`}
          >
            {/* details */}
            <div
              className={`flex justify-center items-center flex-wrap text-grey-3 transition-transform duration-500 max-lg:justify-start ${
                isScrolled
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              {/* contact-detail */}
              <Link
                to="/"
                className="flex justify-center items-center transition-all duration-300 ease-out hover:text-[#333] mr-[20px] max-xs:mr-0"
              >
                {/* icon */}
                <FiMail className="text-[0.9em] leading-[1.4rem] mr-[5px]" />
                {/* detail */}
                <p className="text-[0.9em] leading-[1.4rem]">
                  telmedsphere489@gmail.com
                </p>
              </Link>
              {/* contact-detail */}
              <Link
                to="/"
                className="flex justify-center items-center transition-all duration-300 ease-out hover:text-[#333]"
              >
                <FiPhoneCall className="text-[0.9em] leading-[1.4rem] mr-[5px]" />
                <p className="text-[0.9em] leading-[1.4rem]">+91 12345 67890</p>
              </Link>
            </div>
            <div
              className={`transition-transform duration-500 ${
                isScrolled
                  ? "translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              {/* appt-link */}
              <Link
                to="/doctors"
                className="text-blue-5 font-bold transition-all duration-300 ease-out hover:text-blue-7"
              >
                Appointment
              </Link>
            </div>
          </div>
        )}
      {/* relative top-0 left-0 z-[999] bg-[#d4ddf1] w-full text-blue-8 py-6 px-8 pt-6 pb-6 transition-colors duration-200 ease-linear */}
      <header
        id=""
        className={`z-[999]  w-full text-blue-8 px-8 pt-6 pb-6 transition-colors duration-0 ease-linear h-full ${
          isSticky ? "top-0 sticky bg-blue-1" : ""
        } `}
      >
        <div className="max-w-[1440px] mx-auto px-6 max-xl:max-w-[1280px] max-lg:max-w-[1024px] max-md:max-w-[768px] max-sm:max-w-[640px] max-xs:max-w-full h-full">
          {/* navbar */}
          <div className="flex justify-between items-center gap-4">
            {/* nav_logo */}
            <h2 className="flex items-center">
              <Link to="/">
                <img
                  src={logo}
                  alt=""
                  className="max-h-[45px] h-auto w-auto hover:text-blue-9"
                />
              </Link>
            </h2>
            {!localStorage.getItem("username") && (
              <>
                {/* auth-buttons */}
                <div className="flex gap-4 items-center ml-auto">
                  {/* get_started_btn */}
                  <button
                    type="button"
                    onClick={handleLoginClick}
                    className="py-[0.7rem] px-6 rounded-[4px] text-white-1 bg-blue-4 transition-colors duration-300 cursor-pointer hover:bg-blue-6"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={handleRegisterClick}
                    className="py-[0.7rem] px-6 rounded-[4px] text-white-1 bg-blue-4 transition-colors duration-300 cursor-pointer hover:bg-blue-6"
                  >
                    Register
                  </button>
                </div>
              </>
            )}

            {localStorage.getItem("username") !== null &&
            localStorage.getItem("username") !== undefined ? (
              windowWidth >= 800 ? (
                // nav_actions
                <nav className="flex justify-between items-center gap-12 flex-wrap w-auto overflow-x-hidden">
                    {/* dash_action */}
                  <div
                    className={`hover:text-blue-9 content-none  transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center text-blue-8 ${
                      curPath === "/home" ? "text-blue-9 border-b-[2px] border-blue-9" : ""
                    }`}
                  >
                    <span onClick={() => navigate("/home")} className="cursor-pointer font-bold">HOME</span>
                  </div>

                  {localStorage.getItem("usertype") === "patient" && (
                    <div
                      className={`hover:text-blue-9 content-none  transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center text-blue-8 ${
                        curPath === "/doctors" ? "text-blue-9 border-b-[2px] border-blue-9" : ""
                      }`}
                    >
                      <span onClick={() => navigate("/doctors")} className="cursor-pointer font-bold">DOCTORS</span>
                    </div>
                  )}
                    {/* model_action */}
                  <div
                    className={`hover:text-blue-9 content-none  transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center text-blue-8 ${
                      curPath === "/disease-prediction" ? "text-blue-9 border-b-[2px] border-blue-9" : ""
                    }`}
                  >
                    <span onClick={() => navigate("/disease-prediction")} className="cursor-pointer font-bold">
                      MODEL
                    </span>
                  </div>

                  {/* <div className={`model_action ${curPath==="/dispred"? "active" : ""}`}>
                                            <span onClick={() => navigate("/dispred")}>
                                                MODEL 2
                                            </span>
                                        </div> */}

                   <div
                    className={`hover:text-blue-9 content-none  transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center text-blue-8 ${
                      curPath === "/buy-medicines" ? "text-blue-9 border-b-[2px] border-blue-9" : ""
                    }`}
                  >
                    <span onClick={() => navigate("/buy-medicines")} className="cursor-pointer font-bold relative">
                      MEDICINES
                      <span className="cursor-pointerfont-bold px-[5px] py-[3px] bg-blue-8 absolute -top-[14px] text-white-1 -right-[40px] rounded-[40px] hover:bg-blue-9 text-[10px] z-9999">20% off</span>
                    </span>
                  </div>

                  <div className="user_action">
                    <span onClick={() => setShowDropdown(!showDropdown)}>
                      ACCOUNT
                    </span>
                    <div
                      className={` ${showDropdown && "active"}`}
                      ref={dropdownRef}
                    >
                      <h4>
                        Hello!{" "}
                        {localStorage.getItem("username") !== undefined && (
                          <span>&nbsp;{localStorage.getItem("username")}</span>
                        )}
                      </h4>
                      <p>Have a great health!!</p>
                      <button
                        type="button"
                        className="profile_btn"
                        onClick={() => {
                          setShowDropdown(false);
                          toggleProfile(true);
                        }}
                      >
                        Profile
                      </button>
                      <button
                        type="button"
                        className="logout_btn"
                        onClick={() => {
                          setShowDropdown(false);
                          localStorage.getItem("usertype") === "doctor"
                            ? updatestatus()
                            : userLogout();
                          navigate("/");
                        }}
                      >
                        Logout
                      </button>
                      <div className="separator"></div>
                      <ul>
                        <li>
                          <IoWalletOutline className="cart-icon" />
                          <Link
                            to="/my-wallet"
                            onClick={() => setShowDropdown(false)}
                          >
                            My Wallet
                          </Link>
                        </li>
                        <li>
                          <AiOutlineShoppingCart className="cart-icon" />
                          <Link
                            to="/my-cart"
                            onClick={() => setShowDropdown(false)}
                          >
                            My Cart
                          </Link>
                          <span className="cart_badge">{cartItems.length}</span>
                        </li>
                        <li>
                          <RiFileList3Line className="cart-icon" />
                          <Link
                            to="/my-orders"
                            onClick={() => setShowDropdown(false)}
                          >
                            My Orders
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div> 
                </nav>
              ) : (
                <div id="sidebar">
                  <div
                    className="sidebar-icon"
                    onClick={() => setSideBarOpen((prev) => !prev)}
                  >
                    {isSideBarOpen ? <MdClose /> : <CiMenuFries />}
                  </div>
                  <div
                    className={`collapse ${isSideBarOpen ? "active" : ""}`}
                    ref={sidebarRef}
                  >
                    <nav className="nav_actions">
                      <div
                        className={`dash_action ${
                          curPath === "/home" ? "active" : ""
                        }`}
                      >
                        <span
                          onClick={() => {
                            navigate("/home");
                            setSideBarOpen(false);
                          }}
                        >
                          HOME
                        </span>
                      </div>

                      {localStorage.getItem("usertype") === "patient" && (
                        <div
                          className={`doctor_action ${
                            curPath === "/doctors" ? "active" : ""
                          }`}
                        >
                          <span
                            onClick={() => {
                              navigate("/doctors");
                              setSideBarOpen(false);
                            }}
                          >
                            DOCTORS
                          </span>
                        </div>
                      )}

                      <div
                        className={`model_action ${
                          curPath === "/disease-prediction" ? "active" : ""
                        }`}
                      >
                        <span
                          onClick={() => {
                            navigate("/disease-prediction");
                            setSideBarOpen(false);
                          }}
                        >
                          MODEL
                        </span>
                      </div>

                      <div
                        className={`medicine_action ${
                          curPath === "/buy-medicines" ? "active" : ""
                        }`}
                      >
                        <span
                          onClick={() => {
                            navigate("/buy-medicines");
                            setSideBarOpen(false);
                          }}
                        >
                          MEDICINES
                          <span className="badge">20% off</span>
                        </span>
                      </div>

                      <div className="user_action">
                        <span
                          onClick={() => {
                            setSideBarOpen((prev) => !prev);
                            setShowDropdown(true);
                          }}
                        >
                          ACCOUNT
                        </span>
                      </div>
                    </nav>
                  </div>
                  <div
                    className={`dropdown_menu ${showDropdown && "active"}`}
                    ref={dropdownRef}
                  >
                    <h4>
                      Hello!{" "}
                      {localStorage.getItem("username") !== undefined && (
                        <span>&nbsp;{localStorage.getItem("username")}</span>
                      )}
                    </h4>
                    <p>Have a great health!!</p>
                    <button
                      type="button"
                      className="profile_btn"
                      onClick={() => {
                        setShowDropdown(false);
                        toggleProfile(true);
                      }}
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      className="logout_btn"
                      onClick={() => {
                        setShowDropdown(false);
                        localStorage.getItem("usertype") === "doctor"
                          ? updatestatus()
                          : userLogout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                    <div className="separator"></div>
                    <ul>
                      <li>
                        <IoWalletOutline className="cart-icon" />
                        <Link
                          to="/my-wallet"
                          onClick={() => setShowDropdown(false)}
                        >
                          My Wallet
                        </Link>
                      </li>
                      <li>
                        <AiOutlineShoppingCart className="cart-icon" />
                        <Link
                          to="/my-cart"
                          onClick={() => setShowDropdown(false)}
                        >
                          My Cart
                        </Link>
                        <span className="cart_badge">{cartItems.length}</span>
                      </li>
                      <li>
                        <RiFileList3Line className="cart-icon" />
                        <Link
                          to="/my-orders"
                          onClick={() => setShowDropdown(false)}
                        >
                          My Orders
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )
            ) : null}
          </div>
        </div>
      </header>

      <AccountForm isSignup={isSignup} setIsSignup={setIsSignup} />
      <Profile />
    </>
  );
};

export default Header;
