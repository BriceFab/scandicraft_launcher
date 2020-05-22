const fs = require('fs');
const path = require('path');
const DecompressZip = require('decompress-zip');
import { LAUNCHER_CONFIG } from '../config/launcher';

const launcher_path = path.resolve(LAUNCHER_CONFIG.LAUNCHER_HOME, LAUNCHER_CONFIG.TEMP_DOWNLOAD_FILE);

export default async function installFiles() {

    if (fs.existsSync(launcher_path)) {
        console.log('unzip downloaded files')
        await unzip();
        console.log('delete temp zip')
        fs.unlinkSync(launcher_path);
    }

    // console.log('delete wrong files')    //TODO Asychrone après avoir lancé le client
}

function unzip() {
    return new Promise((resolve, reject) => {

        var unzipper = new DecompressZip(launcher_path)

        unzipper.on('error', function (err) {
            reject(err)
        });

        unzipper.on('extract', function (log) {
            // console.log('Finished extracting ');
            resolve(log)
        });

        unzipper.on('progress', function (fileIndex, fileCount) {
            console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
        });

        unzipper.extract({
            path: LAUNCHER_CONFIG.LAUNCHER_HOME,
            filter: function (file) {
                return file.type !== "SymbolicLink";
            }
        })
    })

}