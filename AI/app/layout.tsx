import RootLayout from './RootLayout'; // Import RootLayout from a separate file

export const metadata = {
  title: "Arionys AI",
  description: "Arionys AI",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout>{children}</RootLayout>;
}
