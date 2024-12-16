"use server";

import prisma from "./database";
import {
  CreateAndEditRecrutationType,
  createAndEditRecrutationSchema,
  GetAllRecrutationType,
  RecrutationType,
} from "./types";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { LazyResult } from "postcss";

async function authAndRedirect(): Promise<string> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return userId;
}

export async function createRecrutation(
  values: CreateAndEditRecrutationType
): Promise<RecrutationType | null> {
  const userId = await authAndRedirect();
  try {
    createAndEditRecrutationSchema.parse(values);
    const recrutation = await prisma.recrutation.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
    return recrutation;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllRecrutations({
  search,
  recrutationStatus,
  page = 1,
  limit = 10
}: GetAllRecrutationType): Promise<{
  recrutations: RecrutationType[];
  totalCount: number;
  page: number;
  totalPages: number;
}> {
  const userId = await authAndRedirect();
  try {
    let where: Prisma.RecrutationWhereInput = {
      clerkId: userId,
    };

    if (search) {
      where = {
        ...where,
        OR: [
          {
            position: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            company: {
              contains: search,
              mode: 'insensitive'
            },
          }
        ],
      }
    }

    if (recrutationStatus && recrutationStatus !== "all") {
      where = {
        ...where,
        status: recrutationStatus,
      };
    }

    const skip = (page - 1) * limit;

    const recrutations = await prisma.recrutation.findMany({
      where,
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount: number = await prisma.recrutation.count({
      where,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { recrutations, page, totalCount, totalPages };
  } catch (error) {
    console.log(error);
    return { recrutations: [], totalCount: 0, totalPages: 0, page: 1 };
  }
}

export async function deleteRecrutation(id: string): Promise<RecrutationType | null> {
  const userId = await authAndRedirect();
  try {
    const recrutation: RecrutationType = await prisma.recrutation.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return recrutation;
  } catch (error) {
    console.error(error)
    return null;
  }
}

export async function getSingleRecrutation(id: string): Promise<RecrutationType | null> {
  let recrutation: RecrutationType | null = null;
  const userId = await authAndRedirect();
  try {
    recrutation = await prisma.recrutation.findFirst({
      where: {
        id,
        clerkId: userId,
      },
    });
    return recrutation;
  } catch (error) {
    recrutation = null;
  }
  if (!recrutation) {
    redirect('/recrutations');
  }
  return recrutation;
}

export async function updateRecrutation(
  id: string,
  values: CreateAndEditRecrutationType
): Promise<RecrutationType | null> {

  const userId = await authAndRedirect();

  try {
    const recrutation: RecrutationType = await prisma.recrutation.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return recrutation;
  } catch (error) {
    return null;
  }
}