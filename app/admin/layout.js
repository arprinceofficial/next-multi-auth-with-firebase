"use client";
import withAuth from '@/app/hoc/withAuth';

const Layout = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export default withAuth(Layout, 2);
