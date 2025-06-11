import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        emailAddress: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        firstName: { 
            type: String, 
            required: true 
        },
        lastName: { 
            type: String, 
            required: true 
        },
        isAdmin: { 
            type: Boolean, 
            default: false 
        },
        isActive: { 
            type: Boolean, 
            default: true 
        },
        organisationId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Organisation', 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }
)

const User = model('User', userSchema)

export default User
