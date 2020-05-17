const { app, BrowserWindow } = require('electron')
const { AppUpdater } = require('./auto-update/updater')

let dev = false;
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
    dev = true;
}

let mainWindow = null; //pass garbage collector

function createWindow() {
    // Cree la fenetre du navigateur.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        hasShadow: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // et charger le fichier index.html de l'application.
    mainWindow.loadFile('index.html')

    //TODO Menu

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

app.allowRendererProcessReuse = true;

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.whenReady().then(createWindow)

// Quitter si toutes les fenêtres ont été fermées.
app.on('window-all-closed', () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (mainWindow === null) {
        createWindow()
    }
})