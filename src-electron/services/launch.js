import { spawn } from 'child_process';
import { LAUNCHER_CONFIG } from '../config/launcher';
import CONFIG from '../../config/config.json';
const fs = require('fs');
const path = require('path');
import { storeGet } from '../../common/services/store';

export function launchScandiCraft(user = null) {
    const args = getArgs(user);

    const detached = true; //TODO in param

    const launch_scandicraft = spawn(getJavaExecutable(), args, {
        cwd: LAUNCHER_CONFIG.LAUNCHER_HOME,
        detached: detached,
    });

    if (detached) {
        // launch_scandicraft.det
    }

    launch_scandicraft.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    launch_scandicraft.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    launch_scandicraft.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

function getArgs(user) {
    //JVM Parameters
    let args = [
        `-Djava.library.path=${path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, LAUNCHER_CONFIG.NATIVES_DIR)}`,
        "-XX:+UseConcMarkSweepGC",
        "-XX:+CMSIncrementalMode",  //check this
        "-XX:-UseAdaptiveSizePolicy",

        //TODO tester:
        // '-XX:+UnlockExperimentalVMOptions',
        // '-XX:+UseG1GC',
        // '-XX:G1NewSizePercent=20',
        // '-XX:G1ReservePercent=20',
        // '-XX:MaxGCPauseMillis=50',
        // '-XX:G1HeapRegionSize=16M',
        // '-XX:+DisableAttachMechanism',
        // '-Dcom.ibm.tools.attach.enable=no',

        "-Xms1024M",    //min
        "-Xmx1024M",    //max
        // '-Xmn128M',
        "-cp"
    ];

    //Libraries
    let libaries = "";
    const libs = fs.readdirSync(path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, LAUNCHER_CONFIG.LIBRARIES_DIR), {
        withFileTypes: true
    })
    libs.forEach((lib) => {
        libaries += path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, LAUNCHER_CONFIG.LIBRARIES_DIR, lib.name) + ';';
    })

    //Game jar
    libaries += path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, LAUNCHER_CONFIG.MAIN_JAR);

    args.push(libaries);
    args.push('net.scandicraft.client.Main');

    //Token
    const api_token = storeGet(CONFIG.STORAGE.KEY_TOKEN);

    //Game Parameters
    args = args.concat([
        `--username=${user.current.username}`,
        "--accessToken", "null",
        "--apiToken", api_token,
        "--version", "1.8",
        "--gameDir", LAUNCHER_CONFIG.LAUNCHER_HOME,
        "--assetsDir", `${path.join(LAUNCHER_CONFIG.LAUNCHER_HOME, LAUNCHER_CONFIG.ASSETS_DIR)}`,
        "--assetIndex", "1.8",
        "--userProperties", "{}",
        "--uuid", "null",
        "--userType", "legacy"
    ])

    console.log('launch args', args)

    return args;
}

function getJavaExecutable() {
    const java_re_path = storeGet(CONFIG.STORAGE.JRE_PATH);
    switch (process.platform) {
        case "win32":
            return path.join(java_re_path, 'bin', 'javaw.exe');
        case "darwin":
            return path.join(java_re_path, 'Contents', 'Home', 'bin', 'java');
        case "linux":
            return path.join(java_re_path, 'bin', 'java');
        default:
            console.error('platform not implemented')
            break;
    }
}

//     /**
//      * Returns the path of the OS-specific executable for the given Java
//      * installation. Supported OS's are win32, darwin, linux.
//      * 
//      * @param {string} rootDir The root directory of the Java installation.
//      * @returns {string} The path to the Java executable.
//      */
//     static javaExecFromRoot(rootDir){
//     if (process.platform === 'win32') {
//         return path.join(rootDir, 'bin', 'javaw.exe')
//     } else if (process.platform === 'darwin') {
//         return path.join(rootDir, 'Contents', 'Home', 'bin', 'java')
//     } else if (process.platform === 'linux') {
//         return path.join(rootDir, 'bin', 'java')
//     }
//     return rootDir
// }