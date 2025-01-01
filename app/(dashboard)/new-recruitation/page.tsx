'use client';
import CreateRecrutationForm from "@/components/CreateRecrutationForm";
import dynamic from 'next/dynamic'


const Map = dynamic(
  () => import("@/components/Map"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div>Loading map...</div>
      </div>
    )
  }
);

export default function NewRecruitationPage() {
  return (
    <div className="flex flex-col gap-4">
      <CreateRecrutationForm />
      <Map />
    </div>
  );
}