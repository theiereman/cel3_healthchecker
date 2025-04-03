import Navbar from "../components/ui/Navbar.tsx";

export const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Navbar></Navbar>
      <div className="m-4">{children}</div>
    </>
  );
};
