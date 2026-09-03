
function echo(text){
    window.electronAPI.exec(["echo",[text]])
}