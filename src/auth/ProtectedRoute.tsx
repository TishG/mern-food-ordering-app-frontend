import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoute = () => {
	const { isAuthenticated, isLoading } = useAuth0();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			toast.error('You must be signed in to access that page.');
		}
	}, [isLoading, isAuthenticated]);

	if (isLoading) {
		return null;
	}

	return isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
};

export default ProtectedRoute;
