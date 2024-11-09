import CreateRecrutationForm from "@/components/CreateRecrutationForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default function NewRecruitationPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateRecrutationForm />
    </HydrationBoundary>
    )
}
