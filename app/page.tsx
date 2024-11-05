import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import LandingImg from '../assets/main.svg';

export default function Home() {
  return (
    <>
        <section className='max-w-6xl mx-auto px-4 sm:px-8'>
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr,1fr] lg:my-36">
            <div className="my-12 flex flex-col">
              <h1 className='capitalize text-4xl md:text-7xl font-bold'>Recruiter</h1>
              <p className='max-w-md mt-6 '>Recruiter is a platform for keeping track of job applications.</p>
              <p className='max-w-md mt-6'>It helps you keep track of the jobs you've applied to, the companies you've applied to, and the status of your applications.</p>
              <p className='max-w-md mt-6'>Get started today!</p>
              <Button asChild className='mt-6 self-start bg-[#404153]'>
                <Link href='/add-application'>Get Started</Link>
              </Button>
            </div>
              <Image src={LandingImg} alt='landing' className='block' />
         </div>
        </section>
    </>
  );
}