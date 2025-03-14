import { decryptByAES } from "./10086.js";
import fs from "fs";
// 获取所有加解密函数

const json = fs.readFileSync("./encryptData.json", "utf-8");
const jsonObj = JSON.parse(json);
const text = jsonObj.body;

// 使用其中的函数
// const encrypted = crypto.encryptByAES(text);
const decrypted = decryptByAES(text);
// const uuid = crypto.assembleUuid();

// console.log(encrypted);
console.log(decrypted);
// console.log(uuid);
