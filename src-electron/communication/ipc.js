import CONFIG_IPC from '../../config/ipc.json';
import checkFiles from '../services/check_files';
import { ipcMain } from 'electron';
import downloadFiles from '../services/download_files';
import installFiles from '../services/install_files';
import { launchScandiCraft } from '../services/launch';

let startTaskTime = null;

const ipcRegister = () => {

    //Call launch minecraft
    ipcMain.on(CONFIG_IPC.LAUNCH_SCANDICRAFT, async (event, ...args) => {
        try {
            //scan files
            startTask('scan')
            let files_to_download = await checkFiles();
            stopTask('scan')

            if (files_to_download.length > 0) {
                //download files
                startTask('download')
                await downloadFiles(files_to_download);
                stopTask('download')

                //install files
                startTask('install')
                await installFiles();
                stopTask('install')
            } else {
                console.log('don\'t need to download anything')
            }

            //launch
            startTask('launch')
            launchScandiCraft();
            stopTask('launch')
        } catch (error) {
            console.log('launch error', error.response.data)
        }
    })
}

function startTask(name) {
    startTaskTime = getTime()
    console.log(`[ScandiCraft] Start task ${name}`)
}

function stopTask(name) {
    var diff_time = getTime() - startTaskTime;
    console.log(`[ScandiCraft] Stop task ${name} in ${diff_time} ms`)
}

function getTime() {
    return new Date().getTime();
}

export default ipcRegister;