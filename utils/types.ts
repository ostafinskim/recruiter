import * as z from "zod";

export type RecrutationType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum RecrutationStatus {
  PENDING = "pending",
  INTERVIEW = "interview",
  REJECTED = "rejected",
}

export enum RecrutationMode {
  FULL_TIME = "Full time",
  PART_TIME = "Part time",
  CONTRACT = "Contract",
  INTERNSHIP = "Internship",
}

export type GetAllRecrutationType = {
  search?: string;
  recrutationStatus?: string;
  page?: number;
  limit?: number;
}

export const createAndEditRecrutationSchema = z.object({
  position: z.string().min(2, {
    message: "* Position must be at least 2 characters long",
  }),
  company: z.string().min(2, {
    message: "* Company must be at least 2 characters long",
  }),
  location: z.string().min(2, {
    message: "* Location must be at least 2 characters long",
  }),
  status: z.nativeEnum(RecrutationStatus),
  mode: z.nativeEnum(RecrutationMode),
});

export type CreateAndEditRecrutationType = z.infer<
  typeof createAndEditRecrutationSchema
>;
