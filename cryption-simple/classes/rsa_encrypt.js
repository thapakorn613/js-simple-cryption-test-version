const crypto = require("crypto")

function EncodePublicKey(data,publicKey) {
    console.log("publicKey ",publicKey)
    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(data)
    )
    return encryptedData
}

function DecodePublicKey(encryptedData,privateKey) {
    console.log("privateKey ",privateKey)
    const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedData
  )
  return decryptedData.toString()
}

module.exports = {
    EncodePublicKey,
    DecodePublicKey,
};
