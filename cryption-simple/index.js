const app = require('express')() 
const encode = require('./classes/encode')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const keyCrypto = require('./classes/genKey')
const {EncodePublicKey,DecodePublicKey} = require('./classes/rsa_encrypt')
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/token', (req, res) => {
    const { text } = req.body
    let data = encode(text)
    console.log(data)
    res.send(data) 
})

app.get('/genkey', async(req,res) =>{
    let keyer = new keyCrypto()
    let user_name = "typeA"
    fs.writeFileSync(path.resolve(__dirname,`keys/private/${user_name}-private.pem`), keyer.privateKey)
    console.log("keyer.privateKey ",keyer.privateKey)
    fs.writeFileSync(path.resolve(__dirname,`keys/public/${user_name}-public.pem`), keyer.publicKey)
    res.send({})
})

app.get('/encrypt', (req, res) => {
    const publicKey = fs.readFileSync(path.resolve(__dirname,`keys/public/${req.query.user_name}-public.pem`), { encoding: "utf8" })
    const privateKey = fs.readFileSync(path.resolve(__dirname,`keys/private/${req.query.user_name}-private.pem`), { encoding: "utf8" })
    const myAccesToken = "ThisIsAAcessTokenSOmethingLikeThat"
    let encryptedData = EncodePublicKey(myAccesToken,publicKey)
    //? ส่ง keyer.privateKey + encryptedData ไปให้ server client
    console.log("encryptedData ",encryptedData)
    // console.log("public ",public)
    let text = DecodePublicKey(encryptedData,privateKey)
    console.log("text ",text)
    res.send(text) 
})

app.listen(process.env.PORT, () => {
    console.log(`Running Server Port: ${process.env.PORT}`)
})