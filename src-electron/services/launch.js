import { spawn } from 'child_process';
import { LAUNCHER_CONFIG } from '../config/launcher';
import CONFIG from '../../config/config.json';
const fs = require('fs');
const path = require('path');
const Store = require('electron-store');

export function launchScandiCraft(user = null) {
    const args = getArgs(user);

    const detached = true; //TODO in param

    const launch_scandicraft = spawn(LAUNCHER_CONFIG.JAVA_HOME, args, {
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
        "-Xms1024M",
        "-Xmx1024M",
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
    const store = new Store();
    const api_token = store.get(CONFIG.STORAGE.KEY_TOKEN);

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