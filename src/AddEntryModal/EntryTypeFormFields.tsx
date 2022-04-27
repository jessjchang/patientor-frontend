import React from "react";
import { Field } from "formik";

import { EntryType, HealthCheckRating } from "../types";
import { TextField } from "../AddPatientModal/FormField";
import { InputLabel, MenuItem } from "@material-ui/core";
import { FormikSelect } from '../AddPatientModal/FormField';

interface Props {
  entryType: EntryType;
}

const healthCheckRatingOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

type HealthCheckOption = {
  value: HealthCheckRating;
  label: string;
};

type HealthCheckSelectFieldProps = {
  name: string;
  label: string;
  options: HealthCheckOption[];
};

const HealthCheckSelectField = ({ name, label, options }: HealthCheckSelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

const EntryTypeFormFields: React.FC<Props> = ({ entryType }) => {
  switch (entryType) {
    case EntryType.Hospital:
      return (
        <>
          <h3>Discharge:</h3>
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <h3>Sick Leave:</h3>
          <Field
            label="Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );
    case EntryType.HealthCheck:
      return (
        <HealthCheckSelectField
          label="Health Check Rating"
          name="healthCheckRating"
          options={healthCheckRatingOptions}
        />
      );
    default:
      return null;
  }
};

export default EntryTypeFormFields;