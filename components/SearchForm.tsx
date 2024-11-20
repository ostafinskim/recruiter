'use client';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RecrutationStatus } from '@/utils/types';

export default function SearchForm() {
  // set default values
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const recrutationStatus = searchParams.get('recrutationStatus') || 'all';

  const router = useRouter();
  const pathname = usePathname();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const recrutationStatus = formData.get('recrutationStatus') as string;
    params.set('search', search);
    params.set('recrutationStatus', recrutationStatus);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className='bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg'
      onSubmit={handleSubmit}
    >
      <Input
        type='text'
        placeholder='Search recrutation'
        name='search'
        defaultValue={search}
      />
      <Select defaultValue={recrutationStatus} name='recrutationStatus'>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['all', ...Object.values(RecrutationStatus)].map((recrutationStatus) => {
            return (
              <SelectItem key={recrutationStatus} value={recrutationStatus}>
                {recrutationStatus}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type='submit'>Search</Button>
    </form>
  );
}
