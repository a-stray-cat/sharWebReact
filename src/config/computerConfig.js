var computer=JSON.parse(localStorage.getItem('computer'))
let computertypeUrl = []
for(let i in computer){
      if (computer[i]) {
        computertypeUrl.push({'type':computer[i].type,'key':computer[i].url,'name':computer[i].name});
      }
}

const computerList = Array.from(computertypeUrl)
export default computerList