"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import ApplicationLogo from '@/app/components/ApplicationLogo';
import Loader from "@/app/components/Loader/SpinkitBounceLoader";
import InputError from "@/app/components/Input/Error";
import InputLabel from "@/app/components/Input/Label";

export default function AdminLogin() {
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const { adminLogin, role, loading } = useAuth();
    const router = useRouter();
    const [password_open, passwordViewStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (!loading && role) {
            if (role === 2) {
                router.push('/admin');
            } else if (role === 3) {
                router.push('/user');
            } else {
                router.push('/');
            }
        }
    }, [role, loading, router]);

    if (loading) {
        return <Loader />;
    }

    const handleSubmit = async (event) => {
        setErrorMsg('');
        setIsLoading(true);
        event.preventDefault();
        const formData = {
            loginInput: loginInput,
            password: password,
        };

        try {
            const response = await adminLogin(formData);
            if (response) {
                router.push('/admin');
                return;
            }
        } catch (error) {
            setErrorMsg(error.response.data.errors);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-wrap flex items-center justify-center">
                <div className="relative md:w-1/2 w-full sm:pr-4 pr-3 pb-3 flex justify-center">
                    <div className="p-5 sm:max-w-[500px] w-full">
                        <div className="pl-8">
                            <div>
                                <div className="flex flex-col justify-center items-center">
                                    <ApplicationLogo width="100px" height="auto" sizes="100vw" />
                                </div>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="mt-4 rounded-lg p-5 border-[2px] border-gray-200 dark:border-gray-700">
                                <h2 className="mt-2 text-center text-[22px] font-bold tracking-tight text-gray-900 dark:text-gray-200">Admin Login</h2>
                                <div className="mt-10">
                                    <InputLabel value="User ID" textSize="text-[14px]" />
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4 w-4 text-gray-400">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <input
                                            className="flex w-full focus:border-green-500 focus:ring-green-500 mt-1 items-center border-[1px] border-[solid] border-gray-300 [box-shadow:0px_1px_3px_0px_rgba(0,_0,_0,_0.05)] pl-[10px] h-[40px] sm:text-sm text-[14px] pl-[40px]"
                                            id="loginInput"
                                            type="text"
                                            required=""
                                            autoComplete="loginInput"
                                            placeholder="i.e. 2324I245986789"
                                            value={loginInput}
                                            onChange={(e) => setLoginInput(e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-2" style={{ display: 'none' }}>
                                        <p className="text-red-600 dark:text-red-400 text-sm lg:text-xl"></p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <InputLabel value="Password" textSize="text-[14px]" />
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4 w-4 text-gray-400">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <input
                                            className="flex w-full focus:border-green-500 focus:ring-green-500 mt-1 items-center border-[1px] border-[solid] border-gray-300 [box-shadow:0px_1px_3px_0px_rgba(0,_0,_0,_0.05)] pl-[10px] h-[40px] sm:text-sm text-[14px] pl-[40px]"
                                            id="password"
                                            type={password_open ? 'text' : 'password'}
                                            required=""
                                            autoComplete="current-password"
                                            placeholder="i.e. password#123"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <i
                                            className={`absolute top-[14px] right-4 text-[14px] text-gray-600 fa cursor-pointer ${password_open ? 'fa-eye' : 'fa-eye-slash'}`}
                                            onClick={() => passwordViewStatus(!password_open)}
                                        ></i>
                                    </div>
                                    <InputError message={errorMsg} textSize="text-sm" />
                                </div>
                                <div className="flex items-center justify-center mt-16">
                                    <button
                                        className={`flex items-center px-4 py-2 bg-[#00B076] border border-transparent font-semibold text-white uppercase tracking-widest hover:bg-[#00B076] focus:bg-[#00B076] active:bg-[#00B076] focus:outline-none focus:ring-2 focus:ring-[#00B076] focus:ring-offset-2 transition ease-in-out duration-150 justify-center items-center rounded-[64px] bg-[#00B076] w-[100%] h-[45px] text-[14px] ${isLoading ? 'cursor-not-allowed opacity-65' : 'cursor-pointer'}`}
                                        disabled={isLoading}
                                    >
                                        {!isLoading ? (
                                            <span>Login</span>
                                        ) : (
                                            <svg
                                                className="text-gray-300 animate-spin"
                                                viewBox="0 0 64 64"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                            >
                                                <path
                                                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                                    stroke="currentColor"
                                                    strokeWidth="5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></path>
                                                <path
                                                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                                    stroke="currentColor"
                                                    strokeWidth="5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-green-500"
                                                ></path>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
