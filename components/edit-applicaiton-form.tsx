'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    ApplicationStatus,
    ApplicationMode,
    createAndEditApplicationSchema,
    CreateAndEditApplicationType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField, CustomFormSelect } from './form-components';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
    getSingleApplicationAction,
    updateApplicationAction,
} from '@/utils/actions';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

function EditApplicationForm({ applicationId }: { applicationId: string }) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const router = useRouter();

    const { data } = useQuery({
        queryKey: ['applications', applicationId],
        queryFn: () => getSingleApplicationAction(applicationId),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (values: CreateAndEditApplicationType) =>
            updateApplicationAction(applicationId, values),
        onSuccess: (data) => {
            if (!data) {
                toast({
                    description: 'there was an error',
                });
                return;
            }
            toast({ description: 'application updated' });
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            queryClient.invalidateQueries({
                queryKey: ['application', applicationId],
            });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            router.push('/applications');
            // form.reset();
        },
    });

    // 1. Define your form.
    const form = useForm<CreateAndEditApplicationType>({
        resolver: zodResolver(createAndEditApplicationSchema),
        defaultValues: {
            position: data?.position || '',
            company: data?.company || '',
            location: data?.location || '',
            status:
                (data?.status as ApplicationStatus) ||
                ApplicationStatus.Pending,
            mode: (data?.mode as ApplicationMode) || ApplicationMode.FullTime,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: CreateAndEditApplicationType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        mutate(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-muted p-8 rounded"
            >
                <h2 className="capitalize font-semibold text-4xl mb-6">
                    edit job
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {/* position */}
                    <CustomFormField name="position" control={form.control} />
                    {/* company */}
                    <CustomFormField name="company" control={form.control} />
                    {/* location */}
                    <CustomFormField name="location" control={form.control} />

                    {/* application status */}
                    <CustomFormSelect
                        name="status"
                        control={form.control}
                        labelText="job status"
                        items={Object.values(ApplicationStatus)}
                    />
                    {/* application  type */}
                    <CustomFormSelect
                        name="mode"
                        control={form.control}
                        labelText="job mode"
                        items={Object.values(ApplicationMode)}
                    />

                    <Button
                        type="submit"
                        className="self-end capitalize"
                        disabled={isPending}
                    >
                        {isPending ? 'updating...' : 'edit job'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
export default EditApplicationForm;
