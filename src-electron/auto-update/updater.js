const { autoUpdater } = require("electron-updater")
import CONFIG_IPC from '../../config/ipc.json';
import { getMainWindow } from "../index";

export default class AppUpdater {

    constructor() {
        const log = require("electron-log")
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.autoDownload = true;
        autoUpdater.allowDowngrade = false;
        this.registerListeners();

        this.mainWindow = getMainWindow();
    }

    checkUpdate() {
        autoUpdater.checkForUpdatesAndNotify();

        //Send to front
        // console.log('fake check-for-update')
        this.mainWindow.send(CONFIG_IPC.APP_UPDATE.CHECK_FOR_UPDATE, null);
    }

    registerListeners() {
        autoUpdater.once('checking-for-update', () => {
            console.log('BriceFab auto-update Checking for updates');

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.CHECK_FOR_UPDATE, null);
        })
        autoUpdater.on('error', (error) => {
            console.log('BriceFab auto-update error', error);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.ERROR, error);
        })
        autoUpdater.on('update-available', (info) => {
            console.log('BriceFab auto-update availabe', info);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.UPDATE_AVAILABLE, info);
        })
        autoUpdater.on('update-not-available', (info) => {
            console.log('BriceFab auto-update not availabe', info);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.UPDATE_NOT_AVAILABLE, info);
        })
        autoUpdater.on('download-progress', (progress, bytesPerSecond, percent, total, transferred) => {
            console.log('BriceFab auto-update download-progress', progress, bytesPerSecond, percent, total, transferred);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.DOWLOAD_PROGRESS, {
                progress, bytesPerSecond, percent, total, transferred
            });
        })
        autoUpdater.on('update-downloaded', (info) => {
            console.log('BriceFab auto-update update-downloaded', info);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.UPDATE_DOWLOADED, info);
        })
        autoUpdater.on('update-cancelled', (info) => {
            console.log('BriceFab auto-update update-cancelled', info);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.UPDATE_CANCELLED, info);
        })
        autoUpdater.on('login', (info) => {
            console.log('BriceFab auto-update login', info);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.LOGIN, info);
        })
    }
}
