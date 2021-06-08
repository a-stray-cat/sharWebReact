var app=JSON.parse(localStorage.getItem('app'))
let apptypeUrl = []
for(let i in app){
      if (app[i]) {
        apptypeUrl.push({'type':app[i].type,'key':app[i].url,'name':app[i].name});
      }
}

const appList = Array.from(apptypeUrl)
export default appList