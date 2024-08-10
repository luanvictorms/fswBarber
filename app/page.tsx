import Image from "next/image"
import Header from "./_components/header"
import BarbershopItem from "./_components/barbershop-item"
import BookingItem from "./_components/booking-item"
import { db } from "./_lib/prisma"
import Title from "./_components/title"
import FastSearchItem from "./_components/fastSearch-item"
import { quickSearchOptions } from "./_constants/search"
import { principalText } from "./_constants/principalText"
import { bookings } from "./_constants/bookings"
import Search from "./_components/search"
import "./styles.css"
import CategoryDivider from "./_components/categoryDivider"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header />

      {/* BODY */}
      <div className="p-5">
        <Title
          key={principalText.title}
          title={principalText.title}
          subtitle={principalText.subtitle}
        />

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll pb-2 [&::-webkit-scrollbar]:hidden">
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

        {/* TODO: Mostrar somente os agendamentos que do usuario logado: e se ele tiver agendamentos*/}
        <CategoryDivider title={"Agendamentos"} />
        <div className="flex gap-4 overflow-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {bookings.map((booking) => (
            <BookingItem key={booking.barbershopName} booking={booking} />
          ))}
        </div>

        <CategoryDivider title={"Recomendados"} />
        <div className="flex gap-4 overflow-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <CategoryDivider title={"Populares"} />
        <div className="flex gap-4 overflow-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
