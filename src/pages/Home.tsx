import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Facilities from "@/components/Facilities";
import Rooms from "@/components/Rooms";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Facilities />
        <Rooms />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
