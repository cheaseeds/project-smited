use sampledata;

create table patient ( 
    patient_id UUID PRIMARY KEY,
    disease TEXT,
    fever BOOLEAN,
    cough BOOLEAN,
    fatigue BOOLEAN,
    difficulty_breathing BOOLEAN,
    age INT,
    gender TEXT,
    blood_pressure TEXT,
    cholesterol_level TEXT,
    outcome_variable TEXT
);
