// hoc/withAuth.js
'use client';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from "@/app/components/Loader/SpinkitBounceLoader";

const withAuth = (WrappedComponent, allowedRoles) => {
    const AuthenticatedComponent = (props) => {
        const { role, loading } = useAuth() || {};
        // console.log('role:', role);
        // console.log('allowedRoles:', allowedRoles);
        const router = useRouter();
        useEffect(() => {
            if (!loading && !(role === allowedRoles)) {
                router.push('/');
            }
        }, [role, loading, router]);

        if (loading) {
            return <Loader />;
        }

        if (!role) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;