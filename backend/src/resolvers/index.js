// resolvers.js
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    // Get authenticated user based on session
    getAuthUser: async (_, __, context) => {
      try {
        // console.log('inside auth')
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error("Error in authUser", error);
        throw new GraphQLError("Internal server error");
      }
    },
    // Get user by id
    getUser: async (_, { id }) => {
      return await prisma.user.findUnique({
        where: { id },
      });
    },
    // Get all bookings

    getAllRooms: async () => {
      return await prisma.room.findMany();
    },
    getRoom: async (_, { id }) => {
      return await prisma.room.findUnique({
        where: { id },
      });
    },
  },

  Mutation: {
    // Signup user
    signup: async (_, { email, password, role }) => {

      try {
        // Validate inputs
        if (!email || !password || !role) {
          throw new GraphQLError("All fields are required", { extensions: { code: "BAD_USER_INPUT" } });
        }

        const allowedRoles = ["USER", "ADMIN"]; // Adjust based on your application
        if (!allowedRoles.includes(role.toUpperCase())) {
          throw new GraphQLError("Invalid role specified", { extensions: { code: "BAD_USER_INPUT" } });
        }

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (existingUser) {
          throw new GraphQLError("Email already registered", { extensions: { code: "EMAIL_EXISTS" } });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            role: role.toUpperCase(),
          },
        });
        return user;
      } catch (error) {
        console.error("Signup Error:", error); // Log error for debugging
        throw new GraphQLError("Failed to create user account", { extensions: { code: "INTERNAL_SERVER_ERROR" } });
      }
    
  },
  // Login user using passport and create session
  login: async (_, { email, password }, context) => {
    try {
      const { user } = await context.authenticate("graphql-local", {
        email,
        password,
      }); // gives false not finding
      if (!user) throw new GraphQLError("User not found")
      await context.login(user);
      return user;

    } catch (error) {
      throw new Error(error.message || "Internal server error");
    }
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