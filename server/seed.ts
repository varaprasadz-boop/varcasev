import { db } from "./db";
import {
  vehicles, vehicleColors, vehicleSpecifications, vehicleSmartFeatures,
  heroSlides, stats, smartFeatures, testimonials, environmentalImpacts,
  companyInfo, companyValues, teamMembers,
  pressArticles, jobOpenings,
  faqCategories, faqQuestions,
  dealers, jointVentures, strategicPartners,
  users
} from "@shared/schema";
import { sql, eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// Import existing data
import { vehicleDatabase } from "../client/src/data/vehicleData";
import { pressArticles as pressData } from "../client/src/data/pressMediaData";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // 1. Create default admin user (idempotent)
    console.log("Creating admin user...");
    const adminPassword = await bcrypt.hash("admin123", 10); // Default password: admin123
    
    const existingAdmin = await db.select().from(users).where(eq(users.username, "admin"));
    if (existingAdmin.length === 0) {
      await db.insert(users).values({
        username: "admin",
        password: adminPassword,
        email: "admin@varcasautomobiles.com",
        fullName: "Admin User",
        role: "super_admin",
        isActive: true,
      });
      console.log("✓ Admin user created (username: admin, password: admin123)");
    } else {
      console.log("✓ Admin user already exists, skipping");
    }

    // 2. Seed Hero Slides (idempotent)
    console.log("Seeding hero slides...");
    const existingSlides = await db.select().from(heroSlides);
    if (existingSlides.length === 0) {
      await db.insert(heroSlides).values([
        {
          type: "image",
          title: "Smart & Connected",
          subtitle: "Experience the future of urban commuting with Varcas' Smart & Connected E-Bike",
          image: "/assets/Gemini_Generated_Image_4jzcos4jzcos4jzc_1759490673763.png",
          displayOrder: 0,
          isActive: true,
        },
        {
          type: "image",
          title: "Reliable, Sustainable & Affordable",
          subtitle: "Complete e-mobility solutions for a greener tomorrow",
          image: "/assets/Gemini_Generated_Image_qk9odzqk9odzqk9o_1759490673764.png",
          displayOrder: 1,
          isActive: true,
        },
        {
          type: "image",
          title: "150 KM Range",
          subtitle: "Economical ride at just 13 Paise/KM with lithium-ion battery technology",
          image: "/assets/Gemini_Generated_Image_w9nnm2w9nnm2w9nn_1759490673764.png",
          displayOrder: 2,
          isActive: true,
        },
        {
          type: "video",
          title: "Watch Our Engineering",
          subtitle: "See how we assemble the future of electric mobility",
          displayOrder: 3,
          isActive: true,
        },
      ]);
      console.log("✓ Hero slides created");
    } else {
      console.log("✓ Hero slides already exist, skipping");
    }

    // 3. Seed Stats (idempotent)
    console.log("Seeding stats...");
    const existingStats = await db.select().from(stats);
    if (existingStats.length === 0) {
      await db.insert(stats).values([
        { value: "30,000+", label: "Happy Customers", icon: "Users", displayOrder: 0 },
        { value: "250+", label: "Service Centers", icon: "MapPin", displayOrder: 1 },
        { value: "400+", label: "Sale Points", icon: "ShoppingBag", displayOrder: 2 },
        { value: "3,500+", label: "Joy Rides", icon: "Award", displayOrder: 3 },
      ]);
      console.log("✓ Stats created");
    } else {
      console.log("✓ Stats already exist, skipping");
    }

    // 4. Seed Smart Features (idempotent)
    console.log("Seeding smart features...");
    const existingFeatures = await db.select().from(smartFeatures);
    if (existingFeatures.length === 0) {
      await db.insert(smartFeatures).values([
        {
          title: "Lithium-ION Battery",
        description: "3 Year Warranty, maintenance free & portable battery technology",
        icon: "Battery",
        displayOrder: 0,
      },
      {
        title: "GPS, GPRS Tracking",
        description: "Real-time remote GPS tracking for peace of mind to the user & family",
        icon: "Navigation",
        displayOrder: 1,
      },
      {
        title: "150 KM Range",
        description: "Economical ride at just 13 Paise/KM with efficient battery management",
        icon: "Zap",
        displayOrder: 2,
      },
      {
        title: "Varcas Care Program",
        description: "Assured door step sales & after sales support at minimal annual cost",
        icon: "Shield",
        displayOrder: 3,
      },
      {
        title: "Trip Tracking",
        description: "Alert the owner when scooter moves out of defined geography or speed",
        icon: "MapPin",
        displayOrder: 4,
      },
      {
        title: "Smart Alerts",
        description: "Battery voltage, theft, crash, speed alerts and remote immobilization",
        icon: "Bell",
        displayOrder: 5,
      ]);
      console.log("✓ Smart features created");
    } else {
      console.log("✓ Smart features already exist, skipping");
    }

    // 5. Seed Environmental Impacts (idempotent)
    console.log("Seeding environmental impacts...");
    const existingImpacts = await db.select().from(environmentalImpacts);
    if (existingImpacts.length === 0) {
      await db.insert(environmentalImpacts).values([
      {
        title: "Zero Emissions",
        description: "Powered by lithium-ion batteries, emitting zero pollutants and saving up to 500 pounds of carbon emissions annually",
        icon: "Leaf",
        displayOrder: 0,
      },
      {
        title: "Energy Efficiency",
        description: "Exceptionally energy-efficient with minimal electricity consumption thanks to advanced battery technology",
        icon: "Zap",
        displayOrder: 1,
      },
      {
        title: "Reduced Traffic Congestion",
        description: "Efficient and convenient mode of transportation, helping streamline city commutes",
        icon: "Car",
        displayOrder: 2,
      },
      {
        title: "Reduced Noise Pollution",
        description: "Quieter operation compared to gas-powered vehicles for a peaceful riding experience",
        icon: "Volume2",
        displayOrder: 3,
      },
      {
        title: "Sustainable Transportation",
        description: "Promoting active transportation and healthier lifestyle choices for a greener future",
        icon: "Trees",
        displayOrder: 4,
      },
      {
        title: "Long-Lasting Batteries",
        description: "Durable battery technology with recyclable components at end of lifespan",
        icon: "Battery",
        displayOrder: 5,
      ]);
      console.log("✓ Environmental impacts created");
    } else {
      console.log("✓ Environmental impacts already exist, skipping");
    }

    // 6. Seed Testimonials (idempotent)
    console.log("Seeding testimonials...");
    const existingTestimonials = await db.select().from(testimonials);
    if (existingTestimonials.length === 0) {
      await db.insert(testimonials).values([
      {
        quote: "Varcas e-bikes have revolutionized my daily commute! The sleek design, long-lasting battery, and smooth ride make every journey effortless. I'm proud to be a Varcas e-bike owner!",
        customerName: "Karthik Reddy",
        location: "Bangalore",
        image: "/assets/stock_images/happy_customer_portr_4a379b91.jpg",
        displayOrder: 0,
        isActive: true,
      },
      {
        quote: "I was skeptical about e-bikes until I tried Varcas. Their e-bikes offer the perfect combination of pedal power and electric assistance. Best decision for my daily travel.",
        customerName: "Priya Sharma",
        location: "Mumbai",
        image: "/assets/stock_images/happy_customer_portr_9a0c17fa.jpg",
        displayOrder: 1,
        isActive: true,
      },
      {
        quote: "The GPS tracking and smart features give me complete peace of mind. Plus, the cost savings compared to my old petrol scooter are incredible. Highly recommended!",
        customerName: "Amit Patel",
        location: "Ahmedabad",
        image: "/assets/stock_images/happy_customer_portr_d1a74b8f.jpg",
        displayOrder: 2,
        isActive: true,
      ]);
      console.log("✓ Testimonials created");
    } else {
      console.log("✓ Testimonials already exist, skipping");
    }

    // 7. Seed Company Info (idempotent)
    console.log("Seeding company info...");
    const existingCompanyInfo = await db.select().from(companyInfo);
    if (existingCompanyInfo.length === 0) {
      await db.insert(companyInfo).values({
      heading: "About VARCAS",
      tagline: "Pioneering electric vehicle manufacturer dedicated to accelerating the global transition to sustainable transportation",
      missionStatement: "Varcas is committed to innovation, affordability, and reliability. We strive to provide complete e-mobility solutions while upholding values of integrity, excellence, and sustainability.",
      overview: "Team Varcas comprises professionals from USA & INDIA who have extensive professional experience of 20+ years in IT and Automobile. We have a proven track record of delivering high-quality services through our experienced professionals with an understanding of global business and regulatory requirements.",
      });
      console.log("✓ Company info created");
    } else {
      console.log("✓ Company info already exists, skipping");
    }

    // 8. Seed Company Values (idempotent)
    console.log("Seeding company values...");
    const existingValues = await db.select().from(companyValues);
    if (existingValues.length === 0) {
      await db.insert(companyValues).values([
      {
        title: "Reliability",
        description: "20+ years of proven excellence in delivering high-quality e-mobility solutions",
        icon: "Award",
        displayOrder: 0,
      },
      {
        title: "Sustainability",
        description: "Committed to accelerating the global transition to eco-friendly transportation",
        icon: "Globe",
        displayOrder: 1,
      },
      {
        title: "Affordability",
        description: "Making electric vehicles accessible to everyone with economical pricing",
        icon: "Target",
        displayOrder: 2,
      },
      {
        title: "Excellence",
        description: "Professional team from USA & India with deep automotive expertise",
        icon: "Users",
        displayOrder: 3,
      ]);
      console.log("✓ Company values created");
    } else {
      console.log("✓ Company values already exist, skipping");
    }

    // 9. Seed Team Members (idempotent)
    console.log("Seeding team members...");
    const existingTeam = await db.select().from(teamMembers);
    if (existingTeam.length === 0) {
      const teamImage = "/assets/stock_images/professional_busines_82f1c896.jpg";
      
      await db.insert(teamMembers).values([
      {
        name: "Ram Vemireddy",
        role: "Founder & CEO",
        tier: "ceo",
        image: teamImage,
        bio: "Two decades of experience in Information Security and Compliance management for leading companies in the USA. Transitioning into the automotive industry in 2018, he spearheads Varcas with a commitment to sustainability.",
        displayOrder: 0,
        isActive: true,
      },
      {
        name: "Chenna Reddy",
        role: "Finance Head",
        tier: "executive",
        image: teamImage,
        bio: "Oversees all financial operations, ensuring effective planning, control, and reporting. Plays a key role in driving financial strategy, maintaining compliance, and supporting the company's overall growth.",
        displayOrder: 1,
        isActive: true,
      },
      {
        name: "LN Rao",
        role: "COO",
        tier: "executive",
        image: teamImage,
        bio: "As Chief Operating Officer, ensures smooth execution of business operations, streamlining processes and driving efficiency across departments to align with the company's strategic goals.",
        displayOrder: 2,
        isActive: true,
      },
      {
        name: "Venkat Reddy",
        role: "Legal & Compliance Head",
        tier: "executive",
        image: teamImage,
        bio: "Oversees legal affairs and regulatory compliance, ensuring the company operates within legal frameworks while protecting its interests and maintaining ethical business practices.",
        displayOrder: 3,
        isActive: true,
      },
      {
        name: "Mr. A C Keshava Reddy",
        role: "Advisory Board Member",
        tier: "advisor",
        image: teamImage,
        bio: "Mechanical engineer with vast experience across Asia in telecom, power, automobile, and government sectors. Active in the EV space since 2008, collaborated with the Ministry of Environment on pollution-reduction policies.",
        displayOrder: 4,
        isActive: true,
      },
      {
        name: "Mr. Sridhar Ramani",
        role: "Director/Chief Mentor",
        tier: "advisor",
        image: teamImage,
        bio: "Board Member and Advisor with extensive experience in technology and business strategy, providing valuable guidance to the leadership team in driving growth and innovation.",
        displayOrder: 5,
        isActive: true,
      },
      {
        name: "K. Chandu",
        role: "Production Manager",
        tier: "manager",
        department: "Production",
        image: teamImage,
        bio: "Leads production at Varcas Automobiles, managing assembly processes, upholding quality standards, and advancing the company's mission for reliable electric vehicles.",
        displayOrder: 6,
        isActive: true,
      },
      {
        name: "S. Madhu",
        role: "R&D & Sourcing Manager",
        tier: "manager",
        department: "R&D",
        image: teamImage,
        bio: "Drives research and development initiatives while managing sourcing operations to ensure quality components and innovative solutions for VARCAS vehicles.",
        displayOrder: 7,
        isActive: true,
      },
      {
        name: "Hari Prakash",
        role: "Stores, Spare Parts & Customer Support Manager",
        tier: "manager",
        department: "Customer Support",
        image: teamImage,
        bio: "Manages stores, spare parts sales, warranty services, and customer support operations, ensuring excellent after-sales service and customer satisfaction.",
        displayOrder: 8,
        isActive: true,
      },
      {
        name: "Syda Rao",
        role: "Accounts Department",
        tier: "team_member",
        department: "Accounts",
        image: teamImage,
        bio: "Manages accounting operations and financial records, supporting the finance team in maintaining accurate financial documentation.",
        displayOrder: 9,
        isActive: true,
      },
      {
        name: "J. Gangadhar",
        role: "Production Department",
        tier: "team_member",
        department: "Production",
        image: teamImage,
        bio: "Key member of the production team, contributing to manufacturing excellence and quality control processes.",
        displayOrder: 10,
        isActive: true,
      },
      {
        name: "Mahesh",
        role: "Production Department",
        tier: "team_member",
        department: "Production",
        image: teamImage,
        bio: "Supports production operations, ensuring smooth manufacturing processes and adherence to quality standards.",
        displayOrder: 11,
        isActive: true,
      },
      {
        name: "B. Naveen",
        role: "Warranty & Customer Support",
        tier: "team_member",
        department: "Customer Support",
        image: teamImage,
        bio: "Provides warranty services and customer support, ensuring customer satisfaction and addressing service needs efficiently.",
        displayOrder: 12,
        isActive: true,
      ]);
      console.log("✓ Team members created");
    } else {
      console.log("✓ Team members already exist, skipping");
    }

    // 10. Seed Press Articles (idempotent)
    console.log("Seeding press articles...");
    const existingPress = await db.select().from(pressArticles);
    if (existingPress.length === 0) {
      await db.insert(pressArticles).values(
        pressData.map((article, index) => ({
          title: article.title,
          publication: article.publication,
          publicationDate: article.date,
          excerpt: article.excerpt,
          image: article.image,
          category: article.category,
          status: "published",
          displayOrder: index,
        }))
      );
      console.log("✓ Press articles created");
    } else {
      console.log("✓ Press articles already exist, skipping");
    }

    // 11. Seed Job Openings (idempotent)
    console.log("Seeding job openings...");
    const existingJobs = await db.select().from(jobOpenings);
    if (existingJobs.length === 0) {
      await db.insert(jobOpenings).values([
      {
        title: "Senior Electrical Engineer",
        department: "Engineering",
        location: "Bangalore, India",
        type: "Full-time",
        experience: "5-8 years",
        description: "Lead the design and development of electric vehicle powertrains and battery management systems. Work with cutting-edge EV technology.",
        status: "active",
      },
      {
        title: "Product Manager - EV",
        department: "Product",
        location: "Mumbai, India",
        type: "Full-time",
        experience: "3-5 years",
        description: "Drive product strategy and roadmap for our electric scooter lineup. Work closely with engineering and design teams.",
        status: "active",
      },
      {
        title: "Sales Manager",
        department: "Sales",
        location: "Delhi NCR, India",
        type: "Full-time",
        experience: "4-6 years",
        description: "Lead sales strategy and team to expand VARCAS presence across North India. Build dealer network and partnerships.",
        status: "active",
      },
      {
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        experience: "2-4 years",
        description: "Design intuitive digital experiences for our mobile app and web platforms. Create design systems for connected EV features.",
        status: "active",
      },
      {
        title: "Manufacturing Engineer",
        department: "Manufacturing",
        location: "Chennai, India",
        type: "Full-time",
        experience: "3-5 years",
        description: "Optimize production processes and implement quality control systems. Work on assembly line efficiency for electric vehicles.",
        status: "active",
      },
      {
        title: "Marketing Specialist",
        department: "Marketing",
        location: "Pune, India",
        type: "Full-time",
        experience: "2-4 years",
        description: "Develop and execute marketing campaigns for EV products. Manage digital marketing, social media, and brand communications.",
        status: "active",
      ]);
      console.log("✓ Job openings created");
    } else {
      console.log("✓ Job openings already exist, skipping");
    }

    // 12. Seed FAQ Categories and Questions (idempotent)
    console.log("Seeding FAQ data...");
    const existingFaqCats = await db.select().from(faqCategories);
    if (existingFaqCats.length === 0) {
      
      // Insert categories first
      const [chargingCat] = await db.insert(faqCategories).values({ name: "Charging & Battery", displayOrder: 0 }).returning();
      const [rangeCat] = await db.insert(faqCategories).values({ name: "Range & Performance", displayOrder: 1 }).returning();
      const [costCat] = await db.insert(faqCategories).values({ name: "Cost & Savings", displayOrder: 2 }).returning();
      const [legalCat] = await db.insert(faqCategories).values({ name: "Legal & Registration", displayOrder: 3 }).returning();
      const [serviceCat] = await db.insert(faqCategories).values({ name: "Service & Support", displayOrder: 4 }).returning();

      // Insert questions for each category
      await db.insert(faqQuestions).values([
      {
        categoryId: chargingCat.id,
        question: "How long does it take to charge the scooter?",
        answer: "Around 2–3 hours for Lithium Ion batteries and 6–7 hours in case of Graphene / Lead-acid batteries.",
        displayOrder: 0,
        status: "published",
      },
      {
        categoryId: chargingCat.id,
        question: "Can I charge it at home?",
        answer: "Yes, the scooter comes with a portable charger compatible with regular household outlets – using a standard 5A socket.",
        displayOrder: 1,
        status: "published",
      },
      {
        categoryId: chargingCat.id,
        question: "What is the battery warranty?",
        answer: "3 years or 20,000 km (whichever comes first) for Lithium Ion; typically 9 months for Graphene batteries.",
        displayOrder: 2,
        status: "published",
      },
      {
        categoryId: chargingCat.id,
        question: "Is fast charging available?",
        answer: "Not currently, but future models may support it.",
        displayOrder: 3,
        status: "published",
      },
      {
        categoryId: rangeCat.id,
        question: "What is the real-world range?",
        answer: "Depends on battery capacity. For example, a 60V 31Ah Lithium Ion battery typically gives 60–70 km per charge (depending on terrain, rider weight, and driving conditions).",
        displayOrder: 0,
        status: "published",
      },
      {
        categoryId: rangeCat.id,
        question: "What is the top speed?",
        answer: "We have both low-speed and high-speed models ideal for urban and semi-rural commuting.",
        displayOrder: 1,
        status: "published",
      },
      {
        categoryId: rangeCat.id,
        question: "Can I ride in the rain?",
        answer: "Yes, the scooter is IP-rated for water resistance.",
        displayOrder: 2,
        status: "published",
      },
      {
        categoryId: costCat.id,
        question: "How much does it cost to charge?",
        answer: "About 1.5 units of electricity – roughly less than ₹10 per full charge (based on ₹6/kWh rate).",
        displayOrder: 0,
        status: "published",
      },
      {
        categoryId: costCat.id,
        question: "What are the maintenance costs?",
        answer: "Very low—no oil changes, fewer moving parts, and only minimal servicing every 3 months (required to maintain warranty).",
        displayOrder: 1,
        status: "published",
      },
      {
        categoryId: costCat.id,
        question: "Are there government subsidies?",
        answer: "No, we don't take government subsidies. At Varcas, we believe in ethical, transparent business practices. Even without subsidies, our scooters are priced competitively.",
        displayOrder: 2,
        status: "published",
      },
      {
        categoryId: legalCat.id,
        question: "Do I need a license or registration?",
        answer: "Not required for low-speed vehicles. Required for high-speed models.",
        displayOrder: 0,
        status: "published",
      },
      {
        categoryId: legalCat.id,
        question: "Is insurance mandatory?",
        answer: "Optional for license-free models; mandatory for registered ones.",
        displayOrder: 1,
        status: "published",
      },
      {
        categoryId: serviceCat.id,
        question: "Where can I get it serviced?",
        answer: "At any authorized Varcas service center or via doorstep service in select areas.",
        displayOrder: 0,
        status: "published",
      },
      {
        categoryId: serviceCat.id,
        question: "What does the warranty cover?",
        answer: "Battery, motor, and controller. Physical damage and water ingress are excluded.",
        displayOrder: 1,
        status: "published",
      },
      {
        categoryId: serviceCat.id,
        question: "Are spare parts available?",
        answer: "Yes, through Varcas dealers, company stores, website, and service partners.",
        displayOrder: 2,
        status: "published",
      },
    ]);
      console.log("✓ FAQ data created");
    } else {
      console.log("✓ FAQ data already exists, skipping");
    }

    // 13. Seed Dealers (idempotent)
    console.log("Seeding dealers...");
    const existingDealers = await db.select().from(dealers);
    if (existingDealers.length === 0) {
      await db.insert(dealers).values([
      {
        name: "VARCAS Connaught Place",
        address: "Block A, Connaught Place, New Delhi, Delhi - 110001",
        phone: "+91 11 4567 8900",
        email: "delhi@varcasautomobiles.com",
        hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
        state: "Delhi",
        district: "Central Delhi",
        city: "New Delhi",
        status: "active",
        displayOnWebsite: true,
      },
      {
        name: "VARCAS Dwarka",
        address: "Sector 12, Dwarka, New Delhi, Delhi - 110075",
        phone: "+91 11 4567 8901",
        email: "dwarka@varcasautomobiles.com",
        hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
        state: "Delhi",
        district: "South West Delhi",
        city: "Dwarka",
        status: "active",
        displayOnWebsite: true,
      },
      {
        name: "VARCAS Andheri",
        address: "SV Road, Andheri West, Mumbai, Maharashtra - 400053",
        phone: "+91 22 4567 8900",
        email: "andheri@varcasautomobiles.com",
        hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
        state: "Maharashtra",
        district: "Mumbai Suburban",
        city: "Mumbai",
        status: "active",
        displayOnWebsite: true,
      ]);
      console.log("✓ Dealers created");
    } else {
      console.log("✓ Dealers already exist, skipping");
    }

    // 14. Seed Joint Ventures (idempotent)
    console.log("Seeding joint ventures...");
    const existingJV = await db.select().from(jointVentures);
    if (existingJV.length === 0) {
      await db.insert(jointVentures).values({
      name: "Prevalance",
      logo: "https://varcasautomobiles.com/images/prevalancelogo.png",
      description: "Strategic partnership with Prevalance to develop next-generation electric mobility solutions for emerging markets, combining expertise in automotive technology and market expansion.",
      status: "active",
      displayOrder: 0,
      });
      console.log("✓ Joint venture created");
    }

    const existingPartners = await db.select().from(strategicPartners);
    if (existingPartners.length === 0) {
      await db.insert(strategicPartners).values([
      {
        name: "Laxmi Motors",
        logo: "https://varcasautomobiles.com/images/laxmimotorslogo.png",
        description: "Trusted partner in vehicle distribution",
        displayOrder: 0,
      },
      {
        name: "Volta",
        logo: "https://varcasautomobiles.com/images/voltalogo.png",
        description: "Battery technology collaboration",
        displayOrder: 1,
      },
      {
        name: "EVPE",
        logo: "https://varcasautomobiles.com/images/evpelogo.png",
        description: "Electric vehicle parts and engineering",
        displayOrder: 2,
      ]);
      console.log("✓ Strategic partners created");
    } else {
      console.log("✓ Strategic partners already exist, skipping");
    }

    // 15. Seed Vehicles (idempotent)
    console.log("Seeding vehicles...");
    const existingVehicles = await db.select().from(vehicles);
    if (existingVehicles.length === 0) {
      let vehicleOrder = 0;
      
      for (const [slug, vehicleData] of Object.entries(vehicleDatabase)) {
        const [vehicle] = await db.insert(vehicles).values({
        name: vehicleData.name,
        slug: vehicleData.slug,
        tagline: vehicleData.tagline,
        description: vehicleData.description,
        category: "electric_scooters", // You can categorize based on slug later
        mainImage: vehicleData.mainImage,
        frontImage: vehicleData.frontImage,
        status: "active",
        displayOrder: vehicleOrder++,
        }).returning();

        // Insert colors
        if (vehicleData.colors && vehicleData.colors.length > 0) {
        await db.insert(vehicleColors).values(
          vehicleData.colors.map((color, index) => ({
            vehicleId: vehicle.id,
            name: color.name,
            image: color.image,
            displayOrder: index,
          }))
        );
        }

        // Insert specifications
        if (vehicleData.specifications && vehicleData.specifications.length > 0) {
        await db.insert(vehicleSpecifications).values(
          vehicleData.specifications.map((spec, index) => ({
            vehicleId: vehicle.id,
            label: spec.label,
            value: spec.value,
            displayOrder: index,
          }))
        );
        }

        // Insert smart features
        if (vehicleData.smartFeatures && vehicleData.smartFeatures.length > 0) {
        await db.insert(vehicleSmartFeatures).values(
          vehicleData.smartFeatures.map((feature, index) => ({
            vehicleId: vehicle.id,
            title: feature.title,
            description: feature.description,
            icon: feature.icon,
            displayOrder: index,
          }))
        );
        }
      }
      console.log("✓ Vehicles created");
    } else {
      console.log("✓ Vehicles already exist, skipping");
    }

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed
seed()
  .then(() => {
    console.log("Seed completed, exiting...");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });

export { seed };
