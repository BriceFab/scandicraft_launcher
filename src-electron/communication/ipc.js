import CONFIG_IPC from '../../config/ipc.json';
import checkFiles from '../services/check_files';
import { ipcMain } from 'electron';
import downloadFiles from '../services/download_files';

const ipcRegister = () => {

    //Call launch minecraft
    ipcMain.on(CONFIG_IPC.LAUNCH_SCANDICRAFT, async (event, ...args) => {
        //scan files
        console.log('start scan')
        let files_to_download = await checkFiles();
        console.log('finish scan')
        //download files
        console.log('start download')
        await downloadFiles(files_to_download);
        console.log('finish download')

        //install files
        console.log('start install')
        await installFiles(files_to_download);
        console.log('finish install')
    })
}

export default ipcRegister;