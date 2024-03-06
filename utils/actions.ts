'use server';

import prisma from '@/utils/prisma';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import {
    ApplicationType,
    CreateAndEditApplicationType,
    createAndEditApplicationSchema,
} from './types';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

function authAndRedirect(): string {
    const { userId } = auth();
    if (!userId) {
        redirect('/');
    }
    return userId;
}

export async function createApplicationAction(
    data: CreateAndEditApplicationType
): Promise<ApplicationType | null> {
    const userId = await authAndRedirect();
    try {
        createAndEditApplicationSchema.parse(data);
        const application = await prisma.application.create({
            data: {
                ...data,
                clerkId: userId,
            },
        });
        return application;
    } catch (error) {
        console.error(error);
        return null;
    }
}

type GetAllApplicationActionTypes = {
    search?: string;
    applicationStatus?: string;
    page?: number;
    limit?: number;
};

export async function getAllApplicationsAction({
    search,
    applicationStatus,
    page = 1,
    limit = 10,
}: GetAllApplicationActionTypes): Promise<{
    applications: ApplicationType[];
    count: number;
    page: number;
    totalPages: number;
}> {
    const userId = authAndRedirect();

    try {
        let whereClause: Prisma.ApplicationWhereInput = {
            clerkId: userId,
        };
        if (search) {
            whereClause = {
                ...whereClause,
                OR: [
                    {
                        position: {
                            contains: search,
                        },
                    },
                    {
                        company: {
                            contains: search,
                        },
                    },
                ],
            };
        }
        if (applicationStatus && applicationStatus !== 'all') {
            whereClause = {
                ...whereClause,
                status: applicationStatus,
            };
        }
        const skip = (page - 1) * limit;

        const applications: ApplicationType[] =
            await prisma.application.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            });
        const count: number = await prisma.application.count({
            where: whereClause,
        });
        const totalPages = Math.ceil(count / limit);
        return { applications, count, page, totalPages };
    } catch (error) {
        console.error(error);
        return { applications: [], count: 0, page: 1, totalPages: 0 };
    }
}

export async function deleteApplicationAction(
    id: string
): Promise<ApplicationType | null> {
    const userId = authAndRedirect();

    try {
        const application: ApplicationType = await prisma.application.delete({
            where: {
                id,
                clerkId: userId,
            },
        });
        return application;
    } catch (error) {
        return null;
    }
}

export async function getSingleApplicationAction(
    id: string
): Promise<ApplicationType | null> {
    let application: ApplicationType | null = null;
    const userId = authAndRedirect();

    try {
        application = await prisma.application.findUnique({
            where: {
                id,
                clerkId: userId,
            },
        });
    } catch (error) {
        application = null;
    }
    if (!application) {
        redirect('/applications');
    }
    return application;
}

export async function updateApplicationAction(
    id: string,
    values: CreateAndEditApplicationType
): Promise<ApplicationType | null> {
    const userId = authAndRedirect();

    try {
        const application: ApplicationType = await prisma.application.update({
            where: {
                id,
                clerkId: userId,
            },
            data: {
                ...values,
            },
        });
        return application;
    } catch (error) {
        return null;
    }
}

export async function getStatsAction(): Promise<{
    pending: number;
    interview: number;
    declined: number;
}> {
    const userId = authAndRedirect();

    try {
        const stats = await prisma.application.groupBy({
            where: {
                clerkId: userId,
            },
            by: ['status'],
            _count: {
                status: true,
            },
        });
        const statsObject = stats.reduce((acc, curr) => {
            acc[curr.status] = curr._count.status;
            return acc;
        }, {} as Record<string, number>);

        const defaultStats = {
            pending: 0,
            declined: 0,
            interview: 0,
            ...statsObject,
        };
        return defaultStats;
    } catch (error) {
        redirect('/applications');
    }
}

export async function getChartsDataAction(): Promise<
    Array<{ date: string; count: number }>
> {
    const userId = authAndRedirect();
    const sixMonthsAgo = dayjs().subtract(6, 'month').toDate();
    try {
        const applications = await prisma.application.findMany({
            where: {
                clerkId: userId,
                createdAt: {
                    gte: sixMonthsAgo,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        let applicationsPerMonth = applications.reduce((acc, job) => {
            const date = dayjs(job.createdAt).format('MMM YY');

            const existingEntry = acc.find((entry) => entry.date === date);

            if (existingEntry) {
                existingEntry.count += 1;
            } else {
                acc.push({ date, count: 1 });
            }

            return acc;
        }, [] as Array<{ date: string; count: number }>);

        return applicationsPerMonth;
    } catch (error) {
        redirect('/applications');
    }
}
