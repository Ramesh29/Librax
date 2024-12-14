'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PatronList from './PatronList'
import BookList from './BookList'
import TransList from './TransList'
import TransAdd from './TransAdd'
import Header from './Header'


const TransMaster = () => {

    const [ patronid, setPatronid ] = useState("")
    const [ firstname, setFirstname ] = useState("")
    const [ lastname, setLastname ] = useState("")
    const [ bookid, setBookid] = useState("")
    const [ title, setTitle ] = useState("")
    const [ author, setAuthor] = useState("")
    const [ img ,setImg] = useState("")
    

    const router = useRouter()
    const [ trigger, setTrigger ] = useState(false)

    const  reset = () => {
        setPatronid("");setFirstname("");setLastname(""); setBookid("");setTitle("");setAuthor("");setImg("")
    }

    

    return (
            <div className="container-md mt-5">
                <div className="alert alert-info" role="alert">
                    <h5>Transaction details</h5>
                    <p>{patronid && (`Patron: ${firstname} ${lastname} `)}</p>
                    <p>{bookid && (`Book: ${title} `)}</p>
                </div>                
                <PatronList setPatronid={setPatronid} setFirstname={setFirstname} setLastname={setLastname} showEdit={false} showSelect={true}/>
                <BookList setBookid={setBookid} setTitle={setTitle} setAuthor={setAuthor} setImg={setImg} showEdit={false} showSelect={true}/>
                <TransAdd patronid={patronid} firstname={firstname} lastname={lastname} bookid={bookid} title={title} author={author} img={img} setTrigger={setTrigger} reset={reset}/>
                <TransList trigger={trigger}/>
            </div>
  )
}

export default TransMaster