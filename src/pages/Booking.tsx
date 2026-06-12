import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
const logoPath = "/Logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  prefill?: {
    name?: string;
    contact?: string;
    email?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
}

interface RazorpayInstance {
  open: () => void;
}

const roomPrices: Record<string, number> = {
  "2 Sharing": 12500,
  "3 Sharing": 11500,
  "4 Sharing": 10500,
};

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .min(10, "Enter a valid 10-digit phone number")
    .max(12, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  address: z.string().min(5, "Address is required"),
  roomType: z.enum(["2 Sharing", "3 Sharing", "4 Sharing"], {
    required_error: "Please select a room type",
  }),
  checkInDate: z.string().min(1, "Check-in date is required"),
});

type FormValues = z.infer<typeof formSchema>;

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Booking() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<FormValues | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const defaultRoom = searchParams.get("type") as string | null;
  const validDefaultRoom = defaultRoom && roomPrices[defaultRoom] ? defaultRoom : "2 Sharing";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      roomType: validDefaultRoom as "2 Sharing" | "3 Sharing" | "4 Sharing",
      checkInDate: "",
    },
  });

  const selectedRoomType = form.watch("roomType");
  const pricePerMonth = roomPrices[selectedRoomType] ?? 12500;
  const advancePayment = 1;
  const bookingTime = new Date().toLocaleString();

  useEffect(() => {
    loadRazorpayScript();
  }, []);

 

  const onSubmit = async (values: FormValues) => {
    setIsProcessing(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || !window.Razorpay) {
      alert("Payment service could not be loaded. Please check your connection and try again.");
      setIsProcessing(false);
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
    if (!razorpayKey) {
      alert("Razorpay key is not configured. Please add VITE_RAZORPAY_KEY_ID to your environment variables.");
      setIsProcessing(false);
      return;
    }

    const options: RazorpayOptions = {
      key: razorpayKey,
      amount: advancePayment * 100,
      currency: "INR",
      name: "Phoenix Womens PG",
      description: `${values.roomType} — 2 Months Advance`,
      image: logoPath,
      prefill: {
        name: values.fullName,
        contact: values.phone,
        email: values.email,
      },
      theme: {
        color: "#FF6B00",
      },
    handler: (response: RazorpayResponse) => {
  console.log("Payment successful:", response.razorpay_payment_id);
  setBookingDetails(values);
  setIsSubmitted(true);
  setIsProcessing(false);
},
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-6 pb-24 px-4 relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <header className="flex items-center justify-between mb-8 md:mb-12">
          <Link href="/">
            <Button
              variant="ghost"
              data-testid="button-back-home"
              className="text-muted-foreground hover:text-primary pl-0 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <img
              src={logoPath}
              alt="Phoenix Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]"
            />
            <span className="font-display font-bold text-xl hidden sm:block tracking-wide">
              PHOENIX PG
            </span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Complete Your Booking
                </h1>
                <p className="text-muted-foreground text-lg">
                   Fill in your details and complete the advance payment to secure your room.
                </p>
              </div>

              <Card className="bg-card/60 backdrop-blur-xl border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Guest Details</CardTitle>
                  <CardDescription>
                    Please provide accurate information for verification.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  data-testid="input-full-name"
                                  placeholder="Enter your full name"
                                  {...field}
                                  className="bg-background/50 border-input"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  data-testid="input-phone"
                                  placeholder="10-digit mobile number"
                                  type="tel"
                                  {...field}
                                  className="bg-background/50 border-input"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  data-testid="input-email"
                                  placeholder="you@example.com"
                                  type="email"
                                  {...field}
                                  className="bg-background/50 border-input"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="checkInDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expected Check-in Date</FormLabel>
                              <FormControl>
                                <Input
                                  data-testid="input-checkin-date"
                                  type="date"
                                  {...field}
                                  className="bg-background/50 border-input block w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Permanent Address</FormLabel>
                            <FormControl>
                              <Textarea
                                data-testid="input-address"
                                placeholder="Enter your full permanent address"
                                className="resize-none bg-background/50 border-input"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="roomType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room Sharing Preference</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  data-testid="select-room-type"
                                  className="bg-background/50 border-input"
                                >
                                  <SelectValue placeholder="Select room type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="2 Sharing">
                                  2 Sharing — ₹12,500/month
                                </SelectItem>
                                <SelectItem value="3 Sharing">
                                  3 Sharing — ₹11,500/month
                                </SelectItem>
                                <SelectItem value="4 Sharing">
                                  4 Sharing — ₹10,500/month
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                        <p className="text-sm text-muted-foreground">Booking Time</p>
                        <p className="font-medium text-foreground">{bookingTime}</p>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          data-testid="button-pay-book"
                          disabled={isProcessing}
                          className="w-full bg-gradient-to-r from-primary to-accent text-white py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:opacity-90 transition-opacity border-0 disabled:opacity-60"
                        >
                          {isProcessing ? "Opening Payment..." : `Pay ₹${advancePayment.toLocaleString("en-IN")} & Book`}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center mt-3">
                          Secure payment powered by Razorpay.
                        </p>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto mt-12"
            >
              <Card className="bg-card/80 backdrop-blur-xl border-primary/50 shadow-[0_0_50px_rgba(255,107,0,0.2)] text-center py-12 px-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(255,107,0,0.5)]"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                  Thank you, {bookingDetails?.fullName}. Your payment was successful and your booking has been confirmed.
                </p>

                <div className="bg-background/50 rounded-xl p-6 text-left max-w-sm mx-auto mb-8 border border-border">
                  <h3 className="font-semibold mb-4 text-primary">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room:</span>
                      <span>{bookingDetails?.roomType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in:</span>
                      <span>{bookingDetails?.checkInDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount Paid:</span>
                      <span className="font-bold text-primary">
                        ₹{advancePayment.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  
                  <Link href="/">
                    <Button
                      variant="outline"
                      data-testid="button-return-home"
                      className="rounded-full px-8 py-6 text-lg w-full sm:w-auto"
                    >
                      Return Home
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
