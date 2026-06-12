import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const rooms = [
  {
    type: "2 Sharing",
    price: "12,500",
    features: ["AC Included", "Fully Furnished", "Free High-Speed WiFi", "3 Meals Included", "Attached Washroom", "Premium Mattress"],
    popular: true,
  },
  {
    type: "3 Sharing",
    price: "11,500",
    features: ["AC Included", "Fully Furnished", "Free High-Speed WiFi", "3 Meals Included", "Spacious Layout", "Study Desk"],
    popular: false,
  },
  {
    type: "4 Sharing",
    price: "10,500",
    features: ["AC Included", "Fully Furnished", "Free High-Speed WiFi", "3 Meals Included", "Budget Friendly", "Personal Locker"],
    popular: false,
  },
];

export default function Rooms() {
  return (
    <section id="rooms" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Choose Your <span className="text-primary">Room</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium accommodations designed for comfort, study, and relaxation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {rooms.map((room, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              {room.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <Card className={`h-full overflow-hidden bg-card/80 backdrop-blur-md border-border transition-all duration-300 ${room.popular ? "border-primary/50 shadow-[0_0_30px_rgba(255,107,0,0.15)]" : "hover:border-primary/30"}`}>
                <CardContent className="p-8">
                  <div className="mb-6 pb-6 border-b border-border">
                    <h3 className="text-2xl font-bold text-foreground mb-3">{room.type}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-bold text-primary">₹{room.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {room.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/booking?type=${encodeURIComponent(room.type)}`} className="block w-full">
                    <Button
                      data-testid={`button-select-room-${index}`}
                      className={`w-full ${room.popular ? "bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-[0_0_15px_rgba(255,107,0,0.3)]" : "bg-secondary hover:bg-primary/20 text-foreground"} rounded-full py-6 text-lg border-0 transition-all`}
                    >
                      Select Room
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
