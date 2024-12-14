'use client';
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AppAlert from './AppAlert'


const PatronAdd = () => {
  
   const [ firstname, setFirstname ] = useState("")
   const [ lastname, setLastname ] = useState("")
   const [ address, setAddress] = useState("")
   const [ cardnumber, setCardnumber ] = useState("")
   const [ email, setEmail ] = useState("")
   const [ phone, setPhone ] = useState("")

   const [error, setError] = useState("")

   const router = useRouter()

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!firstname || !lastname || !address || !cardnumber || !email || !phone) {
        setError("All Fields are required.")

        setTimeout( () => {setError("")}, 2000)
        return;        
    }

    try {

        const result = fetch("http://localhost:3000/api/patrons", {
          method: "POST",
          headers : { 'Content-type': 'application/json'},
          body : JSON.stringify({firstname, lastname, address, cardnumber, email, phone})
        })
  
        router.push('/dashboard/patrons')
  
      }catch(error){
        throw new Error("Error in creating new patron", error)
      }
  }

  return (
    <>
        <div className="alert alert-primary" role="alert">
          Add a new patron
        </div>

        <AppAlert error={error}  />

        
         <form onSubmit={handleSubmit}  className="my-4">

            <div className="my-3 row">
                <label htmlFor="firstname" className="col-sm-2 col-form-label ">Firstname</label>
                <div className="col-sm-4">
                  <input 
                      className="form-control"
                      type="text" 
                      name="firstname"
                      placeholder='Firstname'
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
                      placeholder='Lastname'
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
                    placeholder='Address'
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
                    placeholder='Cardnumber'
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
                    placeholder='Email'
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
                    placeholder='Phone'
                    onChange={ e => setPhone(e.target.value )}/>
                </div>
            </div>                                                

            <div>
                <input type="submit"  className="btn btn-primary px-5" value="Add"/>
            </div>                                                
        </form> 
    </>     
  )
}

export default PatronAdd