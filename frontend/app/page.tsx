import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";

import Subscription from "../components/Subscription";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F2EF]">
      <AnnouncementBar />
      <Navbar />
    
      <Subscription />
    </main>
  );
}