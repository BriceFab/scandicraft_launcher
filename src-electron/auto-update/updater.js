const { autoUpdater } = require("electron-updater")
import CONFIG_IPC from '../../config/ipc.json';
import { getMainWindow } from "../index";

export default class AppUpdater {

    constructor(dev) {
        const log = require("electron-log")
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.autoDownload = true;
        autoUpdater.allowDowngrade = false;
        this.registerListeners();

        this.dev = dev;
        this.mainWindow = getMainWindow();
    }

    checkUpdate() {
        autoUpdater.checkForUpdates();
    }

    registerListeners() {
        autoUpdater.once('checking-for-update', () => {
            console.log('auto-update Checking for updates');

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.CHECK_FOR_UPDATE, null);
        })
        autoUpdater.on('error', (error) => {
            console.log('auto-update error', error);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.ERROR, error);
        })
        autoUpdater.on('update-available', (info) => {
            console.log('auto-update availabe', info);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.UPDATE_AVAILABLE, info);
        })
        autoUpdater.on('update-not-available', (info) => {
            console.log('auto-update not availabe', info);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.UPDATE_NOT_AVAILABLE, info);

            //Update finish
            this.sendUpdateFinish();
        })
        autoUpdater.on('download-progress', (info) => {
            console.log('auto-update download-progress', info);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.DOWLOAD_PROGRESS, {
                info
            });
        })
        autoUpdater.on('update-downloaded', (info) => {
            console.log('auto-update update-downloaded', info);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.UPDATE_DOWLOADED, info);

            //Quit and install directly
            if (!this.dev) {
                autoUpdater.quitAndInstall();
            }
        })
        autoUpdater.on('update-cancelled', (info) => {
            console.log('auto-update update-cancelled', info);

            //Send to front
            this.mainWindow.send(CONFIG_IPC.APP_UPDATE.UPDATE_CANCELLED, info);

            //Update finish
            this.sendUpdateFinish();
        })
    }

    sendUpdateFinish() {
        this.mainWindow.send(CONFIG_IPC.APP_UPDATE.UPDATE_FINISH, null);
    }
}
