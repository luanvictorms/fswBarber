import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

interface FastSearchItemProps {
  imageUrl: string
  title: string
}

const FastSearchItem: React.FC<FastSearchItemProps> = ({ imageUrl, title }) => {
  return (
    <Button className="gap-2" variant={"secondary"} asChild>
      <Link href={`/barbershops?service=${title}`}>
        <Image src={imageUrl} alt={title} width={16} height={16}></Image>
        {title}
      </Link>
    </Button>
  )
}

export default FastSearchItem
