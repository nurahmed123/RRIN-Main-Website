import RootLayout from './RootLayout'; // Import RootLayout from a separate file

export const metadata = {
  title: "RS AI",
  description: "Leets remove hunger together....",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout>{children}</RootLayout>;
}
