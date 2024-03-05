import { BarChartIcon, GlobeIcon, FilePlusIcon } from '@radix-ui/react-icons';

type NavLink = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

const links: NavLink[] = [
    {
        href: '/add-application',
        label: 'add application',
        icon: <FilePlusIcon />,
    },
    {
        href: '/applications',
        label: 'all applications',
        icon: <GlobeIcon />,
    },
    {
        href: '/stats',
        label: 'stats',
        icon: <BarChartIcon />,
    },
];

export default links;
