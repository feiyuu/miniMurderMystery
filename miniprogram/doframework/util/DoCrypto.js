//aes

import AES from '../crypto-js/aes';
import SHA256Obj from '../crypto-js/sha256';
import Base64Obj from '../crypto-js/enc-base64';
import CryptoJS from '../crypto-js/crypto-js';


const appKey = 'DLK4123412ABCDEF';

//解密方法
function AESDecrypt(word) {
    
    var decryptedData  = AES.decrypt(word, appKey,{
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var originalText = decryptedData.toString(CryptoJS.enc.Utf8);
    return originalText;
}

//加密方法
function AESEncrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let keyBytes = CryptoJS.enc.Utf8.parse(appKey);

    var encryptedData = AES.encrypt(srcs, keyBytes,{
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptedData.ciphertext.toString(CryptoJS.enc.Base64);
}

//反转key加密方法
function ReverseAESEncrypt(word) {
    let reverseKey = appKey.split("").reverse().join("");
    reverseKey = reverseKey.slice(1);
    reverseKey = "0" + reverseKey;

    let srcs = CryptoJS.enc.Utf8.parse(word);
    let keyBytes = CryptoJS.enc.Utf8.parse(reverseKey);

    var encryptedData = AES.encrypt(srcs, keyBytes,{
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptedData.ciphertext.toString(CryptoJS.enc.Base64);
}

function ReverseAESDecrypt(word) {
    let reverseKey = appKey.split("").reverse().join("");
    reverseKey = reverseKey.slice(1);
    reverseKey = "0" + reverseKey;

    let keyBytes = CryptoJS.enc.Utf8.parse(reverseKey);
    
    var decryptedData = AES.decrypt(word, keyBytes,{
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var originalText = decryptedData.toString(CryptoJS.enc.Utf8);
    return originalText;
}

function SHA256Encode(word){
    return SHA256Obj(word).toString(CryptoJS.enc.Hex);
}


function Base64Encode(word){
    return Base64Obj.stringify(word);
}
export{
    AESDecrypt,
    AESEncrypt,
    SHA256Encode,
    Base64Encode,
    ReverseAESEncrypt,
    ReverseAESDecrypt
}

