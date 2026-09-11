
function echo(text){
    window.electronAPI.exec(["echo",[text]])
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
var set={
    redmotion:false,
    perform:false
}