import SidebarSheet from "./sidebar-sheet"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href={"/"}>
          <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
        </Link>

        <Sheet>
          <div>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-4"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
          </div>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
