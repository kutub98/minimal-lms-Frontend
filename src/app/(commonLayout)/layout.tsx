import Footer from "../Shared/Footer";
import NavBar from "../Shared/NavBar";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="sticky customWidth mx-auto z-[999] top-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
        {/* <NavBar/> */}
        <NavBar />
        {/* <ProgressBar /> */}
      </div>
      {children}
      <Footer />
    </>
  );
}
