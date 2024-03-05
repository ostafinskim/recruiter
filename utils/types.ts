import * as z from 'zod';

export type ApplicationType = {
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

export enum ApplicationStatus {
    Pending = 'pending',
    Interview = 'interview',
    Declined = 'declined',
}

export enum ApplicationMode {
    FullTime = 'full-time',
    PartTime = 'part-time',
    Internship = 'internship',
}

export const createAndEditApplicationSchema = z.object({
    position: z.string().min(2, {
        message: 'position must be at least 2 characters.',
    }),
    company: z.string().min(2, {
        message: 'company must be at least 2 characters.',
    }),
    location: z.string().min(2, {
        message: 'location must be at least 2 characters.',
    }),
    status: z.nativeEnum(ApplicationStatus),
    mode: z.nativeEnum(ApplicationMode),
});

export type CreateAndEditApplicationType = z.infer<
    typeof createAndEditApplicationSchema
>;
