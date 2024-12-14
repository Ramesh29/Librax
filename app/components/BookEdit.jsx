import Image from 'next/image'
import { redirect } from 'next/navigation'
import { writeFile } from 'fs/promises';
import { join} from 'path'
import fs from 'fs';


const BookEdit = ({book}) => {

    async function upload (form) {
        "use server"
        console.log(form)
        const id = book._id
        const title = form.get("title");
        const author = form.get("author");
        const isbn = form.get("isbn");
        const image = form.get("bookimage"); // contains image data
        const oldimage = book.img;


        if ( image.name === 'undefined' ) {
            // image is not changed
            try {
                const img = book.img

                const result = await fetch(`http://localhost:3000/api/books/${id}`, {
                  method: "PUT",
                  headers : { 'Content-type': 'application/json'},
                  body : JSON.stringify({img ,  title, author, isbn})
                })
        
                if ( !result.ok ){
                    console.log("failed editing a book")
                }

                console.log("image updated")
          
                redirect('/dashboard/books')

          
              }catch(error){
                redirect('/dashboard/books')
            
              }


        }else {

                // unlink the old image
                let path = join('./public/uploads/', oldimage);
                fs.unlinkSync(path);    

                // upload the new image
                const bytes = await image.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const filename =  Date.now().toString() + '_' + image.name 
                path = join('./public/uploads/', filename);
                await writeFile(path, buffer);

                // update mongo database.
                try {
                    const result = await fetch(`http://localhost:3000/api/books/${id}`, {
                        method : "PUT",
                        headers: {
                            "Content-type" : "application/json",
                            "cache" : "no-store"
                        },
                        body: JSON.stringify({ img : filename  , title, author, isbn })

                    })


                    if (!result.ok) {
                        throw new Error("Fail to edit a new book", result );
                    }

                    redirect('/dashboard/books')
                }catch(error){
                    redirect('/dashboard/books')
                }          


        }



    }
  return (
    <div>

        <div className="alert alert-primary" role="alert">
          Edit a book
        </div>        

        <form action={upload}>
                <div className="mb-3">
                    <Image src={`/uploads/${book.img}`} width={200} height={200} alt={book.img} name="img"/>
                </div>            
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID</label>
                    <input 
                        type="text"
                        className="form-control" 
                        name="id"
                        defaultValue ={book._id}
                        disabled/>
                </div>                 
                <div className="mb-3">
                    <label htmlFor="title" className="form-label d-inline">Title</label>
                    <input 
                        type="text"
                        className="form-control" 
                        name="title"
                        defaultValue={book.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="author"
                        defaultValue={book.author}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="isbn" className="form-label">ISBN</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="isbn"
                        defaultValue={book.isbn}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="bookimage" className="form-label">Image</label>
                    <input 
                        type="file" 
                        className="form-control d-inline" 
                        name="bookimage"
                        />
                </div>
                <div>
                <input type="submit"  className="btn btn-primary px-5" value="Edit"/>
            </div> 
        </form>
    </div>
  )
}

export default BookEdit