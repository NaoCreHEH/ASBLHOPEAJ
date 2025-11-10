import mysql from "mysql2/promise";
import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { users, services, projects, teamMembers, contactMessages, testimonials, gallery, newsletter, resources, donations, events, eventRegistrations, InsertContactMessage, InsertTestimonial, InsertService, InsertProject, InsertTeamMember, InsertGalleryImage, InsertNewsletterSubscriber, InsertResource, InsertDonation, InsertEvent, InsertEventRegistration } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
console.log("[DB.ts] Loaded version with SSL + SNI");

export async function getDb() {
   if (_db) return _db;
  
      const host = 'gateway01.eu-central-1.prod.aws.tidbcloud.com';
      const user = '4CFZ3EFkSeaS5y8.root';
      const password = '34wOLlql3l6pl3b4';
      const database = 'HOPE';

      const pool = await mysql.createPool({
        host,
        port: 4000,                // TiDB Serverless
        user,
        password,
        database,
        ssl: {
          minVersion: "TLSv1.2",
          rejectUnauthorized: true,
          servername: host,        // important pour SNI
        },
        waitForConnections: true,
        connectionLimit: 10,
      });
  try {
    // ping + vérifie que c'est bien chiffré
    const [rows] = await pool.query("SELECT @@ssl_cipher AS cipher, @@version_comment AS vc;");
    console.log("[DB] Ping OK:", rows);
  } catch (e: any) {
    console.error("[DB] Ping FAILED:", e?.code, e?.errno, e?.sqlMessage || e?.message);
    throw e; // laisse le serveur échouer pour voir l'erreur exacte dans les logs
  }

  _db = drizzle(pool);
  console.log("[DB] Drizzle ready (TLS)");
  return _db;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Services
export async function getAllServices() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(services).orderBy(services.displayOrder);
}

export async function getActiveServices() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(services).where(eq(services.isActive, true)).orderBy(services.displayOrder);
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createService(service: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(services).values(service);
  return result;
}

export async function updateService(id: number, service: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(services).set(service).where(eq(services.id, id));
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(services).where(eq(services.id, id));
}

// Projects
export async function getAllProjects() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(projects).orderBy(projects.displayOrder);
}

export async function getActiveProjects() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(projects).where(eq(projects.isActive, true)).orderBy(projects.displayOrder);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProject(project: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(projects).values(project);
  return result;
}

export async function updateProject(id: number, project: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(projects).set(project).where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(projects).where(eq(projects.id, id));
}

// Team Members
export async function getAllTeamMembers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(teamMembers).orderBy(teamMembers.displayOrder);
}

export async function getActiveTeamMembers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(teamMembers).where(eq(teamMembers.isActive, true)).orderBy(teamMembers.displayOrder);
}

export async function getTeamMemberById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(teamMembers).where(eq(teamMembers.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createTeamMember(member: InsertTeamMember) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(teamMembers).values(member);
  return result;
}

export async function updateTeamMember(id: number, member: Partial<InsertTeamMember>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(teamMembers).set(member).where(eq(teamMembers.id, id));
}

export async function deleteTeamMember(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(teamMembers).where(eq(teamMembers.id, id));
}

// Contact Messages
export async function getAllContactMessages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
}

export async function getContactMessageById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createContactMessage(message: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(contactMessages).values(message);
  return result;
}

export async function markMessageAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, id));
}

export async function deleteContactMessage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
}

// Testimonials
export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).orderBy(testimonials.createdAt);
}

export async function getApprovedTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).where(eq(testimonials.status, "approved")).orderBy(testimonials.createdAt);
}

export async function getPendingTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).where(eq(testimonials.status, "pending")).orderBy(testimonials.createdAt);
}

export async function createTestimonial(data: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(testimonials).values(data);
}

export async function updateTestimonialStatus(id: number, status: "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(testimonials).set({ status }).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(testimonials).where(eq(testimonials.id, id));
}

// Gallery
export async function getAllGalleryImages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(gallery).where(eq(gallery.isActive, 1)).orderBy(gallery.displayOrder, gallery.createdAt);
}

export async function getGalleryImagesByProject(projectId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(gallery).where(and(eq(gallery.projectId, projectId), eq(gallery.isActive, 1))).orderBy(gallery.displayOrder);
}

export async function createGalleryImage(data: InsertGalleryImage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(gallery).values(data);
}

export async function updateGalleryImage(id: number, data: Partial<InsertGalleryImage>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(gallery).set(data).where(eq(gallery.id, id));
}

export async function deleteGalleryImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(gallery).where(eq(gallery.id, id));
}

// Newsletter
export async function getAllNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(newsletter).orderBy(newsletter.subscribedAt);
}

export async function getActiveSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(newsletter).where(eq(newsletter.status, "active")).orderBy(newsletter.subscribedAt);
}

export async function subscribeNewsletter(email: string, name?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if already exists
  const existing = await db.select().from(newsletter).where(eq(newsletter.email, email)).limit(1);
  
  if (existing.length > 0) {
    // If unsubscribed, reactivate
    if (existing[0].status === "unsubscribed") {
      await db.update(newsletter).set({ status: "active", subscribedAt: new Date(), unsubscribedAt: null }).where(eq(newsletter.email, email));
      return { success: true, message: "Réabonné avec succès" };
    }
    return { success: false, message: "Déjà abonné" };
  }
  
  await db.insert(newsletter).values({ email, name });
  return { success: true, message: "Abonné avec succès" };
}

export async function unsubscribeNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(newsletter).set({ status: "unsubscribed", unsubscribedAt: new Date() }).where(eq(newsletter.email, email));
}

export async function deleteNewsletterSubscriber(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(newsletter).where(eq(newsletter.id, id));
}

// Resources
export async function getAllResources() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(resources).where(eq(resources.isActive, 1)).orderBy(resources.createdAt);
}

export async function getResourcesByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(resources).where(and(eq(resources.category, category), eq(resources.isActive, 1))).orderBy(resources.createdAt);
}

export async function createResource(data: InsertResource) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(resources).values(data);
}

export async function updateResource(id: number, data: Partial<InsertResource>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(resources).set(data).where(eq(resources.id, id));
}

export async function incrementDownloadCount(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const resource = await db.select().from(resources).where(eq(resources.id, id)).limit(1);
  if (resource.length > 0) {
    const newCount = (resource[0].downloadCount || 0) + 1;
    await db.update(resources).set({ downloadCount: newCount }).where(eq(resources.id, id));
  }
}

export async function deleteResource(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(resources).where(eq(resources.id, id));
}

// Donations
export async function getAllDonations() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(donations).orderBy(donations.createdAt);
}

export async function getCompletedDonations() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(donations).where(eq(donations.status, "completed")).orderBy(donations.createdAt);
}

export async function createDonation(data: InsertDonation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(donations).values(data);
}

export async function updateDonationStatus(stripePaymentIntentId: string, status: "pending" | "completed" | "failed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(donations).set({ status }).where(eq(donations.stripePaymentIntentId, stripePaymentIntentId));
}

export async function getDonationByPaymentIntent(stripePaymentIntentId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(donations).where(eq(donations.stripePaymentIntentId, stripePaymentIntentId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Events
export async function getAllEvents() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(events).orderBy(events.startDate);
}

export async function getUpcomingEvents() {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  return await db.select().from(events)
    .where(and(eq(events.isPublic, 1), eq(events.status, "upcoming")))
    .orderBy(events.startDate);
}

export async function getEventById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createEvent(data: InsertEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(events).values(data);
}

export async function updateEvent(id: number, data: Partial<InsertEvent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(events).set(data).where(eq(events.id, id));
}

export async function deleteEvent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(events).where(eq(events.id, id));
}

// Event Registrations
export async function getAllEventRegistrations() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(eventRegistrations).orderBy(eventRegistrations.createdAt);
}

export async function getEventRegistrationsByEventId(eventId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(eventRegistrations).where(eq(eventRegistrations.eventId, eventId)).orderBy(eventRegistrations.createdAt);
}

export async function createEventRegistration(data: InsertEventRegistration) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(eventRegistrations).values(data);
}

export async function updateEventRegistrationStatus(id: number, status: "pending" | "confirmed" | "cancelled") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(eventRegistrations).set({ status }).where(eq(eventRegistrations.id, id));
}

export async function deleteEventRegistration(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(eventRegistrations).where(eq(eventRegistrations.id, id));
}
