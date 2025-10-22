import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone number is required").max(20),
  location: z.string().min(3, "Location is required").max(200),
  numCars: z.string().min(1, "Please select number of cars"),
  numDays: z.string().min(1, "Please select number of days"),
  purpose: z.string().min(1, "Please select purpose of enquiry"),
  details: z.string().min(10, "Details must be at least 10 characters").max(300, "Details must be less than 300 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const CorporateEnquiries = () => {
  const [charCount, setCharCount] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      numCars: "",
      numDays: "",
      purpose: "",
      details: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast.success("Your corporate enquiry has been submitted successfully!");
    form.reset();
    setCharCount(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                CORPORATE ENQUIRIES
              </h1>
              <p className="text-lg text-muted-foreground">
                Please fill out the form below and our representatives will be in touch with you shortly
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Name*" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address*</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email Address*" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone*</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone*" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location*</FormLabel>
                        <FormControl>
                          <Input placeholder="Location*" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-md border border-muted-foreground/20">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Select your location by clicking on the pin icon.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="numCars"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No of Cars *:</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of cars" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No of Days *:</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of days" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purpose of Enquiry *:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select purpose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="general">General Enquiries</SelectItem>
                          <SelectItem value="corporate">Corporate Sales</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Details*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Details*"
                          className="min-h-[120px] resize-none"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setCharCount(e.target.value.length);
                          }}
                          maxLength={300}
                        />
                      </FormControl>
                      <div className="flex justify-end text-xs text-muted-foreground">
                        Max. Characters {charCount}/300
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="px-16 bg-[hsl(330,65%,45%)] hover:bg-[hsl(330,65%,40%)] text-white"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CorporateEnquiries;
