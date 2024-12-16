import EditRecrutationForm from "@/components/EditRecrutationForm";
import { getSingleRecrutation } from "@/utils/actions";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function RecrutationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["recrutation", params.id],
    queryFn: () => getSingleRecrutation(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditRecrutationForm recrutationId={params.id} />
    </HydrationBoundary>
  );
}
