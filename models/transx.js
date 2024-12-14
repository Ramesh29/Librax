import mongoose, {Schema} from 'mongoose';

const transxSchema = mongoose.Schema(

    {

        patronid: {
            type: String,
            required : [ true, "userid is required"]
        },
        firstname: {
            type: String,
            required : [ true, "firstname is required"]
        },
        lastname: {
            type: String,
            required: [ true, "lastname is required"]
        },

        bookid: {
            type: String,
            required: [ true, "bookid is required"]
        },
        title: {
            type : String,
            required : [ true, "title is  required"]
        },
        author: {
            type : String,
            required: [ true, "author is required"]
        },
        createdon: {
            type: Date,
            default: () => { return new Date()}
            
        },
        dueon : {
            type : Date,
            default: () => { return new Date( (new Date()).setDate((new Date()).getDate() + 14) )}
        },
        completed : {
            type: Boolean,
            default: false
        }
    }
)

const Transx = mongoose.models.Transx ||  mongoose.model('Transx', transxSchema);

export default Transx;