import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())
app.post('/home', async (req, res) => {


       await prisma.User.create({
        
           data:{
               email: req.body.email,
               name: req.body.name,
               age: Number(req.body.age)
           }

       })

    res.status(201).json(req.body)
})
app.put('/home/:id', async (req, res) => {


       await prisma.User.update({
           where:{
               id:req.params.id
           },
           data:{
               email: req.body.email,
               name: req.body.name,
               age: Number(req.body.age)
           }

       })

    res.status(201).json(req.body)
})
app.get('/home', async (req, res) => {
    const users = await prisma.User.findMany()
    res.status(200).json(users)
})

app.delete('/home/:id', async (req, res) => {
    
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'usuario deletado' })
})

app.listen(3000)

