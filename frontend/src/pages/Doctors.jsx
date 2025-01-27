import React, { useState, useEffect, useContext, useRef  } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaVideo } from "react-icons/fa";
import { IoMdClose, IoMdRefresh } from "react-icons/io";
import { AiFillStar, AiOutlineClockCircle } from 'react-icons/ai';
import { TbPointFilled } from 'react-icons/tb';
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import { Alert, CircularProgress } from "@mui/material";
import useDocTitle from "../hooks/useDocTitle";
import useActive from "../hooks/useActive";
import Preloader from "../components/common/Preloader";
import commonContext from "../contexts/common/commonContext";
import useScrollDisable from "../hooks/useScrollDisable";
import httpClient from "../httpClient";
import useOutsideClose from "../hooks/useOutsideClose";

const Doctors = () => {
  useDocTitle("Doctors");
  const { isLoading, toggleLoading } = useContext(commonContext);
  const navigate = useNavigate();

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
  const [balance, setBalance] = useState(0);
  const [isLowBalance, setLowBalance] = useState(false);
  const [curFee, setCurFee] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState("");
  const [selectedDocStatus, setSelectedDocStatus] = useState(false);
  const [selectedDocAvailable, setSelectedDocAvailable] = useState(false);
  const [selectEmail, setSelectEmail] = useState("");
  const [message, setMessage] = useState("");
  const { handleActive, activeClass } = useActive(-1);
  const [selectedTime, setSelectedTime] = useState(null);
  const modalRef = useRef(null);

  const [available, setAvailable] = useState({
    "08:00": true, "09:00": true, "10:00": true,
    "11:00": true, "12:00": true, "15:00": true,
    "16:00": true, "17:00": true, "18:00": true
  });

  const timings = Object.entries(available).map(([time, isAvailable]) => ({
    time,
    available: isAvailable
  }));

  useEffect(() => {
    const userNotExists = !localStorage.getItem("usertype");
    if (userNotExists) {
      navigate("/");
    } else {
      fetchDoctors();
    }
  }, []);

  useEffect(() => {
    handleTimings();
  }, [isScheduleMeet, curDate]);

  useEffect(() => {
    httpClient.post("/get_wallet", { 
      email: localStorage.getItem("email") 
    }).then((res) => {
      setBalance(res.data.wallet);
    }).catch(console.error);
  }, []);

  useOutsideClose(modalRef, () => {
    setMessage("");
    setMeetModal(false);
    setConnecting(false);
    httpClient.put('/delete_meet', { email: selectEmail });
  });

  const fetchDoctors = () => {
    setFetchingData(true);
    toggleLoading(true);
    httpClient.get("/get_status")
      .then((res) => {
        setDoctors(res.data.details);
        toggleLoading(false);
        setFetchingData(false);
      })
      .catch(() => {
        toggleLoading(false);
        setFetchingData(false);
      });
  };

  const handleMeet = () => {
    const time = new Date().getTime();
    httpClient.post("/meet_status", { email: selectEmail })
      .then((res) => {
        if (res.status === 200) {
          const meetLink = `/instant-meet?meetId=${time}&selectedDoc=${selectedDoc}&selectedMail=${encodeURIComponent(selectEmail)}&name=${localStorage.getItem("username")}&age=${localStorage.getItem("age")}&gender=${localStorage.getItem("gender")}&pemail=${localStorage.getItem("email")}&fee=${curFee}`;
          
          httpClient.put("/make_meet", {
            email: selectEmail,
            link: meetLink,
            patient: localStorage.getItem("username")
          }).then(() => {
            setTimeout(() => {
              httpClient.post("/currently_in_meet", { email: selectEmail })
                .then((res) => {
                  if (res.data.curmeet) {
                    setConnecting(false);
                    navigate(meetLink);
                  } else {
                    httpClient.put('/delete_meet', { email: selectEmail });
                    setConnecting(false);
                    setMessage(res.data.message);
                  }
                });
            }, 20000);
          });
        } else {
          setConnecting(false);
          setMessage(res.data.message);
        }
      });
  };

  const handleTimings = () => {
    if (!selectEmail) return;

    httpClient.post('/set_appointment', { email: selectEmail })
      .then((res) => {
        const appointments = res.data.appointments;
        let times = {...available};
        appointments
          .filter(item => item.date === curDate)
          .forEach(item => {
            times[item.time] = false;
          });
        setAvailable(times);
      })
      .catch(console.error);
  };

  const handleScheduleClick = () => {
    setMeetScheduling(true);
    const now = new Date(curDate + " " + curTime);
    
    httpClient.post("/schedule_meet", {
      email: selectEmail,
      date: curDate,
      time: curTime,
      doctor: selectedDoc,
      patient: localStorage.getItem("username"),
      patientEmail: localStorage.getItem("email")
    }).then((res) => {
      setScheduleAlert(res.status === 200 ? 2 : 1);
      setMeetScheduling(false);
      if (res.status === 200) {
        setTimeout(() => {
          setMeetModal(false);
          setScheduleAlert(0);
        }, 2000);
      }
    }).catch(() => {
      setScheduleAlert(1);
      setMeetScheduling(false);
    });
  };

  const columns = [
    { 
      field: "id", 
      headerName: "#", 
      width: 80,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "username",
      headerName: "Doctor",
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div className="text-gray-800">
          {`Dr. ${params.row.username.split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")}`}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "specialization",
      headerName: "Specialization",
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "fee",
      headerName: "Fee",
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div>₹ {params.row.fee}</div>
      ),
    },
    {
      field: "languages",
      headerName: "Languages",
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: () => "English / Hindi",
    },
    {
      field: "ratings",
      headerName: "Ratings",
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div className="flex items-center justify-center gap-1">
          <span>
            {params.row.noOfAppointments 
              ? (params.row.noOfStars / params.row.noOfAppointments).toFixed(1)
              : "0"}
          </span>
          <AiFillStar className="text-yellow-400" />
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerAlign: 'center',
      align: 'center', 
      renderCell: (params) => (
        <div className="flex items-center justify-center gap-1">
          <TbPointFilled 
            className={params.row.status === "online" 
              ? "text-green-400" 
              : "text-red-400"
            } 
          />
          <span className="font-medium">{params.row.status}</span>
        </div>
      ),
    },
    {
      field: "appointments",
      headerName: "Book an Appointment",
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <button
          onClick={() => {
            if (params.row.fee > balance) {
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
            setSelectedDoc(`Dr. ${params.row.username.split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ")}`);
            setMeetModal(true);
          }}
         className="px-4 py-2 bg-[#818CF8] text-white rounded hover:bg-[#6366F1] 
  transition-colors duration-200"
        >
          BOOK
        </button>
      ),
    },
  ];

  useScrollDisable(isLoading);

  if (isLoading) return <Preloader />;

  
  const handleSchedule = (upcomingAppointments) => {
    for (let i = 0; i < upcomingAppointments.length; i++) {
      const now = new Date(curDate + " " + curTime);
      const d1 = new Date(new Date(upcomingAppointments[i].date + ' ' + upcomingAppointments[i].time).getTime() - 30 * 60000);
      const d2 = new Date(new Date(upcomingAppointments[i].date + ' ' + upcomingAppointments[i].time).getTime() + 30 * 60000);

      if (d1 < now && now <= d2)
        return false;
    }
    return true;
  };

  const checkInvDateTime = (date, time) => {
    if (!date || !time) {
      setInvDateTime(true);
      return;
    }

    const selectedDateTime = new Date(`${date} ${time}`);
    const currentDateTime = new Date();

    // Check if selected date and time are in the future
    const isValidDateTime = selectedDateTime > currentDateTime;
    setInvDateTime(!isValidDateTime);
  };



  return (
    <div className="py-24 text-center">
      <div className="min-h-[600px] p-2.5 mx-auto text-gray-800 max-w-[1300px] w-full 
  shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-lg">
        <div className="flex justify-center items-center mb-6">
          <h3 className="text-2xl font-semibold">Doctor Details</h3>
          <button
            className={`ml-2.5 p-2 rounded ${
              fetchingData 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#818CF8] hover:bg-[#6366F1] cursor-pointer'
            } text-white transition-all duration-300`}
            onClick={fetchDoctors}
            disabled={fetchingData}
          >
            <IoMdRefresh className={fetchingData ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg shadow-lg">
        <DataGrid
          rows={doctors}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          className="border-none rounded-lg"
          autoHeight
          pageSize={10}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-toolbarContainer': {
              backgroundColor: '#F9FAFB',
              padding: '12px',
              '& button': {
                backgroundColor: '#818CF8',
                color: 'white',
                padding: '8px 16px',
                '&:hover': {
                  backgroundColor: '#6366F1',
                },
              },
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F3F4F6',
              borderBottom: '1px solid #E5E7EB',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #E5E7EB',
            },
          }}
        />
          </div>
        </div>

       {/* Low Balance Modal */}
       <Modal
        open={meetModal && isLowBalance}
        onClose={() => {
          setMessage("");
          setMeetModal(false);
        }}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative bg-white-1"    ref={modalRef} >
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold text-blue-800">Insufficient Balance</h3>
              <IoMdClose 
                className="text-blue-500 hover:text-blue-700 cursor-pointer text-2xl"
                onClick={() => setMeetModal(false)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-blue-700">Doctor Fee</span>
                <span className="font-bold text-blue-900">₹ {curFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Available Balance</span>
                <span className="font-bold text-blue-900">₹ {balance}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-blue-200">
                <span className="text-red-600 font-semibold">Required Amount</span>
                <span className="text-red-600 font-bold">₹ {curFee - balance}</span>
              </div>
            </div>

            <button 
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg 
              font-semibold transition-colors duration-300 shadow-md"
              onClick={() => navigate(`/my-wallet?recharge=${curFee - balance}`)}
            >
              Recharge Wallet
            </button>
          </div>
        </div>
      </Modal>

      {/* Appointment Modal */}
      <Modal
        open={meetModal && !isLowBalance}
        onClose={() => {
          setMessage("");
          setMeetModal(false);
          setConnecting(false);
        }}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative bg-white-1"    ref={modalRef} >
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold text-blue-800">Schedule Appointment</h3>
              <IoMdClose 
                className="text-blue-500 hover:text-blue-700 cursor-pointer text-2xl"
                onClick={() => {
                  setMessage("");
                  setMeetModal(false);
                  setConnecting(false);
                  httpClient.put('/delete_meet', { email: selectEmail });
                }}
              />
            </div>

            {/* Meeting Options */}
            <div className="space-y-6">
              <div className="flex justify-center gap-4">
                {selectedDocStatus && !selectedDocAvailable && (
                 <button
                 className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                   transition-all duration-300 shadow-md"
                 onClick={() => {
                   setScheduleMeet(false);
                   setInstantMeet(!isInstantMeet);
                   setConnecting(false);
                 }}
               >
                 Instant Meeting
               </button>
                )}
                <button
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 
                    transition-all duration-300 shadow-md"
                  onClick={() => {
                    const d = new Date();
                    setCurDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
                    setCurTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
                    setInvDateTime(true);
                    setScheduleMeet(!isScheduleMeet);
                    setInstantMeet(false);
                    setConnecting(false);
                  }}
                >
                  Schedule Meeting
                </button>
              </div>

              {message && (
                <Alert severity="error" className="mt-4">
                  {message}
                </Alert>
              )}

              {/* Instant Meeting Section */}
              {isInstantMeet && (
                <div className="text-center py-4">
                  {isConnecting ? (
                    <div className="space-y-4">
                      <div className="flex justify-center items-end space-x-1">
                        {[...Array(10)].map((_, index) => (
                          <div
                            key={index}
                            className="w-1 bg-gradient-to-t from-purple-600 to-purple-300 rounded-full animate-wave"
                            style={{ 
                              animationDelay: `${index * 0.1}s`,
                              height: `${(index + 1) * 8}px`
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">Connecting to doctor...</p>
                    </div>
                  ) : (
                    <button
                      className="flex items-center justify-center gap-2 mx-auto px-6 py-3 
                        bg-purple-500 text-white rounded-lg hover:bg-purple-600 
                        transition-all duration-300 shadow-md"
                      onClick={() => {
                        setConnecting(true);
                        handleMeet();
                      }}
                    >
                      <span>Start Meeting</span>
                      <FaVideo />
                    </button>
                  )}
                </div>
              )}

              {/* Schedule Meeting Section */}
              {isScheduleMeet && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-blue-800">Select Date and Time</h4>
                  
                  {isInvDateTime && (
                      <Alert severity="error" className="mb-4">
                        Please select a future date and time
                      </Alert>
                    )}

                 {scheduleAlert !== 0 && (
                    <Alert 
                      severity={scheduleAlert === 1 ? "error" : "success"}
                      className="mb-4"
                    >
                      {scheduleAlert === 1 
                        ? "Doctor is unavailable at selected time" 
                        : "Meeting scheduled successfully"}
                    </Alert>
                  )}

<div className="space-y-4">
        <input
          type="date"
          min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
          value={curDate || ''}
          onChange={(e) => {
            const selectedDate = e.target.value;
            setCurDate(selectedDate);
            checkInvDateTime(selectedDate, curTime);
          }}
          className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 
            focus:ring-blue-500 focus:border-transparent"
        />

        <div className="grid grid-cols-3 gap-2">
            {timings.map((item, index) => (
              <button
                key={index}
                className={`p-3 border-2 rounded-lg flex items-center justify-center gap-2
                  transition-all duration-200
                  ${item.available 
                    ? `border-blue-300 text-blue-700 hover:bg-blue-50
                      ${selectedTime === item.time 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-blue-50'}` 
                    : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!item.available}
                onClick={() => {
                  if (item.available) {
                    handleActive(index);
                    checkInvDateTime(curDate, item.time);
                    setCurTime(item.time);
                    setSelectedTime(item.time);
                  }
                }}
              >
                <TbPointFilled 
                  className={
                    selectedTime === item.time 
                      ? 'text-white' 
                      : (item.available ? 'text-green-500' : 'text-red-500')
                  } 
                />
                <span>{item.time}</span>
                <AiOutlineClockCircle />
              </button>
            ))}
          </div>


        <button
          className={`w-full py-3 rounded-lg text-white transition-all duration-300
            ${isInvDateTime 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'}
          `}
          onClick={handleScheduleClick}
          disabled={isInvDateTime || meetScheduling || !curDate || !curTime}
        >
          {meetScheduling ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Schedule Meeting"
          )}
        </button>
      </div>
      
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
      
    </div>
  );
};

export default Doctors;