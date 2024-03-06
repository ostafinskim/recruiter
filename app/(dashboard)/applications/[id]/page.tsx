import { getSingleApplicationAction } from '@/utils/actions';
import EditApplicationForm from '@/components/edit-applicaiton-form';

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

async function ApplicationDetailPage({ params }: { params: { id: string } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['applications', params.id],
        queryFn: () => getSingleApplicationAction(params.id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <EditApplicationForm applicationId={params.id} />
        </HydrationBoundary>
    );
}
export default ApplicationDetailPage;
