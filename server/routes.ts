import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import session from "express-session";

// Extend Express Session to include user
declare module "express-session" {
  interface SessionData {
    userId?: string;
    user?: {
      id: string;
      username: string;
      email: string;
      fullName: string;
      role: string;
    };
  }
}

// Authentication middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Admin role middleware  
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user || (req.session.user.role !== "super_admin" && req.session.user.role !== "admin")) {
    return res.status(403).json({ error: "Forbidden - Admin access required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ==================== AUTHENTICATION ROUTES ====================
  
  // Login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      if (!user.isActive) {
        return res.status(401).json({ error: "Account is inactive" });
      }

      req.session.userId = user.id;
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName || user.username,
        role: user.role,
      };

      return res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName || user.username,
          role: user.role,
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Logout
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current user
  app.get("/api/auth/me", requireAuth, async (req: Request, res: Response) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName || user.username,
          role: user.role,
        }
      });
    } catch (error) {
      console.error("Get user error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== USER MANAGEMENT (ADMIN ONLY) ====================
  
  app.get("/api/admin/users", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const users = await storage.listUsers();
      return res.json(users.map(u => ({ ...u, password: undefined })));
    } catch (error) {
      console.error("List users error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/users", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { password, ...userData } = req.body;
      
      if (!password) {
        return res.status(400).json({ error: "Password required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ ...userData, password: hashedPassword });
      
      return res.status(201).json({ ...user, password: undefined });
    } catch (error) {
      console.error("Create user error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/users/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { password, ...userData } = req.body;
      
      const updateData: any = { ...userData };
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const user = await storage.updateUser(id, updateData);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      return res.json({ ...user, password: undefined });
    } catch (error) {
      console.error("Update user error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/users/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (id === req.session.userId) {
        return res.status(400).json({ error: "Cannot delete your own account" });
      }

      const success = await storage.deleteUser(id);
      if (!success) {
        return res.status(404).json({ error: "User not found" });
      }
      
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete user error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== VEHICLES ====================
  
  // Public routes
  app.get("/api/vehicles", async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const filters: any = { status: "active" };
      if (category) filters.category = category;
      
      const vehicles = await storage.listVehicles(filters);
      return res.json(vehicles);
    } catch (error) {
      console.error("List vehicles error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/vehicles/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const vehicle = await storage.getVehicleBySlug(slug);
      
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      
      // Get related data
      const colors = await storage.getVehicleColors(vehicle.id);
      const specifications = await storage.getVehicleSpecifications(vehicle.id);
      const smartFeatures = await storage.getVehicleSmartFeatures(vehicle.id);
      
      return res.json({
        ...vehicle,
        colors,
        specifications,
        smartFeatures,
      });
    } catch (error) {
      console.error("Get vehicle error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin routes
  app.get("/api/admin/vehicles", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { category, status } = req.query;
      const filters: any = {};
      if (category) filters.category = category;
      if (status) filters.status = status;
      
      const vehicles = await storage.listVehicles(filters);
      return res.json(vehicles);
    } catch (error) {
      console.error("List admin vehicles error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/vehicles", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const vehicleData = { ...req.body, createdBy: req.session.userId };
      const vehicle = await storage.createVehicle(vehicleData);
      return res.status(201).json(vehicle);
    } catch (error) {
      console.error("Create vehicle error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/vehicles/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // Explicitly set updatedAt and updatedBy, excluding any timestamp fields from request
      const { createdAt, updatedAt, createdBy, ...cleanBody } = req.body;
      const vehicleData = { 
        ...cleanBody, 
        updatedBy: req.session.userId,
        updatedAt: new Date()
      };
      const vehicle = await storage.updateVehicle(parseInt(id), vehicleData);
      
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      
      return res.json(vehicle);
    } catch (error) {
      console.error("Update vehicle error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/vehicles/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteVehicle(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      
      return res.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
      console.error("Delete vehicle error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== HERO SLIDES ====================
  
  app.get("/api/hero-slides", async (req: Request, res: Response) => {
    try {
      const slides = await storage.listHeroSlides({ isActive: true });
      return res.json(slides);
    } catch (error) {
      console.error("List hero slides error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/hero-slides", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const slides = await storage.listHeroSlides();
      return res.json(slides);
    } catch (error) {
      console.error("List admin hero slides error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/hero-slides", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const slide = await storage.createHeroSlide(req.body);
      return res.status(201).json(slide);
    } catch (error) {
      console.error("Create hero slide error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/hero-slides/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const slide = await storage.updateHeroSlide(parseInt(id), req.body);
      
      if (!slide) {
        return res.status(404).json({ error: "Hero slide not found" });
      }
      
      return res.json(slide);
    } catch (error) {
      console.error("Update hero slide error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/hero-slides/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteHeroSlide(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Hero slide not found" });
      }
      
      return res.json({ message: "Hero slide deleted successfully" });
    } catch (error) {
      console.error("Delete hero slide error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== TESTIMONIALS ====================
  
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.listTestimonials({ isActive: true });
      return res.json(testimonials);
    } catch (error) {
      console.error("List testimonials error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/testimonials", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.listTestimonials();
      return res.json(testimonials);
    } catch (error) {
      console.error("List admin testimonials error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/testimonials", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const testimonial = await storage.createTestimonial(req.body);
      return res.status(201).json(testimonial);
    } catch (error) {
      console.error("Create testimonial error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/testimonials/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const testimonial = await storage.updateTestimonial(parseInt(id), req.body);
      
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      
      return res.json(testimonial);
    } catch (error) {
      console.error("Update testimonial error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteTestimonial(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      
      return res.json({ message: "Testimonial deleted successfully" });
    } catch (error) {
      console.error("Delete testimonial error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== STATS ====================
  
  app.get("/api/stats", async (req: Request, res: Response) => {
    try {
      const stats = await storage.listStats();
      return res.json(stats);
    } catch (error) {
      console.error("List stats error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/stats", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const stats = await storage.listStats();
      return res.json(stats);
    } catch (error) {
      console.error("List admin stats error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/stats", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const stat = await storage.createStat(req.body);
      return res.status(201).json(stat);
    } catch (error) {
      console.error("Create stat error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/stats/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const stat = await storage.updateStat(parseInt(id), req.body);
      
      if (!stat) {
        return res.status(404).json({ error: "Stat not found" });
      }
      
      return res.json(stat);
    } catch (error) {
      console.error("Update stat error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/stats/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteStat(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Stat not found" });
      }
      
      return res.json({ message: "Stat deleted successfully" });
    } catch (error) {
      console.error("Delete stat error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== SMART FEATURES ====================
  
  app.get("/api/smart-features", async (req: Request, res: Response) => {
    try {
      const features = await storage.listSmartFeatures();
      return res.json(features);
    } catch (error) {
      console.error("List smart features error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/smart-features", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const features = await storage.listSmartFeatures();
      return res.json(features);
    } catch (error) {
      console.error("List admin smart features error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/smart-features", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const feature = await storage.createSmartFeature(req.body);
      return res.status(201).json(feature);
    } catch (error) {
      console.error("Create smart feature error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/smart-features/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const feature = await storage.updateSmartFeature(parseInt(id), req.body);
      
      if (!feature) {
        return res.status(404).json({ error: "Smart feature not found" });
      }
      
      return res.json(feature);
    } catch (error) {
      console.error("Update smart feature error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/smart-features/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteSmartFeature(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Smart feature not found" });
      }
      
      return res.json({ message: "Smart feature deleted successfully" });
    } catch (error) {
      console.error("Delete smart feature error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== ENVIRONMENTAL IMPACTS ====================
  
  app.get("/api/environmental-impacts", async (req: Request, res: Response) => {
    try {
      const impacts = await storage.listEnvironmentalImpacts();
      return res.json(impacts);
    } catch (error) {
      console.error("List environmental impacts error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/environmental-impacts", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const impacts = await storage.listEnvironmentalImpacts();
      return res.json(impacts);
    } catch (error) {
      console.error("List admin environmental impacts error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/environmental-impacts", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const impact = await storage.createEnvironmentalImpact(req.body);
      return res.status(201).json(impact);
    } catch (error) {
      console.error("Create environmental impact error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/environmental-impacts/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const impact = await storage.updateEnvironmentalImpact(parseInt(id), req.body);
      
      if (!impact) {
        return res.status(404).json({ error: "Environmental impact not found" });
      }
      
      return res.json(impact);
    } catch (error) {
      console.error("Update environmental impact error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/environmental-impacts/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteEnvironmentalImpact(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Environmental impact not found" });
      }
      
      return res.json({ message: "Environmental impact deleted successfully" });
    } catch (error) {
      console.error("Delete environmental impact error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== COMPANY INFO & TEAM ====================
  
  app.get("/api/company-info", async (req: Request, res: Response) => {
    try {
      const info = await storage.getCompanyInfo();
      const values = await storage.listCompanyValues();
      return res.json({ info, values });
    } catch (error) {
      console.error("Get company info error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/company-info", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const info = await storage.updateCompanyInfo({ ...req.body, updatedBy: req.session.userId });
      return res.json(info);
    } catch (error) {
      console.error("Update company info error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/team-members", async (req: Request, res: Response) => {
    try {
      const { department } = req.query;
      const filters: any = {};
      if (department) filters.department = department;
      
      const members = await storage.listTeamMembers(filters);
      return res.json(members);
    } catch (error) {
      console.error("List team members error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/team-members", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const members = await storage.listTeamMembers();
      return res.json(members);
    } catch (error) {
      console.error("List admin team members error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/team-members", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const member = await storage.createTeamMember(req.body);
      return res.status(201).json(member);
    } catch (error) {
      console.error("Create team member error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/team-members/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const member = await storage.updateTeamMember(parseInt(id), req.body);
      
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      
      return res.json(member);
    } catch (error) {
      console.error("Update team member error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/team-members/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteTeamMember(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Team member not found" });
      }
      
      return res.json({ message: "Team member deleted successfully" });
    } catch (error) {
      console.error("Delete team member error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== PRESS ARTICLES ====================
  
  app.get("/api/press-articles", async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const filters: any = { status: "published" };
      if (category) filters.category = category;
      
      const articles = await storage.listPressArticles(filters);
      return res.json(articles);
    } catch (error) {
      console.error("List press articles error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/press-articles", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { category, status } = req.query;
      const filters: any = {};
      if (category) filters.category = category;
      if (status) filters.status = status;
      
      const articles = await storage.listPressArticles(filters);
      return res.json(articles);
    } catch (error) {
      console.error("List admin press articles error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/press-articles", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const article = await storage.createPressArticle({ ...req.body, createdBy: req.session.userId });
      return res.status(201).json(article);
    } catch (error) {
      console.error("Create press article error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/press-articles/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const article = await storage.updatePressArticle(parseInt(id), req.body);
      
      if (!article) {
        return res.status(404).json({ error: "Press article not found" });
      }
      
      return res.json(article);
    } catch (error) {
      console.error("Update press article error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/press-articles/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deletePressArticle(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Press article not found" });
      }
      
      return res.json({ message: "Press article deleted successfully" });
    } catch (error) {
      console.error("Delete press article error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== JOB OPENINGS ====================
  
  app.get("/api/job-openings", async (req: Request, res: Response) => {
    try {
      const { department } = req.query;
      const filters: any = { status: "active" };
      if (department) filters.department = department;
      
      const jobs = await storage.listJobOpenings(filters);
      return res.json(jobs);
    } catch (error) {
      console.error("List job openings error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/job-openings", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { department, status } = req.query;
      const filters: any = {};
      if (department) filters.department = department;
      if (status) filters.status = status;
      
      const jobs = await storage.listJobOpenings(filters);
      return res.json(jobs);
    } catch (error) {
      console.error("List admin job openings error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/job-openings", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const job = await storage.createJobOpening({ ...req.body, createdBy: req.session.userId });
      return res.status(201).json(job);
    } catch (error) {
      console.error("Create job opening error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/job-openings/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const job = await storage.updateJobOpening(parseInt(id), req.body);
      
      if (!job) {
        return res.status(404).json({ error: "Job opening not found" });
      }
      
      return res.json(job);
    } catch (error) {
      console.error("Update job opening error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/job-openings/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteJobOpening(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Job opening not found" });
      }
      
      return res.json({ message: "Job opening deleted successfully" });
    } catch (error) {
      console.error("Delete job opening error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== FAQ ====================
  
  app.get("/api/faq", async (req: Request, res: Response) => {
    try {
      const categories = await storage.listFaqCategories();
      const categoriesWithQuestions = await Promise.all(
        categories.map(async (category) => {
          const questions = await storage.listFaqQuestions(category.id);
          return { ...category, questions };
        })
      );
      return res.json(categoriesWithQuestions);
    } catch (error) {
      console.error("List FAQ error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/faq-categories", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const categories = await storage.listFaqCategories();
      return res.json(categories);
    } catch (error) {
      console.error("List admin FAQ categories error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/faq-categories", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const category = await storage.createFaqCategory(req.body);
      return res.status(201).json(category);
    } catch (error) {
      console.error("Create FAQ category error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/faq-categories/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await storage.updateFaqCategory(parseInt(id), req.body);
      
      if (!category) {
        return res.status(404).json({ error: "FAQ category not found" });
      }
      
      return res.json(category);
    } catch (error) {
      console.error("Update FAQ category error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/faq-categories/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteFaqCategory(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "FAQ category not found" });
      }
      
      return res.json({ message: "FAQ category deleted successfully" });
    } catch (error) {
      console.error("Delete FAQ category error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/faq-questions", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.query;
      const questions = await storage.listFaqQuestions(categoryId ? parseInt(categoryId as string) : undefined);
      return res.json(questions);
    } catch (error) {
      console.error("List admin FAQ questions error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/faq-questions", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const question = await storage.createFaqQuestion(req.body);
      return res.status(201).json(question);
    } catch (error) {
      console.error("Create FAQ question error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/faq-questions/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const question = await storage.updateFaqQuestion(parseInt(id), req.body);
      
      if (!question) {
        return res.status(404).json({ error: "FAQ question not found" });
      }
      
      return res.json(question);
    } catch (error) {
      console.error("Update FAQ question error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/faq-questions/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteFaqQuestion(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "FAQ question not found" });
      }
      
      return res.json({ message: "FAQ question deleted successfully" });
    } catch (error) {
      console.error("Delete FAQ question error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== DEALERS ====================
  
  app.get("/api/dealers", async (req: Request, res: Response) => {
    try {
      const { state, district, city } = req.query;
      const filters: any = { displayOnWebsite: true };
      if (state) filters.state = state;
      if (district) filters.district = district;
      if (city) filters.city = city;
      
      const dealers = await storage.listDealers(filters);
      return res.json(dealers);
    } catch (error) {
      console.error("List dealers error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/dealers", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { state, district, city } = req.query;
      const filters: any = {};
      if (state) filters.state = state;
      if (district) filters.district = district;
      if (city) filters.city = city;
      
      const dealers = await storage.listDealers(filters);
      return res.json(dealers);
    } catch (error) {
      console.error("List admin dealers error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/dealers", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const dealer = await storage.createDealer({ ...req.body, createdBy: req.session.userId });
      return res.status(201).json(dealer);
    } catch (error) {
      console.error("Create dealer error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/dealers/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const dealer = await storage.updateDealer(parseInt(id), req.body);
      
      if (!dealer) {
        return res.status(404).json({ error: "Dealer not found" });
      }
      
      return res.json(dealer);
    } catch (error) {
      console.error("Update dealer error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/dealers/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteDealer(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Dealer not found" });
      }
      
      return res.json({ message: "Dealer deleted successfully" });
    } catch (error) {
      console.error("Delete dealer error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== JOINT VENTURES ====================
  
  app.get("/api/joint-ventures", async (req: Request, res: Response) => {
    try {
      const ventures = await storage.listJointVentures();
      const partners = await storage.listStrategicPartners();
      return res.json({ ventures, partners });
    } catch (error) {
      console.error("List joint ventures error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/joint-ventures", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const ventures = await storage.listJointVentures();
      return res.json(ventures);
    } catch (error) {
      console.error("List admin joint ventures error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/joint-ventures", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const venture = await storage.createJointVenture(req.body);
      return res.status(201).json(venture);
    } catch (error) {
      console.error("Create joint venture error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/joint-ventures/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const venture = await storage.updateJointVenture(parseInt(id), req.body);
      
      if (!venture) {
        return res.status(404).json({ error: "Joint venture not found" });
      }
      
      return res.json(venture);
    } catch (error) {
      console.error("Update joint venture error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/joint-ventures/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteJointVenture(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Joint venture not found" });
      }
      
      return res.json({ message: "Joint venture deleted successfully" });
    } catch (error) {
      console.error("Delete joint venture error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== FORM SUBMISSIONS ====================
  
  app.post("/api/forms/submit", async (req: Request, res: Response) => {
    try {
      const submission = await storage.createFormSubmission(req.body);
      return res.status(201).json({ message: "Form submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Submit form error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/form-submissions", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { formType, status } = req.query;
      const filters: any = {};
      if (formType) filters.formType = formType;
      if (status) filters.status = status;
      
      const submissions = await storage.listFormSubmissions(filters);
      return res.json(submissions);
    } catch (error) {
      console.error("List form submissions error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/form-submissions/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const submission = await storage.getFormSubmission(parseInt(id));
      
      if (!submission) {
        return res.status(404).json({ error: "Form submission not found" });
      }
      
      return res.json(submission);
    } catch (error) {
      console.error("Get form submission error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/form-submissions/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const submission = await storage.updateFormSubmission(parseInt(id), { 
        ...req.body,
        respondedBy: req.session.userId,
        respondedAt: new Date()
      });
      
      if (!submission) {
        return res.status(404).json({ error: "Form submission not found" });
      }
      
      return res.json(submission);
    } catch (error) {
      console.error("Update form submission error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/form-submissions/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteFormSubmission(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "Form submission not found" });
      }
      
      return res.json({ message: "Form submission deleted successfully" });
    } catch (error) {
      console.error("Delete form submission error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== SITE SETTINGS & SEO ====================
  
  app.get("/api/admin/site-settings", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const settings = await storage.getSiteSettings();
      return res.json(settings);
    } catch (error) {
      console.error("List site settings error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/site-settings/:key", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { key } = req.params;
      const setting = await storage.upsertSiteSetting({ key, ...req.body, updatedBy: req.session.userId });
      return res.json(setting);
    } catch (error) {
      console.error("Update site setting error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/seo-metadata", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const metadata = await storage.listSeoMetadata();
      return res.json(metadata);
    } catch (error) {
      console.error("List SEO metadata error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/seo-metadata", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const metadata = await storage.upsertSeoMetadata(req.body);
      return res.json(metadata);
    } catch (error) {
      console.error("Update SEO metadata error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/seo-metadata/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteSeoMetadata(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: "SEO metadata not found" });
      }
      
      return res.json({ message: "SEO metadata deleted successfully" });
    } catch (error) {
      console.error("Delete SEO metadata error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==================== OBJECT STORAGE ROUTES ====================
  // From blueprint:javascript_object_storage for vehicle image upload
  
  // Get upload URL for vehicle images (protected)
  app.post("/api/objects/upload", requireAuth, async (req: Request, res: Response) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      return res.json({ uploadURL });
    } catch (error) {
      console.error("Get upload URL error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Serve uploaded vehicle images (protected)
  app.get("/objects/:objectPath(*)", requireAuth, async (req: Request, res: Response) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      const userId = req.session.userId;
      
      // Check if user can access (for now, all authenticated users can view vehicle images)
      const canAccess = await objectStorageService.canAccessObjectEntity({
        objectFile,
        userId: userId,
      });
      
      if (!canAccess) {
        return res.sendStatus(401);
      }
      
      await objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Object access error:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
