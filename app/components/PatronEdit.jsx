
'use client'

import { useEffect, useState } from "react"
import { useRouter  } from 'next/navigation'
import AppAlert from './AppAlert'

const PatronEdit = ({ id }) => {


 const [ firstname , setFirstname ] = useState("")
 const [ lastname, setLastname ] = useState("")
 const [ address, setAddress] = useState("")
 const [ cardnumber, setCardnumber ] = useState("")
 const [ email, setEmail ] = useState("")
 const [ phone, setPhone ] = useState("")


 const [error, setError] = useState("")

 const router = useRouter()



 useEffect( () => {

    async function fetchData() {
        const result = await fetch(`http://localhost:3000/api/patrons/${id}`, { noCache: true })
        const { patron } = await result.json()
        setFirstname(patron.firstname)
        setLastname(patron.lastname)
        setAddress(patron.address)
        setCardnumber(patron.cardnumber)
        setEmail(patron.email)
        setPhone(patron.phone)
    }

    fetchData();

 }, [])


 const handleSubmit = async(e) => {
    e.preventDefault();
    if (!firstname || !lastname || !address || !cardnumber || !email || !phone) {
        setError("All Fields are required.")

        setTimeout( () => {setError("")}, 2000)
        return;        
    }

    try {

        const result = await fetch(`http://localhost:3000/api/patrons/${id}`, {
          method: "PUT",
          headers : { 'Content-type': 'application/json'},
          body : JSON.stringify({firstname, lastname, address, cardnumber, email, phone})
        })

        if ( !result.ok ){
            console.log("failed editing a patron")
        }
  
        router.push('/dashboard/patrons')
  
      }catch(error){
        console.log(error)
      }

 }

  return (
    <>
        <div class="alert alert-primary" role="alert">
          Edit a patron
        </div>

        <AppAlert error={error}  />
         <form onSubmit={handleSubmit} className="my-4">
         <div className="my-3 row">
                <label htmlFor="firstname" className="col-sm-2 col-form-label ">Firstname</label>
                <div className="col-sm-4">
                  <input 
                      className="form-control"
                      type="text" 
                      name="firstname"
                      value={firstname}
                      onChange={ e => setFirstname(e.target.value)}/>
                </div>
            </div>

            <div className="my-3 row">
                <label htmlFor="lastname" class="col-sm-2 col-form-label">Lastname</label>
                <div className="col-sm-4">
                  <input
                      className="form-control"
                      type="text" 
                      name="lastname"
                      value={lastname}
                      onChange={ e => setLastname(e.target.value)}/>
                </div>
            </div>

            <div className="my-3 row">
                <label htmlFor="address" class="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-4">
                <input
                    className="form-control"
                    type="text" 
                    name="address"
                    value={address}
                    onChange={ e => setAddress(e.target.value)}/>
                </div>
            </div> 

            <div className="my-3 row">
                <label htmlFor="cardnumber" class="col-sm-2 col-form-label">Cardnumber</label>
                <div className="col-sm-4">
                <input
                    className="form-control"
                    type="text" 
                    name="cardnumber"
                    value={cardnumber}
                    onChange={e => setCardnumber(e.target.value )}/>
                </div>
            </div>

            <div className="my-3 row">
                <label htmlFor="email" class="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-4">
                <input
                    className="form-control"
                    type="text" 
                    name="email"
                    value={email}
                    onChange={ e => setEmail(e.target.value )}/>
                </div>
            </div>   


            <div className="my-3 row">
                <label htmlFor="phone" class="col-sm-2 col-form-label">Phone</label>
                <div className="col-sm-4">
                <input
                    className="form-control"
                    type="text" 
                    name="phone"
                    value={phone}
                    onChange={ e => setPhone(e.target.value )}/>
                </div>
            </div>  
            <div>
                <input type="submit" className="btn btn-primary px-5" value="Edit"/>
            </div>                                                
        </form> 
    </>  
  )
}

export default PatronEdit