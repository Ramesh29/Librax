'use client'
import Image from 'next/image'

const DashBoard = () => {
  return (

    <div className="container-md row my-5">
            <div className="my-5"></div>
            <div className="col-4"><a href="/dashboard/patrons"><Image src={"/img/patron.png"} width={200} height={200} alt="people" /></a></div>
            <div className="col-4"><a href="/dashboard/trans"><Image src={"/img/transaction.png"} width={200} height={200} alt="transaction" /></a></div>
            <div className="col-4"><a href="/dashboard/books"><Image src={"/img/book.png"} width={200} height={200} alt="book" /></a></div>
    </div>

  )
}

export default DashBoard