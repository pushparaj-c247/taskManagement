import mongoose from "mongoose"

const data = {
    users: [{
        name: "user",
        email: "u@gmail.com",
        password: "123",
        role: "user"
    },{
      name: "admin",
        email: "b@gmail.com",
        password: "123",
        role: "admin"
    }]
}
const task = {
    tasks: [{
        subject: "mobile",
        description: "samsung",
        assignedTo: new mongoose.Types.ObjectId ("64df197f0bbb849af9265421"),
        assignedBy: new mongoose.Types.ObjectId ("64df19b40bbb849af9265423"),
        statusType: "pending",
    }]
}

export default {data, task}