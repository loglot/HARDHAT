
var mods
var pagemod=document.getElementById("modflex")
var mme =document.getElementById("modmanage")
var mls = document.getElementById("modslist")
var mm =document.getElementById("modman")
var mr =document.getElementById("modrefresh")
var md =document.getElementById("moddown")
var disabled=[]
var modcount=0
function disableMod(file){
    disabled.push(file.replaceAll("\r", ""))
}
function installmod(url,fname,mod){
    window.electronAPI.exec(['./SH/installMod.sh', [
        url,fname,installpath,mod
    ]])

}
function manage(name,type){
    window.electronAPI.exec(['./SH/manageMod.sh', [
        installpath,name,type
    ]])
    let remove = document.getElementsByClassName("MOD-"+name.replaceAll(" ",""));
    // remove.pop()
    if(type=="remove"){
        for (let i = 0; i<remove.length;i++){
            remove[i].style.display="none"
        }

    }
    if(type=="disable"){
            console.warn(remove)
        for (let i = 0; i<remove.length;i++){
            disabled.push(name)
            remove[i].children[0].children[1].style.color="#635a74"
            remove[i].children[1].children[1].onclick=function() { manage(name, "enable") }
            remove[i].children[1].children[1].innerHTML=`enable`
        }

    }
    if(type=="enable"){
        for (let i = 0; i<remove.length;i++){
            disabled = disabled.filter(e => e !== name)
            remove[i].children[0].children[1].style.color="#c8bfd8"
            remove[i].children[1].children[1].onclick=function() { manage(name, "disable") }
            remove[i].children[1].children[1].innerHTML=`disable`
        }

    }
}
function populateMod(namne){// skrew it, this typo is canon now
    modcount+=1
    namne=namne.replaceAll("/","")
    console.log(disabled.includes(namne), disabled)
    var modgone=disabled.includes(namne)
    mls.insertAdjacentHTML("beforeend",`

            <div class="file flex MOD-${namne.replaceAll(" ","")}">
                <div class="flex">
                <h2 style="margin-left:5px; color:#635a74;">${modcount}: </h2>
                <h2 style="margin-left:20px;${
                    modgone?
                        `color:#635a74;"`:
                        `"`
                    }>${namne}</h2>
                </div>
                <div style="height:100%; ">
                    <button class="warn" onclick='manage(
                            "${namne}", "remove"
                        )'>uninstall</button>

                    ${modgone?
                        `<button onclick='manage(
                            "${namne}", "enable"
                        )'>enable</button>`:

                        `<button onclick='manage(
                            "${namne}", "disable"
                        )'>disable</button>`
                    }

                    ${namne.split(".").pop()=="zip"?

                    `<button onclick='manage(
                            "${namne}", "unzip"
                        )'>unzip</button>` : 
                        namne.split(".").length==1 ?
                    `<button onclick='manage(
                            "${namne}", "unpack"
                        )'>unpack</button>`:''
                    }
                </div>
            </div>
    `)
}
async function mod(){
    const versions = await fetch("https://gamebanana.com/apiv12/Game/9985/Subfeed")
    pagemod.innerHTML=""
    if(!versions.ok){
        throw new Error("Could Not Fetch Mods")
        pagemod.innerHTML="<h1 class='warn'>Could Not Fetch Mods</h1>"
    }else{
        var obj= await versions.json()
        var list=obj._aRecords
        mods=list
        // console.log(list)
        // console.log(list._aRecords)
        for(let i = 0; i<list.length;i++){
            if(list[i]._aRootCategory._sName=="HAT Mods"){
                var img=list[i]._aPreviewMedia._aImages[0]
                const mod = await fetch("https://gamebanana.com/apiv12/Mod/"+list[i]._idRow+"/ProfilePage")
                var modobj= await mod.json()
                var file = modobj._aFiles[0]
                console.log(modobj)
                pagemod.insertAdjacentHTML('beforeend',`
                    <div class="mod" id="${file._sFile}">
                        <img class="modimg" src="${img._sBaseUrl+"/"+img._sFile}">
                        <h2>${list[i]._sName}</h2>
                        <p>${modobj._sDescription}</p>
                        <button onclick='installmod(
                            "${file._sDownloadUrl}",
                            "${file._sFile}",
                            "${list[i]._sName}"
                        )'>Install</button>
                        <a href="${list[i]._sProfileUrl}"><button>Open Mod Page</button></a>
                    </div>
                `)
            }
        }
    }
}
function refresh(){
    modcount=0
    mls.innerHTML=""
    modpacks.innerHTML=""
    disabled=[]
    window.electronAPI.exec(['./SH/find.sh',[]])
}
mr.addEventListener("click",(e)=>{
    refresh()
    mod()
})
mm.addEventListener("click",(e)=>{
    md.classList.remove("active");
    mm.classList.add("active");
    pagemod.style.display="none"
    mme.style.display="block"
})
md.addEventListener("click",(e)=>{
    mm.classList.remove("active");
    md.classList.add("active");
    pagemod.style.display="flex"
    mme.style.display="none"
})