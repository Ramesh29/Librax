import PatronEdit from "@/app/components/PatronEdit"

const PatronEditPage = ({params}) => {

  const { id } = params
  return (
    <div>
      <PatronEdit id={id} />
    </div>
  )
}

export default PatronEditPage