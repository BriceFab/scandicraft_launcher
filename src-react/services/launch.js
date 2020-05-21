import { spawn } from 'child_process';
import { axiosPost } from './axios';

const args = [
    "-Djava.library.path=C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\natives",
    "-XX:+UseConcMarkSweepGC",
    // "-XX:+CMSIncrementalMode",
    "-XX:-UseAdaptiveSizePolicy",
    "-Xms1024M",
    "-Xmx1024M",
    // "-cp",
    "C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\authlib-1.5.21.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\codecjorbis-20101023.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\codecwav-20101023.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\commons-codec-1.9.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\commons-compress-1.8.1.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\commons-io-2.4.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\commons-lang3-3.3.2.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\commons-logging-1.1.3.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\gson-2.2.4.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\guava-17.0.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\httpclient-4.3.3.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\httpcore-4.3.2.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\icu4j-core-mojang-51.2.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\jinput-2.0.5.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\jinput-platform-2.0.5-natives-windows.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\jna-3.4.0.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\jopt-simple-4.6.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\jutils-1.0.0.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\libraryjavasound-20101123.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\librarylwjglopenal-20100824.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\log4j-api-2.0-beta9.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\log4j-core-2.0-beta9.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\lwjgl_util-2.9.4-nightly-20150209.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\lwjgl-2.9.4-nightly-20150209.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\lwjgl-platform-2.9.4-nightly-20150209-natives-windows.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\netty-1.6.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\netty-all-4.0.23.Final.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\oshi-core-1.1.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\platform-3.4.0.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\realms-1.7.39.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\soundsystem-20120107.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\trove-3.0.2.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\vecmath.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\discord-rpc.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\kotlin-stdlib-1.3.61.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\libraries\\annotations-13.0.jar;C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\scandicraft.jar",
    "net.minecraft.client.main.Main",
    "--username=BriceFab",
    "--accessToken",
    "null",
    "--version",
    "1.8",
    "--gameDir",
    "C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft",
    "--assetsDir",
    "C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft\\assets",
    "--assetIndex",
    "1.8",
    "--userProperties",
    "{}",
    "--uuid",
    "null",
    "--userType",
    "legacy",
];

export function getJVMArgs(user) {
    let args = [];

    args.push('-cp')
    // Libraries
    args.push('')
    // Minecraft.jar
    args.push('')
    // Natives
    args.push('-Djava.library.path');

    return args;
}

export function downloadFiles() {
    axiosPost('/launcher/download', null).then((res) => {
        // console.log('res', res.data)
        const downloaded_file = res.data;
        
    }, (error) => {
        console.log('error:: ', error)
    });
}

export function launch(user) {
    downloadFiles();
    /*
    const launch_scandicraft = spawn('java', getJVMArgs(user), {
        cwd: "C:\\Users\\Fabrice\\AppData\\Roaming\\.ScandiCraft"
    });

    launch_scandicraft.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    launch_scandicraft.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    launch_scandicraft.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    */
}