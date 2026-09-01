
var mps =document.getElementById("mps")
var mpl =document.getElementById("mpl")
var modpacks =document.getElementById("modpackslist")

var modpackList={}

function mpMan(name,command){
  window.electronAPI.exec(["./SH/"+command,[name,installpath]])
  refresh()
  if(command=="load.sh"){
    openmodpage()
  }
}
function populateModpack(namne,count){
  // modpackList[name]=name
  // console.log(modpackList)
    modpacks.insertAdjacentHTML("beforeend",`

            <div class="file flex MODPACK-${namne.replaceAll(" ","")}">
                <div class="flex">
                  <h2>${namne}</h2>
                  <h2 style="color:#635a74; margin-left:20px;">Mods:${count}</h2>  
                </div>
                <div style="height=100%">
                  <button class="warn" 
                    onclick='mpMan("${namne}","delmp.sh")'
                  >delete</button>
                  <button
                    onclick='mpMan("${namne}","load.sh")'
                  >load</button>
                </div>
            </div>
    `)
}
function openmodpage(){

  modpacks.style.display="none";
  mls.style.display="block"
  mps.classList.add("active");
  mpl.classList.remove("active");
}
mps.addEventListener("click",(e)=>{
  // mpSave()
  openmodpage()
})
mpl.addEventListener("click",(e)=>{
  // mpLoad()
  mls.style.display="none";
  modpacks.style.display="block"
  mpl.classList.add("active");
  mps.classList.remove("active");
})