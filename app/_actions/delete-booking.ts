"use server"

import { Booking } from "@prisma/client"
import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"

interface DeleteBookingProps {
  booking: Booking
}

export const deleteBooking = async ({ booking }: DeleteBookingProps) => {
  await db.booking.deleteMany({
    where: {
      id: booking.id,
    },
  })

  revalidatePath("/")
  revalidatePath("/bookings")

  return true
}
