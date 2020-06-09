const { app, BrowserWindow } = require('electron')
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import AppUpdater from './auto-update/updater';
import ipcRegister from './communication/ipc';
import CONFIG from '../config/config.json';
import { storeGet, store } from '../common/services/store';

let dev = false;
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
    dev = true;
}

let mainWindow = null; //pass garbage collector
let splash = null;

function createWindow() {
    // Cree la fenetre du navigateur.
    mainWindow = new BrowserWindow({
        minWidth: 850,
        minHeight: 610,
        width: 950,
        height: 620,
        hasShadow: false,
        // frame: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: dev
        },
        show: false,
        // backgroundColor: '#171614'
    })

    // et charger le fichier index.html de l'application.
    mainWindow.loadFile('dist/index.html')

    //Menu
    if (!dev) {
        mainWindow.removeMenu()
    }

    // Ouvre les DevTools.
    if (dev) {
        mainWindow.webContents.openDevTools()
    }
}

function createSplash() {
    splash = new BrowserWindow({
        width: 550,
        height: 400,
        transparent: true,
        frame: false,
        center: true,
        alwaysOnTop: true,
        webPreferences: {
            devTools: false
        },
    });
    splash.loadFile('public/splash.html');
    splash.removeMenu()
}

// Disable hardware acceleration.
// https://electronjs.org/docs/tutorial/offscreen-rendering
app.disableHardwareAcceleration()

app.allowRendererProcessReuse = true;

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.whenReady().then(() => {
    //Create windows
    // if (process.platform !== 'linux') {
    createSplash();
    // }
    createWindow();

    //Install dev extensions
    if (dev) {
        installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
            .then((name) => console.log('Added Extensions'))
            .catch((err) => console.log('An error occurred: ', err));
    }

    //Register IPC
    ipcRegister();

    mainWindow.once('ready-to-show', () => {
        // if (process.platform !== 'linux') {
        splash.destroy();
        // }
        mainWindow.show();

        //check update
        if (true || !dev) {
            const updater = new AppUpdater();
            updater.checkUpdate();
        }
    });
});

// Quitter si toutes les fenêtres ont été fermées.
app.on('window-all-closed', () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }

    //remove token
    if (storeGet(CONFIG.STORAGE.REMEMBER_ME.KEY) !== true) {
        console.log('on close, clear token')
        store.delete(CONFIG.STORAGE.REMEMBER_ME.KEY);
    } else {
        console.log('on close, keep token', storeGet(CONFIG.STORAGE.REMEMBER_ME.KEY))
    }
})

app.on('activate', () => {
    // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (mainWindow === null) {
        createWindow()
    }
})

process.on('uncaughtException', (err) => {
    // console.log('main err', err.stack)
    const log = require('electron-log');
    log.error('[ScandiCraft] uncaughtException on main', err.stack)

    const IPC_CONFIG = require('../config/ipc.json');

    mainWindow.send(IPC_CONFIG.UNCAUGHT_EXCEPTION, err.stack);
});

export function getMainWindow() {
    return mainWindow;
}