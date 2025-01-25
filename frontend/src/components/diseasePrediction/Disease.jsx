// import React, { Component } from "react";


// // class Disease extends Component {
// //   state = {
// //     patientInfo: this.props.patientInfo,
// //     disease_with_possibility: this.props.disease_with_possibility,
// //   };
// class Disease extends Component {
//   state = {
//     patientInfo: [],
//     disease_with_possibility: [],
//   };

//   componentDidMount() {
//     // Ensure patientInfo is set from props on mount
//     if (this.props.patientInfo) {
//       this.setState({ patientInfo: this.props.patientInfo });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     // Update patientInfo if it changes in props
//     if (prevProps.patientInfo !== this.props.patientInfo) {
//       this.setState({ patientInfo: this.props.patientInfo });
//     }

//     // Trigger fetch only when patientInfo is updated and not empty
//     if (prevState.patientInfo !== this.state.patientInfo && this.state.patientInfo.length > 0) {
//       const symptoms = this.state.patientInfo.map((info) => info.answer); // Assuming `answer` contains symptoms
      
//       fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(symptoms),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           const updatedDiseases = data.map((item) => ({
//             name: item.disease,
//             possibility: (item.probability * 100).toFixed(2), // Convert probability to percentage
//             disease_symptom: symptoms, // User-provided symptoms
//             symptom_user_has: symptoms, // Aligning structure
//             description: item.description, // Disease description
//             precautions: item.precautions, // Disease precautions
//           }));
//           this.setState({ disease_with_possibility: updatedDiseases });
//         })
//         .catch((error) => console.error("Error fetching predictions:", error));
//     }
//   }


//   get_current_html = () => {
//     const filtered_list = this.state.disease_with_possibility.filter((e) => {
//       return e.possibility > 0;
//     });
//     filtered_list.sort((a, b) => -a.possibility.localeCompare(b.possibility, undefined, { numeric: true }) || a.name.localeCompare(b.name));
//     return filtered_list.length !== 0 ? (
//       <div className="grid-row width-full DiseaseComponent">
//         <div className="col-12 tablet:grid-col-12 patientInfo">
//           <h3>Patient gender: {this.props.gender}</h3>
//           <h3>Patient age: {this.props.age}</h3>
//         </div>
//         <div className="col-12 tablet:grid-col-12 patientQuestions">
//           {this.state.patientInfo.map((key, id) => (
//             <div className="singleQuestion" key={id}>
//               <p>{key.question}</p>
//               <p>{key.answer}</p>
//             </div>
//           ))}
//         </div>
//         <div className="col-12 tablet:grid-col-12 DiagnosisReport">
//           <h2>Diagnosis Report</h2>
//           {filtered_list.map((key, id) => (
//             <div className="reportDiv" key={id}>
//               <div className="reportDiv-item">
//                 <div className="titleReport">
//                   <h4>{key.name}</h4>
//                   <a href={`https://en.wikipedia.org/wiki/${key.name}`} title={"wikipedia"} rel="noopener noreferrer" target="blank">
//                     i
//                   </a>
//                 </div>
//                 <div className="Possibility">
//                   <p>
//                     Possibility <span>{key.possibility}%</span>
//                   </p>
//                   <div className="possibilityProgressBar">
//                     <div style={{ width: `${key.possibility}%` }}></div>
//                   </div>
//                 </div>
//               </div>
//               <div className="diseaseSymptoms">
//                 {/* <h4>Disease Symptoms</h4>
//                 <ul>
//                   {key.disease_symptom.sort().map((item, index) => {
//                     return key.symptom_user_has.includes(item) ? (
//                       <li key={index} className="active">
//                         {item}
//                       </li>
//                     ) : (
//                       <li key={index}>{item}</li>
//                     );
//                   })}
//                 </ul> */}
//                 <h4>Description</h4>
//                 <p>{key.description}</p>
//                 <h4>Precautions</h4>
//                 <ul>
//                   {key.precautions.map((precaution, index) => (
//                     <li key={index}>{precaution}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div>Always visit a doctor if you have any symptoms of a disease or call your local hospital</div>
//       </div>
//     ) : (
//       <>
//         <div className="grid-row width-full DiseaseComponent">
//           <div className="col-12 tablet:grid-col-12 patientInfo">
//             <h3>Patient gender: {this.props.gender}</h3>
//             <h3>Patient age: {this.props.age}</h3>
//           </div>
//           <p> Cannot determine possible diseases due to lack of symptoms. Please retry the analysis with actual symptoms or call your local hospital if it is an emergency.</p>
//         </div>
//       </>
//     );
//   };

//   render() {
//     return <div id="Disease">{this.get_current_html()}</div>;
//   }
// }

// export default Disease;

import React, { Component } from "react";

class Disease extends Component {
  state = {
    patientInfo: [], // Initialize patientInfo as an empty array
    disease_with_possibility: [], // To store the diseases with possibilities
  };

  componentDidMount() {
    // Ensure patientInfo is set from props on mount
    if (this.props.patientInfo) {
      this.setState({ patientInfo: this.props.patientInfo });
    }
  }
  componentDidUpdate(prevProps) {
    // Update state when the result prop changes
    if (this.props.result !== prevProps.result) {
      this.setState({ disease_with_possibility: this.props.result });
    }
  }
  get_current_html = () => {
    const filtered_list = this.state.disease_with_possibility.filter((e) => e.probability );
    filtered_list.sort(
      (a, b) =>
        b.probability - a.probability || a.disease.localeCompare(b.disease)
    );

    return filtered_list.length !== 0 ? (
      <div className="grid-row width-full DiseaseComponent">
        <div className="col-12 tablet:grid-col-12 patientInfo">
          <h3>Patient gender: {this.props.gender}</h3>
          <h3>Patient age: {this.props.age}</h3>
        </div>
        <div className="col-12 tablet:grid-col-12 patientQuestions">
          {this.state.patientInfo.map((key, id) => (
            <div className="singleQuestion" key={id}>
              <p>{key.question}</p>
              <p>{key.answer}</p>
            </div>
          ))}
        </div>
        <div className="col-12 tablet:grid-col-12 DiagnosisReport">
          <h2>Diagnosis Report</h2>
          {filtered_list.map((key, id) => (
            <div className="reportDiv" key={id}>
              <div className="reportDiv-item">
                <div className="titleReport">
                  <h4>{key.disease}</h4>
                  <a
                    href={`https://en.wikipedia.org/wiki/${key.name}`}
                    title={"wikipedia"}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                  </a>
                </div>
                <div className="Possibility">
                  <p>
                  Probability  <span>{key.probability*100}%</span>
                  </p>
                  <div className="possibilityProgressBar">
                    <div style={{ width: `${key.probability*100 }%` }}></div>
                  </div>
                </div>
              </div>
              <div className="diseaseSymptoms">
                <h4>Description</h4>
                <p>{key.description}</p>
                <h4>Precautions</h4>
                <ul>
                  {key.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div>Always visit a doctor if you have any symptoms of a disease or call your local hospital</div>
      </div>
    ) : (
      <div className="grid-row width-full DiseaseComponent">
        <div className="col-12 tablet:grid-col-12 patientInfo">
          <h3>Patient gender: {this.props.gender}</h3>
          <h3>Patient age: {this.props.age}</h3>
        </div>
        <p>
          Cannot determine possible diseases due to lack of symptoms. Please retry the analysis with actual symptoms or
          call your local hospital if it is an emergency.
        </p>
      </div>
    );
  };

  render() {
    return <div id="Disease">{this.get_current_html()}</div>;
  }
}

export default Disease;
