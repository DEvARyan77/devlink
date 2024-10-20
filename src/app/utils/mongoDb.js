import mongoose from 'mongoose';
console.log(process.env.CONNECTION)

mongoose.connect(process.env.CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error Encountered:", error);
    });

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique:true
    },
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
