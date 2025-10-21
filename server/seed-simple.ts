import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

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

    console.log("✅ Database seeded successfully!");
    console.log("\n📝 Admin Login Credentials:");
    console.log("   Username: admin");
    console.log("   Password: admin123");
    console.log("\n⚠️  Please change the admin password after first login!");
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
