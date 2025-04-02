const SearchsSetTime = async(status, sharch)=>{
const lodingAdd = document.getElementById('loding-hidden')
lodingAdd.classList.add('hidden')

const fetchData = await fetch(`https://openapi.programming-hero.com/api/phones?search=${sharch ? sharch : 'iphone'}`)
const jsonData = await fetchData.json()
 console.log(jsonData)
if(status){
DataApenChild(jsonData.data) 
}
else{
DataApenChild(jsonData.data.slice(0, 9), sharch)
}

if(sharch === true || sharch.length > 0){
    document.getElementById('error-hidden').classList.add('hidden')
    document.getElementById('data-card','max-sm:hidden').classList.remove('hidden')
}
else if(sharch.length === 0 || sharch === false){
    document.getElementById('error-hidden').classList.remove('hidden')
    document.getElementById('data-card').classList.add('hidden','max-sm:hidden')
} 
}


const DataApenChild = (mobail)=>{


const dataCard = document.getElementById('data-card')
dataCard.innerHTML = ""; 
mobail.forEach((p)=>{
    const {brand,image,phone_name,slug } = p

const creatData = document.createElement('div')

creatData.innerHTML = `
<div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img class="mt-2"
      src="${image}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${brand}</h2>
    <p class="text-lg">${phone_name}</p>
    <p>${slug}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary" onclick="ShowModal('${slug}')">Buy Now</button>
    </div>
  </div>
</div>
`
creatData.classList.add('shadow-2xl')
dataCard.appendChild(creatData)
})
}

const ShowAll = ()=>{
SearchsSetTime(true);
}

const ShowModal = async(slugs)=>{
  const modalDetail = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`) 
  const DetailJson = await modalDetail.json()
console.log(DetailJson)
console.log(DetailJson.mainFeatures)
console.log(slugs)
const shoModal = document.getElementById('shoModal')

const {
  status,
  data: {
    brand = "N/A",
    name = "N/A",
    mainFeatures: { 
      chipSet = "N/A", 
      displaySize = "N/A", 
      memory = "N/A", 
      sensors = [] 
    } = {}, 
    others = {} 
  } = {} 
} = DetailJson;

const {
  Bluetooth = "N/A",
  GPS = "N/A",
  NFC = "N/A",
  Radio = "N/A",
  USB = "N/A",
  WLAN = "N/A"
} = others;

shoModal.innerHTML = `

<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">${brand}</h3>
    <h3 class="text-lg">name : ${name}</h3>
    <p class="py-4">chipSet : ${chipSet}</p>
    <p class="py-4">displaySize : ${displaySize}</p>
    <p class="py-4">memory : ${memory}</p>
    <p class="py-4">sensors : ${sensors.join(", ")}</p>
    <p class="py-4">Bluetooth : ${Bluetooth}</p>
    <p class="py-4">GPS : ${GPS}</p>
    <p class="py-4">NFC : ${NFC}</p>
    <p class="py-4">Radio : ${Radio}</p>
    <p class="py-4">USB : ${USB}</p>
    <p class="py-4">WLAN : ${WLAN}</p>
  
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
`
my_modal_1.showModal()
}

const ClicSearch = () =>{
const lodingHidden = document.getElementById('loding-hidden')
lodingHidden.classList.remove('hidden');
const defaultSearch = document.getElementById('default-search').value
console.log(defaultSearch)
setTimeout(()=>{
    SearchsSetTime(false, defaultSearch)
},3000)
}


SearchsSetTime()





// const {status,data: { brand , name , mainFeatures: { chipSet = "N/A", displaySize = "N/A", memory = "N/A", sensors = []  } = {},  others = {} } ={} } = DetailJson;

// const {
//   Bluetooth = "N/A",
//   GPS = "N/A",
//   NFC = "N/A",
//   Radio = "N/A",
//   USB = "N/A",
//   WLAN = "N/A"
// } = others;