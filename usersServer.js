
const express = require('express');
const app = express();
app.use(express.json());

let users = [];

//Get All Users
app.get('/users', (req, res) => {

    //Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedUser = users.slice(startIndex, endIndex);


    //Searching, Filtering
    const name = req.query.name;

    if(name) {
         const filteredUser = paginatedUser.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));

    if(filteredUser.length === 0)  {
        return res.status(404).json({
            message: "No users found"
        })
    }

    return res.json(filteredUser);

    };


    //Sorting


     res.status(200).json(paginatedUser);

    
})

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if(!user) return res.status(404).json({
        message: "User Not Found"
    })

    res.json(user);
})


//Add User
app.post('/users', (req, res) => {
    const {id, name, age} = req.body;

    const newUser = {
        id: users.length + 1,
        name,
        age
    }

    users.push(newUser);

    res.status(201).json({
        message: "User Added",
        user: newUser
    })
})


//Update User
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if(!user) return res.status(404).json({
        message: "User not found"
    })

    const {name, age} = req.body;

    user.name = name ||  user.name;
    user.age = age ||  user.age;

    res.status(200).json({
        message: "user updated",
        user: user
    })

})


//Delete User
app.delete('/users/:id', (req, res) => {

    const index = users.findIndex(u => u.id === Number(req.params.id));

    if(index === -1) return res.status(404).json({
        message: " user not found"
    })

    users.splice(index, 1);

    res.status(200).json({
        message: "User Deleted"
    })
    
})


//Global Error Handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message
    })
});
app.listen(3000, () => console.log("Sever is running on port:3000"))