import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure,publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { uploadImage } from "./imageUpload";



export const appRouter = router({
  system: systemRouter,
  // Image upload router
  upload: router({
    image: adminProcedure
      .input(
        z.object({
          fileBase64: z.string(),
          folder: z.enum(["services", "projects", "team"]),
        })
      )
      .mutation(async ({ input }) => {
        // Convert base64 to buffer
        const fileBuffer = Buffer.from(input.fileBase64, "base64");

        // Upload and convert to WebP
        const result = await uploadImage(fileBuffer, input.folder);

        return result;
      }),
  }),

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Services routes
  services: router({
    list: publicProcedure.query(async () => {
      return await db.getActiveServices();
    }),
    listAll: adminProcedure.query(async () => {
      return await db.getAllServices();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getServiceById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        description: z.string(),
        flower: z.string(),
        flowerMeaning: z.string(),
        targetAudience: z.string(),
        duration: z.string(),
        price: z.string(),
        details: z.string().optional(),
        imageUrl: z.string().optional(),
        displayOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        return await db.createService(input);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        flower: z.string().optional(),
        flowerMeaning: z.string().optional(),
        targetAudience: z.string().optional(),
        duration: z.string().optional(),
        price: z.string().optional(),
        details: z.string().optional(),
        imageUrl: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateService(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteService(input.id);
        return { success: true };
      }),
  }),

  // Projects routes
  projects: router({
    list: publicProcedure.query(async () => {
      return await db.getActiveProjects();
    }),
    listAll: adminProcedure.query(async () => {
      return await db.getAllProjects();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProjectById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        location: z.string(),
        description: z.string(),
        imageUrl: z.string().optional(),
        date: z.date().optional(),
        displayOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        return await db.createProject(input);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        date: z.date().optional(),
        displayOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateProject(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProject(input.id);
        return { success: true };
      }),
  }),

  // Team Members routes
  team: router({
    list: publicProcedure.query(async () => {
      return await db.getActiveTeamMembers();
    }),
    listAll: adminProcedure.query(async () => {
      return await db.getAllTeamMembers();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getTeamMemberById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string().optional(),
        imageUrl: z.string().optional(),
        displayOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        return await db.createTeamMember(input);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        role: z.string().optional(),
        bio: z.string().optional(),
        imageUrl: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateTeamMember(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteTeamMember(input.id);
        return { success: true };
      }),
  }),

  // Contact Messages routes
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        subject: z.string().optional(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.createContactMessage(input);
        return { success: true };
      }),
    listAll: adminProcedure.query(async () => {
      return await db.getAllContactMessages();
    }),
    markAsRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markMessageAsRead(input.id);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteContactMessage(input.id);
        return { success: true };
      }),
  }),

  // Testimonials router
  testimonials: router({
    // Public: Get approved testimonials
    getApproved: publicProcedure.query(async () => {
      return await db.getApprovedTestimonials();
    }),
    
    // Public: Submit a new testimonial
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        organization: z.string().min(2),
        role: z.string().optional(),
        content: z.string().min(10),
        rating: z.number().min(1).max(5).default(5),
        email: z.string().email().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createTestimonial({
          ...input,
          status: "pending",
        });
        return { success: true };
      }),
    
    // Admin: Get all testimonials
    getAll: adminProcedure.query(async () => {
      return await db.getAllTestimonials();
    }),
    
    // Admin: Get pending testimonials
    getPending: adminProcedure.query(async () => {
      return await db.getPendingTestimonials();
    }),
    
    // Admin: Approve testimonial
    approve: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.updateTestimonialStatus(input.id, "approved");
        return { success: true };
      }),
    
    // Admin: Reject testimonial
    reject: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.updateTestimonialStatus(input.id, "rejected");
        return { success: true };
      }),
    
    // Admin: Delete testimonial
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteTestimonial(input.id);
        return { success: true };
      }),
  }),

  // Gallery router
  gallery: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllGalleryImages();
    }),
    getByProject: publicProcedure
      .input(z.object({ projectId: z.number() }))
      .query(async ({ input }) => {
        return await db.getGalleryImagesByProject(input.projectId);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string(),
        projectId: z.number().optional(),
        category: z.string().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createGalleryImage(input);
        return { success: true };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        projectId: z.number().optional(),
        category: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateGalleryImage(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteGalleryImage(input.id);
        return { success: true };
      }),
  }),

  // Newsletter router
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.subscribeNewsletter(input.email, input.name);
      }),
    getAll: adminProcedure.query(async () => {
      return await db.getAllNewsletterSubscribers();
    }),
    getActive: adminProcedure.query(async () => {
      return await db.getActiveSubscribers();
    }),
    unsubscribe: adminProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await db.unsubscribeNewsletter(input.email);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteNewsletterSubscriber(input.id);
        return { success: true };
      }),
  }),

  // Resources router
  resources: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllResources();
    }),
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getResourcesByCategory(input.category);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        fileUrl: z.string(),
        fileName: z.string(),
        fileSize: z.number().optional(),
        fileType: z.string().optional(),
        category: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createResource(input);
        return { success: true };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateResource(id, data);
        return { success: true };
      }),
    incrementDownload: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.incrementDownloadCount(input.id);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteResource(input.id);
        return { success: true };
      }),
  }),

  // Donations router
  donations: router({
    createCheckout: publicProcedure
      .input(z.object({
        amount: z.number().min(1),
        donorName: z.string().optional(),
        donorEmail: z.string().email().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { createCheckoutSession } = await import("./stripe");
        
        const origin = ctx.req.headers.origin || "http://localhost:3000";
        
        const session = await createCheckoutSession({
          amount: input.amount,
          donorName: input.donorName,
          donorEmail: input.donorEmail,
          message: input.message,
          successUrl: `${origin}/don-reussi`,
          cancelUrl: `${origin}/faire-un-don`,
        });

        return { checkoutUrl: session.url };
      }),
    getAll: adminProcedure.query(async () => {
      return await db.getAllDonations();
    }),
    getCompleted: adminProcedure.query(async () => {
      return await db.getCompletedDonations();
    }),
  }),

  // Events router
  events: router({
    getAll: adminProcedure.query(async () => {
      return await db.getAllEvents();
    }),
    getUpcoming: publicProcedure.query(async () => {
      return await db.getUpcomingEvents();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getEventById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        location: z.string().optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
        eventType: z.string().optional(),
        maxParticipants: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createEvent(input);
        return { success: true };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        location: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).optional(),
        isPublic: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateEvent(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteEvent(input.id);
        return { success: true };
      }),
  }),

  // Event Registrations router
  eventRegistrations: router({
    getAll: adminProcedure.query(async () => {
      return await db.getAllEventRegistrations();
    }),
    getByEventId: publicProcedure
      .input(z.object({ eventId: z.number() }))
      .query(async ({ input }) => {
        return await db.getEventRegistrationsByEventId(input.eventId);
      }),
    create: publicProcedure
      .input(z.object({
        eventId: z.number(),
        schoolName: z.string(),
        contactName: z.string(),
        contactEmail: z.string().email(),
        contactPhone: z.string().optional(),
        numberOfParticipants: z.number().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createEventRegistration(input);
        return { success: true };
      }),
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        await db.updateEventRegistrationStatus(input.id, input.status);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteEventRegistration(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
