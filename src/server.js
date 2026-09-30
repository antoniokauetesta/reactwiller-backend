import express from "express"
import cors from "cors"
import { prisma } from "./lib/prisma.ts"

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany()
        res.status(200).json(usuarios)
    } catch(error) {
        res.status(500).json({error: "Erro ao buscar usuário."})
    }
})

app.post("/usar", async (req, res) => {
    try {
        const novoUsuario = await prisma.usuario.create({data: req.body})
        res.status(201).json(novoUsuario)
    } catch(error) {
        res.status(500).json({error: "Erro ao criar usuário."})
    }
})

app.delete("/deletar/:id", async (req, res) => {
    try {
        const {id} = req.params 
        const deletarUsuario = await prisma.usuario.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(204).json(deletarUsuario)
    } catch(error) {
        res.status(500).json({error: "Erro ao deletar usuário."})
    }
})

app.put("/editar/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {nome, idade} = req.body
        const editarUsuario = await prisma.usuario.update({
            where: {id: Number(id)},
            data: {nome, idade}
        })
        res.json(editarUsuario)
    } catch(error) {
        res.status(500).json({error: "Erro ao editar usuário."})
    }
})

app.listen(PORT, () => {
    console.log(`server funcionando na ${PORT}`)
})