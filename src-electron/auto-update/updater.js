const { autoUpdater } = require("electron-updater")

export default class AppUpdater {
    constructor() {
        const log = require("electron-log")
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        this.registerListeners();
    }

    checkUpdate() {
        autoUpdater.checkForUpdatesAndNotify();
    }

    registerListeners() {
        autoUpdater.once('checking-for-update', () => {
            console.log('BRiceFAb Checking for updates');
        })
    }
}
