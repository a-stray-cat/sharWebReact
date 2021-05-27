var web=JSON.parse(localStorage.getItem('web'))
// console.log(web)
let webtypeUrl = []
for(let i in web){
      if (web[i]) {
        webtypeUrl.push({'type':web[i].type,'key':web[i].url,'name':web[i].name});
      }
}
console.log(webtypeUrl)

const webList = webtypeUrl
console.log(webList)