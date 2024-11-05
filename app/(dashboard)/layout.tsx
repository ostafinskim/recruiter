export default function Layout({ children }: { children: React.ReactNode } ) {
    return (
        <>
            <section className='max-w-6xl mx-auto px-4 sm:px-8'>
                {children}
            </section>
        </>
    );
}