const fs = require('fs');
const crypto = require('crypto');
import { axiosGet } from "../../common/services/axios";
import CONFIG from '../../config/config.json';
import { LAUNCHER_CONFIG } from '../config/launcher';

export default async function checkFiles() {
    let change_files = [];

    const files_checksum = await getServerFiles();

    files_checksum.forEach((file) => {
        const file_path = LAUNCHER_CONFIG.LAUNCHER_HOME + file.name;
        // console.log('file', file_path)

        if (!fs.existsSync(file_path) || fs.statSync(file_path).size !== file.size || getHash(file_path) !== file.hash) {
            change_files.push(file.name)
            console.warn(`file ${file.name} is incorrect`)
        } else {
            // console.warn(`file ${file.name} is correct`)
        }
    })

    return change_files;
}

async function getServerFiles() {
    const res = await axiosGet(CONFIG.API.LAUNCHER_GET_FILES_CHECKSUM);
    return res.data;
}

function getHash(file_path) {
    let file_buffer = fs.readFileSync(file_path);
    let sum = crypto.createHash('sha1');
    sum.update(file_buffer);
    return sum.digest('hex');
}