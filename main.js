const { app, BrowserWindow, ipcMain } = require('electron')
const os = require('os')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process');
var window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  window=win

}
function execute(e,command, callback=(e)=>{
    window.webContents.send("log",e)
}){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
    
};
function expandHome(inp) {
    if (inp.startsWith('~')) {
        return path.join(os.homedir(), inp.slice(1));
    }
    return inputPath;
}
function write(e,file,content){
    // console.log(file)
    fs.writeFileSync(expandHome(file), content, 'utf-8');
}
app.whenReady().then(() => {
  createWindow()
  ipcMain.on('write', write)
  ipcMain.on('exec', execute)
    console.log(os.platform())
})