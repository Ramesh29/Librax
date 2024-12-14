'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Paginator from './Paginator'
const BookList = ({setBookid, setTitle, setAuthor, setImg, showEdit=true, showSelect=false }) => {


    const [ books, setBooks] = useState();
    const [ searchterm, setSearchterm] = useState("")
    const [show, setShow] = useState(true)
    const [pages, setPages] = useState(1)
    const [curPage, setCurPage] = useState(1)

   // updated from child
   const fnSetCurentPage = (p) => {
    setCurPage( p.target.value )
  }    

    const toggle = (e) => { e.preventDefault(); setShow(!show)}


    useEffect(() => {
        fetch("http://localhost:3000/api/books", { cache: 'no-store' }).then(response => response.json()).then( data => {setBooks(data.books);setPages(Math.ceil(data.books.length/10))})

    }, [])

    
    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/booksearch/${searchterm}`, { cache: 'no-store' }).then(response => response.json()).then( data => {setBooks(data.books);setPages(Math.ceil(data.books.length/10))})
    }

  return (
    <div className="container-md mt-5 border">
        <div className="d-grid gap-2 my-2">
            <button className="btn btn-light btn-lg" type="button" onClick={toggle}>Books</button>
        </div>
        { show && (
        <>      
        <form onSubmit={handleSearch}>
            <div className="mb-3">

                    <input 
                        type="text" 
                        className="form-control my-4" 
                        name="searchterm"
                        placeholder='Search books by title'
                        defaultValue={searchterm}
                        onChange={ e => setSearchterm(e.target.value)}
                        />
                    <input type="submit" className="btn btn-success my-4" value="Search" />
            </div>            
        </form>
        <Paginator pages={pages} fnSetCurentPage={fnSetCurentPage}/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        {showEdit && (<th style={{width: "100px"}}>Edit</th>)}
                        {showSelect && (<th style={{width: "100px"}}>Select</th>) }
                    </tr>
                </thead>
                <tbody>
                    { books && books.slice( (curPage-1)*10, (curPage*10)).map( (b, index) => 
                        (
                        <tr key={(curPage-1)*10 + index+1}>
                            <td>{(curPage-1)*10 + index+1}</td>
                            <td><Image src={`/uploads/${b.img}`} width={100} height={100} alt={b.img}/></td> 
                            <td>{b.title}</td> 
                            <td>{b.author}</td> 
                            <td>{b.isbn}</td>  
                            {showEdit && (<td style={{width: "100px"}}><Link href={`/dashboard/books/edit/${b._id}`} className="btn btn-success px-5">Edit</Link></td>) }
                            {showSelect && (<td style={{width: "100px"}}><button className="btn btn-success px-5" onClick={ (e) => { setBookid && setBookid(b._id); setTitle && setTitle(b.title);setAuthor && setAuthor(b.author);setImg && setImg(b.img); toggle(e);}}>Select</button></td>)}
                        </tr>

                        ))}
                </tbody>
            </table> 
        </>    
        )}  

    </div>
  )
}

export default BookList