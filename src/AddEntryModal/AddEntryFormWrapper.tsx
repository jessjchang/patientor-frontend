import React, { useState, useCallback } from 'react';

import { Divider, Select, MenuItem } from "@material-ui/core";
import { EntryType, NewEntry } from "../types";
import AddEntryForm from './AddEntryForm';
import { EntryTypeOption } from '../AddPatientModal/FormField';

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryType.Hospital, label: "Hospital" },
];

const baseInitialValues = {
  date: "",
  description: "",
  specialist: "",
};

const healthCheckInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0,
};

const occupationalHealthcareInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.OccupationalHealthcare,
  employerName: "",
  sickLeave: { startDate: "", endDate: "" },
};

const hospitalInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.Hospital,
  discharge: { date: "", criteria: "" },
};

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryFormWrapper: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
    if (e.target.value) { setEntryType(e.target.value as EntryType); }
  };

  const entryForm = useCallback(() => {
    switch (entryType) {
    case EntryType.Hospital:
      return (
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialValues={hospitalInitialValues}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validate={(values: any) => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.dateOfBirth = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if (!values.discharge) {
              errors.dispatch = requiredError;
            }
            return errors;
          }}
        />
      );
    case EntryType.OccupationalHealthcare:
      return (
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialValues={occupationalHealthcareInitialValues}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validate={(values: any) => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.dateOfBirth = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            return errors;
          }}
        />
      );
    case EntryType.HealthCheck:
      return (
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialValues={healthCheckInitialValues}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validate={(values: any) => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.dateOfBirth = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
            return errors;
          }}
        />
      );
    default:
      return null;
    }
  }, [entryType, onCancel, onSubmit]);

  return (
    <>
      <form>
        <Select
          label="Entry Type"
          value={entryType === EntryType.HealthCheck ? EntryType.HealthCheck : entryType}
          onChange={handleChange}
        >
          {entryTypeOptions.map(entryType => (
            <MenuItem key={entryType.value} value={entryType.value}>{entryType.label}</MenuItem>
          ))}
        </Select>
      </form>

      <Divider />

      {entryForm()}
    </>
  );
};

export default AddEntryFormWrapper;