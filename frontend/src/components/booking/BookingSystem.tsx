import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
}

const packages: Package[] = [
  {
    id: "basic",
    name: "Basic",
    price: 999,
    description: "Perfect for small events and personal shoots",
    features: [
      "4-Hour Photography Session",
      "100 Edited Photos",
      "Online Gallery",
      "Basic Retouching",
      "Digital Downloads",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 2499,
    description: "Ideal for weddings and special occasions",
    features: [
      "8-Hour Photo & Video Coverage",
      "300 Edited Photos",
      "5-Minute Highlight Video",
      "Advanced Retouching",
      "Online Gallery",
      "USB Drive Delivery",
      "2 Photographers",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 1799,
    description: "Great for commercial and portfolio shoots",
    features: [
      "6-Hour Photography Session",
      "200 Edited Photos",
      "Commercial Usage Rights",
      "Professional Retouching",
      "Online Gallery",
      "Express Delivery",
    ],
  },
];

const additionalServices: AdditionalService[] = [
  { id: "drone", name: "Drone Photography", price: 299 },
  { id: "extra-hour", name: "Extra Hour Coverage", price: 199 },
  { id: "rush", name: "Rush Delivery", price: 149 },
  { id: "raw", name: "Raw Files", price: 249 },
  { id: "prints", name: "Premium Prints Package", price: 199 },
  { id: "second-shooter", name: "Second Photographer", price: 399 },
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const BookingSystem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate total price
  const calculateTotal = () => {
    let total = selectedPackage ? selectedPackage.price : 0;
    selectedServices.forEach((serviceId) => {
      const service = additionalServices.find((s) => s.id === serviceId);
      if (service) {
        total += service.price;
      }
    });
    return total;
  };

  // Handle package selection
  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  // Toggle additional service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) {
      alert("Please select a package");
      return;
    }
    if (!date || !time) {
      alert("Please select a date and time");
      return;
    }
    if (!name || !email || !phone) {
      alert("Please fill in all required fields");
      return;
    }

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // In a real app, you would redirect to payment page or confirmation page
      // navigate('/payment');
    }, 3000);
  };

  // Check if a package was selected from pricing page
  useEffect(() => {
    if (location.state?.selectedPackage) {
      const packageId = location.state.selectedPackage;
      const pkg = packages.find((p) => p.id === packageId);
      if (pkg) {
        setSelectedPackage(pkg);
      }
    }
  }, [location.state]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-playfair text-white text-center mb-8">
        Book Your Photography Session
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Package Selection & Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Package Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
          >
            <h2 className="text-2xl font-playfair text-white mb-6">
              Select Your Package
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${selectedPackage?.id === pkg.id ? "bg-[#D4AF37]/20 border-[#D4AF37]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                  onClick={() => handlePackageSelect(pkg)}
                >
                  <h3 className="text-xl font-playfair text-white mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-[#D4AF37] text-xl font-semibold mb-2">
                    ₹{pkg.price}
                  </p>
                  <p className="text-white/70 text-sm mb-4">
                    {pkg.description}
                  </p>
                  <ul className="space-y-1">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <li
                        key={index}
                        className="text-white/80 text-sm flex items-start"
                      >
                        <span className="text-[#D4AF37] mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                    {pkg.features.length > 3 && (
                      <li className="text-white/60 text-sm italic">
                        +{pkg.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Additional Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
          >
            <h2 className="text-2xl font-playfair text-white mb-6">
              Additional Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalServices.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border flex items-center justify-between transition-all duration-300 ${selectedServices.includes(service.id) ? "bg-[#D4AF37]/20 border-[#D4AF37]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                >
                  <div className="flex items-center">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => toggleService(service.id)}
                      className="mr-3"
                    />
                    <Label
                      htmlFor={service.id}
                      className="text-white cursor-pointer"
                    >
                      {service.name}
                    </Label>
                  </div>
                  <span className="text-[#D4AF37] font-semibold">
                    ₹{service.price.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
          >
            <h2 className="text-2xl font-playfair text-white mb-6">
              Your Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-white">
                    Select Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white",
                          !date && "text-white/50",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) =>
                          date < new Date() ||
                          date >
                            new Date(
                              new Date().setMonth(new Date().getMonth() + 3),
                            )
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-white">
                    Select Time
                  </Label>
                  <Select onValueChange={setTime}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your Phone"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-white">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or information"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                  />
                </div>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Right Column - Booking Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10 sticky top-24">
            <h2 className="text-2xl font-playfair text-white mb-6">
              Booking Summary
            </h2>

            {selectedPackage ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl text-white">
                        {selectedPackage.name} Package
                      </h3>
                      <p className="text-white/70 text-sm">
                        {selectedPackage.description}
                      </p>
                    </div>
                    <span className="text-[#D4AF37] font-semibold">
                      ${selectedPackage.price}
                    </span>
                  </div>

                  {selectedServices.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <h4 className="text-white font-medium">
                        Additional Services:
                      </h4>
                      {selectedServices.map((serviceId) => {
                        const service = additionalServices.find(
                          (s) => s.id === serviceId,
                        );
                        return (
                          service && (
                            <div
                              key={service.id}
                              className="flex justify-between text-white/80"
                            >
                              <span>{service.name}</span>
                              <span>${service.price}</span>
                            </div>
                          )
                        );
                      })}
                    </div>
                  )}

                  {(date || time) && (
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <h4 className="text-white font-medium">
                        Appointment Details:
                      </h4>
                      {date && (
                        <div className="text-white/80">
                          Date: {format(date, "PPP")}
                        </div>
                      )}
                      {time && (
                        <div className="text-white/80">Time: {time}</div>
                      )}
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-white">Total:</span>
                      <span className="text-[#D4AF37]">
                        ₹{calculateTotal().toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B59020] hover:from-[#B59020] hover:to-[#D4AF37] text-white transition-all duration-300 transform hover:scale-105 py-6 text-lg"
                >
                  Proceed to Payment
                </Button>

                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
                  >
                    Booking request sent successfully! We'll contact you
                    shortly.
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/70">
                  Select a package to see your booking summary
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSystem;
