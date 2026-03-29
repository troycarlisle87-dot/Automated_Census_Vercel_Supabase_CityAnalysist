import { NavBar } from "@/app/(homepage)/Nav-Bar";
import Link from "next/link";

export default function LoginPage() {

  /**See components/landingpage for each component */
  return (
    /**MaxWidthWrapper ensures the margins of the landing are crisp */
    /**I've chose to make the Landing in this way, for ease of further developments like AI agents, translations. */
    <>
      
      {/** Go to components/landingpage for each of the sections. */}
      <NavBar/> 
      <>
      The demo account. Auth is yet to be integrated. Visit <Link href="/landing" className="underline underline-offset-2 text-primary">Dashboard</Link>
      </>

      
  </>
  );
}