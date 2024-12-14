import Header from "@/app/components/Header";
import PatronList from "@/app/components/PatronList";
import Link from "next/link";

const PatronsPage = async () => {

  return (
    <div className="container-md">
      <Link href={"/dashboard/patrons/add"} className="btn btn-success">Add a new patron</Link>
      <PatronList/>
    </div>
  )
}

export default PatronsPage