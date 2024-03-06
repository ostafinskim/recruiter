'use client';
import { useSearchParams } from 'next/navigation';
import { getAllApplicationsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import ButtonContainer from './button-container';
import ApplicationCard from './application-card';

function ApplicationsList() {
    const searchParams = useSearchParams();

    const search = searchParams.get('search') || '';
    const applicationStatus = searchParams.get('applicationStatus') || 'all';

    const pageNumber = Number(searchParams.get('page')) || 1;

    const { data, isPending } = useQuery({
        queryKey: ['applications', search, applicationStatus, pageNumber],
        queryFn: () =>
            getAllApplicationsAction({
                search,
                applicationStatus,
                page: pageNumber,
            }),
    });
    const applications = data?.applications || [];

    const count = data?.count || 0;
    const page = data?.page || 0;
    const totalPages = data?.totalPages || 0;

    if (isPending) return <h2 className="text-xl">Please Wait...</h2>;
    if (applications.length < 1)
        return <h2 className="text-xl">No Jobs Found...</h2>;

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold capitalize ">
                    {count} applications found
                </h2>
                {totalPages < 2 ? null : (
                    <ButtonContainer
                        currentPage={page}
                        totalPages={totalPages}
                    />
                )}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {applications.map((application) => {
                    return (
                        <ApplicationCard
                            key={application.id}
                            application={application}
                        />
                    );
                })}
            </div>
        </>
    );
}
export default ApplicationsList;
