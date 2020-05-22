import CONFIG_IPC from '../../config/ipc.json';
import checkFiles from '../services/check_files';
import { ipcMain } from 'electron';
import downloadFiles from '../services/download_files';
import installFiles from '../services/install_files';
import { launchScandiCraft } from '../services/launch';
import { getMainWindow } from '..';
import IPC_CONFIG from '../../config/ipc.json';

let startTaskTime = null;

const ipcRegister = () => {

    //Call launch minecraft
    ipcMain.on(CONFIG_IPC.LAUNCH_SCANDICRAFT, async (event, ...args) => {
        try {
            //scan files
            updateStart('scan')
            let files_to_download = await checkFiles();
            updateStop('scan')

            if (files_to_download.length > 0) {
                //download files
                updateStart('download')
                await downloadFiles(files_to_download);
                updateStop('download')

                //install files
                updateStart('install')
                await installFiles();
                updateStop('install')
            } else {
                console.log('don\'t need to download anything')
            }

            //launch
            updateStart('launch')
            launchScandiCraft();
            updateStop('launch')

            updateInfo(null);   //fin des tâches
        } catch (error) {
            console.log('launch error', error.response.data)
        }
    })
}

function updateStart(task_name) {
    updateInfo({
        'active': true,
        'task_name': task_name,
        'start_time': startTask(task_name)
    })
}

export function updateTaskProgress(task_name, progress) {
    updateInfo({
        'active': true,
        'task_name': task_name,
        'progress': progress
    })
}

export function updateTaskInfo(task_name, info) {
    updateInfo({
        'active': true,
        'task_name': task_name,
        'info': info
    })
}

function updateStop(task_name) {
    updateInfo({
        'active': false,
        'task_name': task_name,
        'task_finish_in': stopTask(task_name)
    })
}

function updateInfo(data) {
    const mainWindow = getMainWindow();
    mainWindow.send(IPC_CONFIG.UPDATE_LAUNCH_TASK, {
        data
    })
}

function startTask(name) {
    startTaskTime = getTime()
    console.log(`[ScandiCraft] Start task ${name}`)
    return startTaskTime;
}

function stopTask(name) {
    var diff_time = getTime() - startTaskTime;
    console.log(`[ScandiCraft] Stop task ${name} in ${diff_time} ms`)
    return diff_time;
}

function getTime() {
    return new Date().getTime();
}

export default ipcRegister;