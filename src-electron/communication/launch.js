import { getMainWindow } from "..";
import checkFiles from '../services/check_files';
import downloadFiles from '../services/download_files';
import installFiles from '../services/install_files';
import { launchScandiCraft } from '../services/launch';
import IPC_CONFIG from '../../config/ipc.json';
import { checkJava } from "../services/download_java";

let startTaskTime = null;

export async function onCall(event, args) {

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

        //check java
        updateStart('java')
        await checkJava();
        updateStop('java')

        //launch
        updateStart('launch')
        launchScandiCraft(args.user);
        updateStop('launch')

        updateInfo(null);   //fin des tâches
    } catch (error) {
        console.log('launch catch error', error)

        launchError(error);   //catch error in renderer
        updateInfo(null);   //fin des tâches
    }
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
    // const log = require('electron-log');
    // log.info('[ScandiCraft] Launch IPC info', data)
    mainWindow.send(IPC_CONFIG.UPDATE_LAUNCH_TASK, {
        data
    })
}

export function launchError(error) {
    const mainWindow = getMainWindow();
    const log = require('electron-log');
    log.error('[ScandiCraft] Launch IPC error', error)
    mainWindow.send(IPC_CONFIG.LAUNCH_ERROR, {
        error
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