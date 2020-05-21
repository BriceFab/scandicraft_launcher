import CONFIG_IPC from '../../config/ipc.json';
import checkFiles from '../services/check_files';
import { ipcMain } from 'electron';

const ipcRegister = () => {

    //Call launch minecraft
    ipcMain.on(CONFIG_IPC.LAUNCH_SCANDICRAFT, async (event, ...args) => {
        //scan files
        console.log('start scan')
        await checkFiles()
        console.log('finish scan')
        //download files
        console.log('start download')
        
        console.log('finish download')

        //install files
        console.log('start install')
        console.log('finish install')
    })
}

export default ipcRegister;