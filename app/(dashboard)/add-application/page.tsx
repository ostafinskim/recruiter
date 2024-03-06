import CreateApplicationForm from '@/components/application-form';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

function AddApplicationPage() {
    const queryClient = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CreateApplicationForm />
        </HydrationBoundary>
    );
}
export default AddApplicationPage;
