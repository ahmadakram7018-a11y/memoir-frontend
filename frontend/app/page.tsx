import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";

import HandwrittenNote from "../components/onboarding/HandwrittenNote";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F2EF]">
      <AnnouncementBar />
      <Navbar />
    
      <HandwrittenNote />
    </main>
  );
}