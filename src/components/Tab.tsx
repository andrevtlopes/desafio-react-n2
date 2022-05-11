import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

export default function Tab({ children, to, ...props }: LinkProps) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link
            className={`tab  ${match ? 'tab-active' : ''}`}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
}
