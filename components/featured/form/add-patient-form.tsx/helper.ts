import { z } from 'zod';

export const addPatientSchema = z.object({
  lastName: z.string(),
  firstName: z.string().min(1, 'This field is required'),
  middleName: z.string(),
  employmentSector: z.string(),
  natureOfBusiness: z.string(),
  positionLevel: z.string(),
  gender: z.string().min(1, 'This field is required'),
  religion: z.string().min(1, 'This field is required'),
  birthDate: z.coerce.date(),
  age: z.number(),
  maritalStatus: z.string().min(1, 'This field is required'),

  citizenship: z.string().min(1, 'This field is required'),
  country: z.string().min(1, 'This field is required'),
  province: z.string().min(1, 'This field is required'),
  cityOrTown: z.string().min(1, 'This field is required'),
  brgyOrSub: z.string().min(1, 'This field is required'),
  street: z.string().min(1, 'This field is required'),
  houseNumber: z.string(),

  mobileNumberOne: z.number().min(1, 'This field is required'),
  mobileNumberTwo: z.number(),
  mobileNumberThree: z.number(),
  faxNumber: z.number(),
  email: z.string().email(),
  contactPerson: z.number().min(1, 'This field is required'),

  patientNotes: z.string(),
  gpEmployeeNumber: z.string(),
});

export type AddPatientType = z.infer<typeof addPatientSchema>;
