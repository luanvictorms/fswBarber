import Image from "next/image"
import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import BarbershopItem from "./_components/barbershop-item"
import BookingItem from "./_components/booking-item"

import { db } from "./_lib/prisma"
import Footer from "./_components/footer"

const bookings = [
  {
    confirm: "Confirmado",
    service: "Corte de Cabelo",
    barbershopName: "Barbearia FSW",
    imageUrl: "https://utfs.io/f/9f0847c2-d0b8-4738-a673-34ac2b9506ec-17r.png",
    month: "Agosto",
    day: "05",
    hour: "20:20",
  },
  {
    confirm: "Não Confirmado",
    service: "Ajuste de Barba",
    barbershopName: "Barbearia FSW",
    imageUrl: "https://utfs.io/f/9f0847c2-d0b8-4738-a673-34ac2b9506ec-17r.png",
    month: "Agosto",
    day: "05",
    hour: "22:20",
  },
]

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
        <h2 className="text-xl font-bold">Olá, Luan!</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Agende nos melhores com FSW Barber"
          />
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {bookings.map((booking) => (
            <BookingItem key={booking.barbershopName} booking={booking} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
