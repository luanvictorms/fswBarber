import Image from "next/image"
import { Button } from "./ui/button"

interface FastSearchItemProps {
  imageUrl: string
  title: string
}

const FastSearchItem: React.FC<FastSearchItemProps> = ({ imageUrl, title }) => {
  return (
    <Button className="gap-2" variant={"secondary"}>
      <Image src={imageUrl} alt={title} width={16} height={16}></Image>
      {title}
    </Button>
  )
}

export default FastSearchItem
