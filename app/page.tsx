import Image from "next/image"
import Header from "./_components/header"
import BarbershopItem from "./_components/barbershop-item"
import BookingItem from "./_components/booking-item"
import { db } from "./_lib/prisma"
import FastSearchItem from "./_components/fastSearch-item"
import { quickSearchOptions } from "./_constants/search"
import Search from "./_components/search"
import "./styles.css"
import CategoryDivider from "./_components/categoryDivider"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const session = await getServerSession(authOptions)

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
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
    : []

  return (
    <div>
      <Header />

      {/* BODY */}
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "bem vindo"}
        </h2>
        <p>{format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}</p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <FastSearchItem
              key={option.title}
              imageUrl={option.imageUrl}
              title={option.title}
            />
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Agende nos melhores com FSW Barber"
          />
        </div>

        {session?.user && (
          <>
            <CategoryDivider title={"Agendamentos"} />
            <div className="flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings && confirmedBookings.length > 0 ? (
                confirmedBookings.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    booking={JSON.parse(JSON.stringify(booking))}
                  />
                ))
              ) : (
                <p className="mt-2 text-sm text-gray-400">
                  Oops! Você ainda não possui nenhum agendamento...
                </p>
              )}
            </div>
          </>
        )}

        <CategoryDivider title={"Recomendados"} />
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <CategoryDivider title={"Populares"} />
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
