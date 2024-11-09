"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  RecrutationStatus,
  RecrutationMode,
  createAndEditRecrutationSchema,
  CreateAndEditRecrutationType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
  CustomFormField,
  CustomFormSelect,
} from "./CreateRecrutationFormComponents";
import { createRecrutation } from "../utils/actions";
import { useToast } from "../hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateRecrutationForm() {
  const form = useForm<CreateAndEditRecrutationType>({
    resolver: zodResolver(createAndEditRecrutationSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: RecrutationStatus.PENDING,
      mode: RecrutationMode.FULL_TIME,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditRecrutationType) => createRecrutation(values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'there was an error',
        });
        return;
      }
      toast({ description: 'job created' });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      router.push('/jobs');
      // form.reset();
    },
  });

  function onSubmit(values: CreateAndEditRecrutationType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 max-w-prose"
      >
        <h2 className="font-semibold sm:text-2xl text-4xl mb-6">
          📂 Create new recrutation
        </h2>
        <div className="flex flex-col gap-6">

          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />

          <CustomFormSelect
            name="status"
            control={form.control}
            items={Object.values(RecrutationStatus)}
            labelText="Status"
          />

          <CustomFormSelect
            name="mode"
            control={form.control}
            items={Object.values(RecrutationMode)}
            labelText="Mode"
          />
        </div>
        <Button type="submit" className="mt-6">
          Add new
        </Button>
      </form>
    </Form>
  );
}
