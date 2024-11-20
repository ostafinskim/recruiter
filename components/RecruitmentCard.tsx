import { RecrutationType } from "@/utils/types";

export default function RecrutationCard({
  recrutation,
}: {
  recrutation: RecrutationType;
}) {
  return (
    <div className="border border-red-400">
      <h2 className="text-lg font-medium capitalize">{recrutation.position}</h2>
      <p>{recrutation.company}</p>
      <p>{recrutation.location}</p>
      <p>{recrutation.status}</p>
      <p>{recrutation.mode}</p>
    </div>
  );
}