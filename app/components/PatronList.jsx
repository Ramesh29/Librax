
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Paginator from './Paginator'



const PatronList = ({setPatronid, setFirstname, setLastname, showEdit=true, showSelect=false }) => {


    const [ patrons, setPatrons] = useState(null);
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
        fetch("http://localhost:3000/api/patrons", { cache: 'no-store' }).then(response => response.json()).then( data => {setPatrons(data.patrons);setPages(Math.ceil(data.patrons.length/10))})

    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/patronsearch/${searchterm}`, { cache: 'no-store' }).then(response => response.json()).then( data => {setPatrons(data.patrons);setPages(Math.ceil(data.patrons.length/10))})
    }    



  return (
    <div className="container-md mt-5 border" >
        <div className="d-grid gap-2 my-2">
            <button className="btn btn-light btn-lg" type="button" onClick={toggle}>Patrons</button>
        </div>

        { show && (
            <>
                <form onSubmit={handleSearch} className="my-4">
                        <div className="mb-3">

                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="searchterm"
                                    placeholder='Search patrons by firstname'
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
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Cardnumber</th>
                                <th>Email</th>
                                <th>Phone</th>
                                {showEdit && (<th style={{width: "100px"}}>Edit</th>)}
                                {showSelect && (<th style={{width: "100px"}}>Select</th>) }
                            </tr>
                        </thead>
                        <tbody>
                            {patrons &&  patrons.slice( (curPage-1)*10, (curPage*10)).map( (p, index) => 
                                (
                                <tr key={(curPage-1)*10 + index+1}>
                                    <td>{(curPage-1)*10 + index+1}</td>
                                    <td>{p.firstname}</td> 
                                    <td>{p.lastname}</td> 
                                    <td>{p.address}</td> 
                                    <td>{p.cardnumber}</td>  
                                    <td>{p.email}</td> 
                                    <td>{p.phone}</td> 
                                    {showEdit && (<td style={{width: "100px"}}><Link href={`/dashboard/patrons/edit/${p._id}`} className="btn btn-success px-5">Edit</Link></td>)}
                                    {showSelect && (<td style={{width: "100px"}}><button className="btn btn-success px-5" onClick={ (e) => {setPatronid && setPatronid(p._id); setFirstname && setFirstname(p.firstname); setLastname && setLastname(p.lastname);  toggle(e)}}>Select</button></td>)}
                                    
                                </tr>

                                ))}
                        </tbody>
                 </table>
            </>)}
        </div>
  )
}

export default PatronList