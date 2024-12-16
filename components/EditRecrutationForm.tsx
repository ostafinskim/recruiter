'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  RecrutationStatus,
  RecrutationMode,
  createAndEditRecrutationSchema,
  CreateAndEditRecrutationType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
  createRecrutation,
  getSingleRecrutation,
  updateRecrutation,
} from '@/utils/actions';
import { useRouter } from 'next/navigation';
import { useToast } from '../hooks/use-toast';
import { CustomFormField, CustomFormSelect } from './CreateRecrutationFormComponents';

export default function EditRecrutationForm({ recrutationId }: { recrutationId: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['recrutation', recrutationId],
    queryFn: () => getSingleRecrutation(recrutationId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditRecrutationType) =>
      updateRecrutation(recrutationId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'there was an error',
        });
        return;
      }
      toast({ description: 'recrutation updated' });
      queryClient.invalidateQueries({ queryKey: ['recrutations'] });
      queryClient.invalidateQueries({ queryKey: ['recrutation', recrutationId] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      router.push('/recruitments');
    },
  });

  const form = useForm<CreateAndEditRecrutationType>({
    resolver: zodResolver(createAndEditRecrutationSchema),
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      status: (data?.status as RecrutationStatus) || RecrutationStatus.PENDING,
      mode: (data?.mode as RecrutationMode) || RecrutationMode.FULL_TIME,
    },
  });

  function onSubmit(values: CreateAndEditRecrutationType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'
      >
        <h2 className='capitalize font-semibold text-4xl mb-6'>edit job</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start'>
          <CustomFormField name='position' control={form.control} />
          <CustomFormField name='company' control={form.control} />
          <CustomFormField name='location' control={form.control} />

          <CustomFormSelect
            name='status'
            control={form.control}
            labelText='recrutation status'
            items={Object.values(RecrutationStatus)}
          />
          <CustomFormSelect
            name='mode'
            control={form.control}
            labelText='recrutation mode'
            items={Object.values(RecrutationMode)}
          />

          <Button
            type='submit'
            className='self-end capitalize'
            disabled={isPending}
          >
            {isPending ? 'updating...' : 'edit recrutation'}
          </Button>
        </div>
      </form>
    </Form>
  );
}