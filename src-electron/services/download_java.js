const axios = require("axios");
const fs = require('fs');
const path = require('path');
import { LAUNCHER_CONFIG } from '../config/launcher';
import { updateTaskProgress } from "../communication/launch";
import { storeSet, storeGet } from '../../common/services/store';
const DecompressZip = require('decompress-zip');
import CONFIG from '../../config/config.json';

const java_path = path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, LAUNCHER_CONFIG.TEMP_DOWNLOAD_JAVA_FILE);

export async function checkJava() {
    console.log('check if java installed');

    if (!isJavaInstalled()) {
        console.log('need to download java');

        //purg temp download file
        console.log(`file ${java_path} exists: ${fs.existsSync(java_path)}`)
        if (fs.existsSync(java_path)) {
            console.log('purg zip file ', java_path)
            fs.unlinkSync(java_path);
        }

        //download files
        const downloaded_bytes = await downloadJava().catch((err) => {
            throw err.data
        })
        console.log(`Successful downloaded ${downloaded_bytes} bytes`);

        await installJava();

        //rename
        const jre_file = fs.readdirSync(path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, 'java'))[0];
        console.log('file ' + jre_file + ' must be rename');

        //set store jre path
        storeSet(CONFIG.STORAGE.JRE_PATH, path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, 'java', jre_file));

        // .forEach(file => {
        //     console.log("java_path file: ", file);
        // });

        // if (jre_file != null && fs.existsSync(path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, 'java', jre_file))) {
        //     fs.renameSync(path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, 'java', jre_file), path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, 'java', 'jre'));
        // }
    }

}

function isJavaInstalled() {
    const jre_path = storeGet(CONFIG.STORAGE.JRE_PATH);
    if (jre_path !== null && fs.existsSync(jre_path)) {
        return true;
    }
    return false;
}

async function downloadJava() {
    const res = await getLatestOpenJDK();
    const { binary_link, binary_size } = res.data[0];

    return new Promise((resolve, reject) => {
        let downloadedBytes = 0;

        axios.get(binary_link, {
            responseType: 'stream',
            Accept: 'application/json',
        }).then((res) => {

            res.data.on('data', (chunk) => {
                downloadedBytes += chunk.length;
                var progress = (downloadedBytes / binary_size) * 100;

                // console.log('progress: ', parseInt(progress, 10))
                updateTaskProgress('java_download', {
                    totalLength: binary_size,
                    downloadedBytes: downloadedBytes,
                    percent: parseInt(progress, 10)
                })
            })

            //Enregistre le flux
            res.data.pipe(fs.createWriteStream(java_path))

            res.data.on('end', () => {
                resolve(downloadedBytes)
            })

            res.data.on('error', (err) => {
                reject(err)
            })

        }, (err) => {
            reject(err);
        });
    });
}

async function installJava() {
    if (fs.existsSync(java_path)) {
        console.log('unzip downloaded files')
        await unzip();
        console.log('delete temp zip')
        fs.unlinkSync(java_path);
    }
}

function unzip() {
    return new Promise((resolve, reject) => {

        var unzipper = new DecompressZip(java_path)

        unzipper.on('error', function (err) {
            reject(err)
        });

        unzipper.on('extract', function (log) {
            // console.log('Finished extracting ');
            resolve(log)
        });

        unzipper.on('progress', function (fileIndex, fileCount) {
            updateTaskProgress('install_java', `${fileIndex + 1} of ${fileCount}`)
            console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
        });

        unzipper.extract({
            path: path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, 'java'),
            filter: function (file) {
                return file.type !== "SymbolicLink";
            }
        });
    })

}

/**
 * Fetch the last open JDK binary. Uses https://api.adoptopenjdk.net/
 */
function getLatestOpenJDK(major = '8') {
    return new Promise((resolve, reject) => {
        const sanitizedOS = process.platform === 'win32' ? 'windows' : (process.platform === 'darwin' ? 'mac' : process.platform);

        const url = `https://api.adoptopenjdk.net/v2/latestAssets/nightly/openjdk${major}?os=${sanitizedOS}&arch=x64&heap_size=normal&openjdk_impl=hotspot&type=jre`;

        axios.get(url).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}