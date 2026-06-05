import Room from "../model/room.model.js";
import Guest from "../model/guest.model.js";
import { Booking } from "../model/booking.model.js";
import Reservation from "../model/reservation.model.js";
import Customer from "../model/customer.model.js";

export const seedDatabase = async () => {
  try {
    // 1. Seed Customer
    const customerCount = await Customer.countDocuments();
    if (customerCount === 0) {
      await Customer.create({
        customerNumber: 1,
        customerName: "Ethan Brown",
        contactLastName: "Brown",
        contactFirstName: "Ethan",
        phone: "+1 647-880-2356",
        addressLine1: "Toronto, Canada",
        city: "Toronto",
        country: "Canada",
        email: "ethan.brown@example.com",
        pwd: "password123",
        type: "M"
      });
      console.log("Seeded default customer account: ethan.brown@example.com / password123");
    }

    // 2. Seed Rooms
    const roomCount = await Room.countDocuments();
    let seededRooms = [];
    if (roomCount === 0) {
      const roomsData = [
        {
          roomNumber: 101,
          roomType: "Deluxe Suite",
          price: 280,
          status: "available",
          isAvailable: true,
          description: "Elegant suite with premium furnishings, city view, and private balcony.",
          image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=400&h=300"
        },
        {
          roomNumber: 102,
          roomType: "Superior Room",
          price: 190,
          status: "occupied",
          isAvailable: false,
          description: "Comfortable and stylish room designed for business or leisure travelers.",
          image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=400&h=300"
        },
        {
          roomNumber: 103,
          roomType: "Executive Suite",
          price: 320,
          status: "available",
          isAvailable: true,
          description: "Spacious and modern suite featuring a lounge area and work desk.",
          image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400&h=300"
        },
        {
          roomNumber: 104,
          roomType: "Standard Room",
          price: 150,
          status: "occupied",
          isAvailable: false,
          description: "Simple yet cozy room with all essential comforts for a short stay.",
          image: "https://images.unsplash.com/photo-1631049552057-403fb4f235a4?auto=format&fit=crop&q=80&w=400&h=300"
        },
        {
          roomNumber: 105,
          roomType: "Premium Deluxe",
          price: 250,
          status: "available",
          isAvailable: true,
          description: "Luxurious room combining comfort, modern design, and a relaxing ambience.",
          image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=400&h=300"
        }
      ];
      seededRooms = await Room.insertMany(roomsData);
      console.log("Seeded rooms");
    } else {
      seededRooms = await Room.find();
    }

    // 3. Seed Guest
    const guestCount = await Guest.countDocuments();
    if (guestCount === 0) {
      await Guest.create({
        guestNumber: 1001,
        firstName: "Ethan",
        lastName: "Brown",
        email: "ethan.brown@example.com",
        phone: "+1 647-880-2356",
        gender: "Male",
        dateOfBirth: new Date("1995-07-19"),
        addressLine1: "Toronto, Canada",
        city: "Toronto",
        country: "Canada",
        nationality: "Canadian",
        status: "active"
      });
      console.log("Seeded guest profile for Ethan Brown");
    }

    // 4. Seed Bookings
    const bookingCount = await Booking.countDocuments();
    if (bookingCount === 0 && seededRooms.length > 0) {
      const roomMap = seededRooms.reduce((acc, r) => {
        acc[r.roomNumber] = r._id;
        return acc;
      }, {});

      const bookingsData = [
        {
          room: roomMap[101],
          guestName: "Emily Carter",
          checkInDate: new Date("2035-03-10"),
          checkOutDate: new Date("2035-03-13"),
          status: "checked-in"
        },
        {
          room: roomMap[102],
          guestName: "Daniel Wong",
          checkInDate: new Date("2035-03-11"),
          checkOutDate: new Date("2035-03-13"),
          status: "reserved"
        },
        {
          room: roomMap[103],
          guestName: "Sophia Riviera",
          checkInDate: new Date("2035-03-09"),
          checkOutDate: new Date("2035-03-13"),
          status: "reserved"
        },
        {
          room: roomMap[101],
          guestName: "Liam Johnson",
          checkInDate: new Date("2035-03-12"),
          checkOutDate: new Date("2035-03-13"),
          status: "checked-out"
        },
        {
          room: roomMap[104],
          guestName: "Hannah Lee",
          checkInDate: new Date("2035-03-10"),
          checkOutDate: new Date("2035-03-15"),
          status: "checked-in"
        }
      ];
      await Booking.insertMany(bookingsData);
      console.log("Seeded bookings");
    }

    // 5. Seed Reservations
    const reservationCount = await Reservation.countDocuments();
    if (reservationCount === 0) {
      const reservationsData = [
        {
          guestName: "Emily Carter",
          guestEmail: "emily.carter@example.com",
          guestPhone: "+1 647-111-2222",
          roomType: "Deluxe Suite",
          roomNumber: 101,
          checkInDate: new Date("2035-03-12"),
          checkOutDate: new Date("2035-03-16"),
          numberOfGuests: 3,
          reservationStatus: "cancelled",
          totalAmount: 1120,
          paymentStatus: "paid",
          specialRequests: "Extra Pillows"
        },
        {
          guestName: "Daniel Wong",
          guestEmail: "daniel.wong@example.com",
          guestPhone: "+1 647-222-3333",
          roomType: "Superior Room",
          roomNumber: 102,
          checkInDate: new Date("2035-03-13"),
          checkOutDate: new Date("2035-03-15"),
          numberOfGuests: 2,
          reservationStatus: "pending",
          totalAmount: 380,
          paymentStatus: "pending",
          specialRequests: "Late Check-In"
        },
        {
          guestName: "Hannah Lee",
          guestEmail: "hannah.lee@example.com",
          guestPhone: "+1 647-333-4444",
          roomType: "Executive Suite",
          roomNumber: 103,
          checkInDate: new Date("2035-03-10"),
          checkOutDate: new Date("2035-03-15"),
          numberOfGuests: 4,
          reservationStatus: "confirmed",
          totalAmount: 1600,
          paymentStatus: "paid",
          specialRequests: "High Floor"
        },
        {
          guestName: "Liam Johnson",
          guestEmail: "liam.johnson@example.com",
          guestPhone: "+1 647-444-5555",
          roomType: "Executive Suite",
          roomNumber: 105,
          checkInDate: new Date("2035-03-13"),
          checkOutDate: new Date("2035-03-14"),
          numberOfGuests: 1,
          reservationStatus: "cancelled",
          totalAmount: 320,
          paymentStatus: "paid",
          specialRequests: "-"
        },
        {
          guestName: "Sophia Miles",
          guestEmail: "sophia.miles@example.com",
          guestPhone: "+1 647-555-6666",
          roomType: "Standard Room",
          roomNumber: 104,
          checkInDate: new Date("2035-03-11"),
          checkOutDate: new Date("2035-03-15"),
          numberOfGuests: 3,
          reservationStatus: "confirmed",
          totalAmount: 600,
          paymentStatus: "pending",
          specialRequests: "Sea View"
        }
      ];
      await Reservation.insertMany(reservationsData);
      console.log("Seeded reservations");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
