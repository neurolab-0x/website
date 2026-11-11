import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LOADER_ROUTES = ['/shop'];

const SurgicalLoader = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (LOADER_ROUTES.includes(location.pathname)) {
            setLoading(true);
            const timeout = setTimeout(() => setLoading(false), 600);
            return () => clearTimeout(timeout);
        }
        setLoading(false);
    }, [location.pathname]);

    if (!loading) return null;

    return (
        <div className="surgical-loader" aria-hidden="true">
            <div className="surgical-loader-bar" />
        </div>
    );
};

export default SurgicalLoader;
