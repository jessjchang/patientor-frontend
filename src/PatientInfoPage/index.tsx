import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';

import { Patient, Gender, Entry, NewEntry, EntryType } from "../types";
import toPatient, { InvalidPatientError } from '../utils';
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  let patient: Patient;
  if (id) {
    patient = patients[id];
  } else {
    patient = {id: "", name: "", gender: Gender.Other, occupation: "", dateOfBirth: "", ssn: "", entries: []};
  }

  try {
    patient = toPatient(patient);
  } catch(error: unknown) {
    if (error instanceof InvalidPatientError && !fetchStatus.current.hasFetched) {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
    } else {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchPatient = async () => {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
        fetchStatus.current = { ...fetchStatus.current, hasFetched: true };
      } catch(error) {
        console.error(error);
      }
    };

    if (fetchStatus.current.shouldFetch) {
      void fetchPatient();
    }
  }, [id, dispatch]);

  const getIcon = (gender: Gender | null) => {
    if (gender === Gender.Female) {
      return <span><FemaleIcon fontSize='large' /></span>;
    } else if (gender === Gender.Male) {
      return <span><MaleIcon fontSize='large' /></span>;
    } else {
      return <span><TransgenderIcon fontSize='large' /></span>;
    }
  };

  const showEntries = (entries: Entry[]) => {
    return (
      <div>
        <h2>entries</h2>
        {entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>
    );
  };

  const noEntries = () => {
    return (
      <div>
        <h2>No entries</h2>
      </div>
    );
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!patient) return null;

  const submitNewEntry = async (values: NewEntry) => {
    const body = { ...values };

    if (body.type === EntryType.OccupationalHealthcare) {
      if (!body.sickLeave?.endDate && !body.sickLeave?.startDate) {
        body.sickLeave = undefined;
      }
    }

    try {
      const { data: returnedPatient } = await axios.post<Patient>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${patient.id}/entries`, body
      );
      dispatch(updatePatient(returnedPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h1>{patient.name} {getIcon(patient.gender)}</h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={openModal}>Add New Entry</Button>
      {(patient.entries && patient.entries.length > 0) ?
        showEntries(patient.entries)
        : noEntries()}
    </div>
  );
};

export default PatientInfoPage;