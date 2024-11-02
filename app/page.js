import UserLogin from '@/app/components/Auth/UserLogin';
export const metadata = {
	title: "User Login",
	description: "User Login description",
};

export default function Home() {
	return (
		<>
			<UserLogin />
		</>
	);
}
