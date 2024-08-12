import { db } from "../_lib/prisma"
import Header from "../_components/header"
import CategoryDivider from "../_components/categoryDivider"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    //Todo: mostrar popup de login
    return notFound()
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  const finalizedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h2 className="text-xl font-bold">Agendamentos</h2>
        <CategoryDivider title={"Confirmados"} />
        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}

        <CategoryDivider title={"Finalizados"} />
        {finalizedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  )
}

export default BookingsPage
