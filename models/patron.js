import mongoose, {Schema} from 'mongoose';

const patronSchema = mongoose.Schema(

    {

        firstname : {
            type: String,
            required : [ true, "Please enter a firstname"]
        },
        lastname: {
            type: String,
            required : [ true, "Please enter a lastname"]
        },
        address : {
            type : String,
            required :[ true, "Please enter address"]
        },
        cardnumber: {
            type: String,
            required : [ true, "Please enter a cardnumber"]
        },
        email: {
            type: String,
            required : [ true, "Please enter an email"]
        },
        phone : {
            type: String,
            required: [ true, "Please enter phone"]
        }

    }
)

const Patron = mongoose.models.Patron ||  mongoose.model('Patron', patronSchema);

export default Patron;