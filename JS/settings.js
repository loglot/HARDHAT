var setlist=document.getElementById("settingslist")
// setting variables in pre.js to fix race condition

var settings=[
    ["Reduced Motion",["flipset","redmotion"],false],
    ["Performance Mode",["flipset","perform"],false]
]
for (i in settings){
    setlist.insertAdjacentHTML("beforeend",
        `
        
        <div class="file flex">
            <h2 style="margin-left:20px;">${settings[i][0]}</h2>
            <button class="checkbox" style="margin-right:20px" id="setting${i}" onclick='handle(this,${i},${settings[i][1][0]},"checkbox","${settings[i][1][1]}")'>x</button>
        </div>
        `

    )
}
function handle(button,id,func,type,vari){
    var res=func(vari)
    if(type=="checkbox"){
        setcheck(button, res)
    }
    save(res,id+1)

}
function setcheck(button, res){
    button.innerHTML=res?"✓":"x"
    var c=res?"#453f5c":"#150d20"
    var bc=res?"#696480":"#322747"
    button.style.backgroundColor=c
    button.style.color=c
    button.style.borderColor=bc
}
function flipset(vari,it="flip"){
    if(it=="flip"){
        set[vari]=!set[vari]
    }else{
        set[vari]=it
    }
    return (set[vari])
}
function save(vari, id){
    window.electronAPI.exec(["./SH/settings.sh",["change",id,vari]])

}
function setSetting(strnum,strval){
    var num = parseInt(strnum)
    var val=""
    if(strval=="true"){
        val=true
    }else if(strval=="false"){
        val=false
    }else{
        val=strval
    }
    set[settings[val][1][1]]=val

} 