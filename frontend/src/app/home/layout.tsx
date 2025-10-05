import Navbar from "@/components/element/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    <Navbar/>
    {children}
  </div>;
}
