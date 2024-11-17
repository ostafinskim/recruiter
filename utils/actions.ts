"use server";

import prisma from "./database";
import {
  RecrutationType,
  CreateAndEditRecrutationType,
  createAndEditRecrutationSchema,
} from "./types";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

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

export async function getAll(): Promise<RecrutationType[]> {
  const userId = await authAndRedirect();
  try {
    const items = await prisma.recrutation.findMany({
      where: {
        clerkId: userId,
      },
    });
    return items as RecrutationType[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
