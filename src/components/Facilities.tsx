import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AirVent, Utensils, Wifi, Users, Trash2, ShieldCheck, Heart } from "lucide-react";

const facilities = [
  { icon: AirVent, title: "Fully Furnished AC Rooms", desc: "Spacious rooms with comfortable beds, wardrobes, and modern AC units." },
  { icon: Utensils, title: "Homely Food", desc: "Delicious, hygienic meals provided 3 times a day (Breakfast, Lunch & Dinner)." },
  { icon: Wifi, title: "24/7 Water & Free WiFi", desc: "Uninterrupted water supply and high-speed internet access for work or study." },
  { icon: Users, title: "2, 3 and 4 Sharing", desc: "Flexible sharing options tailored to your budget and preference." },
  { icon: Trash2, title: "Daily Cleaning & Hygiene", desc: "Strict hygiene protocols with daily housekeeping services." },
  { icon: ShieldCheck, title: "CCTV Surveillance", desc: "24/7 security with CCTV cameras and restricted access for maximum safety." },
  { icon: Heart, title: "Only for Ladies", desc: "An exclusive, safe, and secure environment dedicated entirely to women." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Facilities() {
  return (
    <section id="facilities" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-primary">Facilities</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need for a comfortable and secure stay, meticulously curated for our residents.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,107,0,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {facility.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
