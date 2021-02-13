const crypto = require('crypto');
const SaltLenght = 9; //ขนาด 9 ตัวอักษร
function dataEn(text) {
    // สร้างฟังก์ชันการเข้ารหัสโดยนำ md5 + salt เเล้วนำมา base64 จะได้ชุดข้อมูลที่ผ่านการเข้ารหัสเป็น 64bit
    console.log('Input Data' + ': ' + text); // เเสดงผลข้อมูลที่รับเข้ามาจาก index
    var salt = generateSalt(SaltLenght);
    var hash = md5(text + salt); // text คือชุดข้อมูลที่รับจาก index.js
    var SH = salt + hash;
    var encode = Buffer.from(SH).toString('base64'); //แปลงชุดข้อมูลเป็น 64 bit
    return encode; // รีเทิร์นค่ากลับไปยังฟังก์ชัน
}

function generateSalt(len) { // สร้างฟังก์ชันเข้ารหัสแบบ salt
    var privateKey = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
        keyLen = privateKey.length,
        salt = '';
    for (var i = 0; i < len; i++) {
        var p = Math.floor(Math.random() * keyLen);
        salt += privateKey[p];
    }
    return salt;
}

function md5(string) { // สร้างฟังก์ชันเข้ารหัสแบบ md5
    return crypto.createHash('md5').update(string).digest('hex');
}

module.exports = dataEn;