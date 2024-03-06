import { ApplicationType } from '@/utils/types';
import {
    SewingPinIcon,
    BackpackIcon,
    CalendarIcon,
    TimerIcon,
} from '@radix-ui/react-icons';

import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import ApplicationInfo from './application-info';
import DeleteApplicationButton from './delete-application-btn';

function ApplicationCard({ application }: { application: ApplicationType }) {
    const date = new Date(application.createdAt).toLocaleDateString();
    return (
        <Card className="bg-muted">
            <CardHeader>
                <CardTitle>{application.position}</CardTitle>
                <CardDescription>{application.company}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="mt-4 grid grid-cols-2 gap-4">
                <ApplicationInfo
                    icon={<BackpackIcon />}
                    text={application.mode}
                />
                <ApplicationInfo
                    icon={<SewingPinIcon />}
                    text={application.location}
                />
                <ApplicationInfo icon={<CalendarIcon />} text={date} />
                <Badge className="w-32  justify-center">
                    <ApplicationInfo
                        icon={<TimerIcon className="w-4 h-4" />}
                        text={application.status}
                    />
                </Badge>
            </CardContent>
            <CardFooter className="flex gap-4">
                <Button asChild size="sm">
                    <Link href={`/applications/${application.id}`}>edit</Link>
                </Button>
                <DeleteApplicationButton id={application.id} />
            </CardFooter>
        </Card>
    );
}
export default ApplicationCard;
