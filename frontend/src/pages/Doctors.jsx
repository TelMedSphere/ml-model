import React, { useState, useEffect, useContext } from "react";
import { IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IoMdMail } from "react-icons/io";
import { RiWhatsappFill } from "react-icons/ri";
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import useDocTitle from "../hooks/useDocTitle";
import { AiFillStar, AiOutlineClockCircle } from 'react-icons/ai';
import { TbPointFilled } from 'react-icons/tb';
import { useNavigate } from "react-router-dom";
import httpClient from "../httpClient";
import { Alert, CircularProgress } from "@mui/material";
import { IoMdRefresh } from "react-icons/io";
import useActive from "../hooks/useActive";
import { FaVideo } from "react-icons/fa";
import Preloader from "../components/common/Preloader";
import commonContext from "../contexts/common/commonContext";
import useScrollDisable from "../hooks/useScrollDisable";

const Doctors = () => {

  useDocTitle("Doctors");

  const { isLoading, toggleLoading } = useContext(commonContext);

  const [meetModal, setMeetModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [isInstantMeet, setInstantMeet] = useState(false);
  const [isConnecting, setConnecting] = useState(false);
  const [isScheduleMeet, setScheduleMeet] = useState(false);
  const [isInvDateTime, setInvDateTime] = useState(false);
  const [scheduleAlert, setScheduleAlert] = useState(0);
  const [meetScheduling, setMeetScheduling] = useState(false);
  const [curDate, setCurDate] = useState(null);
  const [curTime, setCurTime] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const [available, setAvailable] = useState({
    "08:00": true, "09:00": true, "10:00": true, "11:00": true, "12:00": true, "15:00": true, "16:00": true, "17:00": true, "18:00": true
  });

  // Set this to user's balance amount
  const [balance, setBalance] = useState(0);
  const [isLowBalance, setLowBalance] = useState(false);
  const [curFee, setCurFee] = useState(0);


  const navigate = useNavigate();
  const userNotExists = localStorage.getItem("usertype") === undefined || localStorage.getItem("usertype") === null;

  useEffect(() => {
    if (userNotExists) {
      navigate("/");
    }
    else {
      fetchDoctors();
    }
    //eslint-disable-next-line 
  }, []);
 
  useEffect(() => {
    handletimings();
  }, [isScheduleMeet, curDate])

  function fetchDoctors() {
    setFetchingData(true);
    toggleLoading(true);
    httpClient.get("/get_status").then((res) => {
      setDoctors(res.data.details);
      // console.log(doctors)
      toggleLoading(false);
      setFetchingData(false); 
    }).catch(() => {
      // console.log(res)
      toggleLoading(false);
      setFetchingData(false);
    });
  };

  function checkInvDateTime(date, time) {
    const now = new Date(new Date().getTime() + 30 * 60000);
    const d = new Date(date + ' ' + time);
    setInvDateTime(now >= d);
  }


  const handleSchedule = (upcomingAppointments) => {
    for (let i = 0; i < upcomingAppointments.length; i++) {
      const now = new Date(curDate + " " + curTime);
      const d1 = new Date(new Date(upcomingAppointments[i].date + ' ' + upcomingAppointments[i].time).getTime() - 30 * 60000);
      const d2 = new Date(new Date(upcomingAppointments[i].date + ' ' + upcomingAppointments[i].time).getTime() + 30 * 60000);

      if (d1 < now && now <= d2)
        return false;
    };
    return true;
  };

  const handletimings = () => {

    {
      selectEmail !== "" ? httpClient.post('/set_appointment', {
        email: selectEmail
      }).then((res) => {
        // console.log(res.data);
        const appointments = res.data.appointments;
        let times = {
          "08:00": true, "09:00": true, "10:00": true, "11:00": true, "12:00": true, "15:00": true, "16:00": true, "17:00": true, "18:00": true
        };
        console.log(curDate)
        appointments.filter((item) => item.date === curDate).map((item) => {
          times[item.time] = false;
          return null;
        });
        setAvailable(times);
      }).catch((err) => {
        console.log(err);
      }) : null
    }
  };

  const doctorNames = doctors.map(item => "Dr. " + item.username.split(" ").map(item => item[0].toUpperCase() + item.slice(1).toLowerCase()).join(" "));
  const [selectedDoc, setSelectedDoc] = useState(doctorNames[0]);
  const [selectedDocStatus, setSelectedDocStatus] = useState(false);
  const [selectedDocAvailable, setSelectedDocAvailable] = useState(false);
  const [selectEmail, setSelectEmail] = useState("");
  const [message, setMessage] = useState("");
  const timings = [{ time: "08:00", available: available["08:00"] }, { time: "09:00", available: available["09:00"] }, { time: "10:00", available: available["10:00"] }, { time: "11:00", available: available["11:00"] }, { time: "12:00", available: available["12:00"] }, { time: "15:00", available: available["15:00"] }, { time: "16:00", available: available["16:00"] }, { time: "17:00", available: available["17:00"] }, { time: "18:00", available: available["18:00"] }];
  const { handleActive, activeClass } = useActive(-1);

  const handlemeet = () => {
    const time = new Date().getTime();
    console.log(time)
    httpClient.post("/meet_status", { "email": selectEmail }).then((res) => {
      if (res.status === 200) {
        httpClient.put("/make_meet", {
          "email": selectEmail,
          "link": `/instant-meet?meetId=${time}&selectedDoc=${selectedDoc}&selectedMail=${encodeURIComponent(selectEmail)}&name=${localStorage.getItem("username")}&age=${localStorage.getItem("age")}&gender=${localStorage.getItem("gender")}&pemail=${localStorage.getItem("email")}&fee=${curFee}`,
          "patient": localStorage.getItem("username")
        }).then((res) => {
          setTimeout(() => {
            httpClient.post("/currently_in_meet", { "email": selectEmail }).then((res) => {
              if (res.data.curmeet) {
                setConnecting(false);
                navigate(`/instant-meet?meetId=${time}&selectedDoc=${selectedDoc}&selectedMail=${encodeURIComponent(selectEmail)}&name=${localStorage.getItem("username")}&age=${localStorage.getItem("age")}&gender=${localStorage.getItem("gender")}&pemail=${localStorage.getItem("email")}fee=${curFee}`);
              }
              else {
                httpClient.put('/delete_meet', { "email": selectEmail })
                setConnecting(false);
                setMessage(res.data.message);
              }
            })
          }, 20000);
        }).catch(() => {
          // console.log(res)
        })
      }
      else {
        setConnecting(false);
        setMessage(res.data.message);
      }
    }).catch(() => {
      // console.log(res)
    })

  };

  useEffect(() => {
    httpClient.post("/get_wallet", { "email": localStorage.getItem("email") }).then((res) => {
      setBalance(res.data.wallet);
    }).catch(() => {
      // console.log(res)
    })
  }, []);

  const columns = [
    { field: "id", headerName: "#", headerAlign: "center", align: "center", width: 100 },
    {
      field: "username", headerName: "Doctor", headerAlign: "center", align: "left", width: 150,
      renderCell: (params) => {
        const fullname = "Dr. " + params.row.username.split(" ").map(item => item[0].toUpperCase() + item.slice(1).toLowerCase()).join(" ");
        return (
          <div className="name-column--cell">
            {fullname}
          </div>
        );
      }
    },
    { field: "email", headerName: "Email", headerAlign: "center", align: "left", width: 150 },
    {
      field: "gender", headerName: "Gender", headerAlign: "center", align: "center", width: 100, renderCell: (params) => {
        return <>{params.row.gender[0].toUpperCase() + params.row.gender.slice(1).toLowerCase()}</>
      }
    },
    { field: "specialization", headerName: "Specialization", headerAlign: "center", align: "center", width: 150, },
    { field: "fee", headerName: "Fee", headerAlign: "center", align: "center", width: 100,
      renderCell: (params) => {
        return (
          <div>₹ {params.row.fee}</div>
        )
      }
     },
    {
      field: "languages", headerName: "Languages", headerAlign: "center", align: "center", width: 100,
      renderCell: () => {
        return (
          <div className="social-column--cell">
            English / Hindi
          </div>
        )
      },
    },
    // {
    //   field: "contact", headerName: "Contact", headerAlign: "center", align: "center", width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <div className="social-column--cell">
    //         <IconButton onClick={() => {
    //           const shareUrl = `https://wa.me/${params.row.phone}?text=Hello sir,%0AI want to talk to you!!`;
    //           window.open(shareUrl, "_blank");
    //         }}>
    //           <RiWhatsappFill className="social-icon whatsapp" />
    //         </IconButton>
    //         <IconButton onClick={() => {
    //           window.open(`mailto:${params.row.email}`, "_blank");
    //         }}>
    //           <IoMdMail className="social-icon mail" />
    //         </IconButton>
    //       </div>
    //     )
    //   },
    // },
    {
      field: "ratings",
      headerName: "Ratings", headerAlign: "center", align: "center", width: 100,
      renderCell: (params) => {
        return (
          <div className="ratings-column--cell">
            {params.row.noOfAppointments ? <>{(params.row.noOfStars / params.row.noOfAppointments).toFixed(1)} <AiFillStar className="ratings-icon" /></> : <>0 <AiFillStar className="ratings-icon" /></>}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status", headerAlign: "center", align: "center", width: 100,
      renderCell: (params) => {
        return (
          <div className="status-column--cell">
            <TbPointFilled className={`${params.row.status === "online" ? "green-icon" : "red-icon"}`} /> {params.row.status}
          </div>
        );
      },
    },
    {
      field: "appointments",
      headerName: "Book an Appointment", headerAlign: "center", align: "center", width: 150,
      renderCell: (params) => {
        return (
          <div className="appointment-column--cell">
            <button onClick={() => {
              if(params.row.fee > balance) {
                setLowBalance(true);
                setCurFee(params.row.fee);
              } else {
                setSelectEmail(params.row.email);
                setSelectedDocStatus(params.row.status === "online");
                setSelectedDocAvailable(params.row.isInMeet);
                setScheduleMeet(false);
                setInstantMeet(false);
                setLowBalance(false);
              }
              setSelectedDoc("Dr. " + params.row.username.split(" ").map(item => item[0].toUpperCase() + item.slice(1).toLowerCase()).join(" "));
              setMeetModal(true);
            }}>
              BOOK
            </button>
          </div>
        );
      },
    },
  ];

  useScrollDisable(isLoading);

  if(isLoading) {
    return <Preloader />;
  };

  return (
    <>
      <div className="py-24 text-center">
        <div className="min-h-[600px] p-2.5 mx-auto text-blue-800 max-w-[1300px] w-full">
          <div className="flex justify-center items-center">
            <h3 className="text-2xl font-semibold">Doctor Details</h3>
            <div className="relative ml-2.5 group">
              <span 
                className={`${fetchingData ? 'cursor-not-allowed' : 'cursor-pointer'} 
                  bg-blue-500 hover:bg-blue-700 transition-all duration-300 rounded px-1.5 pb-0.5 text-2xl text-white inline-flex`}
                onClick={fetchDoctors}
              >
                <IoMdRefresh className={`${fetchingData ? 'animate-spin' : ''}`} />
              </span>
              <div className="invisible group-hover:visible absolute top-[-8px] left-12 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                Refresh details
              </div>
            </div>
          </div>

          <div className="min-h-[500px] max-h-[500px] shadow-lg rounded-lg my-5 mx-auto">
            <DataGrid
              className="w-full border-none"
              rows={doctors}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        </div>
      </div>

      <Modal
        open={meetModal && isLowBalance}
        onClose={() => {
          setMessage("");
          setMeetModal(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[min(400px,90vw)] p-4 bg-white rounded-lg shadow-lg border-2 border-blue-200">
          <div className="text-right">
            <IoMdClose 
              className="text-blue-500 hover:text-blue-800 transition-all duration-300 cursor-pointer" 
              onClick={() => {
                setMessage("");
                setMeetModal(false);
                setConnecting(false);
                httpClient.put('/delete_meet', { email: selectEmail });
              }}
            />
          </div>
          <div className="flex flex-col items-start justify-center mx-4">
            <h3 className="text-xl text-blue-800">Uhuh!!</h3>
            <p className="text-red-600">Low Balance!</p>
            <div className="flex justify-between items-center w-full mt-4">
              <div className="text-blue-800 text-lg">{`Doctor Fee (${selectedDoc})`}</div>
              <div className="text-lg font-bold">₹ {curFee}</div>
            </div>
            <div className="flex justify-between items-center w-full mt-4">
              <div className="text-blue-800 text-lg">Available Balance</div>
              <div className="text-lg font-bold">₹ {balance}</div>
            </div>
            <div className="flex justify-between items-center w-full mt-4 pt-4 border-t-2 border-blue-700">
              <div className="text-red-600 text-lg">Remaining Balance</div>
              <div className="text-red-600 text-lg font-bold">₹ {(curFee - balance).toFixed(2)}</div>
            </div>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mx-auto my-6 mt-8 transition-all duration-300"
              onClick={() => navigate(`/my-wallet?recharge=${curFee - balance}`)}
            >
              Recharge Wallet
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={meetModal && !isLowBalance}
        onClose={() => {
          setMessage("");
          setMeetModal(false);
          setConnecting(false);
        }}
      >
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          ${!selectedDocAvailable && selectedDocStatus ? "w-[min(570px,90vw)]" : "w-[min(400px,90vw)]"}
          p-4 bg-white rounded-lg shadow-lg border-2 border-blue-200 text-blue-700 text-center`}>
          
          <div className="text-right">
            <IoMdClose 
              className="text-blue-500 hover:text-blue-800 transition-all duration-300 cursor-pointer" 
              onClick={() => {
                setMessage("");
                setMeetModal(false);
                setConnecting(false);
                httpClient.put('/delete_meet', { email: selectEmail });
              }}
            />
          </div>

          <div>
            <h3 className="text-xl mb-4">Wanna meet?</h3>
            <div className="flex justify-center items-center flex-wrap mb-6">
              {selectedDocStatus && !selectedDocAvailable && (
                <div 
                  className="bg-gray-300 text-white p-4 m-4 rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300 shadow-md"
                  onClick={() => {
                    setScheduleMeet(false);
                    setInstantMeet(!isInstantMeet);
                    setConnecting(false);
                  }}
                >
                  Create an Instant meet
                </div>
              )}
              <div 
                className="bg-gray-300 text-white p-4 m-4 rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300 shadow-md"
                onClick={() => {
                  const d = new Date();
                  setCurDate(`${d.getFullYear()}-${parseInt(d.getMonth()) < 9 ? '0' : ''}${d.getMonth() + 1}-${parseInt(d.getDate()) < 10 ? '0' : ''}${d.getDate()}`);
                  setCurTime(`${parseInt(d.getHours()) < 10 ? '0' : ''}${d.getHours()}:${parseInt(d.getMinutes()) < 10 ? '0' : ''}${d.getMinutes()}`);
                  setInvDateTime(true);
                  setScheduleMeet(!isScheduleMeet);
                  setInstantMeet(false);
                  setConnecting(false);
                }}
              >
                Schedule a meet
              </div>
            </div>
            {message && (
              <div className="text-red-500 mb-4">
                Oops! {selectedDoc} is currently in another meet, you can wait a few minutes or else schedule your meet.
              </div>
            )}
          </div>

          {isInstantMeet && (
            <div className="pb-6 text-center">
              {isConnecting ? (
                <div>
                  <div className="flex justify-center items-center space-x-2">
                    {[...Array(10)].map((_, index) => (
                      <div
                        key={index}
                        className="w-1 h-24 bg-gradient-to-tr from-red-500 to-gray-100 rounded-lg animate-wave"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <div className="mt-4">Connecting...</div>
                </div>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all duration-300 flex items-center justify-center space-x-2"
                  onClick={() => {
                    setConnecting(true);
                    handlemeet();
                  }}
                >
                  <span>Connect</span>
                  <FaVideo />
                </button>
              )}
            </div>
          )}

          {isScheduleMeet && (
            <div className="pb-6">
              <h3 className="text-xl mb-4">Pick a Date and Time</h3>
              {isInvDateTime && <Alert severity="error">Pick a future date and time</Alert>}
              {scheduleAlert !== 0 && (
                <Alert severity={scheduleAlert === 1 ? "error" : "success"}>
                  {scheduleAlert === 1 
                    ? "Doctor isn't available at that time. Please pick up some other time" 
                    : "Meet scheduled successfully"}
                </Alert>
              )}
              
              <div className="flex flex-col items-center justify-center p-5">
                <input
                  type="date"
                  id="date"
                  value={curDate}
                  onChange={(e) => {}}
                  onChangeCapture={(e) => {
                    setCurDate(e.target.value);
                    checkInvDateTime(e.target.value, curTime);
                  }}
                  className="border-2 border-blue-500 rounded-lg p-3 mb-2.5 cursor-pointer"
                />
                
                <div className="grid grid-cols-3 gap-1 p-1 border-2 border-blue-500 rounded-lg w-[min(360px,90vw)]">
                  {timings.map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-center items-center p-2.5 border-2 border-blue-500 rounded-lg cursor-pointer
                        ${!item.available ? 'bg-blue-100 cursor-not-allowed' : ''}
                        ${activeClass(index)}
                      `}
                      onClick={() => {
                        handleActive(index);
                        checkInvDateTime(curDate, item.time);
                        setCurTime(item.time);
                      }}
                    >
                      <TbPointFilled className={`${!item.available ? 'text-red-500' : 'text-green-500'}`} />
                      <span className="mx-2.5">{item.time}</span>
                      <AiOutlineClockCircle />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all duration-300
                    ${isInvDateTime ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  onClick={() => handleScheduleClick()}
                  disabled={isInvDateTime}
                >
                  {meetScheduling ? (
                    <CircularProgress size={18} sx={{ color: "#f5f5f5", margin: "0px 30px" }} />
                  ) : (
                    "Schedule"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Doctors;
