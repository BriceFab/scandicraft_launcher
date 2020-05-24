const { autoUpdater } = require("electron-updater")

export default class AppUpdater {
    constructor() {
        const log = require("electron-log")
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.autoDownload = true;
        autoUpdater.allowDowngrade = false;
        this.registerListeners();
    }

    checkUpdate() {
        autoUpdater.checkForUpdatesAndNotify();
    }

    registerListeners() {
        autoUpdater.once('checking-for-update', () => {
            console.log('BriceFab auto-update Checking for updates');
        })
        autoUpdater.on('error', (error) => {
            console.log('BriceFab auto-update error', error);
        })
        autoUpdater.on('update-available', (info) => {
            console.log('BriceFab auto-update availabe', info);
        })
        autoUpdater.on('update-not-available', (info) => {
            console.log('BriceFab auto-update not availabe', info);
        })
        autoUpdater.on('download-progress', (progress, bytesPerSecond, percent, total, transferred) => {
            console.log('BriceFab auto-update download-progress', progress, bytesPerSecond, percent, total, transferred);
        })
        autoUpdater.on('update-downloaded', (info) => {
            console.log('BriceFab auto-update update-downloaded', info);
        })
        autoUpdater.on('update-cancelled', (info) => {
            console.log('BriceFab auto-update update-cancelled', info);
        })
        autoUpdater.on('login', (info) => {
            console.log('BriceFab auto-update login', info);
        })
    }
}
