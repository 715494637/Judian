import CryptoJS from "crypto-js";

export const byteToString = (input) => {
    if (typeof input === "string") return input;
    let str = "";
    const bytes = input;
    for (let i = 0; i < bytes.length; i++) {
        const binary = bytes[i].toString(2);
        const match = binary.match(/^1+?(?=0)/);
        if (match && binary.length === 8) {
            const count = match[0].length;
            const value = bytes[i].toString(2).slice(7 - count);
            for (let j = 1; j < count; j++) {
                value += bytes[j + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(value, 2));
            i += count - 1;
        } else {
            str += String.fromCharCode(bytes[i]);
        }
    }
    return str;
};

const KEY_1 = "57,55,57,49,48,50,55,51,52,49,55,49,49,56,49,57";
const KEY_2 = "102,111,111,114,101,116,116,68,53,118,99,66,97,119,116,51";
const KEY_3 = "85,86,105,99,48,54,116,112,88,103,77,78,105,65,112,109";
const KEY_4 = "49,50,51,52,53,54,55,56,57,48,49,50,51,52,53,54";
const KEY_5 = "66,72,116,81,82,101,112,88,69,66,87,108,101,55,67,74";
const KEY_6 = "116,54,77,111,69,90,57,52,115,48,98,68,79,97,119,115";

export const encryptByAES = (text) => {
    let key = CryptoJS.enc.Utf8.parse(byteToString(KEY_2.split(",")));
    let iv = CryptoJS.enc.Utf8.parse(byteToString(KEY_1.split(",")));

    // if (window.location.href.indexOf("cmcc-app-gray") > -1) {
    //     key = CryptoJS.enc.Utf8.parse(byteToString(KEY_5.split(",")));
    //     iv = CryptoJS.enc.Utf8.parse(byteToString(KEY_4.split(",")));
    // }

    const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
    });

    return encrypted.toString();
};

export const decryptByAESStorage = (text) => {
    let key = CryptoJS.enc.Utf8.parse(byteToString(KEY_2.split(",")));
    let iv = CryptoJS.enc.Utf8.parse(byteToString(KEY_1.split(",")));

    // if (window.location.href.indexOf("cmcc-app-gray") > -1) {
    //     key = CryptoJS.enc.Utf8.parse(byteToString(KEY_5.split(",")));
    //     iv = CryptoJS.enc.Utf8.parse(byteToString(KEY_4.split(",")));
    // }

    const decrypted = CryptoJS.AES.decrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
};

export const decryptByAES = (text) => {
    let key = CryptoJS.enc.Utf8.parse(byteToString(KEY_3.split(",")));
    let iv = CryptoJS.enc.Utf8.parse(byteToString(KEY_1.split(",")));
    

    // if (window.location.href.indexOf("cmcc-app-gray") > -1) {
    //     key = CryptoJS.enc.Utf8.parse(byteToString(KEY_6.split(",")));
    //     iv = CryptoJS.enc.Utf8.parse(byteToString(KEY_4.split(",")));
    // }

    const decrypted = CryptoJS.AES.decrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
};

export const createUuid = () => {
    return ((0x10000 * (1 + Math.random())) | 0).toString(16).substring(1);
};

export const assembleUuid = () => {
    return [
        createUuid(),
        createUuid(),
        createUuid(),
        createUuid(),
        createUuid(),
        createUuid(),
        createUuid(),
        createUuid(),
    ].join("-");
};

export const getRandomNumber = (length) => {
    const digits = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += digits[Math.floor(Math.random() * digits.length)];
    }
    return result;
};
