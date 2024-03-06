import ApplicationsList from '@/components/applications-list';
import SearchForm from '@/components/search-form';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import { getAllApplicationsAction } from '@/utils/actions';

async function AllApplicationsPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['Applications', '', 'all', 1],
        queryFn: () => getAllApplicationsAction({}),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SearchForm />
            <ApplicationsList />
        </HydrationBoundary>
    );
}

export default AllApplicationsPage;
