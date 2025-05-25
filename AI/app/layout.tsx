import RootLayout from './RootLayout';

export const metadata = {
  title: "Arionys AI - Your Intelligent Assistant",
  description: "Experience the power of AI with Arionys AI - your intelligent assistant for chat, coding, content creation, and more.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout>{children}</RootLayout>;
}
