
var mps =document.getElementById("mps")
var mpl =document.getElementById("mpl")

var modpackList={}

function mpSave(){
  Swal.fire({
    title: 'Save',
    theme: 'dark',
    input: "text",
  showCancelButton: true,
  }).then((result) => {
    console.log(result)
    if (result.isConfirmed){
      if(result.value==""){
        window.electronAPI.exec(['./SH/title.sh',[`Modpack not saved; no name given`,"-error"]])
        return
      }
      window.electronAPI.exec(['./SH/save.sh',[result.value,installpath]])
      return
    }
    window.electronAPI.exec(['./SH/title.sh',[`Modpack not saved; canceled`,"-error"]])
  });

}
function mpLoad(){
  Swal.fire({
    title: 'Load',
    input: "select",
    theme: 'dark',
  showCancelButton: true,
    inputOptions: modpackList,
  }).then((result) => {
    console.log(result)
    if (result.isConfirmed){
      if(result.value==""){
        window.electronAPI.exec(['./SH/title.sh',[`Modpack not loaded; no name given`,"-error"]])
        return
      }
      window.electronAPI.exec(['./SH/load.sh',[result.value,installpath]])
      refresh()
      return
    }
    window.electronAPI.exec(['./SH/title.sh',[`Modpack not loaded; canceled`,"-error"]])
  });

}
function populateModpack(name){
  modpackList[name]=name
  console.log(modpackList)
}
mps.addEventListener("click",(e)=>{
  mpSave()
})
mpl.addEventListener("click",(e)=>{
  mpLoad()
})