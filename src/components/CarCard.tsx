import { Link } from "react-router-dom";
import { Users, Fuel, Gauge, Star, Luggage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Car } from "@/data/carsData";
import { motion } from "framer-motion";

interface CarCardProps {
  car: Car;
  index?: number;
}

const CarCard = ({ car, index = 0 }: CarCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-custom-lg transition-all duration-300 h-full flex flex-col">
        <CardHeader className="p-0 relative overflow-hidden">
          <div className="relative h-56 overflow-hidden">
            <img
              src={car.images[0]}
              alt={car.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground shadow-blue">
              {car.type}
            </Badge>
            {car.discounts && car.discounts.length > 0 && (
              <Badge variant="destructive" className="shadow-red">
                -{car.discounts[0].percentage}%
              </Badge>
            )}
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-semibold">{car.rating}</span>
          </div>
        </CardHeader>

        <CardContent className="p-5 flex-grow">
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {car.name}
              </h3>
              <p className="text-sm text-muted-foreground">{car.brand}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>{car.seats} Seats</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Fuel className="h-4 w-4 text-secondary" />
                <span>{car.fuel}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="h-4 w-4 text-primary" />
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Luggage className="h-4 w-4 text-secondary" />
                <span>{car.luggage} Bags</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex items-center justify-between gap-3">
          <div className="flex-shrink min-w-0">
            <div className="flex items-baseline gap-1 whitespace-nowrap">
              <span className="text-xl sm:text-2xl font-bold text-primary">Rs {car.pricePerDay}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">/day</span>
            </div>
            {car.discounts && car.discounts.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Save {car.discounts[0].percentage}% on {car.discounts[0].days}+ days
              </p>
            )}
          </div>
          <Button asChild className="shadow-red flex-shrink-0">
            <Link to={`/cars/${car.slug}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
  );
};

export default CarCard;
