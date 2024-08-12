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
      <div className="p-5">
        <h2 className="text-xl font-bold">Agendamentos</h2>
        <CategoryDivider title={"Confirmados"} />
        {confirmedBookings && confirmedBookings.length > 0 ? (
          <div className="space-y-3">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            Você não possui agendamentos confirmados!
          </p>
        )}

        <CategoryDivider title={"Finalizados"} />
        {finalizedBookings && finalizedBookings.length > 0 ? (
          <div className="space-y-3">
            {finalizedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            Você não possui agendamentos finalizados!
          </p>
        )}
      </div>
    </>
  )
}

export default BookingsPage
