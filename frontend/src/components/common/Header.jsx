import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
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
import { useDarkMode } from "../../contexts/DarkMode/DarkModeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const { toggleForm, userLogout, toggleProfile } = useContext(commonContext);
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
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
    // window.location.reload();
  };

  useEffect(() => {
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
  }, []);

  const dropdownRef = useRef();
  const sidebarRef = useRef();

  useOutsideClose(dropdownRef, () => {
    setShowDropdown(false);
  });
  useOutsideClose(sidebarRef, () => setSideBarOpen(false));

  const handleLoginClick = () => {
    setIsSignup(false);
    toggleForm(true);
  };

  const handleRegisterClick = () => {
    setIsSignup(true);
    toggleForm(true);
  };

  // Add this useEffect to handle body scroll
  useEffect(() => {
    if (isSideBarOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isSideBarOpen]);

  return (
    <>
      {localStorage.getItem("username") &&
        localStorage.getItem("username") !== "undefined" &&
        localStorage.getItem("usertype") === "patient" && (
          <div
            className={`overflow-x-hidden flex justify-between items-center py-4 px-40 border-b-[1px] border-blue-8 h-full transition-all duration-300 ease-out max-lg:px-5 max-sm:px-4 max-sm:py-4 max-xs:p-2 dark:bg-black-3 dark:text-white-1 dark:hover:text-blue-2 dark:border-grey-3 ${
              isScrolled ? "opacity-0 h-0 p-0" : ""
            }`}
          >
            <div
              className={`flex justify-center items-center flex-wrap text-grey-3 transition-transform duration-500 max-lg:justify-start dark:hover:text-white-1 dark:text-blue-2 ${
                isScrolled
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <Link
                to="/"
                className="flex justify-center items-center transition-all duration-300 ease-out hover:text-[#333] mr-[20px] max-xs:mr-0 dark:text-white-1 dark:text-opacity-80 dark:hover:text-opacity-100"
              >
                <FiMail className="text-[0.9em] leading-[1.4rem] mr-[5px]" />
                <p className="text-[0.9em] leading-[1.4rem]">
                  telmedsphere489@gmail.com
                </p>
              </Link>
              <Link
                to="/"
                className="flex justify-center items-center transition-all duration-300 ease-out hover:text-[#333] dark:text-white-1 dark:text-opacity-80 dark:hover:text-opacity-100"
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
              <Link
                to="/doctors"
                className="text-blue-5 font-bold transition-all duration-300 ease-out hover:text-blue-7 dark:text-white-1 dark:text-opacity-80 dark:hover:text-opacity-100"
              >
                Appointment
              </Link>
            </div>
          </div>
        )}
      <header
        className={`z-[999] w-full text-blue-8 transition-colors duration-300 ease-linear h-full bg-[#f5f5f5] dark:text-white-1 ${
          isSticky ? "sticky top-0 bg-blue-1 dark:bg-black-5" : "dark:bg-black-3"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </Link>

            {/* Navigation - Show only if logged in */}
            {localStorage.getItem("username") && (
              <nav className="hidden md:flex items-center space-x-8">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `nav-link ${
                      isActive
                        ? "text-blue-9 border-b-2 border-blue-9 dark:text-blue-32 dark:border-blue-5"
                        : "text-blue-8 dark:text-white-1 hover:text-blue-9 dark:hover:text-blue-2"
                    }`
                  }
                >
                  HOME
                </NavLink>

                {localStorage.getItem("usertype") === "patient" && (
                  <NavLink
                    to="/doctors"
                    className={({ isActive }) =>
                      `nav-link ${
                        isActive
                          ? "text-blue-9 border-b-2 border-blue-9 dark:text-blue-32 dark:border-blue-5"
                          : "text-blue-8 dark:text-white-1 hover:text-blue-9 dark:hover:text-blue-2"
                      }`
                    }
                  >
                    DOCTORS
                  </NavLink>
                )}

                <NavLink
                  to="/disease-prediction"
                  className={({ isActive }) =>
                    `nav-link ${
                      isActive
                        ? "text-blue-9 border-b-2 border-blue-9 dark:text-blue-32 dark:border-blue-5"
                        : "text-blue-8 dark:text-white-1 hover:text-blue-9 dark:hover:text-blue-2"
                    }`
                  }
                >
                  MODEL
                </NavLink>

                <NavLink
                  to="/buy-medicines"
                  className={({ isActive }) =>
                    `nav-link relative ${
                      isActive
                        ? "text-blue-9 border-b-2 border-blue-9 dark:text-blue-32 dark:border-blue-5"
                        : "text-blue-8 dark:text-white-1 hover:text-blue-9 dark:hover:text-blue-2"
                    }`
                  }
                >
                  MEDICINES
                  <span className="absolute -top-4 -right-6 px-2 py-1 text-xs bg-blue-8 text-white-1 rounded-full dark:bg-blue-25">
                    20% off
                  </span>
                </NavLink>
              </nav>
            )}

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isDarkMode ? (
                  <FaSun className="w-5 h-5 text-white-1" />
                ) : (
                  <FaMoon className="w-5 h-5 text-blue-8" />
                )}
              </button>

              {/* Login/Register buttons - Show only if not logged in */}
              {!localStorage.getItem("username") ? (
                <div className="hidden md:flex items-center space-x-4">
                  <button
                    onClick={handleLoginClick}
                    className="px-6 py-2 rounded-md bg-blue-4 text-white-1 hover:bg-blue-6 dark:bg-blue-25 dark:hover:bg-blue-31"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleRegisterClick}
                    className="px-6 py-2 rounded-md bg-blue-4 text-white-1 hover:bg-blue-6 dark:bg-blue-25 dark:hover:bg-blue-31"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <span>ACCOUNT</span>
                  </button>
                  {/* Account dropdown menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-blue-6 p-6 text-[0.9rem] rounded-[3px] text-[#eee] border-[1px] border-grey-3 z-50 transition-all duration-200 ease-in-out dark:bg-blue-31">
                      <div>
                        <h4 className="font-semibold space-x-[0.5px] text-blue-2">
                          <span className="text-[1em] opacity-95 hover:opacity-100 text-white-1">
                            Hello! &nbsp;
                          </span>
                          <span className="dark:text-white-1/75">
                            {localStorage.getItem("username")}
                          </span>
                        </h4>
                        <p className="text-[0.8rem] mt-2">
                          Have a great health!!
                        </p>
                        <button
                          type="button"
                          className="mt-4 py-[0.8rem] px-4 rounded-[4px] border-[1px] transition-all duration-300 hover:text-blue-1 hover:border-blue-5 hover:bg-blue-5 text-blue-1 border-blue-3 mr-[10px] bg-blue-3"
                          onClick={() => {
                            setShowDropdown(false);
                            toggleProfile(true);
                          }}
                        >
                          Profile
                        </button>
                        <button
                          type="button"
                          className="mt-4 py-[0.8rem] px-4 rounded-[4px] border-[1px] transition-all duration-300 hover:text-blue-1 hover:border-blue-5 hover:bg-blue-5 text-blue-1 border-blue-3 mr-[10px]"
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
                        <div className="my-4 border-t-[1px] border-grey-2"></div>
                        <ul>
                          <li className="mb-[0.7rem] flex">
                            <IoWalletOutline className="text-[1.4em] mr-[5px]" />
                            <Link
                              to="/my-wallet"
                              onClick={() => setShowDropdown(false)}
                            >
                              My Wallet
                            </Link>
                          </li>
                          <li className="mb-[0.7rem] flex">
                            <AiOutlineShoppingCart className="text-[1.4em] mr-[5px]" />
                            <Link
                              to="/my-cart"
                              onClick={() => setShowDropdown(false)}
                            >
                              My Cart
                            </Link>
                            <span className="bg-blue-3 text-[0.8rem] rounded-[3px] ml-[10px] py-[0.1rem] px-[0.4rem] text-white">
                              {cartItems.length}
                            </span>
                          </li>
                          <li className="flex">
                            <RiFileList3Line className="text-[1.4em] mr-[5px]" />
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
                  )}
                </div>
              )}

              {/* Mobile menu button - Update styling */}
              <button
                onClick={() => setSideBarOpen(!isSideBarOpen)}
                className="md:hidden p-2.5 rounded-lg bg-blue-4 text-white-1 hover:bg-blue-6 dark:bg-blue-25 dark:hover:bg-blue-31 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isSideBarOpen ? (
                  <MdClose size={24} className="text-white-1" />
                ) : (
                  <CiMenuFries size={24} className="text-white-1" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isSideBarOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setSideBarOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`mobile-menu transform transition-transform duration-300 ${
          isSideBarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="mobile-menu-content">
          <div className="container mx-auto px-4 py-2">
            {localStorage.getItem("username") ? (
              <>
                {/* User info section */}
                <div className="px-4 py-3 border-b border-blue-2 dark:border-blue-7">
                  <h4 className="font-semibold text-blue-8 dark:text-white-1">
                    <span className="opacity-95">Hello! &nbsp;</span>
                    <span>{localStorage.getItem("username")}</span>
                  </h4>
                  <p className="text-sm mt-1 text-blue-6 dark:text-blue-2">
                    Have a great health!!
                  </p>
                </div>

                {/* Navigation Links */}
                <div className="mobile-menu-section">
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      `mobile-menu-link ${
                        isActive
                          ? "mobile-menu-link-active"
                          : "mobile-menu-link-inactive"
                      }`
                    }
                    onClick={() => setSideBarOpen(false)}
                  >
                    HOME
                  </NavLink>

                  {localStorage.getItem("usertype") === "patient" && (
                    <NavLink
                      to="/doctors"
                      className={({ isActive }) =>
                        `mobile-menu-link ${
                          isActive
                            ? "mobile-menu-link-active"
                            : "mobile-menu-link-inactive"
                        }`
                      }
                      onClick={() => setSideBarOpen(false)}
                    >
                      DOCTORS
                    </NavLink>
                  )}

                  <NavLink
                    to="/disease-prediction"
                    className={({ isActive }) =>
                      `mobile-menu-link ${
                        isActive
                          ? "mobile-menu-link-active"
                          : "mobile-menu-link-inactive"
                      }`
                    }
                    onClick={() => setSideBarOpen(false)}
                  >
                    MODEL
                  </NavLink>

                  <NavLink
                    to="/buy-medicines"
                    className={({ isActive }) =>
                      `mobile-menu-link relative ${
                        isActive
                          ? "mobile-menu-link-active"
                          : "mobile-menu-link-inactive"
                      }`
                    }
                    onClick={() => setSideBarOpen(false)}
                  >
                    <span className="flex items-center justify-between">
                      MEDICINES
                      <span className="px-2 py-1 text-xs bg-blue-8 text-white-1 rounded-full dark:bg-blue-25">
                        20% off
                      </span>
                    </span>
                  </NavLink>
                </div>

                {/* Account Options */}
                <div className="py-4 space-y-2">
                  <h3 className="px-4 text-sm font-medium text-blue-6 dark:text-blue-2 uppercase tracking-wider">
                    Account Settings
                  </h3>

                  <button
                    onClick={() => {
                      toggleProfile(true);
                      setSideBarOpen(false);
                    }}
                    className="mobile-menu-link mobile-menu-link-inactive w-full text-left flex items-center"
                  >
                    Profile
                  </button>

                  <Link
                    to="/my-wallet"
                    className="mobile-menu-link mobile-menu-link-inactive flex items-center"
                    onClick={() => setSideBarOpen(false)}
                  >
                    <IoWalletOutline className="text-xl mr-2" />
                    My Wallet
                  </Link>

                  <Link
                    to="/my-cart"
                    className="mobile-menu-link mobile-menu-link-inactive flex items-center justify-between"
                    onClick={() => setSideBarOpen(false)}
                  >
                    <span className="flex items-center">
                      <AiOutlineShoppingCart className="text-xl mr-2" />
                      My Cart
                    </span>
                    {cartItems.length > 0 && (
                      <span className="bg-blue-3 text-sm rounded px-2 py-0.5 text-white-1">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/my-orders"
                    className="mobile-menu-link mobile-menu-link-inactive flex items-center"
                    onClick={() => setSideBarOpen(false)}
                  >
                    <RiFileList3Line className="text-xl mr-2" />
                    My Orders
                  </Link>

                  <button
                    onClick={() => {
                      localStorage.getItem("usertype") === "doctor"
                        ? updatestatus()
                        : userLogout();
                      setSideBarOpen(false);
                      navigate("/");
                    }}
                    className="mobile-menu-link w-full text-left text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="py-4 space-y-3">
                <button
                  onClick={() => {
                    handleLoginClick();
                    setSideBarOpen(false);
                  }}
                  className="mobile-menu-button mobile-menu-button-primary"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleRegisterClick();
                    setSideBarOpen(false);
                  }}
                  className="mobile-menu-button mobile-menu-button-primary"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      <AccountForm isSignup={isSignup} setIsSignup={setIsSignup} />
      <Profile />
    </>
  );
};

export default Header;
