'use client';
import { useQuery } from '@tanstack/react-query';
import { getAll } from '@/utils/actions';

export default function RecruitmentsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['all-recruitments'],
    queryFn: async () => await getAll(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading recruitments: {error.message}</div>;

  return (
    <div>
      {
        data?.map((recruitment) => (
          <div key={recruitment.id}>
            <h2>{recruitment.position}</h2>
            <p>{recruitment.company}</p>
            <p>{recruitment.location}</p>
            <p>{recruitment.status}</p>
          </div>
        ))
      }
    </div>
  );
}