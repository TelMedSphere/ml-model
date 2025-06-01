# TelMedSphere ML Model

## Overview

TelMedSphere's ML Model is a disease prediction system that uses machine learning algorithms to predict potential diseases based on reported symptoms. This repository contains the trained machine learning models, datasets, and API implementation that powers the disease prediction feature of the TelMedSphere platform.

## Features

- **Multi-model disease prediction**: Implements various ML algorithms (ExtraTrees, RandomForest, GradientBoost, XGBoost, LightGBM) for accurate disease prediction
- **RESTful API**: Flask-based API that can be integrated with frontend applications
- **Cross-origin support**: Includes CORS support for web application integration
- **Top-K prediction**: Returns the top 3 most probable diseases with descriptions and precautions
- **Symptom-Disease mapping**: Uses comprehensive datasets mapping symptoms to diseases

## Project Structure

```
├── app.py                    # Flask API implementation
├── dataset.csv               # Main dataset with disease-symptom mapping
├── ExtraTrees                # Trained ExtraTrees classifier model
├── GradientBoost             # Trained GradientBoost classifier model
├── LightGBM                  # Trained LightGBM classifier model
├── Prediction.ipynb          # Jupyter notebook for model training and analysis
├── Random Forest             # Trained RandomForest classifier model
├── requirements.txt          # Python dependencies
├── symptom_Description.csv   # Dataset containing disease descriptions
├── symptom_precaution.csv    # Dataset containing recommended precautions for diseases
├── Symptom-severity.csv      # Dataset containing symptom severity information
└── XGBoost                   # Trained XGBoost classifier model
```

## Datasets

The system uses multiple datasets:

1. **dataset.csv**: Contains mapping between diseases and their symptoms
2. **symptom_Description.csv**: Contains detailed descriptions of diseases
3. **symptom_precaution.csv**: Contains precaution measures for each disease
4. **Symptom-severity.csv**: Contains severity information for each symptom

## ML Models

The project implements and compares multiple machine learning models:

1. **ExtraTrees**: Extra Trees Classifier (Default model used in the API)
2. **RandomForest**: Random Forest Classifier
3. **GradientBoost**: Gradient Boosting Classifier
4. **XGBoost**: XGBoost Classifier
5. **LightGBM**: LightGBM Classifier

## API Endpoints

### POST `/predict`

Predicts diseases based on provided symptoms.

**Request Body**:
```json
[
  "symptom1",
  "symptom2",
  "symptom3",
  ...
]
```

**Response**:
```json
[
  {
    "disease": "Disease Name",
    "probability": 0.95,
    "description": "Description of the disease",
    "precautions": ["Precaution 1", "Precaution 2", "Precaution 3", "Precaution 4"]
  },
  ...
]
```

## Installation & Setup
 
 ```bash
 # Clone the repo
 git clone https://github.com/TelMedSphere/ml-model.git
 # Navigate to directory
 cd TelMedSphere/ml-model
 # Create a virtual environment
 python -m venv venv # This will create a folder named venv inside your project directory
 # Activate the virtual environment
 venv\Scripts\activate
 # Install all dependencies for flask server
 pip install -r requirements.txt     
 # Run flask server
 flask run
 #update the development server link in .env file of frontend(MODEL_URL)
 # deactivate the virtual environment, when you are done
 deact

4. The API will be available at `http://localhost:5000`

## Development

### Training New Models

The `Prediction.ipynb` notebook contains the code for data preprocessing, model training, and evaluation. You can use this notebook to:

1. Analyze the dataset
2. Preprocess the data
3. Train and evaluate different ML models
4. Save the trained models

### Model Performance

The models are evaluated using cross-validation, and metrics like F1 score and AUC-ROC are calculated to measure performance. The ExtraTrees model demonstrated the best overall performance and is used as the default prediction model in the API.

<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

<h2>⚡Project Admin and Mentors</h2>

<table>
<tr>
<td align="center">
<a href="https://github.com/PratikMane0112"><img src="https://avatars.githubusercontent.com/u/153143167?v=4" height="140px" width="140px" alt="Pratik Mane"></a><br><sub><b>Project Admin - Pratik Mane</b></sub>
</td>
<td align="center">
<a href="https://github.com/HarshwardhanPatil07"><img src="https://avatars.githubusercontent.com/u/126240589?v=4" height="140px" width="140px" alt="Pratik Mane"></a><br><sub><b>KWoC Mentor - Harshwardhan Patil </b></sub>
</td>
<td align="center">
<a href="https://github.com/AdityaBavadekar"><img src="https://avatars.githubusercontent.com/u/64344960?v=4" height="140px" width="140px" alt="Pratik Mane"></a><br><sub><b>SWoC Mentor - Aditya Bavadekar</b></sub>
</td>
<td align="center">
<a href="https://github.com/RajKhanke"><img src="https://avatars.githubusercontent.com/u/137288727?v=4" height="140px" width="140px" alt="Raj Khanke"></a><br><sub><b>DWoC Mentor - Raj Khanke</b></sub>
</td>

</tr>
</table>

<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

<h2>🫂Project Contributors</h2>

<a href="https://github.com/PratikMane0112/TelMedSphere/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=PratikMane0112/TelMedSphere&cache_burst=1" />
</a>

<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

<h2>🧡Contributing with fun</h2>

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

<h2><a href="https://discord.gg/qsdDRKak28">Join Discord Server↗️</a></h2>

<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->
<h2>📑Contributing Guidelines</h2>

Read our [Contributing Guidelines](https://github.com/PratikMane0112/TelMedSphere/blob/master/.github/CONTRIBUTING_GUIDELINES.md) to learn about our development process, how to propose bugfixes and improvements, and contributions.

<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

<h2>📑Code Of Conduct</h2>

TelMedSphere and everyone participating in it is governed by the [Code of Conduct](https://github.com/PratikMane0112/TelMedSphere/blob/master/.github/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------   -->
<h2>🧾License</h2>

This project is licensed under the Apache License 2.0. See the [LICENSE](https://github.com/PratikMane0112/TelMedSphere/blob/master/LICENSE) file for more details.
  
  ```
   Copyright 2025 Pratik Mane

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
  ```

