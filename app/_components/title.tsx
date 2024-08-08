interface TitleProps {
  title: String
  subtitle: String
}

const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <>
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{subtitle}</p>
    </>
  )
}

export default Title
