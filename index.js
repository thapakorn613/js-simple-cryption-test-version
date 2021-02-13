const app = require('express')(); //import module express  เข้ามาใช้งาน
const encode = require('./encode'); //import ไฟล์ encode.js เพื่อส่งข้อมูลไปเข้ารหัส
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/token', (req, res) => { //ใช้ METHOD แบบ Post
    const { text } = req.body // ร้องขอข้อมูลผ่าน URL เป็นแบบ API เเละชุดข้อมูลเป็น JSON
    let data = encode(text) // ส่งข้อมูลที่รับเข้ามาไปยังไฟล์ encode.js เพื่อเข้ารหัส
    console.log(data)
    res.send(data) // ตอบกลับเป็นข้อมูลที่ผ่านการเข้ารหัส
});
app.listen(3000, () => { // Run บน Port 3000
    console.log('Running Server Port: 3000')
});