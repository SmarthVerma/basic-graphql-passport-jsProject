// typeDefs.js

const typeDefs = `#graphql

# User Types
type User {
  id: Int!
  email: String!
  role: Role!
  createdAt: String!
  updatedAt: String!
}

enum Role {
  ADMIN
  USER
}

# Booking Types
type Booking {
  id: Int!
  roomId: Int!
  room: Room!
  startDate: String!
  endDate: String!
  createdAt: String!
  updatedAt: String!
}

# Room Types
type Room {
  id: Int!
  roomNumber: String!
  location: String!
  status: String!
  createdAt: String! # Use ISO 8601 format for DateTime fields
  updatedAt: String!
}
# Queries
type Query {
  getAuthUser: User
  getUser(id: Int!): User
  getAllBookings: [Booking]
  getRoom(id: Int!): Room
    getAllRooms: [Room!]!

}

# Mutations
type Mutation {
  signup(email: String!, password: String!, role:String!): User
  login(email: String!, password: String!): User
  logout: Boolean
  createBooking(roomId: Int!, startDate: String!, endDate: String!): Booking
  deleteBooking(id: Int!): Boolean
  updateBooking(id: Int!, startDate: String!, endDate: String!): Booking
  createRoom(name: String!, available: Boolean!): Room
  updateRoom(id: Int!, name: String, available: Boolean): Room
  deleteRoom(id: Int!): Boolean
}

`;

export default typeDefs;