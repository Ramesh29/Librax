import BookEdit from "@/app/components/BookEdit"

const BookEditPage = async ({params}) => {

  const { id } = params

  const result = await fetch(`http://localhost:3000/api/books/${id}`, { cache: 'no-store'});

  const { book } = await result.json()

  return (
    <div>
      <BookEdit book={book}/>
    </div>
  )
}

export default BookEditPage