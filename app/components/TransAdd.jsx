'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AppAlert from './AppAlert'

const TransAdd = ({ patronid, firstname, lastname, bookid, title, author, img , setTrigger ,reset }) => {

    const [show, setShow] = useState(false)
    const [error, setError] = useState("")

    const toggle = (e) => { e.preventDefault(); setShow(!show)}

    const handleSubmit = (e) => {
        e.preventDefault()
    

        if ( !patronid || !firstname || !lastname || !bookid || !title || !author ) {
            setError("All Fields are required.")

            setTimeout( () => {setError("")}, 2000)
            return;
        }

        try {

            const result = fetch("http://localhost:3000/api/transx", {
              method: "POST",
              headers : { 'Content-type': 'application/json'},
              body : JSON.stringify({patronid, firstname, lastname, bookid, title, author})
            })


      
            //router.push('/dashboard/transhistory')
            setTrigger(prev => !prev)


      
          }catch(error){
            throw new Error("Error in creating new patron", error)
          }

        reset();
          
 

    }
    
    
  return (
    <div className="container-md mt-5 border">

        <div className="d-grid gap-2 my-2">
            <button className="btn btn-light btn-lg" type="button" onClick={toggle}>Create new transaction</button>
        </div>

        <AppAlert error={error}  />



        { show && ( 
        <form onSubmit={handleSubmit} id="tranAddForm">
            { img && (<div className="mb-3">
                <Image src={`/uploads/${img}`} width={150} height={150} alt={img}/>
            </div>) }

            <div className="mb-3">
                <label htmlFor="patronid" className="form-label">Patron ID</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="patronid"
                    value={patronid}
                    readOnly
                    />
            </div>
            <div className="mb-3">
                <label htmlFor="firstname" className="form-label">Firstname</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="firstname"
                    value={firstname}
                    readOnly/>
            </div>

            <div className="mb-3">
                <label htmlFor="lastname" className="form-label">Lastname</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="lastname"
                    value={lastname}
                    readOnly/>
            </div>                      

            <div className="mb-3">
                <label htmlFor="bookid" className="form-label">Book ID</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="bookid"
                    value={bookid}
                    readOnly/>
            </div>
                            

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="title"
                    value={title}
                    readOnly/>
            </div>

            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="author"
                    value={author}
                    readOnly/>
            </div>


            <input 
                    type="submit" 
                    className="btn btn-success my-4" 
                    value="Add Transaction"/>
        </form> )}
    </div>
  )
}

export default TransAdd