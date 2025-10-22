import { db } from "./db";
import { eq, and, desc, asc, ilike, inArray } from "drizzle-orm";
import {
  type User,
  type InsertUser,
  users,
  vehicles,
  vehicleColors,
  vehicleSpecifications,
  vehicleSmartFeatures,
  heroSlides,
  testimonials,
  stats,
  smartFeatures,
  environmentalImpacts,
  companyInfo,
  companyValues,
  teamMembers,
  pressArticles,
  jobOpenings,
  faqCategories,
  faqQuestions,
  dealers,
  jointVentures,
  strategicPartners,
  siteSettings,
  seoMetadata,
  formSubmissions,
  mediaLibrary,
  dynamicPages,
} from "@shared/schema";
import type {
  Vehicle,
  VehicleColor,
  VehicleSpecification,
  VehicleSmartFeature,
  HeroSlide,
  Testimonial,
  Stat,
  SmartFeature,
  EnvironmentalImpact,
  CompanyInfo,
  CompanyValue,
  TeamMember,
  PressArticle,
  JobOpening,
  FaqCategory,
  FaqQuestion,
  Dealer,
  JointVenture,
  StrategicPartner,
  SiteSetting,
  SeoMetadata,
  FormSubmission,
  MediaLibraryItem as MediaLibraryType,
} from "@shared/schema";

export interface IStorage {
  // ==================== USERS ====================
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  listUsers(): Promise<User[]>;

  // ==================== VEHICLES ====================
  getVehicle(id: number): Promise<Vehicle | undefined>;
  getVehicleBySlug(slug: string): Promise<Vehicle | undefined>;
  listVehicles(filters?: { category?: string; status?: string }): Promise<Vehicle[]>;
  createVehicle(vehicle: any): Promise<Vehicle>;
  updateVehicle(id: number, vehicle: any): Promise<Vehicle | undefined>;
  deleteVehicle(id: number): Promise<boolean>;

  // Vehicle Colors
  getVehicleColors(vehicleId: number): Promise<VehicleColor[]>;
  createVehicleColor(color: any): Promise<VehicleColor>;
  deleteVehicleColor(id: number): Promise<boolean>;

  // Vehicle Specifications
  getVehicleSpecifications(vehicleId: number): Promise<VehicleSpecification[]>;
  createVehicleSpecification(spec: any): Promise<VehicleSpecification>;
  deleteVehicleSpecification(id: number): Promise<boolean>;

  // Vehicle Smart Features
  getVehicleSmartFeatures(vehicleId: number): Promise<VehicleSmartFeature[]>;
  createVehicleSmartFeature(feature: any): Promise<VehicleSmartFeature>;
  deleteVehicleSmartFeature(id: number): Promise<boolean>;

  // ==================== HERO SLIDES ====================
  listHeroSlides(filters?: { isActive?: boolean }): Promise<HeroSlide[]>;
  getHeroSlide(id: number): Promise<HeroSlide | undefined>;
  createHeroSlide(slide: any): Promise<HeroSlide>;
  updateHeroSlide(id: number, slide: any): Promise<HeroSlide | undefined>;
  deleteHeroSlide(id: number): Promise<boolean>;

  // ==================== TESTIMONIALS ====================
  listTestimonials(filters?: { isActive?: boolean }): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: any): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: any): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;

  // ==================== STATS ====================
  listStats(): Promise<Stat[]>;
  getStat(id: number): Promise<Stat | undefined>;
  createStat(counter: any): Promise<Stat>;
  updateStat(id: number, counter: any): Promise<Stat | undefined>;
  deleteStat(id: number): Promise<boolean>;

  // ==================== SMART FEATURES ====================
  listSmartFeatures(): Promise<SmartFeature[]>;
  getSmartFeature(id: number): Promise<SmartFeature | undefined>;
  createSmartFeature(feature: any): Promise<SmartFeature>;
  updateSmartFeature(id: number, feature: any): Promise<SmartFeature | undefined>;
  deleteSmartFeature(id: number): Promise<boolean>;

  // ==================== ENVIRONMENTAL IMPACTS ====================
  listEnvironmentalImpacts(): Promise<EnvironmentalImpact[]>;
  getEnvironmentalImpact(id: number): Promise<EnvironmentalImpact | undefined>;
  createEnvironmentalImpact(impact: any): Promise<EnvironmentalImpact>;
  updateEnvironmentalImpact(id: number, impact: any): Promise<EnvironmentalImpact | undefined>;
  deleteEnvironmentalImpact(id: number): Promise<boolean>;

  // ==================== COMPANY INFO ====================
  getCompanyInfo(): Promise<CompanyInfo | undefined>;
  updateCompanyInfo(info: any): Promise<CompanyInfo | undefined>;
  
  listCompanyValues(): Promise<CompanyValue[]>;
  createCompanyValue(value: any): Promise<CompanyValue>;
  updateCompanyValue(id: number, value: any): Promise<CompanyValue | undefined>;
  deleteCompanyValue(id: number): Promise<boolean>;

  // ==================== TEAM MEMBERS ====================
  listTeamMembers(filters?: { department?: string }): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: any): Promise<TeamMember>;
  updateTeamMember(id: number, member: any): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;

  // ==================== PRESS ARTICLES ====================
  listPressArticles(filters?: { category?: string; status?: string }): Promise<PressArticle[]>;
  getPressArticle(id: number): Promise<PressArticle | undefined>;
  createPressArticle(article: any): Promise<PressArticle>;
  updatePressArticle(id: number, article: any): Promise<PressArticle | undefined>;
  deletePressArticle(id: number): Promise<boolean>;

  // ==================== JOB OPENINGS ====================
  listJobOpenings(filters?: { status?: string; department?: string }): Promise<JobOpening[]>;
  getJobOpening(id: number): Promise<JobOpening | undefined>;
  createJobOpening(job: any): Promise<JobOpening>;
  updateJobOpening(id: number, job: any): Promise<JobOpening | undefined>;
  deleteJobOpening(id: number): Promise<boolean>;

  // ==================== FAQ ====================
  listFaqCategories(): Promise<FaqCategory[]>;
  getFaqCategory(id: number): Promise<FaqCategory | undefined>;
  createFaqCategory(category: any): Promise<FaqCategory>;
  updateFaqCategory(id: number, category: any): Promise<FaqCategory | undefined>;
  deleteFaqCategory(id: number): Promise<boolean>;

  listFaqQuestions(categoryId?: number): Promise<FaqQuestion[]>;
  getFaqQuestion(id: number): Promise<FaqQuestion | undefined>;
  createFaqQuestion(question: any): Promise<FaqQuestion>;
  updateFaqQuestion(id: number, question: any): Promise<FaqQuestion | undefined>;
  deleteFaqQuestion(id: number): Promise<boolean>;

  // ==================== DEALERS ====================
  listDealers(filters?: { state?: string; district?: string; city?: string; displayOnWebsite?: boolean }): Promise<Dealer[]>;
  getDealer(id: number): Promise<Dealer | undefined>;
  createDealer(dealer: any): Promise<Dealer>;
  updateDealer(id: number, dealer: any): Promise<Dealer | undefined>;
  deleteDealer(id: number): Promise<boolean>;

  // ==================== JOINT VENTURES ====================
  listJointVentures(): Promise<JointVenture[]>;
  getJointVenture(id: number): Promise<JointVenture | undefined>;
  createJointVenture(venture: any): Promise<JointVenture>;
  updateJointVenture(id: number, venture: any): Promise<JointVenture | undefined>;
  deleteJointVenture(id: number): Promise<boolean>;

  listStrategicPartners(): Promise<StrategicPartner[]>;
  getStrategicPartner(id: number): Promise<StrategicPartner | undefined>;
  createStrategicPartner(partner: any): Promise<StrategicPartner>;
  updateStrategicPartner(id: number, partner: any): Promise<StrategicPartner | undefined>;
  deleteStrategicPartner(id: number): Promise<boolean>;

  // ==================== SITE SETTINGS ====================
  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  upsertSiteSetting(setting: any): Promise<SiteSetting>;

  // ==================== SEO METADATA ====================
  listSeoMetadata(): Promise<SeoMetadata[]>;
  getSeoMetadata(pagePath: string): Promise<SeoMetadata | undefined>;
  upsertSeoMetadata(metadata: any): Promise<SeoMetadata>;
  deleteSeoMetadata(id: number): Promise<boolean>;

  // ==================== FORM SUBMISSIONS ====================
  listFormSubmissions(filters?: { formType?: string; status?: string }): Promise<FormSubmission[]>;
  getFormSubmission(id: number): Promise<FormSubmission | undefined>;
  createFormSubmission(submission: any): Promise<FormSubmission>;
  updateFormSubmission(id: number, submission: any): Promise<FormSubmission | undefined>;
  deleteFormSubmission(id: number): Promise<boolean>;

  // ==================== MEDIA LIBRARY ====================
  listMediaLibrary(filters?: { fileType?: string; folder?: string }): Promise<MediaLibraryType[]>;
  getMediaLibraryItem(id: number): Promise<MediaLibraryType | undefined>;
  createMediaLibraryItem(item: any): Promise<MediaLibraryType>;
  updateMediaLibraryItem(id: number, item: any): Promise<MediaLibraryType | undefined>;
  deleteMediaLibraryItem(id: number): Promise<boolean>;

  // ==================== DYNAMIC PAGES ====================
  listDynamicPages(filters?: { status?: string; placement?: string }): Promise<any[]>;
  getDynamicPage(id: number): Promise<any | undefined>;
  getDynamicPageBySlug(slug: string): Promise<any | undefined>;
  createDynamicPage(page: any): Promise<any>;
  updateDynamicPage(id: number, page: any): Promise<any | undefined>;
  deleteDynamicPage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // ==================== USERS ====================
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUser(id: string, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(updateData).where(eq(users.id, id)).returning();
    return result[0];
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async listUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(users.createdAt);
  }

  // ==================== VEHICLES ====================
  async getVehicle(id: number): Promise<Vehicle | undefined> {
    const result = await db.select().from(vehicles).where(eq(vehicles.id, id));
    return result[0];
  }

  async getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
    const result = await db.select().from(vehicles).where(eq(vehicles.slug, slug));
    return result[0];
  }

  async listVehicles(filters?: { category?: string; status?: string }): Promise<Vehicle[]> {
    let query = db.select().from(vehicles);
    
    const conditions = [];
    if (filters?.category) conditions.push(eq(vehicles.category, filters.category));
    if (filters?.status) conditions.push(eq(vehicles.status, filters.status));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(vehicles.displayOrder, vehicles.name);
  }

  async createVehicle(vehicleData: any): Promise<Vehicle> {
    const result = await db.insert(vehicles).values(vehicleData).returning();
    return result[0];
  }

  async updateVehicle(id: number, vehicleData: any): Promise<Vehicle | undefined> {
    const result = await db.update(vehicles).set(vehicleData).where(eq(vehicles.id, id)).returning();
    return result[0];
  }

  async deleteVehicle(id: number): Promise<boolean> {
    const result = await db.delete(vehicles).where(eq(vehicles.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Vehicle Colors
  async getVehicleColors(vehicleId: number): Promise<VehicleColor[]> {
    return await db.select().from(vehicleColors).where(eq(vehicleColors.vehicleId, vehicleId)).orderBy(vehicleColors.displayOrder);
  }

  async createVehicleColor(colorData: any): Promise<VehicleColor> {
    const result = await db.insert(vehicleColors).values(colorData).returning();
    return result[0];
  }

  async deleteVehicleColor(id: number): Promise<boolean> {
    const result = await db.delete(vehicleColors).where(eq(vehicleColors.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Vehicle Specifications
  async getVehicleSpecifications(vehicleId: number): Promise<VehicleSpecification[]> {
    return await db.select().from(vehicleSpecifications).where(eq(vehicleSpecifications.vehicleId, vehicleId)).orderBy(vehicleSpecifications.displayOrder);
  }

  async createVehicleSpecification(specData: any): Promise<VehicleSpecification> {
    const result = await db.insert(vehicleSpecifications).values(specData).returning();
    return result[0];
  }

  async deleteVehicleSpecification(id: number): Promise<boolean> {
    const result = await db.delete(vehicleSpecifications).where(eq(vehicleSpecifications.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Vehicle Smart Features
  async getVehicleSmartFeatures(vehicleId: number): Promise<VehicleSmartFeature[]> {
    return await db.select().from(vehicleSmartFeatures).where(eq(vehicleSmartFeatures.vehicleId, vehicleId)).orderBy(vehicleSmartFeatures.displayOrder);
  }

  async createVehicleSmartFeature(featureData: any): Promise<VehicleSmartFeature> {
    const result = await db.insert(vehicleSmartFeatures).values(featureData).returning();
    return result[0];
  }

  async deleteVehicleSmartFeature(id: number): Promise<boolean> {
    const result = await db.delete(vehicleSmartFeatures).where(eq(vehicleSmartFeatures.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== HERO SLIDES ====================
  async listHeroSlides(filters?: { isActive?: boolean }): Promise<HeroSlide[]> {
    let query = db.select().from(heroSlides);
    
    if (filters?.isActive !== undefined) {
      query = query.where(eq(heroSlides.isActive, filters.isActive)) as any;
    }
    
    return await query.orderBy(heroSlides.displayOrder);
  }

  async getHeroSlide(id: number): Promise<HeroSlide | undefined> {
    const result = await db.select().from(heroSlides).where(eq(heroSlides.id, id));
    return result[0];
  }

  async createHeroSlide(slideData: any): Promise<HeroSlide> {
    const result = await db.insert(heroSlides).values(slideData).returning();
    return result[0];
  }

  async updateHeroSlide(id: number, slideData: any): Promise<HeroSlide | undefined> {
    const result = await db.update(heroSlides).set(slideData).where(eq(heroSlides.id, id)).returning();
    return result[0];
  }

  async deleteHeroSlide(id: number): Promise<boolean> {
    const result = await db.delete(heroSlides).where(eq(heroSlides.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== TESTIMONIALS ====================
  async listTestimonials(filters?: { isActive?: boolean }): Promise<Testimonial[]> {
    let query = db.select().from(testimonials);
    
    if (filters?.isActive !== undefined) {
      query = query.where(eq(testimonials.isActive, filters.isActive)) as any;
    }
    
    return await query.orderBy(testimonials.displayOrder);
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const result = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return result[0];
  }

  async createTestimonial(testimonialData: any): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(testimonialData).returning();
    return result[0];
  }

  async updateTestimonial(id: number, testimonialData: any): Promise<Testimonial | undefined> {
    const result = await db.update(testimonials).set(testimonialData).where(eq(testimonials.id, id)).returning();
    return result[0];
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== STATS ====================
  async listStats(): Promise<Stat[]> {
    return await db.select().from(stats).orderBy(stats.displayOrder);
  }

  async getStat(id: number): Promise<Stat | undefined> {
    const result = await db.select().from(stats).where(eq(stats.id, id));
    return result[0];
  }

  async createStat(counterData: any): Promise<Stat> {
    const result = await db.insert(stats).values(counterData).returning();
    return result[0];
  }

  async updateStat(id: number, counterData: any): Promise<Stat | undefined> {
    const result = await db.update(stats).set(counterData).where(eq(stats.id, id)).returning();
    return result[0];
  }

  async deleteStat(id: number): Promise<boolean> {
    const result = await db.delete(stats).where(eq(stats.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== SMART FEATURES ====================
  async listSmartFeatures(): Promise<SmartFeature[]> {
    return await db.select().from(smartFeatures).orderBy(smartFeatures.displayOrder);
  }

  async getSmartFeature(id: number): Promise<SmartFeature | undefined> {
    const result = await db.select().from(smartFeatures).where(eq(smartFeatures.id, id));
    return result[0];
  }

  async createSmartFeature(featureData: any): Promise<SmartFeature> {
    const result = await db.insert(smartFeatures).values(featureData).returning();
    return result[0];
  }

  async updateSmartFeature(id: number, featureData: any): Promise<SmartFeature | undefined> {
    const result = await db.update(smartFeatures).set(featureData).where(eq(smartFeatures.id, id)).returning();
    return result[0];
  }

  async deleteSmartFeature(id: number): Promise<boolean> {
    const result = await db.delete(smartFeatures).where(eq(smartFeatures.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== ENVIRONMENTAL IMPACTS ====================
  async listEnvironmentalImpacts(): Promise<EnvironmentalImpact[]> {
    return await db.select().from(environmentalImpacts).orderBy(environmentalImpacts.displayOrder);
  }

  async getEnvironmentalImpact(id: number): Promise<EnvironmentalImpact | undefined> {
    const result = await db.select().from(environmentalImpacts).where(eq(environmentalImpacts.id, id));
    return result[0];
  }

  async createEnvironmentalImpact(impactData: any): Promise<EnvironmentalImpact> {
    const result = await db.insert(environmentalImpacts).values(impactData).returning();
    return result[0];
  }

  async updateEnvironmentalImpact(id: number, impactData: any): Promise<EnvironmentalImpact | undefined> {
    const result = await db.update(environmentalImpacts).set(impactData).where(eq(environmentalImpacts.id, id)).returning();
    return result[0];
  }

  async deleteEnvironmentalImpact(id: number): Promise<boolean> {
    const result = await db.delete(environmentalImpacts).where(eq(environmentalImpacts.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== COMPANY INFO ====================
  async getCompanyInfo(): Promise<CompanyInfo | undefined> {
    const result = await db.select().from(companyInfo).limit(1);
    return result[0];
  }

  async updateCompanyInfo(infoData: any): Promise<CompanyInfo | undefined> {
    const existing = await this.getCompanyInfo();
    if (existing) {
      const result = await db.update(companyInfo).set(infoData).where(eq(companyInfo.id, existing.id)).returning();
      return result[0];
    }
    const result = await db.insert(companyInfo).values(infoData).returning();
    return result[0];
  }

  async listCompanyValues(): Promise<CompanyValue[]> {
    return await db.select().from(companyValues).orderBy(companyValues.displayOrder);
  }

  async createCompanyValue(valueData: any): Promise<CompanyValue> {
    const result = await db.insert(companyValues).values(valueData).returning();
    return result[0];
  }

  async updateCompanyValue(id: number, valueData: any): Promise<CompanyValue | undefined> {
    const result = await db.update(companyValues).set(valueData).where(eq(companyValues.id, id)).returning();
    return result[0];
  }

  async deleteCompanyValue(id: number): Promise<boolean> {
    const result = await db.delete(companyValues).where(eq(companyValues.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== TEAM MEMBERS ====================
  async listTeamMembers(filters?: { department?: string }): Promise<TeamMember[]> {
    let query = db.select().from(teamMembers);
    
    if (filters?.department) {
      query = query.where(eq(teamMembers.department, filters.department)) as any;
    }
    
    return await query.orderBy(teamMembers.displayOrder);
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    const result = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return result[0];
  }

  async createTeamMember(memberData: any): Promise<TeamMember> {
    const result = await db.insert(teamMembers).values(memberData).returning();
    return result[0];
  }

  async updateTeamMember(id: number, memberData: any): Promise<TeamMember | undefined> {
    const result = await db.update(teamMembers).set(memberData).where(eq(teamMembers.id, id)).returning();
    return result[0];
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    const result = await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== PRESS ARTICLES ====================
  async listPressArticles(filters?: { category?: string; status?: string }): Promise<PressArticle[]> {
    let query = db.select().from(pressArticles);
    
    const conditions = [];
    if (filters?.category) conditions.push(eq(pressArticles.category, filters.category));
    if (filters?.status) conditions.push(eq(pressArticles.status, filters.status));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(desc(pressArticles.publicationDate));
  }

  async getPressArticle(id: number): Promise<PressArticle | undefined> {
    const result = await db.select().from(pressArticles).where(eq(pressArticles.id, id));
    return result[0];
  }

  async createPressArticle(articleData: any): Promise<PressArticle> {
    const result = await db.insert(pressArticles).values(articleData).returning();
    return result[0];
  }

  async updatePressArticle(id: number, articleData: any): Promise<PressArticle | undefined> {
    const result = await db.update(pressArticles).set(articleData).where(eq(pressArticles.id, id)).returning();
    return result[0];
  }

  async deletePressArticle(id: number): Promise<boolean> {
    const result = await db.delete(pressArticles).where(eq(pressArticles.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== JOB OPENINGS ====================
  async listJobOpenings(filters?: { status?: string; department?: string }): Promise<JobOpening[]> {
    let query = db.select().from(jobOpenings);
    
    const conditions = [];
    if (filters?.status) conditions.push(eq(jobOpenings.status, filters.status));
    if (filters?.department) conditions.push(eq(jobOpenings.department, filters.department));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(desc(jobOpenings.postedDate));
  }

  async getJobOpening(id: number): Promise<JobOpening | undefined> {
    const result = await db.select().from(jobOpenings).where(eq(jobOpenings.id, id));
    return result[0];
  }

  async createJobOpening(jobData: any): Promise<JobOpening> {
    const result = await db.insert(jobOpenings).values(jobData).returning();
    return result[0];
  }

  async updateJobOpening(id: number, jobData: any): Promise<JobOpening | undefined> {
    const result = await db.update(jobOpenings).set(jobData).where(eq(jobOpenings.id, id)).returning();
    return result[0];
  }

  async deleteJobOpening(id: number): Promise<boolean> {
    const result = await db.delete(jobOpenings).where(eq(jobOpenings.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== FAQ ====================
  async listFaqCategories(): Promise<FaqCategory[]> {
    return await db.select().from(faqCategories).orderBy(faqCategories.displayOrder);
  }

  async getFaqCategory(id: number): Promise<FaqCategory | undefined> {
    const result = await db.select().from(faqCategories).where(eq(faqCategories.id, id));
    return result[0];
  }

  async createFaqCategory(categoryData: any): Promise<FaqCategory> {
    const result = await db.insert(faqCategories).values(categoryData).returning();
    return result[0];
  }

  async updateFaqCategory(id: number, categoryData: any): Promise<FaqCategory | undefined> {
    const result = await db.update(faqCategories).set(categoryData).where(eq(faqCategories.id, id)).returning();
    return result[0];
  }

  async deleteFaqCategory(id: number): Promise<boolean> {
    const result = await db.delete(faqCategories).where(eq(faqCategories.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async listFaqQuestions(categoryId?: number): Promise<FaqQuestion[]> {
    let query = db.select().from(faqQuestions);
    
    if (categoryId) {
      query = query.where(eq(faqQuestions.categoryId, categoryId)) as any;
    }
    
    return await query.orderBy(faqQuestions.displayOrder);
  }

  async getFaqQuestion(id: number): Promise<FaqQuestion | undefined> {
    const result = await db.select().from(faqQuestions).where(eq(faqQuestions.id, id));
    return result[0];
  }

  async createFaqQuestion(questionData: any): Promise<FaqQuestion> {
    const result = await db.insert(faqQuestions).values(questionData).returning();
    return result[0];
  }

  async updateFaqQuestion(id: number, questionData: any): Promise<FaqQuestion | undefined> {
    const result = await db.update(faqQuestions).set(questionData).where(eq(faqQuestions.id, id)).returning();
    return result[0];
  }

  async deleteFaqQuestion(id: number): Promise<boolean> {
    const result = await db.delete(faqQuestions).where(eq(faqQuestions.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== DEALERS ====================
  async listDealers(filters?: { state?: string; district?: string; city?: string; displayOnWebsite?: boolean }): Promise<Dealer[]> {
    let query = db.select().from(dealers);
    
    const conditions = [];
    if (filters?.displayOnWebsite !== undefined) conditions.push(eq(dealers.displayOnWebsite, filters.displayOnWebsite));
    if (filters?.state) conditions.push(eq(dealers.state, filters.state));
    if (filters?.district) conditions.push(eq(dealers.district, filters.district));
    if (filters?.city) conditions.push(eq(dealers.city, filters.city));
    
    if (conditions.length > 0) {
      return await query.where(and(...conditions)).orderBy(dealers.state, dealers.district, dealers.city);
    }
    
    return await query.orderBy(dealers.state, dealers.district, dealers.city);
  }

  async getDealer(id: number): Promise<Dealer | undefined> {
    const result = await db.select().from(dealers).where(eq(dealers.id, id));
    return result[0];
  }

  async createDealer(dealerData: any): Promise<Dealer> {
    const result = await db.insert(dealers).values(dealerData).returning();
    return result[0];
  }

  async updateDealer(id: number, dealerData: any): Promise<Dealer | undefined> {
    const result = await db.update(dealers).set(dealerData).where(eq(dealers.id, id)).returning();
    return result[0];
  }

  async deleteDealer(id: number): Promise<boolean> {
    const result = await db.delete(dealers).where(eq(dealers.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== JOINT VENTURES ====================
  async listJointVentures(): Promise<JointVenture[]> {
    return await db.select().from(jointVentures).orderBy(jointVentures.displayOrder);
  }

  async getJointVenture(id: number): Promise<JointVenture | undefined> {
    const result = await db.select().from(jointVentures).where(eq(jointVentures.id, id));
    return result[0];
  }

  async createJointVenture(ventureData: any): Promise<JointVenture> {
    const result = await db.insert(jointVentures).values(ventureData).returning();
    return result[0];
  }

  async updateJointVenture(id: number, ventureData: any): Promise<JointVenture | undefined> {
    const result = await db.update(jointVentures).set(ventureData).where(eq(jointVentures.id, id)).returning();
    return result[0];
  }

  async deleteJointVenture(id: number): Promise<boolean> {
    const result = await db.delete(jointVentures).where(eq(jointVentures.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async listStrategicPartners(): Promise<StrategicPartner[]> {
    return await db.select().from(strategicPartners).orderBy(strategicPartners.displayOrder);
  }

  async getStrategicPartner(id: number): Promise<StrategicPartner | undefined> {
    const result = await db.select().from(strategicPartners).where(eq(strategicPartners.id, id));
    return result[0];
  }

  async createStrategicPartner(partnerData: any): Promise<StrategicPartner> {
    const result = await db.insert(strategicPartners).values(partnerData).returning();
    return result[0];
  }

  async updateStrategicPartner(id: number, partnerData: any): Promise<StrategicPartner | undefined> {
    const result = await db.update(strategicPartners).set(partnerData).where(eq(strategicPartners.id, id)).returning();
    return result[0];
  }

  async deleteStrategicPartner(id: number): Promise<boolean> {
    const result = await db.delete(strategicPartners).where(eq(strategicPartners.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== SITE SETTINGS ====================
  async getSiteSettings(): Promise<SiteSetting[]> {
    return await db.select().from(siteSettings);
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const result = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return result[0];
  }

  async upsertSiteSetting(settingData: any): Promise<SiteSetting> {
    const existing = await this.getSiteSetting(settingData.key);
    if (existing) {
      const result = await db.update(siteSettings).set(settingData).where(eq(siteSettings.key, settingData.key)).returning();
      return result[0];
    }
    const result = await db.insert(siteSettings).values(settingData).returning();
    return result[0];
  }

  // ==================== SEO METADATA ====================
  async listSeoMetadata(): Promise<SeoMetadata[]> {
    return await db.select().from(seoMetadata);
  }

  async getSeoMetadata(pagePath: string): Promise<SeoMetadata | undefined> {
    const result = await db.select().from(seoMetadata).where(eq(seoMetadata.pagePath, pagePath));
    return result[0];
  }

  async upsertSeoMetadata(metadataData: any): Promise<SeoMetadata> {
    const existing = await this.getSeoMetadata(metadataData.pagePath);
    if (existing) {
      const result = await db.update(seoMetadata).set(metadataData).where(eq(seoMetadata.id, existing.id)).returning();
      return result[0];
    }
    const result = await db.insert(seoMetadata).values(metadataData).returning();
    return result[0];
  }

  async deleteSeoMetadata(id: number): Promise<boolean> {
    const result = await db.delete(seoMetadata).where(eq(seoMetadata.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== FORM SUBMISSIONS ====================
  async listFormSubmissions(filters?: { formType?: string; status?: string }): Promise<FormSubmission[]> {
    let query = db.select().from(formSubmissions);
    
    const conditions = [];
    if (filters?.formType) conditions.push(eq(formSubmissions.formType, filters.formType));
    if (filters?.status) conditions.push(eq(formSubmissions.status, filters.status));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(desc(formSubmissions.submittedAt));
  }

  async getFormSubmission(id: number): Promise<FormSubmission | undefined> {
    const result = await db.select().from(formSubmissions).where(eq(formSubmissions.id, id));
    return result[0];
  }

  async createFormSubmission(submissionData: any): Promise<FormSubmission> {
    const result = await db.insert(formSubmissions).values(submissionData).returning();
    return result[0];
  }

  async updateFormSubmission(id: number, submissionData: any): Promise<FormSubmission | undefined> {
    const result = await db.update(formSubmissions).set(submissionData).where(eq(formSubmissions.id, id)).returning();
    return result[0];
  }

  async deleteFormSubmission(id: number): Promise<boolean> {
    const result = await db.delete(formSubmissions).where(eq(formSubmissions.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== MEDIA LIBRARY ====================
  async listMediaLibrary(filters?: { fileType?: string; folder?: string }): Promise<MediaLibraryType[]> {
    let query = db.select().from(mediaLibrary);
    
    const conditions = [];
    if (filters?.fileType) conditions.push(eq(mediaLibrary.fileType, filters.fileType));
    if (filters?.folder) conditions.push(eq(mediaLibrary.folder, filters.folder));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(desc(mediaLibrary.uploadedAt));
  }

  async getMediaLibraryItem(id: number): Promise<MediaLibraryType | undefined> {
    const result = await db.select().from(mediaLibrary).where(eq(mediaLibrary.id, id));
    return result[0];
  }

  async createMediaLibraryItem(itemData: any): Promise<MediaLibraryType> {
    const result = await db.insert(mediaLibrary).values(itemData).returning();
    return result[0];
  }

  async updateMediaLibraryItem(id: number, itemData: any): Promise<MediaLibraryType | undefined> {
    const result = await db.update(mediaLibrary).set(itemData).where(eq(mediaLibrary.id, id)).returning();
    return result[0];
  }

  async deleteMediaLibraryItem(id: number): Promise<boolean> {
    const result = await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==================== DYNAMIC PAGES ====================
  async listDynamicPages(filters?: { status?: string; placement?: string }): Promise<any[]> {
    let query = db.select().from(dynamicPages);
    
    const conditions = [];
    if (filters?.status) conditions.push(eq(dynamicPages.status, filters.status));
    if (filters?.placement) conditions.push(eq(dynamicPages.placement, filters.placement));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(asc(dynamicPages.displayOrder), asc(dynamicPages.title));
  }

  async getDynamicPage(id: number): Promise<any | undefined> {
    const result = await db.select().from(dynamicPages).where(eq(dynamicPages.id, id));
    return result[0];
  }

  async getDynamicPageBySlug(slug: string): Promise<any | undefined> {
    const result = await db.select().from(dynamicPages).where(eq(dynamicPages.slug, slug));
    return result[0];
  }

  async createDynamicPage(pageData: any): Promise<any> {
    const result = await db.insert(dynamicPages).values(pageData).returning();
    return result[0];
  }

  async updateDynamicPage(id: number, pageData: any): Promise<any | undefined> {
    const updateData = { ...pageData };
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.createdBy;
    
    updateData.updatedAt = new Date();
    
    const result = await db.update(dynamicPages).set(updateData).where(eq(dynamicPages.id, id)).returning();
    return result[0];
  }

  async deleteDynamicPage(id: number): Promise<boolean> {
    const result = await db.delete(dynamicPages).where(eq(dynamicPages.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export const storage = new DatabaseStorage();
