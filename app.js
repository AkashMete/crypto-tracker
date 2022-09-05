const form = document.querySelector('#searchForm');
const result = document.querySelector('#tableResult');
const cont = document.getElementById("allContaint");
var update;
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(update){
        clearTimeout(update);
    }
    const ctype = form.elements.coinType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main'); 
    fetchPrice(ctype);
});

const fetchPrice=async(ctype) => {
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    console.log(r);
    const price = r.data.coin.price;
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const base = r.data.coin.name;
    const target = 'USD';

    result.innerHTML = `<tr>
    <th>Property</th>
    <th>Value</th>
</tr>
<tr>
    <td>${base}</td>
    <td>${price} ${target}</td>
</tr>
    <tr>
        <td>Volume</td>
        <td>${volume}</td>
    </tr>
    <tr>
        <td>Change</td>
        <td>${change}</td>
    </tr>`
 
    update = setTimeout(()=>fetchPrice(ctype),10000);


}