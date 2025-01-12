import React, { Component, useContext, useEffect } from "react";
import Home from "../components/diseasePrediction/Home";
// import Patient from "../components/diseasePrediction/Patient1";
import Patient2 from "../components/diseasePrediction/Patient2";
import Symptom from "../components/diseasePrediction/Symptom";
import Disease from "../components/diseasePrediction/Disease";
import Preloader from "../components/common/Preloader";
import commonContext from "../contexts/common/commonContext";
import useScrollDisable from "../hooks/useScrollDisable";
import { useNavigate } from "react-router-dom";

class DP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: "Home", // Name of the current component
      tab_name: "Welcome",
      tab_progress: 25,
      button_is_disabled: true, // Next button disabled if not agreed to terms
      home_button_checked: false, //Check if terms are agreed
      age: localStorage.getItem("age") ? localStorage.getItem("age") : "18", //Patient Default Age
      button_name: "Next", //Button name retry or next
      gender: localStorage.getItem("gender")
        ? localStorage.getItem("gender").toUpperCase()
        : "Male", //Default gender
      // male: true, // patient checkbox
      // female: false, // patient checkbox
      home_nav_icon: <p>1</p>,
      patient_nav_icon: <p>2</p>,
      symptom_nav_icon: <p>3</p>,
      disease_nav_icon: <p>4</p>,
      patient_question: [],
      patient_2_next_button_disabled: "",
      home_nav_value: false,
      patient_nav_value: false,
      symptom_nav_value: false,
      disease_nav_value: false,
      disease_possibility: [],
      user_symptoms: [],
      user_symptom_length: "",
    };
    this.symptomPage = React.createRef();
  }

  get_next_page = (e) => {
    // eslint-disable-next-line default-case
    switch (this.state.current_page) {
      case "Home":
        return this.setState({
          // current_page: "Patient",
          current_page: "Patient-2",
          tab_progress: 50,
          home_nav_value: true,
          button_is_disabled: false,
          home_button_checked: false,
          button_name: "Next",
          patient_2_next_button_disabled: true,
        });
      // case "Patient":
      //   return this.setState({
      //     current_page: "Patient-2",
      //     button_name: "Next",
      //     patient_2_next_button_disabled: true,
      //   });
      case "Patient-2":
        return this.setState({
          current_page: "Symptom",
          tab_progress: 75,
          button_name: "Finish",
          patient_nav_value: true,
          user_symptom_length: 0,
        });
      case "Symptom":
        return this.setState({
          current_page: "Disease",
          button_name: "Retry",
          tab_progress: 100,
          symptom_nav_value: true,
          disease_nav_value: true,
        });
      case "Disease":
        return this.setState({
          tab_progress: 25,
          current_page: "Home", // Name of the current component
          button_is_disabled: true, // Next button disabled if not agreed to terms
          home_button_checked: false, //Check if terms are agreed
          age: "18", //Patient Default Age
          button_name: "Next", //Button name retry or next
          gender: "Male", //Default gender
          male: true, // patient checkbox
          female: false, // patient checkbox
          home_nav_icon: <p>1</p>,
          patient_nav_icon: <p>2</p>,
          symptom_nav_icon: <p>3</p>,
          disease_nav_icon: <p>4</p>,
          patient_question: [],
          patient_2_next_button_disabled: "",
          home_nav_value: false,
          patient_nav_value: false,
          symptom_nav_value: false,
          disease_nav_value: false,
          disease_possibility: [],
          user_symptoms: [],
          user_symptom_length: "",
        });
    }
  };

  get_gender = (e) => {
    // console.log("slf", e.target.value);
    if (e.target.value === "male") {
      this.setState({
        male: true,
        female: false,
        gender: "Male",
      });
    } else if (e.target.value === "female") {
      this.setState({
        male: false,
        female: true,
        gender: "Female",
      });
    }
  };

  get_age_event = (e) => {
    this.setState({ age: e.target.value });
  };

  symptomInfoCallback = (data, data2) => {
    this.setState({
      disease_possibility: data,
      user_symptoms: data2,
      user_symptom_length: data2.length,
    });
  };

  patient_2_callback = (data) => {
    let d = data.filter((key) => {
      return key.answer !== "";
    });
    let avl = data.length !== d.length;
    this.setState({
      patient_question: data,
      patient_2_next_button_disabled: avl,
      symptom_nav_value: true,
    });
  };

  home_button_check_event = (e) => {
    if (e.target.checked === true) {
      return this.setState({
        button_is_disabled: false,
        home_button_checked: true,
        home_nav_value: true,
        patient_nav_value: true,
      });
    } else if (e.target.checked === false) {
      return this.setState({
        button_is_disabled: true,
        home_button_checked: false,
        home_nav_value: false,
        patient_nav_value: false,
      });
    }
  };

  handleResetClick = () => {};

  get_previous_page = (e) => {
    // eslint-disable-next-line default-case
    switch (this.state.current_page) {
      case "Disease":
        return this.setState({
          current_page: "Symptom",
          button_name: "Finish",
          tab_progress: 75,
          disease_nav_value: false,
          user_symptom_length: this.state.user_symptoms.length,
        });
      case "Symptom":
        return this.setState({
          current_page: "Patient-2",
          symptom_page_button: "",
          tab_progress: 50,
          button_name: "Next",
          patient_nav_value: false,
          patient_2_next_button_disabled: true,
          disease_possibility: [],
          user_symptoms: [],
        });
      case "Patient-2":
        // return this.setState({ current_page: "Patient", patient_2_next_button_disabled: false });
        return this.setState({
          current_page: "Home",
          // patient_2_next_button_disabled: false,
          // current_page: "Home",
          home_nav_icon: <p>1</p>,
          home_nav_value: false,
          button_is_disabled: true,
          home_button_checked: false,
          tab_progress: 25,
          user_symptom_length: 1,
        });
      // case "Patient":
      //   return this.setState({
      //     current_page: "Home",
      //     home_nav_icon: <p>1</p>,
      //     home_nav_value: false,
      //     button_is_disabled: true,
      //     home_button_checked: false,
      //     tab_progress: 25,
      //     user_symptom_length: 1,
      //   });
    }
  };

  showPage = (e) => {
    const { current_page, home_button_checked, age, gender } = this.state;
    // eslint-disable-next-line default-case
    switch (current_page) {
      case "Home":
        return (
          <Home
            isChecked={home_button_checked}
            checked={this.home_button_check_event}
          />
        );
      // case "Patient":
      //   return <Patient male={male} female={female} gender={this.get_gender} age={age} ageChange={this.get_age_event} />;
      case "Patient-2":
        return <Patient2 callback={this.patient_2_callback} />;
      case "Symptom":
        return (
          <Symptom
            ref={this.symptomPage}
            userSymptoms={this.state.user_symptoms}
            diseasePossibility={this.state.disease_possibility}
            getPossibleDisease={this.symptomInfoCallback}
            pageCallback={this.symptom_page_button_callback}
          />
        );
      case "Disease":
        return (
          <Disease
            patientInfo={this.state.patient_question}
            disease_with_possibility={this.state.disease_possibility}
            gender={gender}
            age={age}
          />
        );
    }
  };

  renderResetButton = () => {
    return (
      // usa-button usa-button--secondary
      <button
        className="bg-blue-3 border-1 border-blue-5 text-white px-[10px] py-[12px] rounded-[5px] mx-[8px] my-[5px] font-sans transition-all duration-300 ease-in-out hover:active:disabled:bg-blue-5 disabled:cursor-not-allowed"
        onClick={this.symptomPage.current}
      >
        Reset
      </button>
    );
  };

  render() {
    const {
      tab_progress,
      button_is_disabled,
      patient_2_next_button_disabled,
      user_symptom_length,
      current_page,
    } = this.state;

    return (
      // disease-prediction
      <div
        id=""
        className="pt-28 pb-24 flex justify-center items-center w-full active:font-bold active:text-blue-9 active:border-l-[2px] active:border-l-blue-9"
      >
        {/* main-content */}
        <main
          id=""
          className="pl-8 pt-12 pr-0 pb-10 mix-w-[1000px] w-[65%] border-[1px] border-grey-3 rounded-4 max-sm:p-6 max-sm:pb-0 grid grid-rows-12 max-md:w-full gap-2"
        >
          {/* first-grid */}
          <div className="border-b-[1px] border-b-grey-3 max-md:col-span-full bg-red-300 row-span-10 grid grid-cols-12">
            <div className="col-span-3">
              {/* side-menu-list */}
              <ul className=" leading-9 list-none">
                {/* progressbar */}
                <li id="" className="px-[3px] w-[25%] float-right bg-blue-1 text-[1rem] rounded-[13px]">
                  <div
                    className={`${
                      tab_progress === 25 &&
                      "bg-blue-5 w-[25%] h-[3px] rounded-[10px]"
                    } ${
                      tab_progress === 50 &&
                      "bg-blue-5 w-[50%] h-[3px] rounded-[10px]"
                    } ${
                      tab_progress === 75 &&
                      "bg-blue-5 w-[75%] h-[3px] rounded-[10px]"
                    } ${
                      tab_progress === 100 &&
                      "bg-blue-5 w-full h-[3px] rounded-[10px]"
                    }`}
                  ></div>
                </li>
                <li
                  className={`px-[10px] py-[20px] text-[1rem] ${current_page === "Home" ? "active" : "done"}`}
                >
                  Welcome
                </li>
                <li
                  className={`px-[10px] py-[20px] text-[1rem] ${tab_progress === 50 && "active"} ${
                    tab_progress < 50 && "list"
                  } ${tab_progress > 50 && "done"}`}
                >
                  Patient
                </li>
                <li
                  className={`px-[10px] py-[20px] text-[1rem] ${tab_progress === 75 && "active"} ${
                    tab_progress < 75 && "list"
                  } ${tab_progress > 75 && "done"}`}
                >
                  Symptom
                </li>
                <li
                  className={`px-[10px] py-[20px] text-[1rem] ${tab_progress === 100 && "active"} ${
                    tab_progress < 100 && "list"
                  } ${tab_progress > 100 && "done"}`}
                >
                  Disease
                </li>
              </ul>
            </div>
            <div id="ContentDiv cols-span-9">
              <div className="shoPageSection">{this.showPage()}</div>
            </div>
          </div>
          {/* second-grid */}
          <div className="bg-blue-3 row-span-2">
            <div id="buttonsSection">
              <button
                disabled={this.state.current_page === "Home"}
                onClick={this.get_previous_page}
                className="usa-button usa-button--outline back"
              >
                Back
              </button>
              {/* {current_page === "Symptom" ? this.renderResetButton() : ""} */}
              <button
                className={`usa-button ${
                  button_is_disabled ||
                  patient_2_next_button_disabled ||
                  user_symptom_length === 0
                    ? ""
                    : "next"
                }`}
                disabled={
                  button_is_disabled ||
                  patient_2_next_button_disabled ||
                  user_symptom_length === 0
                }
                type="submit"
                onClick={this.get_next_page}
              >
                {this.state.button_name}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const DiseasePrediction = () => {
  const { isLoading, toggleLoading } = useContext(commonContext);

  const navigate = useNavigate();

  const userNotExists =
    !localStorage.getItem("username") ||
    localStorage.getItem("username") === "undefined";

  useEffect(() => {
    if (userNotExists) {
      navigate("/");
    } else {
      toggleLoading(true);
      setTimeout(() => toggleLoading(false), 2000);
    }
    //eslint-disable-next-line
  }, []);

  useScrollDisable(isLoading);

  if (isLoading) {
    return <Preloader />;
  }

  return <DP />;
};

export default DiseasePrediction;
