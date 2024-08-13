"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsProps {
  serviceId: string
  date: Date
  barbershopId: string
}

export const getBookings = ({
  date,
  serviceId,
  barbershopId,
}: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
      serviceId: serviceId,
      service: {
        barbershopId: barbershopId,
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })
}
