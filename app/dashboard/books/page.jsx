import BookList from "@/app/components/BookList"
import Header from "@/app/components/Header"
import Link from "next/link"

const BooksPage = async () => {
  
  
  return (
    <div className="container-md">
        <Link href="/dashboard/books/add" className="btn btn-success">Add a new book</Link>
        <BookList/>
    </div>
  )
}

export default BooksPage