import mongoose, {Schema} from 'mongoose';

const bookSchema = mongoose.Schema(

    {

        img: {
            type: String,
            required : [ true, "Please select a image "]
        },
        title: {
            type: String,
            required: [ true, "Please enter a username"]
        },
        author: {
            type : String,
            required : [ true, "Please enter a password"]
        },
        isbn: {
            type : String,
            required: [ true, "Please enter isbn"]
        }
    }
)

const Book = mongoose.models.Book ||  mongoose.model('Book', bookSchema);

export default Book;