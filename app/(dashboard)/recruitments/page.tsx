'use client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import RecruitmentsList from '@/components/RecruitmentsList';
import SearchForm from '@/components/SearchForm';

export default function RecruitmentsPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <RecruitmentsList />
    </HydrationBoundary>
  );
}
