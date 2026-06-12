import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What are the timings for meals?",
    answer: "Breakfast is served from 7:00 AM to 9:00 AM. Lunch is from 12:00 PM to 2:00 PM, and Dinner is from 7:00 PM to 9:00 PM.",
  },
  {
    question: "Is there a curfew?",
    answer: "While we don't have a strict strict curfew, we highly recommend returning by 10:00 PM for safety reasons. If you need to be late due to work or college, just inform the warden in advance.",
  },
  {
    question: "What is the advance payment?",
    answer: "A 2-month advance payment is required at the time of booking to confirm your room. This acts as a security deposit.",
  },
  {
    question: "Is WiFi really free?",
    answer: "Yes, high-speed unlimited WiFi is included in your monthly rent. There are no hidden charges.",
  },
  {
    question: "What documents are needed for admission?",
    answer: "You will need to provide a copy of your Aadhar card, a passport-size photograph, and your college/office ID proof.",
  },
  {
    question: "Is there a washing machine available?",
    answer: "Yes, we provide shared fully automatic washing machines for all residents to use.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 border border-border rounded-xl px-6 data-[state=open]:border-primary/50 data-[state=open]:shadow-[0_0_15px_rgba(255,107,0,0.1)] transition-all">
                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
