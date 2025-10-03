export interface VehicleSpec {
  label: string;
  value: string;
}

export interface VehicleColor {
  name: string;
  image: string;
}

export interface SmartFeature {
  title: string;
  description: string;
  icon: string;
}

export interface VehicleData {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  mainImage: string;
  frontImage: string;
  colors: VehicleColor[];
  specifications: VehicleSpec[];
  smartFeatures: SmartFeature[];
}

export const vehicleDatabase: Record<string, VehicleData> = {
  falcon: {
    name: "FALCON",
    slug: "falcon",
    tagline: "Powerful Performance, Smart Connectivity",
    description: "Experience the perfect blend of performance and technology with the VARCAS Falcon. Designed for the modern commuter who demands reliability and innovation, the Falcon offers exceptional range, smart tracking features, and a sleek design that turns heads.",
    mainImage: "https://varcasautomobiles.com/images/falcon_red.png",
    frontImage: "https://varcasautomobiles.com/images/falconfront.png",
    colors: [
      { name: "Pearl White", image: "https://varcasautomobiles.com/images/falconwhite.png" },
      { name: "Crimson Red", image: "https://varcasautomobiles.com/images/falconred.jpg" },
      { name: "Ocean Blue", image: "https://varcasautomobiles.com/images/Falcon%20Blue.JPG" },
    ],
    specifications: [
      { label: "Battery Capacity", value: "1.7 kWh" },
      { label: "True Range/Charge", value: "100 km" },
      { label: "Battery Charging Time", value: "3 hours" },
      { label: "Loading Capacity", value: "2 Adults (150 kg)" },
      { label: "Wheel Size", value: "3×10" },
      { label: "Battery Type", value: "Lithium-ion" },
      { label: "Battery Swappable/Removable", value: "Yes" },
      { label: "Regenerative Braking", value: "Yes" },
      { label: "Brake", value: "Disc" },
      { label: "Anti Theft Alarm", value: "Yes" },
      { label: "Hazard Warning", value: "Yes" },
      { label: "USB Port for Mobile Charging", value: "Yes" },
    ],
    smartFeatures: [
      {
        title: "Tracking",
        description: "Varcas' innovative tracking technology ensures real-time insights, enhancing safety and convenience for a connected and informed driving experience.",
        icon: "https://varcasautomobiles.com/images/tracking.jpg",
      },
      {
        title: "Reminders",
        description: "Stay on track with Varcas' smart reminders, keeping you informed and organized throughout your journey for seamless navigation and efficiency.",
        icon: "https://varcasautomobiles.com/images/remainder.jpg",
      },
      {
        title: "Find My Bike",
        description: "Discover your bike effortlessly with Varcas' Find My Bike feature, ensuring peace of mind and hassle-free retrieval wherever your adventures take you.",
        icon: "https://varcasautomobiles.com/images/findmybike.jpg",
      },
      {
        title: "Alerting",
        description: "Stay informed and secure with Varcas' Alerting feature, providing real-time notifications for enhanced safety and peace of mind on your rides.",
        icon: "https://varcasautomobiles.com/images/alerting.jpg",
      },
    ],
  },
  eagan: {
    name: "EAGAN",
    slug: "eagan",
    tagline: "Sleek Design, Superior Range",
    description: "The VARCAS Eagan combines contemporary styling with practical performance. Perfect for urban environments, it delivers a smooth, efficient ride with advanced smart features that keep you connected and in control.",
    mainImage: "https://varcasautomobiles.com/images/egan_prod.png",
    frontImage: "https://varcasautomobiles.com/images/eaganfront.png",
    colors: [
      { name: "Graphite Black", image: "https://varcasautomobiles.com/images/cap-img-1.png" },
      { name: "Crimson Red", image: "https://varcasautomobiles.com/images/cap-img-3.png" },
      { name: "Ocean Blue", image: "https://varcasautomobiles.com/images/cap-img-2.png" },
    ],
    specifications: [
      { label: "Battery Capacity", value: "1.7 kWh" },
      { label: "True Range/Charge", value: "80-95 km" },
      { label: "Battery Charging Time", value: "3 hours" },
      { label: "Loading Capacity", value: "2 Adults (150 kg)" },
      { label: "Wheel Size", value: "3×10" },
      { label: "Speed", value: "25-45 km/h" },
      { label: "Battery Type", value: "Lithium-ion" },
      { label: "Battery Swappable/Removable", value: "Yes" },
      { label: "Regenerative Braking", value: "Yes" },
      { label: "Brake", value: "Disc" },
      { label: "Anti Theft Alarm", value: "Yes" },
      { label: "Hazard Warning", value: "Yes" },
      { label: "USB Port for Mobile Charging", value: "Yes" },
      { label: "Battery Level Indicator", value: "Yes" },
    ],
    smartFeatures: [
      {
        title: "Tracking",
        description: "Varcas' innovative tracking technology ensures real-time insights, enhancing safety and convenience for a connected and informed driving experience.",
        icon: "https://varcasautomobiles.com/images/tracking.jpg",
      },
      {
        title: "Reminders",
        description: "Stay on track with Varcas' smart reminders, keeping you informed and organized throughout your journey for seamless navigation and efficiency.",
        icon: "https://varcasautomobiles.com/images/remainder.jpg",
      },
      {
        title: "Find My Bike",
        description: "Discover your bike effortlessly with Varcas' Find My Bike feature, ensuring peace of mind and hassle-free retrieval wherever your adventures take you.",
        icon: "https://varcasautomobiles.com/images/findmybike.jpg",
      },
      {
        title: "Alerting",
        description: "Stay informed and secure with Varcas' Alerting feature, providing real-time notifications for enhanced safety and peace of mind on your rides.",
        icon: "https://varcasautomobiles.com/images/alerting.jpg",
      },
    ],
  },
  crony: {
    name: "CRONY",
    slug: "crony",
    tagline: "Compact & Vibrant City Companion",
    description: "Meet the VARCAS Crony - your perfect city companion. With its vibrant color options and compact design, the Crony offers exceptional maneuverability in urban environments while maintaining the smart features you expect from VARCAS.",
    mainImage: "https://varcasautomobiles.com/images/cap-img-6.png",
    frontImage: "https://varcasautomobiles.com/images/cronyfront.jpg",
    colors: [
      { name: "Pearl White", image: "https://varcasautomobiles.com/images/cronywhite.png" },
      { name: "Ruby Red", image: "https://varcasautomobiles.com/images/cap-img-7.png" },
      { name: "Golden Glow", image: "https://varcasautomobiles.com/images/cap-img-6.png" },
    ],
    specifications: [
      { label: "Battery Capacity", value: "1.7 kWh" },
      { label: "True Range/Charge", value: "55 km" },
      { label: "Battery Charging Time", value: "3 hours" },
      { label: "Loading Capacity", value: "2 Adults (150 kg)" },
      { label: "Wheel Size", value: "3×10" },
      { label: "Battery Type", value: "Lithium-ion" },
      { label: "Battery Swappable/Removable", value: "Yes" },
      { label: "Regenerative Braking", value: "Yes" },
      { label: "Brake", value: "Disc" },
      { label: "Anti Theft Alarm", value: "Yes" },
      { label: "Hazard Warning", value: "Yes" },
      { label: "USB Port for Mobile Charging", value: "Yes" },
    ],
    smartFeatures: [
      {
        title: "Tracking",
        description: "Varcas' innovative tracking technology ensures real-time insights, enhancing safety and convenience for a connected and informed driving experience.",
        icon: "https://varcasautomobiles.com/images/tracking.jpg",
      },
      {
        title: "Reminders",
        description: "Stay on track with Varcas' smart reminders, keeping you informed and organized throughout your journey for seamless navigation and efficiency.",
        icon: "https://varcasautomobiles.com/images/remainder.jpg",
      },
      {
        title: "Find My Bike",
        description: "Discover your bike effortlessly with Varcas' Find My Bike feature, ensuring peace of mind and hassle-free retrieval wherever your adventures take you.",
        icon: "https://varcasautomobiles.com/images/findmybike.jpg",
      },
      {
        title: "Alerting",
        description: "Stay informed and secure with Varcas' Alerting feature, providing real-time notifications for enhanced safety and peace of mind on your rides.",
        icon: "https://varcasautomobiles.com/images/alerting.jpg",
      },
    ],
  },
  aman: {
    name: "AMAN",
    slug: "aman",
    tagline: "Advanced Features, Premium Comfort",
    description: "The VARCAS Aman represents the pinnacle of e-scooter innovation. With keyless entry, parking switch, and an impressive range, the Aman is designed for riders who demand the best in technology and convenience.",
    mainImage: "https://varcasautomobiles.com/images/aman.png",
    frontImage: "https://varcasautomobiles.com/images/amanfrnt.png",
    colors: [
      { name: "Forest Green", image: "https://varcasautomobiles.com/images/amangreen.png" },
      { name: "Crimson Red", image: "https://varcasautomobiles.com/images/amanred.png" },
      { name: "Ocean Blue", image: "https://varcasautomobiles.com/images/amanblue.png" },
    ],
    specifications: [
      { label: "Battery Capacity", value: "1.56 kWh" },
      { label: "True Range/Charge", value: "80-95 km" },
      { label: "Battery Charging Time", value: "3 hours" },
      { label: "Loading Capacity", value: "2 Adults (150 kg)" },
      { label: "Wheel Size", value: "3×10" },
      { label: "Battery Type", value: "Lithium-ion" },
      { label: "Battery Removable", value: "Yes" },
      { label: "Regenerative Braking", value: "Yes" },
      { label: "Brake", value: "Disc" },
      { label: "Anti Theft Alarm", value: "Yes" },
      { label: "Hazard Warning", value: "Yes" },
      { label: "USB Port for Mobile Charging", value: "Yes" },
      { label: "Keyless Entry", value: "Yes" },
      { label: "Parking Switch", value: "Yes" },
    ],
    smartFeatures: [
      {
        title: "Tracking",
        description: "Varcas' innovative tracking technology ensures real-time insights, enhancing safety and convenience for a connected and informed driving experience.",
        icon: "https://varcasautomobiles.com/images/tracking.jpg",
      },
      {
        title: "Reminders",
        description: "Stay on track with Varcas' smart reminders, keeping you informed and organized throughout your journey for seamless navigation and efficiency.",
        icon: "https://varcasautomobiles.com/images/remainder.jpg",
      },
      {
        title: "Find My Bike",
        description: "Discover your bike effortlessly with Varcas' Find My Bike feature, ensuring peace of mind and hassle-free retrieval wherever your adventures take you.",
        icon: "https://varcasautomobiles.com/images/findmybike.jpg",
      },
      {
        title: "Alerting",
        description: "Stay informed and secure with Varcas' Alerting feature, providing real-time notifications for enhanced safety and peace of mind on your rides.",
        icon: "https://varcasautomobiles.com/images/alerting.jpg",
      },
    ],
  },
  ruby: {
    name: "RUBY",
    slug: "ruby",
    tagline: "Bold Style, Reliable Performance",
    description: "The VARCAS Ruby is designed for riders who appreciate vibrant style without compromising on performance. With multiple eye-catching color options and essential smart features, the Ruby makes every ride memorable.",
    mainImage: "https://varcasautomobiles.com/images/ruby.png",
    frontImage: "https://varcasautomobiles.com/images/ruby-frnt.png",
    colors: [
      { name: "Ruby Red", image: "https://varcasautomobiles.com/images/ruby-red.png" },
      { name: "Ocean Blue", image: "https://varcasautomobiles.com/images/ruby-blue.png" },
      { name: "Golden Glow", image: "https://varcasautomobiles.com/images/ruby-yellow.png" },
      { name: "Pearl White", image: "https://varcasautomobiles.com/images/ruby.png" },
    ],
    specifications: [
      { label: "Battery Capacity", value: "1.7 kWh" },
      { label: "True Range/Charge", value: "55 km" },
      { label: "Battery Charging Time", value: "3 hours" },
      { label: "Loading Capacity", value: "2 Adults (150 kg)" },
      { label: "Wheel Size", value: "3×10" },
      { label: "Battery Type", value: "Lithium-ion" },
      { label: "Battery Swappable/Removable", value: "Yes" },
      { label: "Regenerative Braking", value: "Yes" },
      { label: "Brake", value: "Disc" },
      { label: "Anti Theft Alarm", value: "Yes" },
      { label: "Hazard Warning", value: "Yes" },
      { label: "USB Port for Mobile Charging", value: "Yes" },
    ],
    smartFeatures: [
      {
        title: "Tracking",
        description: "Varcas' innovative tracking technology ensures real-time insights, enhancing safety and convenience for a connected and informed driving experience.",
        icon: "https://varcasautomobiles.com/images/tracking.jpg",
      },
      {
        title: "Reminders",
        description: "Stay on track with Varcas' smart reminders, keeping you informed and organized throughout your journey for seamless navigation and efficiency.",
        icon: "https://varcasautomobiles.com/images/remainder.jpg",
      },
      {
        title: "Find My Bike",
        description: "Discover your bike effortlessly with Varcas' Find My Bike feature, ensuring peace of mind and hassle-free retrieval wherever your adventures take you.",
        icon: "https://varcasautomobiles.com/images/findmybike.jpg",
      },
      {
        title: "Alerting",
        description: "Stay informed and secure with Varcas' Alerting feature, providing real-time notifications for enhanced safety and peace of mind on your rides.",
        icon: "https://varcasautomobiles.com/images/alerting.jpg",
      },
    ],
  },
  "tejas-sport": {
    name: "TEJAS-SPORT",
    slug: "tejas-sport",
    tagline: "Sporty E-Cycle for Active Lifestyles",
    description: "The VARCAS Tejas-Sport brings pedal-assist technology to your fitness routine. With 7-speed Shimano gears, multiple riding modes, and a sporty design, it's perfect for those who want to blend exercise with electric assistance.",
    mainImage: "https://varcasautomobiles.com/images/TEJA.png",
    frontImage: "https://varcasautomobiles.com/images/TEJA.png",
    colors: [
      { name: "Forest Green", image: "https://varcasautomobiles.com/images/tejasgreen.png" },
      { name: "Crimson Red", image: "https://varcasautomobiles.com/images/tejasred.png" },
      { name: "Ocean Blue", image: "https://varcasautomobiles.com/images/tejasblue.png" },
    ],
    specifications: [
      { label: "Motor Capacity", value: "250 W" },
      { label: "Speed", value: "25 km/h" },
      { label: "Battery Type", value: "Lithium-ion" },
      { label: "Battery Removable", value: "Yes" },
      { label: "Battery Level Indicator", value: "Yes" },
      { label: "Charger Auto Cut", value: "Yes" },
      { label: "Charging Time", value: "6-7 hours" },
      { label: "Pedal Assistance", value: "Yes" },
      { label: "Riding Modes", value: "Normal, Eco, Power" },
      { label: "Gear System", value: "7 Speed - Shimano" },
      { label: "Brake", value: "Disc" },
      { label: "Headlight", value: "LED" },
      { label: "Water Resistant", value: "Yes" },
      { label: "Wheel Size", value: "26 Inch" },
      { label: "Tyre", value: "Tube" },
      { label: "Loading Capacity", value: "80 kg" },
    ],
    smartFeatures: [],
  },
  "rani-ex": {
    name: "RANI-EX",
    slug: "rani-ex",
    tagline: "Elegant E-Cycle with Practical Features",
    description: "The VARCAS Rani-EX is designed with elegance and practicality in mind. Featuring a front basket, rear carrier, and comfortable design, it's perfect for daily errands and leisurely rides around the neighborhood.",
    mainImage: "https://varcasautomobiles.com/images/rani.png",
    frontImage: "https://varcasautomobiles.com/images/rani.png",
    colors: [
      { name: "Black & Red", image: "https://varcasautomobiles.com/images/raniblackand%20red.png" },
      { name: "Pink & White", image: "https://varcasautomobiles.com/images/rani.png" },
    ],
    specifications: [
      { label: "Motor Capacity", value: "250 W" },
      { label: "True Range", value: "30 km" },
      { label: "Speed", value: "25 km/h" },
      { label: "Battery Type", value: "Lithium-ion" },
      { label: "Battery Capacity", value: "36V 12Ah" },
      { label: "Battery Removable", value: "Yes" },
      { label: "Battery Level Indicator", value: "Yes" },
      { label: "Charger Auto Cut", value: "Yes" },
      { label: "Charging Time", value: "6-7 hours" },
      { label: "Pedal Assistance", value: "Yes" },
      { label: "Riding Modes", value: "Normal, Eco, Power" },
      { label: "Gear System", value: "7 Speed - Shimano" },
      { label: "Brake", value: "Disc" },
      { label: "Headlight", value: "LED" },
      { label: "Water Resistant", value: "Yes" },
      { label: "Wheel Size", value: "26 Inch" },
      { label: "Front Basket", value: "Yes" },
      { label: "Rear Carrier", value: "Yes" },
      { label: "Loading Capacity", value: "80 kg" },
    ],
    smartFeatures: [],
  },
  "rani-lx": {
    name: "RANI-LX",
    slug: "rani-lx",
    tagline: "Premium Comfort for City Riding",
    description: "The VARCAS Rani-LX takes comfort and convenience to the next level. With an extended range, front basket, and rear seat, it's the ideal choice for city dwellers who want style, comfort, and practicality in one package.",
    mainImage: "https://varcasautomobiles.com/images/rani-lx.png",
    frontImage: "https://varcasautomobiles.com/images/rani-lx.png",
    colors: [
      { name: "Red & Black", image: "https://varcasautomobiles.com/images/ranilxred.png" },
      { name: "Pink & Blue", image: "https://varcasautomobiles.com/images/ranilxpink.png" },
      { name: "Purple & White", image: "https://varcasautomobiles.com/images/ranilx-2.png" },
    ],
    specifications: [
      { label: "Motor Capacity", value: "250 W" },
      { label: "True Range", value: "40 km" },
      { label: "Speed", value: "25 km/h" },
      { label: "Battery Type", value: "Lithium-ion" },
      { label: "Battery Capacity", value: "36V 12Ah" },
      { label: "Battery Removable", value: "Yes" },
      { label: "Battery Level Indicator", value: "Yes" },
      { label: "Charger Auto Cut", value: "Yes" },
      { label: "Charging Time", value: "6-7 hours" },
      { label: "Pedal Assistance", value: "Yes" },
      { label: "Gear System", value: "No" },
      { label: "Brake", value: "Drum" },
      { label: "Headlight", value: "LED" },
      { label: "Water Resistant", value: "Yes" },
      { label: "Wheel Size", value: "26 Inch" },
      { label: "Front Basket", value: "Yes" },
      { label: "Rear Seat", value: "Yes" },
      { label: "Rear Carrier", value: "No" },
      { label: "Loading Capacity", value: "80 kg" },
    ],
    smartFeatures: [],
  },
};