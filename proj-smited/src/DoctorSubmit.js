import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './DoctorSubmit.css';

const DoctorSubmit = () => {

//Initialize variables
  const [formData, setFormData] = useState({
      disease: '',
      fever: false,
      cough: false,
      fatigue: false,
      difficultyBreathing: false,
      age: 0,
      gender: '',
      bloodPressure: '',
      cholesterolLevel: '',
      outcomeVariable: '',
    });
  
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

//Handles data changes 
//Note: Name will need to be changed
const handleCheckboxChange = (condition) => {
    setFormData((prevData) => ({
      ...prevData,
      [condition]: !prevData[condition],
    }));
  };

//Handles checkbox changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

//Submits data to localhost:5555
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5555/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully!');
        setSubmissionSuccess(true);
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

//Form submission section
  return (
    <div className="DoctorSubmit">
      <header className="DoctorSubmit-header">
        <h1>Medical Conditions Dashboard</h1>
        <div className="header-buttons">
        
        </div>
      </header>

      <main className="DoctorSubmit-main">
        <div className="DoctorSubmit-form-container">
          <div>
              {submissionSuccess && (
                <div className="success-message">
                  <h3 style={{ color: 'green' }}>Form submitted successfully!</h3>
                </div>
              )}
            </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Disease:
                <select
                  name="disease"
                  value={formData.disease}
                  onChange={handleInputChange}
                >
                <option value="">Select Disease</option>
                <option value="Acne">Acne</option>
                <option value="Allergic Rhinitis">Allergic Rhinitis</option>
                <option value="Alzheimer's Disease">Alzheimer's Disease</option>
                <option value="Anxiety Disorders">Anxiety Disorders</option>
                <option value="Asthma">Asthma</option>
                <option value="Atherosclerosis">Atherosclerosis</option>
                <option value="Autism Spectrum Disorder (ASD)">Autism Spectrum Disorder (ASD)</option>
                <option value="Bipolar Disorder">Bipolar Disorder</option>
                <option value="Bladder Cancer">Bladder Cancer</option>
                <option value="Brain Tumor">Brain Tumor</option>
                <option value="Breast Cancer">Breast Cancer</option>
                <option value="Bronchitis">Bronchitis</option>
                <option value="Cataracts">Cataracts</option>
                <option value="Cerebral Palsy">Cerebral Palsy</option>
                <option value="Chickenpox">Chickenpox</option>
                <option value="Cholecystitis">Cholecystitis</option>
                <option value="Cholera">Cholera</option>
                <option value="Chronic Obstructive Pulmonary">Chronic Obstructive Pulmonary</option>
                <option value="Chronic Kidney Disease">Chronic Kidney Disease</option>
                <option value="Common Cold">Common Cold</option>
                <option value="Cirrhosis">Cirrhosis</option>
                <option value="Colorectal Cancer">Colorectal Cancer</option>
                <option value="Conjunctivitis (Pink Eye)">Conjunctivitis (Pink Eye)</option>
                <option value="Coronary Artery Disease">Coronary Artery Disease</option>
                <option value="Common Cold">Common Cold</option>
                <option value="Crohn's Disease">Crohn's Disease</option>
                <option value="Cystic Fibrosis">Cystic Fibrosis</option>
                <option value="Dementia">Dementia</option>
                <option value="Dengue Fever">Dengue Fever</option>
                <option value="Depression">Depression</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Eating Disorders">Eating Disorders</option>
                <option value="Ebola Virus">Ebola Virus</option>
                <option value="Eczema">Eczema</option>
                <option value="Endometriosis">Endometriosis</option>
                <option value="Epilepsy">Epilepsy</option>
                <option value="Esophageal Cancer">Diabetes</option>
                <option value="Fibromyalgia">Fibromyalgia</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Gastroenteritis">Gastroenteritis</option>
                <option value="Glaucoma">Glaucoma</option>
                <option value="Gout">Gout</option>
                <option value="Hemophilia">Hemophilia</option>
                <option value="Hemorrhoids">Hemorrhoids</option>
                <option value="Hepatitis B">Hepatitis B</option>
                <option value="HIV/AIDS">HIV/AIDS</option>
                <option value="Hyperglycemia">Hyperglycemia</option>
                <option value="Hypertension">Hypertension</option>
                <option value="Hypertensive Heart Disease">Hypertensive Heart Disease</option>
                <option value="Hyperthyroidism">Hyperthyroidism</option>
                <option value="Hypoglycemia">Hypoglycemia</option>
                <option value="Hypothyroidism">Hypothyroidism</option>
                <option value="Influenza">Influenza</option>
                <option value="Kidney Cancer">Kidney Cancer</option>
                <option value="Kidney Disease">Kidney Disease</option>
                <option value="Klinefelter Syndrome">Klinefelter Syndrome</option>
                <option value="Liver Cancer">Liver Cancer</option>
                <option value="Liver Disease">Liver Disease</option>
                <option value="Lung Cancer">Lung Cancer</option>
                <option value="Lyme Disease">Lyme Disease</option>
                <option value="Lymphoma">Lymphoma</option>
                <option value="Malaria">Malaria</option>
                <option value="Marfan Syndrome">Marfan Syndrome</option>
                <option value="Measles">Measles</option>
                <option value="Melanoma">Melanoma</option>
                <option value="Migraine">Migraine</option>
                <option value="Multiple Sclerosis">Multiple Sclerosis</option>
                <option value="Mumps">Mumps</option>
                <option value="Muscular Dystrophy">Muscular Dystrophy</option>
                <option value="Myocardial Infarction">Myocardial Infarction</option>
                <option value="Obsessive-Compulsive Disorde">Obsessive-Compulsive Disorde</option>
                <option value="Osteoarthritis">Osteoarthritis</option>
                <option value="Osteomyelitis">Osteomyelitis</option>
                <option value="Osteoporosis">Osteoporosis</option>
                <option value="Otitis Media (Ear Infection)">Otitis Media (Ear Infection)</option>
                <option value="Ovarian Cancer">Ovarian Cancer</option>
                <option value="Pancreatic Cancer">Pancreatic Cancer</option>
                <option value="Pancreatitis">Pancreatitis</option>
                <option value="Parkinson's Disease">Parkinson's Disease</option>
                <option value="Pneumocystis Pneumonia (PCP)">Pneumocystis Pneumonia (PCP)</option>
                <option value="Pneumonia">Pneumonia</option>
                <option value="Pneumothorax">Pneumothorax</option>
                <option value="Polio">Polio</option>
                <option value="Polycystic Ovary Syndrome">Polycystic Ovary Syndrome</option>
                <option value="Prader-Willi Syndrome">Prostate Cancer</option>
                <option value="Psoriasis">Psoriasis</option>
                <option value="Rabies">Rabies</option>
                <option value="Rheumatoid Arthritis">Rheumatoid Arthritis</option>
                <option value="Rubella">Rubella</option>
                <option value="Schizophrenia">Schizophrenia</option>
                <option value="Scoliosis">Scoliosis</option>
                <option value="Sepsis">Sepsis</option>
                <option value="Sickle Cell Anemia">Sickle Cell Anemia</option>
                <option value="Sinusitis">Sinusitis</option>
                <option value="Sleep Apnea">Sleep Apnea</option>
                <option value="Spina Bifida">Spina Bifida</option>
                <option value="Stroke">Stroke</option>
                <option value="Systemic Lupus Erythematosus">Systemic Lupus Erythematosus</option>
                <option value="Testicular Cancer">Testicular Cancer</option>
                <option value="Tetanus">Tetanus</option>
                <option value="Thyroid Cancer">Thyroid Cancer</option>
                <option value="Tonsillitis">Tonsillitis</option>
                <option value="Tourette Syndrome">Tourette Syndrome</option>
                <option value="Tuberculosis">Tuberculosis</option>
                <option value="Turner Syndrome">Turner Syndrome</option>
                <option value="Typhoid Fever">Typhoid Fever</option>
                <option value="Ulcerative Colitis">Ulcerative Colitis</option>
                <option value="Urinary Tract Infection">Urinary Tract Infection</option>
                <option value="Williams Syndrome">Williams Syndrome</option>
                <option value="Zika Virus">Zika Virus</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Fever:
                <input
                  type="checkbox"
                  name="fever"
                  checked={formData.fever}
                  onChange={() => handleCheckboxChange('fever')}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Cough:
                <input
                  type="checkbox"
                  name="cough"
                  checked={formData.cough}
                  onChange={() => handleCheckboxChange('cough')}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Fatigue:
                <input
                  type="checkbox"
                  name="fatigue"
                  checked={formData.fatigue}
                  onChange={() => handleCheckboxChange('fatigue')}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Difficulty Breathing:
                <input
                  type="checkbox"
                  name="difficultyBreathing"
                  checked={formData.difficultyBreathing}
                  onChange={() => handleCheckboxChange('difficultyBreathing')}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>
                Blood Pressure:
                <select
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                >
                  <option value="">Select Blood Pressure</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>
                Cholesterol Level:
                <select
                  name="cholesterolLevel"
                  value={formData.cholesterolLevel}
                  onChange={handleInputChange}
                >
                  <option value="">Select Cholesterol Level</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>
                Outcome Variable:
                <select
                  name="outcomeVariable"
                  value={formData.outcomeVariable}
                  onChange={handleInputChange}
                >
                  <option value="">Select Result</option>
                  <option value="Positive">Positive</option>
                  <option value="Negative">Negative</option>
                </select>
              </label>
            </div>

            <br />
            <button type="submit">Submit Data</button>
          </form>
          <br />
          <Link to="/">Go back to App</Link>
        </div>
      </main>
  
    </div>
  );
};

export default DoctorSubmit;