'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Paginator from './Paginator'

import styles from './TransList.module.css'



const TransList = ({trigger}) => {


    const [ trans , setTrans ] = useState();
    const [show, setShow] = useState(true)
    const [ searchterm, setSearchterm] = useState("")
    const [pages, setPages] = useState(1)
    const [curPage, setCurPage] = useState(1)
    
   // updated from child
    const fnSetCurentPage = (p) => {
      setCurPage( p.target.value )
    }
    
    const toggle = (e) => { e.preventDefault(); setShow(!show)}   






    const handleSearch = (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/api/transearch/${searchterm}`, { cache: 'no-store' }).then(response => response.json()).then( data => {setTrans(data.trans);setPages(Math.ceil(data.trans.length/10));})
  }    



    
    async function fetchData () {
      const result = await fetch(`http://localhost:3000/api/transx`, { cache : 'no-store' })
      const {trans} = await result.json()
      setTrans(trans)
      setPages(Math.ceil(trans.length/10))

  }
    const processTrans = async (id) => {
      try {

        const result = await fetch(`http://localhost:3000/api/transx/${id}`, {
          method: "PUT",
          headers : { 'Content-type': 'application/json'},
          body : JSON.stringify({completed: true})
        })

        if ( !result.ok ){
            console.log("Failed editing transaction")
        }

        fetchData();
  
      }catch(error){
        console.log(error)
      }

    }
    
    useEffect( () => {

      console.log("use effect is called ")
      fetchData();
  
   },[trigger])


    return (
      <div className="container-fluid mt-5 border">
        <div className="d-grid gap-2 my-2">
            <button className="btn btn-light btn-lg" type="button" onClick={toggle}>Transactions</button>
        </div>
        <div className={show? styles.fadeIn:styles.fadeOut}>
          <form onSubmit={handleSearch} className="my-4">
                          <div className="mb-3">

                                  <input 
                                      type="text" 
                                      className="form-control" 
                                      name="searchterm"
                                      placeholder='Search transactions by firstname'
                                      defaultValue={searchterm}
                                      onChange={ e => setSearchterm(e.target.value)}
                                      />
                                  <input type="submit" className="btn btn-success my-4" value="Search" />
                          </div>            
            </form>          
          <Paginator pages={pages} fnSetCurentPage={fnSetCurentPage}/>
          <table className="table table-striped" >
          <thead>
              <tr>
                  <th>#</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Date Borrowed</th>
                  <th>Due Date</th>
                  <th>Completed</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
              { trans && trans.slice( (curPage-1)*10, (curPage*10)).map( (t, index) => 
                  (
                  <tr key={(curPage-1)*10 + index+1}>
                      <td>{(curPage-1)*10 + index+1}</td>
                      <td>{t.firstname}</td> 
                      <td>{t.lastname}</td> 
                      <td>{t.title}</td>
                      <td>{t.author}</td>
                      <td>{t.createdon}</td>
                      <td>{t.dueon}</td>
                      <td>{t.completed ? <input type="checkbox" checked={true} readOnly/>: <input type="checkbox" checked={false} readOnly/>}</td>

                      <td><button className="btn btn-primary" onClick={ () => { processTrans(t._id);} }>Complete</button></td>
                  </tr>

                  ))}
          </tbody>
      </table>


    </div>
  
  </div>       
  )
}

export default TransList