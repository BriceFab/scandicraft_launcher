const fs = require('fs');
import { axiosPostWithConfig } from "../../common/services/axios";
import CONFIG from '../../config/config.json';
import { LAUNCHER_CONFIG } from '../config/launcher';

export default async function downloadFiles(files) {
    const downloaded_file = await downloadServerFiles(files);

    console.log('after download')
}

async function downloadServerFiles(files) {
    let downloadedBytes = 0;

    await axiosPostWithConfig(CONFIG.API.LAUNCHER_GET_FILES, {
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
        res.data.pipe(fs.createWriteStream(LAUNCHER_CONFIG.LAUNCHER_HOME + 'scandicraft_download.zip'))
    }, (err) => {
        console.error('error launcher download ', err)
    });
}