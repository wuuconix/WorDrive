import express from "express"
import { MongoClient  } from "mongodb"
import { mongoURI } from "../config/api.mjs"
import bodyParser from 'body-parser'
import { createHash } from 'crypto'

const md5 = str => createHash("MD5").update(str).digest("hex")

const client = new MongoClient(mongoURI)
let userCollection //user集合

client.connect().then(async () => {
    console.log("成功连接到mongodb")
    const collections = (await client.db("wordrive").listCollections().toArray()).map(collection => collection.name)
    if (!collections.includes("user")) { //auto detect existence of user db and createIndex
        userCollection = await client.db("wordrive").createCollection("user")
        userCollection.createIndex({ user: 1 }, { unique: true, name: "userUnique"})
        console.log("自动创建索引userUnique成功")
    } else {
        userCollection = client.db("wordrive").collection("user")
    }
})

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const isValid = (user, pass) => { //判断用户名和密码是否满足基本的要求
    if (!user || !pass) {
        return { error: "field user and pass are required" }
    } else if (user.length < 4 || user.length > 20) {
        return { error: "field user's length must be between 4 and 20" }
    } else if (pass.length < 6 || pass.length > 20) {
        return { error: "field pass's length must be between 6 and 20" }
    } else {
        return { ok: "ok" }
    }
}

app.post("/register", (req, res) => {
    const { user, pass } = req.body
    const validation = isValid(user, pass)
    if (validation.ok) {
        userCollection.insertOne({user, pass: md5(pass)}).then(() => {
            res.json({success: "register successfully"})
        }).catch(e => {
            if (/duplicate key/.test(e.toString())) {
                res.json({error: `user ${user} is already taken, try others`})
            } else {
                res.json({error: e.toString()})
            }
        })
    } else {
        res.json(validation)
    }

})

app.post("/login", (req, res) => {
    const { user, pass } = req.body
    const validation = isValid(user, pass)
    if (validation.ok) {
        userCollection.findOne({user, pass: md5(pass)}).then(result => {
            if (result) {
                res.json({success: "login successfully"})
            } else {
                res.json({error: "login failed"})
            }
        })
    } else {
        res.json(validation)
    }
})

app.listen(3000, "0.0.0.0", () => {
    console.log("run in http://127.0.0.1:3000")
})