import CONFIG_IPC from '../../config/ipc.json';
import { ipcMain } from 'electron';
// const onCall = require('./launch');
// import { onCall } from './launch';

const ipcRegister = () => {

    //Call launch minecraft
    ipcMain.on(CONFIG_IPC.LAUNCH_SCANDICRAFT, async (event, args) => {
        require('./launch').onCall(event, args);
    })

    //Call auto update
}

export default ipcRegister;