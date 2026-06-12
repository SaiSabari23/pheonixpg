import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Reach out via phone or WhatsApp anytime.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/80 backdrop-blur-md p-10 rounded-2xl border border-border shadow-[0_0_30px_rgba(255,107,0,0.08)]"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">Our Location</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Old Lava Cake Shop Street,<br />
                    Potheri, Chennai<br />
                    Tamil Nadu - 603203
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-border" />

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg mb-2">Call Us</p>
                  <a
                    href="tel:9360964402"
                    data-testid="link-phone-1"
                    className="block text-muted-foreground hover:text-primary transition-colors text-lg mb-1"
                  >
                    +91 93609 64402
                  </a>
                  <a
                    href="tel:9500041494"
                    data-testid="link-phone-2"
                    className="block text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    +91 95000 41494
                  </a>
                </div>
              </div>

              <div className="w-full h-px bg-border" />

              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-muted-foreground">Prefer chatting? Reach us on WhatsApp.</p>
                <a
                  href="https://wa.me/919444941102"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-whatsapp-contact"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
