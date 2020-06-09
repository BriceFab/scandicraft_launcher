import CONFIG_IPC from '../../config/ipc.json';
import { ipcMain } from 'electron';
// const onCall = require('./launch');
// import { onCall } from './launch';

const ipcRegister = () => {

    //Call launch minecraft from front
    ipcMain.on(CONFIG_IPC.LAUNCH_SCANDICRAFT, async (event, args) => {
        require('./launch').onCall(event, args);
    });
}

export default ipcRegister;