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

function CreateApplicationForm() {
    // 1. Define your form.
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

    function onSubmit(values: CreateAndEditApplicationType) {
        console.log(values);
    }

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

                    <Button type="submit" className="self-end capitalize">
                        create application
                    </Button>
                </div>
            </form>
        </Form>
    );
}
export default CreateApplicationForm;
