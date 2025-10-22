import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ==================== ADMIN USERS & AUTH ====================

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  role: text("role").notNull().default("content_manager"), // super_admin, content_manager, dealer_manager, hr_manager, marketing_manager
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ==================== VEHICLES ====================

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // electric_scooters, electric_motorcycles, cargo_commercial
  mainImage: text("main_image"),
  frontImage: text("front_image"),
  status: text("status").notNull().default("active"), // active, inactive, coming_soon
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
  createdBy: varchar("created_by").references(() => users.id),
  updatedBy: varchar("updated_by").references(() => users.id),
});

export const vehicleColors = pgTable("vehicle_colors", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").notNull().references(() => vehicles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  image: text("image"),
  displayOrder: integer("display_order").default(0),
});

export const vehicleSpecifications = pgTable("vehicle_specifications", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").notNull().references(() => vehicles.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  value: text("value").notNull(),
  displayOrder: integer("display_order").default(0),
});

export const vehicleSmartFeatures = pgTable("vehicle_smart_features", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").notNull().references(() => vehicles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon"),
  displayOrder: integer("display_order").default(0),
});

// Relations
export const vehiclesRelations = relations(vehicles, ({ many }) => ({
  colors: many(vehicleColors),
  specifications: many(vehicleSpecifications),
  smartFeatures: many(vehicleSmartFeatures),
}));

export const vehicleColorsRelations = relations(vehicleColors, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [vehicleColors.vehicleId],
    references: [vehicles.id],
  }),
}));

export const vehicleSpecificationsRelations = relations(vehicleSpecifications, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [vehicleSpecifications.vehicleId],
    references: [vehicles.id],
  }),
}));

export const vehicleSmartFeaturesRelations = relations(vehicleSmartFeatures, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [vehicleSmartFeatures.vehicleId],
    references: [vehicles.id],
  }),
}));

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVehicleColorSchema = createInsertSchema(vehicleColors).omit({ id: true });
export const insertVehicleSpecificationSchema = createInsertSchema(vehicleSpecifications).omit({ id: true });
export const insertVehicleSmartFeatureSchema = createInsertSchema(vehicleSmartFeatures).omit({ id: true });

export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type VehicleColor = typeof vehicleColors.$inferSelect;
export type VehicleSpecification = typeof vehicleSpecifications.$inferSelect;
export type VehicleSmartFeature = typeof vehicleSmartFeatures.$inferSelect;

// ==================== HOME PAGE CONTENT ====================

export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // image, video
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  image: text("image"),
  videoUrl: text("video_url"),
  ctaText: text("cta_text"),
  ctaLink: text("cta_link"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  autoRotateTiming: integer("auto_rotate_timing").default(5000), // milliseconds
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  value: text("value").notNull(),
  label: text("label").notNull(),
  icon: text("icon").notNull(),
  displayOrder: integer("display_order").default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const smartFeatures = pgTable("smart_features", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  displayOrder: integer("display_order").default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  customerName: text("customer_name").notNull(),
  location: text("location").notNull(),
  image: text("image"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const environmentalImpacts = pgTable("environmental_impacts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  displayOrder: integer("display_order").default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const insertHeroSlideSchema = createInsertSchema(heroSlides).omit({ id: true, createdAt: true, updatedAt: true });
export const insertStatSchema = createInsertSchema(stats).omit({ id: true, updatedAt: true });
export const insertSmartFeatureSchema = createInsertSchema(smartFeatures).omit({ id: true, updatedAt: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true, createdAt: true, updatedAt: true });
export const insertEnvironmentalImpactSchema = createInsertSchema(environmentalImpacts).omit({ id: true, updatedAt: true });

export type HeroSlide = typeof heroSlides.$inferSelect;
export type Stat = typeof stats.$inferSelect;
export type SmartFeature = typeof smartFeatures.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type EnvironmentalImpact = typeof environmentalImpacts.$inferSelect;

// ==================== ABOUT US & TEAM ====================

export const companyInfo = pgTable("company_info", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull(),
  tagline: text("tagline").notNull(),
  missionStatement: text("mission_statement").notNull(),
  visionStatement: text("vision_statement"),
  overview: text("overview").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
  updatedBy: varchar("updated_by").references(() => users.id),
});

export const companyValues = pgTable("company_values", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  displayOrder: integer("display_order").default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  tier: text("tier").notNull(), // ceo, executive, advisor, manager, team_member
  department: text("department"),
  image: text("image"),
  bio: text("bio").notNull(),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const insertCompanyInfoSchema = createInsertSchema(companyInfo).omit({ id: true, updatedAt: true });
export const insertCompanyValueSchema = createInsertSchema(companyValues).omit({ id: true, updatedAt: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true, createdAt: true, updatedAt: true });

export type CompanyInfo = typeof companyInfo.$inferSelect;
export type CompanyValue = typeof companyValues.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;

// ==================== PRESS & MEDIA ====================

export const pressArticles = pgTable("press_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  publication: text("publication").notNull(),
  publicationDate: text("publication_date").notNull(),
  excerpt: text("excerpt").notNull(),
  image: text("image"),
  category: text("category").notNull(), // Product Launch, Business, Awards, Sustainability, Partnership, Service
  fullContent: text("full_content"),
  externalLink: text("external_link"),
  status: text("status").notNull().default("published"), // published, draft
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
  createdBy: varchar("created_by").references(() => users.id),
});

export const insertPressArticleSchema = createInsertSchema(pressArticles).omit({ id: true, createdAt: true, updatedAt: true });
export type PressArticle = typeof pressArticles.$inferSelect;

// ==================== CAREERS ====================

export const jobOpenings = pgTable("job_openings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(), // Full-time, Part-time, Contract, Remote
  experience: text("experience").notNull(),
  description: text("description").notNull(),
  qualifications: text("qualifications"),
  responsibilities: text("responsibilities"),
  status: text("status").notNull().default("active"), // active, closed, draft
  postedDate: timestamp("posted_date").notNull().defaultNow(),
  applicationDeadline: timestamp("application_deadline"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
  createdBy: varchar("created_by").references(() => users.id),
});

export const insertJobOpeningSchema = createInsertSchema(jobOpenings).omit({ id: true, createdAt: true, updatedAt: true });
export type JobOpening = typeof jobOpenings.$inferSelect;

// ==================== FAQ ====================

export const faqCategories = pgTable("faq_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  displayOrder: integer("display_order").default(0),
});

export const faqQuestions = pgTable("faq_questions", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull().references(() => faqCategories.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  displayOrder: integer("display_order").default(0),
  status: text("status").notNull().default("published"), // published, draft
  tags: text("tags").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const faqCategoriesRelations = relations(faqCategories, ({ many }) => ({
  questions: many(faqQuestions),
}));

export const faqQuestionsRelations = relations(faqQuestions, ({ one }) => ({
  category: one(faqCategories, {
    fields: [faqQuestions.categoryId],
    references: [faqCategories.id],
  }),
}));

export const insertFaqCategorySchema = createInsertSchema(faqCategories).omit({ id: true });
export const insertFaqQuestionSchema = createInsertSchema(faqQuestions).omit({ id: true, createdAt: true, updatedAt: true });

export type FaqCategory = typeof faqCategories.$inferSelect;
export type FaqQuestion = typeof faqQuestions.$inferSelect;

// ==================== DEALERS ====================

export const dealers = pgTable("dealers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  hours: text("hours").notNull(),
  state: text("state").notNull(),
  district: text("district").notNull(),
  city: text("city").notNull(),
  status: text("status").notNull().default("active"), // active, inactive
  displayOnWebsite: boolean("display_on_website").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
  createdBy: varchar("created_by").references(() => users.id),
});

export const insertDealerSchema = createInsertSchema(dealers).omit({ id: true, createdAt: true, updatedAt: true });
export type Dealer = typeof dealers.$inferSelect;

// ==================== JOINT VENTURES ====================

export const jointVentures = pgTable("joint_ventures", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  description: text("description").notNull(),
  status: text("status").notNull().default("active"), // active, past
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const strategicPartners = pgTable("strategic_partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  description: text("description"),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const insertJointVentureSchema = createInsertSchema(jointVentures).omit({ id: true, createdAt: true, updatedAt: true });
export const insertStrategicPartnerSchema = createInsertSchema(strategicPartners).omit({ id: true, createdAt: true, updatedAt: true });

export type JointVenture = typeof jointVentures.$inferSelect;
export type StrategicPartner = typeof strategicPartners.$inferSelect;

// ==================== SEO METADATA ====================

export const seoMetadata = pgTable("seo_metadata", {
  id: serial("id").primaryKey(),
  pagePath: text("page_path").notNull().unique(), // /, /about, /vehicle/:slug, etc.
  pageTitle: text("page_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  metaKeywords: text("meta_keywords"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  twitterCard: text("twitter_card"),
  canonicalUrl: text("canonical_url"),
  robotsMeta: text("robots_meta").default("index,follow"),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
  updatedBy: varchar("updated_by").references(() => users.id),
});

export const insertSeoMetadataSchema = createInsertSchema(seoMetadata).omit({ id: true, updatedAt: true });
export type SeoMetadata = typeof seoMetadata.$inferSelect;

// ==================== SITE SETTINGS ====================

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  category: text("category").notNull(), // general, contact, social, analytics, navigation
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
  updatedBy: varchar("updated_by").references(() => users.id),
});

export const insertSiteSettingSchema = createInsertSchema(siteSettings).omit({ id: true, updatedAt: true });
export type SiteSetting = typeof siteSettings.$inferSelect;

// ==================== FORM SUBMISSIONS ====================

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  formType: text("form_type").notNull(), // enquiry, job_application, partnership
  data: jsonb("data").notNull(),
  status: text("status").notNull().default("unread"), // unread, read, archived
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  respondedAt: timestamp("responded_at"),
  respondedBy: varchar("responded_by").references(() => users.id),
  notes: text("notes"),
});

export const insertFormSubmissionSchema = createInsertSchema(formSubmissions).omit({ id: true, submittedAt: true });
export type FormSubmission = typeof formSubmissions.$inferSelect;

// ==================== MEDIA LIBRARY ====================

export const mediaLibrary = pgTable("media_library", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalFilename: text("original_filename").notNull(),
  filePath: text("file_path").notNull(),
  fileType: text("file_type").notNull(), // image, video, document
  mimeType: text("mime_type").notNull(),
  fileSize: integer("file_size").notNull(), // in bytes
  width: integer("width"),
  height: integer("height"),
  altText: text("alt_text"),
  caption: text("caption"),
  folder: text("folder").default("uncategorized"),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
});

export const insertMediaLibrarySchema = createInsertSchema(mediaLibrary).omit({ id: true, uploadedAt: true });
export type MediaLibraryItem = typeof mediaLibrary.$inferSelect;

// ==================== DYNAMIC PAGES ====================

export const dynamicPages = pgTable("dynamic_pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  layout: text("layout").notNull().default("one_column"), // one_column, two_column, hero_with_content, full_width
  placement: text("placement").notNull().default("none"), // header, footer, both, none
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  keywords: text("keywords"),
  status: text("status").notNull().default("draft"), // published, draft
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`now()`),
  createdBy: varchar("created_by").references(() => users.id),
  updatedBy: varchar("updated_by").references(() => users.id),
});

export const insertDynamicPageSchema = createInsertSchema(dynamicPages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type DynamicPage = typeof dynamicPages.$inferSelect;
export type InsertDynamicPage = z.infer<typeof insertDynamicPageSchema>;
