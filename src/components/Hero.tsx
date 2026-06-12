import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
const logoPath = "/Logo.png";
export default function Hero() {
  const [, setLocation] = useLocation();

  const scrollToRooms = () => {
    const element = document.getElementById("rooms");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))"
              } 0%, transparent 70%)`,
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.15 + 0.05,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 50 - 25],
              scale: [1, Math.random() * 1.5 + 0.5, 1],
              opacity: [Math.random() * 0.15 + 0.05, Math.random() * 0.3, Math.random() * 0.15 + 0.05],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src={logoPath}
            alt="Phoenix Logo"
            className="w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-[0_0_30px_rgba(255,107,0,0.6)]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 bg-gradient-to-r from-primary via-accent to-yellow-400 bg-clip-text text-transparent"
        >
          PHOENIX PG
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium"
        >
          Rise With Comfort. Stay With Safety.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            data-testid="button-book-now-hero"
            size="lg"
            onClick={() => setLocation("/booking")}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold rounded-full px-8 py-6 text-lg shadow-[0_0_20px_rgba(255,107,0,0.6)] border-0"
          >
            Book Now
          </Button>
          <Button
            data-testid="button-view-rooms-hero"
            onClick={scrollToRooms}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full px-8 py-6 text-lg border-primary/50 text-primary hover:bg-primary/10 transition-colors"
          >
            View Rooms
          </Button>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
