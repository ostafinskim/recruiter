import { RecrutationType } from "@/utils/types";
import { Briefcase, CalendarDays, MapPin, RadioTower } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import RecruitmentInfo from "./RecruitmentInfo";
import DeleteRecrutationButton from "./DeleteRecrutation";

export default function RecrutationCard({
  recrutation,
}: {
  recrutation: RecrutationType;
}) {
  const date = new Date(recrutation.createdAt).toLocaleDateString();
  return (
    <>
      <Card className="bg-muted">
        <CardHeader>
          <CardTitle>{recrutation.position}</CardTitle>
          <CardDescription>{recrutation.company}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <CardContent className="mt-4 grid grid-cols-2 gap-4">
            <RecruitmentInfo icon={<Briefcase />} text={recrutation.mode} />
            <RecruitmentInfo icon={<MapPin />} text={recrutation.location} />
            <RecruitmentInfo icon={<CalendarDays />} text={date} />
            <Badge className="w-32  justify-center">
              <RecruitmentInfo
                icon={<RadioTower className="w-4 h-4" />}
                text={recrutation.status}
              />
            </Badge>
          </CardContent>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button asChild size="sm">
            <Link href={`/jobs/${recrutation.id}`}>edit</Link>
          </Button>
          <DeleteRecrutationButton id={recrutation.id} />
        </CardFooter>
      </Card>
    </>
  );
}
