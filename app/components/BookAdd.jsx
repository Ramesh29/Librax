
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { redirect } from 'next/navigation'


const BookAdd = () => {

    async function upload(data){
        "use server";
        const file = data.get('bookimage');
        const title = data.get('title');
        const author = data.get('author');
        const isbn = data.get('isbn');

        if (!title || !author || !isbn|| !file) {
            throw new Error("All fields are required.");
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename =  Date.now().toString() + '_' + file.name 
        
        const path = join('./public/uploads/', filename);

        await writeFile(path, buffer);

        try {
            const result = await fetch('http://localhost:3000/api/books', {
                method : "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({ img : filename , title, author, isbn })

            })


            if (result.ok) {
                redirect('/dashboard/books')

            }else{
                throw new Error("Fail to add a new book");
            }
        }catch(error){
            redirect('/dashboard/books')

        }
    }    

  return (
        <>
            <div className="alert alert-primary" role="alert">
                Add a new book
            </div>
            <form action={upload} className="my-4">

                <div className="mb-3 row">
                    <label htmlFor="title" className="col-sm-2 col-form-label ">Title</label>
                        <div className="col-sm-4">
                            <input 
                                type="text"
                                className="form-control" 
                                name="title"/>
                        </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="author" className="col-sm-2 col-form-label ">Author</label>
                        <div className="col-sm-4">
                            <input 
                                type="text"
                                className="form-control" 
                                name="author"/>
                        </div>
                </div>                        



                <div className="mb-3 row">
                    <label htmlFor="isbn" className="col-sm-2 col-form-label ">ISBN</label>
                        <div className="col-sm-4">
                            <input 
                                type="text"
                                className="form-control" 
                                name="isbn"/>
                        </div>
                </div>         

                <div className="mb-3 row">
                    <label htmlFor="bookimage" className="col-sm-2 col-form-label ">Image</label>
                        <div className="col-sm-4">
                            <input 
                                type="file"
                                className="form-control" 
                                name="bookimage"/>
                        </div>
                </div>         

                <div>
                    <input type="submit"  className="btn btn-primary px-5" value="Add"/>
                </div> 
            </form>
            
        </>
  )
}

export default BookAdd