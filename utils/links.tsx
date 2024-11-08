import { AreaChart, Layers, AppWindow } from 'lucide-react';

type NavLink = {
    href: string;
    label: string;
    icon: React.ReactNode;
}

export const links: NavLink[] = [
    {
        href: '/new-recruitation',
        label: 'New Recruitation',
        icon: <Layers />
    },
    {
        href: '/recruitments',
        label: 'Recruitments',
        icon: <AppWindow />
    },
    {
        href: '/statistics',
        label: 'Statistics',
        icon: <AreaChart />
    }
]

export default links;