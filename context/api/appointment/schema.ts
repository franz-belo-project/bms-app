import { z } from 'zod';

export const appointmentSchema = z.object({
  data: z.array(
    z.object({
      id: z.number().or(z.string()),
      appointment_date: z.string().nullable(),
      patient_id: z.string(),
      patient: z.object({
        first_name: z.string().nullable(),
        middle_name: z.string().nullable(),
        last_name: z.string().nullable(),
        contact_number: z.string().nullable(),
        avatar: z.string().nullable(),
        drug_allergy: z.string().nullable(),
        drug_allergies: z.string().nullable(),
      }),
      machine: z.object({
        machine_code: z.number().nullable(),
        name: z.string().nullable(),
      }),
      room: z.object({
        room_code: z.number().nullable(),
        number: z.number().nullable(),
      }),
      doctor: z.object({
        name: z.string().nullable(),
        code: z.string().nullable(),
      }),
      aesthetician: z.object({
        name: z.string().nullable(),
        code: z.string().nullable(),
      }),
      date: z.string().nullable(),
      start_at: z.string(),
      end_at: z.string(),
      created_at: z.string().nullable(),
      appointment_subject: z.string().nullable(),
      appointment_status: z.string().nullable(),
      confirmation_status: z.string().nullable(),
      booked_by: z.string().nullable(),
      appointment_notes: z.string().nullable(),
      updated_by: z.string().nullable(),
      updated_at: z.string().nullable(),
      break_details: z.string().nullable(),
      procedure: z.object({
        name: z.string().nullable(),
        barcode: z.string().nullable(),
      }),
    }),
  ),
});

export type AppointmentType = z.infer<typeof appointmentSchema>;
