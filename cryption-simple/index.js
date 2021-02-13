const app = require('express')() 
const encode = require('./classes/encode')
const bodyParser = require('body-parser')
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

app.get('/genkey', (req, res) => {
    const myAccesToken = "ThisIsAAcessTokenSOmethingLikeThat"
    let keyer = new keyCrypto()
    let encryptedData = EncodePublicKey(myAccesToken,keyer.privateKey)
    //? ส่ง keyer.privateKey + encryptedData ไปให้ server client
    console.log("encryptedData ",encryptedData)
    let text = DecodePublicKey(encryptedData,keyer.privateKey)
    console.log("text ",text)
    res.send(text) 
})

app.listen(process.env.PORT, () => {
    console.log(`Running Server Port: ${process.env.PORT}`)
})