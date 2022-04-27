import { Gender, Entry, Patient, EntryType } from './types';

export class InvalidPatientError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(...params);
    this.name = 'InvalidPatientError';
  }
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (param: unknown, paramName: string): string => {
  if (!param || !isString(param) || param === '') {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new InvalidPatientError(`Incorrect or missing ${paramName}: ${param}`);
  }

  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date)) && (/^\d{4}-\d{2}-\d{2}$/).test(date);
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new InvalidPatientError(`Incorrect or missing dateOfBirth: ${dateOfBirth}`);
  }

  return dateOfBirth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new InvalidPatientError(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArrayOfEntries = (param: any[]): param is Entry[] => {
  const hasInvalidEntry = param.some((entry) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return !Object.values(EntryType).includes(entry.type);
  });

  return !hasInvalidEntry;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries) || !isArrayOfEntries(entries)) {
    throw new InvalidPatientError(`Incorrect or missing entries: ${JSON.stringify(entries)}`);
  }

  return entries;
};

type Fields = { id: unknown, name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toPatient = ({ id, name, dateOfBirth, ssn, gender, occupation, entries } : Fields): Patient => {
  const patient: Patient = {
    id: parseString(id, 'id'),
    name: parseString(name, 'name'),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
    entries: parseEntries(entries),
  };

  return patient;
};

export default toPatient;