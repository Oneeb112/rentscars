import { motion } from "framer-motion";
import { Award, Users, Car, Shield, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import CarIcon from "@/components/CarIcon";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide exceptional car rental experiences that exceed expectations through quality vehicles and outstanding service.",
    },
    {
      icon: CarIcon,
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to ensure every rental is smooth and enjoyable.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "All our vehicles are regularly maintained and fully insured for your peace of mind.",
    },
  ];

  const stats = [
    { icon: Car, number: "500+", label: "Vehicles" },
    { icon: Users, number: "50K+", label: "Happy Customers" },
    { icon: Award, number: "15+", label: "Years Experience" },
    { icon: Shield, number: "99.9%", label: "Customer Satisfaction" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-20 flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About <span className="text-primary">M-Rent A Car</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your trusted partner in premium car rentals since 2009. We're passionate about providing 
                exceptional vehicles and outstanding service to make every journey memorable.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2009, M-Rent A Car began with a simple vision: to revolutionize the car rental 
                    experience by combining premium vehicles with exceptional customer service.
                  </p>
                  <p>
                    What started as a small fleet of 10 vehicles has grown into a comprehensive collection of 
                    over 500 premium cars, serving thousands of satisfied customers across multiple locations.
                  </p>
                  <p>
                    Today, we're proud to be one of the leading car rental providers, known for our commitment 
                    to quality, transparency, and customer satisfaction. Every vehicle in our fleet is carefully 
                    selected and meticulously maintained to ensure your safety and comfort.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"
                  alt="Luxury car showroom"
                  className="rounded-2xl shadow-custom-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-secondary">Values</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-blue transition-shadow">
                    <CardContent className="pt-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-accent mb-6">
                        {value.icon === CarIcon ? (
                          <CarIcon size={32} className="text-white" />
                        ) : (
                          <value.icon className="h-8 w-8 text-white" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-primary">Team</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Behind every great rental experience is our dedicated team of professionals, 
                committed to making your journey exceptional.
              </p>
              <p className="text-muted-foreground">
                From our customer service representatives to our vehicle maintenance specialists, 
                every team member shares our passion for excellence and customer satisfaction. 
                We're available 24/7 to ensure your rental experience is seamless from start to finish.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
