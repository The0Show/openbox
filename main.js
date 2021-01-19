const electron = require('electron')
const url = require('url')
const path = require('path');
const { dialog } = require('electron')
const { clipboard } = require('electron')
const { session } = require('electron')
const client = require('discord-rich-presence')('793657552663216158');

const {app, BrowserWindow, Menu} = electron

let mainWindow

app.on('ready', function(){
    mainWindow = new BrowserWindow({});
    mainWindow.setSize(1000, 1000)
    mainWindow.center()
    mainWindow.setTitle('OpenBox')
    mainWindow.setIcon('./website/icon_shadow_192.png')
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './website/openbox-app/beepbox_offline.html'),
        protocol: 'file:',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)

    client.updatePresence({
        state: 'Making some music',
        largeImageKey: 'icon_shadow_512',
        startTimestamp: Date.now(),
        smallImageText: 'with OpenBox',
        instance: true,
    });

    const options = {
        type: 'warning',
        buttons: ['OK'],
        defaultId: 0,
        title: 'Scam Warning',
        message: 'This software must not be sold, neither alone nor as part of a bundle. If you paid for this software or receved it as part of a bundle following payment, you have been scammed and should demand your money back immediately.',
        detail: 'Learn more at https://example.com',
        checkboxLabel: 'Don\'t show this again',
        checkboxChecked: true,
    }
    
    dialog.showMessageBox(null, options, (response, checkboxChecked) => {

    })

})

const mainMenuTemplate = [
    {
        label: "File",
        submenu:[
        {
            label: "Share Song",
            click(){
                const result = dialog.showMessageBoxSync(mainWindow, {type: "info", title:"BeepBox Offline", message:"How would you like to share your song URL?", buttons:["Copy Player Link", "Copy Editor Link", "Copy TinyURL Link", "Cancel"]})
                if(result == 0){
                    const rawurl = mainWindow.webContents.getURL().split('#');
                    console.log(rawurl)
                    const songcode = '#' + rawurl[1]
                    console.log(songcode)
                    const playerurl = rawurl[0].replace("beepbox_offline.html", "") + '/player/' + songcode
                    console.log(playerurl)

                    clipboard.writeText(playerurl, 'selection')
                }
                if(result == 1) clipboard.writeText(mainWindow.webContents.getURL(), 'selection')
            }
        }
        ]
    }
]