import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

import Favicon from "./public/main-logo.png";
export const metadata = {
	title: "Login",
	description: "Login to the admin panel",
	icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="h-screen w-full flex flex-wrap flex items-center justify-center">
					{children}
				</div>
			</body>
		</html>
	);
}
