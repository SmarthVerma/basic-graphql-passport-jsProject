// resolvers.js
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    // Get authenticated user based on session
    getAuthUser: async (_, __, { req }) => {
      if (!req.user) throw new AuthenticationError("Not authenticated");
      return await prisma.user.findUnique({
        where: { id: req.user.id },
      });
    },
    // Get user by id
    getUser: async (_, { id }) => {
      return await prisma.user.findUnique({
        where: { id },
      });
    },
    // Get all bookings
    getAllBookings: async () => {
      return await prisma.booking.findMany({
        include: {
          room: true,
        },
      });
    },
    // Get room by id
    getRoom: async (_, { id }) => {
      return await prisma.room.findUnique({
        where: { id },
      });
    },
  },

  Mutation: {
    // Signup user
    signup: async (_, { email, password }) => {
      const user = await prisma.user.create({
        data: {
          email,
          password, // You should hash the password before storing
        },
      });
      return user;
    },
    // Login user using passport and create session
    login: async (_, { email, password }, { req, res }) => {
      return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user, info) => {
          if (err || !user) {
            reject(new AuthenticationError(info.message || "Login failed"));
          }
          req.login(user, (loginErr) => {
            if (loginErr) reject(loginErr);
            res.cookie('sessionId', req.sessionID); // Set cookie for session
            resolve({
              sid: req.sessionID,
              expire: req.session.cookie.expires,
              createdAt: new Date().toISOString(),
            });
          });
        })(req, res);
      });
    },
    // Logout user
    logout: (_, __, { req, res }) => {
      req.logout((err) => {
        if (err) throw new Error('Logout failed');
      });
      res.clearCookie('sessionId');
      return true;
    },
    // Admin only: Create a new booking
    createBooking: async (_, { roomId, startDate, endDate }, { req }) => {
      if (!req.user || req.user.role !== 'ADMIN') {
        throw new ForbiddenError("You do not have permission to create bookings");
      }
      const booking = await prisma.booking.create({
        data: {
          roomId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
      return booking;
    },
    // Admin only: Delete a booking
    deleteBooking: async (_, { id }, { req }) => {
      if (!req.user || req.user.role !== 'ADMIN') {
        throw new ForbiddenError("You do not have permission to delete bookings");
      }
      await prisma.booking.delete({
        where: { id },
      });
      return true;
    },
    // Admin only: Update a booking
    updateBooking: async (_, { id, startDate, endDate }, { req }) => {
      if (!req.user || req.user.role !== 'ADMIN') {
        throw new ForbiddenError("You do not have permission to update bookings");
      }
      const booking = await prisma.booking.update({
        where: { id },
        data: {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
      return booking;
    },
    // Admin only: Create a room
    createRoom: async (_, { name, available }, { req }) => {
      if (!req.user || req.user.role !== 'ADMIN') {
        throw new ForbiddenError("You do not have permission to create rooms");
      }
      const room = await prisma.room.create({
        data: {
          name,
          available,
        },
      });
      return room;
    },
    // Admin only: Update a room
    updateRoom: async (_, { id, name, available }, { req }) => {
      if (!req.user || req.user.role !== 'ADMIN') {
        throw new ForbiddenError("You do not have permission to update rooms");
      }
      const room = await prisma.room.update({
        where: { id },
        data: {
          name,
          available,
        },
      });
      return room;
    },
    // Admin only: Delete a room
    deleteRoom: async (_, { id }, { req }) => {
      if (!req.user || req.user.role !== 'ADMIN') {
        throw new ForbiddenError("You do not have permission to delete rooms");
      }
      await prisma.room.delete({
        where: { id },
      });
      return true;
    },
  },
};

export default resolvers;