'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    ApplicationStatus,
    ApplicationMode,
    createAndEditApplicationSchema,
    CreateAndEditApplicationType,
} from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField, CustomFormSelect } from './form-components';
import { createApplicationAction } from '@/utils/actions';

function CreateApplicationForm() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const router = useRouter();
    const { mutate, isPending } = useMutation({
        mutationFn: (values: CreateAndEditApplicationType) =>
            createApplicationAction(values),
        onSuccess: (data) => {
            if (!data) {
                toast({
                    description: 'there was an error',
                });
                return;
            }
            toast({ description: 'application created' });
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            queryClient.invalidateQueries({ queryKey: ['charts'] });

            router.push('/applications');
            // form.reset();
        },
    });

    function onSubmit(values: CreateAndEditApplicationType) {
        mutate(values);
    }
    const form = useForm<CreateAndEditApplicationType>({
        resolver: zodResolver(createAndEditApplicationSchema),
        defaultValues: {
            position: '',
            company: '',
            location: '',
            status: ApplicationStatus.Pending,
            mode: ApplicationMode.FullTime,
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-muted p-8 rounded"
            >
                <h2 className="capitalize font-semibold text-4xl mb-6">
                    add application
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
                        labelText="application status"
                        items={Object.values(ApplicationStatus)}
                    />
                    {/* application  type */}
                    <CustomFormSelect
                        name="mode"
                        control={form.control}
                        labelText="application mode"
                        items={Object.values(ApplicationMode)}
                    />

                    <Button
                        type="submit"
                        className="self-end capitalize"
                        disabled={isPending}
                    >
                        {isPending ? 'loading...' : 'create application'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
export default CreateApplicationForm;
