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
import { ApplicationStatus } from '@/utils/types';

function SearchContainer() {
    // set default values
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';
    const applicationStatus = searchParams.get('applicationStatus') || 'all';

    const router = useRouter();
    const pathname = usePathname();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const applicationStatus = formData.get('applicationStatus') as string;
        let params = new URLSearchParams();
        params.set('search', search);
        params.set('applicationStatus', applicationStatus);

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <form
            className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg"
            onSubmit={handleSubmit}
        >
            <Input
                type="text"
                placeholder="Search Jobs"
                name="search"
                defaultValue={search}
            />
            <Select defaultValue={applicationStatus} name="applicationStatus">
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {['all', ...Object.values(ApplicationStatus)].map(
                        (applicationStatus) => {
                            return (
                                <SelectItem
                                    key={applicationStatus}
                                    value={applicationStatus}
                                >
                                    {applicationStatus}
                                </SelectItem>
                            );
                        }
                    )}
                </SelectContent>
            </Select>
            <Button type="submit">Search</Button>
        </form>
    );
}
export default SearchContainer;
