const fs = require('fs');
const path = require('path');
import { axiosPostWithConfig } from "../../common/services/axios";
import CONFIG from '../../config/config.json';
import { LAUNCHER_CONFIG } from '../config/launcher';

const launcher_path = path.resolve(LAUNCHER_CONFIG.LAUNCHER_HOME, LAUNCHER_CONFIG.TEMP_DOWNLOAD_FILE);

export default async function downloadFiles(files) {
    //purg temp download file
    console.log(`file ${launcher_path} exists: ${fs.existsSync(launcher_path)}`)
    if (fs.existsSync(launcher_path)) {
        console.log('purg zip file ', launcher_path)
        fs.unlinkSync(launcher_path);
    }

    //download files
    const downloaded_bytes = await downloadServerFiles(files);

    console.log(`Successful downloaded ${downloaded_bytes} bytes`)
}

function downloadServerFiles(files) {
    return new Promise((resolve, reject) => {
        let downloadedBytes = 0;

        axiosPostWithConfig(CONFIG.API.LAUNCHER_GET_FILES, {
            'files': files
        }, {
            responseType: 'stream'
        }).then((res) => {
            const totalLength = res.headers['content-length']

            res.data.on('data', (chunk) => {
                downloadedBytes += chunk.length;
                var progress = (downloadedBytes / totalLength) * 100;

                console.log('progress: ', parseInt(progress, 10))
            })

            //Enregistre le flux
            res.data.pipe(fs.createWriteStream(launcher_path))

            res.data.on('end', () => {
                resolve(downloadedBytes)
            })

            res.data.on('error', (err) => {
                reject(err)
            })
        }).catch((err) => {
            reject(err)
        })
    })
}