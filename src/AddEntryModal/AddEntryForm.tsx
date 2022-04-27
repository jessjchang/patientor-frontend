import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { NewEntry } from "../types";
import { useStateValue } from "../state";
import EntryTypeFormFields from './EntryTypeFormFields';

interface Props {
  onSubmit: (value: NewEntry) => void;
  onCancel: () => void;
  initialValues: NewEntry;
  validate: (values: unknown) => { [field: string]: string };
}

const AddEntryForm = ({ onSubmit, onCancel, initialValues, validate }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    enableReinitialize
    initialValues={initialValues}
    onSubmit={onSubmit}
    onCancel={onCancel}
    validate={validate}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
      return (
        <Form className="form ui">
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <EntryTypeFormFields entryType={values.type} />
          <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;