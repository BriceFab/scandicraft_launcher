const { app, BrowserWindow } = require('electron')
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import AppUpdater from './auto-update/updater';
import ipcRegister from './communication/ipc';
import CONFIG from '../config/config.json';

let dev = false;
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
    dev = true;
}

let mainWindow = null; //pass garbage collector

function createWindow() {
    // Cree la fenetre du navigateur.
    mainWindow = new BrowserWindow({
        minWidth: 750,
        minHeight: 450,
        width: 950,
        height: 650,
        hasShadow: false,
        // frame: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: dev
        },
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

    //check update
    if (!dev) {
        const updater = new AppUpdater();
        updater.checkUpdate();
    }
}

// Disable hardware acceleration.
// https://electronjs.org/docs/tutorial/offscreen-rendering
app.disableHardwareAcceleration()

app.allowRendererProcessReuse = true;

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.whenReady().then(() => {
    createWindow();

    //Install dev extensions
    if (dev) {
        installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
            .then((name) => console.log('Added Extensions'))
            .catch((err) => console.log('An error occurred: ', err));
    }

    //Register IPC
    ipcRegister();
});

// Quitter si toutes les fenêtres ont été fermées.
app.on('window-all-closed', () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }

    //remove token
    const Store = require('electron-store');
    const store = new Store();

    if (store.get(CONFIG.STORAGE.REMEMBER_ME.KEY) === undefined || store.get(CONFIG.STORAGE.REMEMBER_ME.KEY) !== true) {
        console.log('on close, clear token')
        store.delete(CONFIG.STORAGE.REMEMBER_ME.KEY);
    } else {
        console.log('on close, keep token', store.get(CONFIG.STORAGE.REMEMBER_ME.KEY))
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
    console.log('main err')

    //TODO Passe ton renderer
});

export function getMainWindow() {
    return mainWindow;
}