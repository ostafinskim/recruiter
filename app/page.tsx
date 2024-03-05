import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 ">
                {/* @todo - logo */}
            </header>
            <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
                <div>
                    <h1 className="capitalize text-4xl md:text-7xl font-bold">
                        Recruiter
                    </h1>
                    <p className="leading-loose max-w-md mt-4 ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ipsum sint dolores a, corporis quo ipsam assumenda
                        velit sed. Optio, nesciunt omnis? Praesentium a
                        voluptates unde!
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/new-application">Get Started</Link>
                    </Button>
                </div>
                {/* @todo - hero image */}
            </section>
        </main>
    );
}
