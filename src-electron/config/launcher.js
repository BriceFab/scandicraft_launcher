import { app } from "electron";
import { name } from '../../package.json';
// const findJavaHome = require('find-java-home')

export const LAUNCHER_CONFIG = {
    LAUNCHER_HOME: app.getPath('userData').replace(name, '.ScandiCraft'),
    TEMP_DOWNLOAD_FILE: 'scandicraft_download.zip',
    TEMP_DOWNLOAD_JAVA_FILE: 'scandicraft_java.zip',
    LIBRARIES_DIR: 'libraries',
    NATIVES_DIR: 'natives',
    ASSETS_DIR: 'assets',
    MAIN_JAR: 'scandicraft.jar'
}

const log = require('electron-log');
log.info('[ScandiCraft] Launcher config', LAUNCHER_CONFIG)

// function getJavaHome() {
//     return new Promise((resolve, reject) => {
//         findJavaHome({ allowJre: true }, (err, home) => {
//             if (err) {
//                 console.log('error getting java home', err);
//                 resolve('java')
//             }
//             console.log(home);
//             resolve(home)
//         });
//     })
// }