import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"

const BookingItem = ({ booking }) => {
  return (
    <>
      <Card className="min-w-[468px]">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">{booking.confirm}</Badge>
            <h3 className="font-semibold">{booking.service}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.imageUrl} />
              </Avatar>
              <p className="text-sm">{booking.barbershopName}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-10">
            <p className="text-sm">{booking.month}</p>
            <p className="text-2xl">{booking.day}</p>
            <p className="text-sm">{booking.hour}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
