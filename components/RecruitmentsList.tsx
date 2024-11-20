'use client';
import RecruitmentCard from './RecruitmentCard';
import { useSearchParams } from 'next/navigation';
import { getAllRecrutations } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';

export default function RecruitmentsList() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const recrutationStatus = searchParams.get('recrutationStatus') || 'all';

  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['recruitments', search ?? '', recrutationStatus, pageNumber],
    queryFn: () => getAllRecrutations({ search, recrutationStatus, page: pageNumber }),
  });
  const recrutations = data?.recrutations || [];

  if (isPending) return <h2 className='text-xl'>Please Wait...</h2>;

  if (recrutations.length < 1) return <h2 className='text-xl'>No matching results...</h2>;
  return (
    <>
      {/*button container  */}
      <div className='grid md:grid-cols-2  gap-8'>
        {recrutations.map((recrutation) => {
          return <RecruitmentCard key={recrutation.id} recrutation={recrutation} />;
        })}
      </div>
    </>
  );
}