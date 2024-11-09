import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import LandingImg from '../assets/main.svg';
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
        <section className='max-w-6xl mx-auto px-4 sm:px-8'>
          <div className="my-8 flex justify-end">
            <ThemeToggle />
          </div>
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr,1fr] lg:my-24">
            <div className="my-12 flex flex-col">
              <h1 className='capitalize text-4xl md:text-7xl font-bold'>Recruiter</h1>
              <p className='max-w-md mt-6 mb-3 text-lg font-semibold '>Recruiter is a platform for keeping track of job applications.</p>
              <p className='max-w-md mt-6 mb-3 text-lg font-semibold'>It helps you keep track of the jobs you've applied to, the companies you've applied to, and the status of your applications.</p>
              <Button asChild className='mt-6 self-start text-white bg-[#6C63FF]' variant="outline">
                <Link href='/new-recruitation'>Get Started</Link>
              </Button>
            </div>
              <Image src={LandingImg} alt='landing' className='block' />
         </div>
        </section>
    </>
  );
}