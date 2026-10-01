const foods=[
{id:1,n:"Classic Burger",p:99,c:"Burgers",e:"🍔",d:"Juicy burger with fresh veggies and special sauce."},
{id:2,n:"Cheese Pizza",p:149,c:"Pizza",e:"🍕",d:"Cheesy, crispy and loaded with flavour."},
{id:3,n:"French Fries",p:59,c:"Sides",e:"🍟",d:"Golden crispy fries, perfect for sharing."},
{id:4,n:"Veg Sandwich",p:79,c:"Snacks",e:"🥪",d:"Fresh vegetables with creamy house spread."},
{id:5,n:"Cold Coffee",p:69,c:"Drinks",e:"🥤",d:"Chilled, creamy and refreshing."},
{id:6,n:"Chocolate Cake",p:89,c:"Desserts",e:"🍰",d:"Soft chocolate cake for a sweet finish."},
{id:7,n:"Veg Momos",p:89,c:"Snacks",e:"🥟",d:"Steamed momos with spicy dip."},
{id:8,n:"Masala Pasta",p:129,c:"Pasta",e:"🍝",d:"Creamy, spicy pasta with herbs."}
];
let cat="All",cart=[];
function cats(){let a=["All",...new Set(foods.map(x=>x.c))];document.querySelector("#cats").innerHTML=a.map(x=>`<button class="cat ${x==cat?"active":""}" onclick="cat='${x}';cats();render()">${x}</button>`).join("")}
function render(){let q=document.querySelector("#search").value.toLowerCase();let a=foods.filter(x=>(cat=="All"||x.c==cat)&&(x.n.toLowerCase().includes(q)||x.c.toLowerCase().includes(q)));document.querySelector("#products").innerHTML=a.length?a.map(x=>`<article class="card"><div class="photo">${x.e}</div><div class="body"><h3>${x.n}</h3><p>${x.d}</p><div class="row"><span class="price">₹${x.p}</span><button class="add" onclick="add(${x.id})">+ Add</button></div></div></article>`).join(""):`<div class="empty">No food found.</div>`}
function add(id){let x=cart.find(a=>a.id==id);x?x.q++:cart.push({id,q:1});update();openCart()}
function change(id,d){let x=cart.find(a=>a.id==id);if(!x)return;x.q+=d;if(x.q<1)cart=cart.filter(a=>a.id!=id);update()}
function update(){let n=cart.reduce((s,x)=>s+x.q,0),t=cart.reduce((s,x)=>{let f=foods.find(y=>y.id==x.id);return s+f.p*x.q},0);document.querySelector("#count").textContent=n;document.querySelector("#total").textContent=t;document.querySelector("#items").innerHTML=cart.length?cart.map(x=>{let f=foods.find(y=>y.id==x.id);return `<div class="item"><div><b>${f.n}</b><br>₹${f.p} × ${x.q}</div><div class="qty"><button onclick="change(${x.id},-1)">−</button> ${x.q} <button onclick="change(${x.id},1)">+</button></div></div>`}).join(""):`<div class="empty">Your cart is empty.</div>`}
function openCart(){document.querySelector("#drawer").classList.add("on");document.querySelector("#shade").classList.add("on")}
function closeCart(){document.querySelector("#drawer").classList.remove("on");document.querySelector("#shade").classList.remove("on")}
function whatsapp(){if(!cart.length)return alert("Please add an item first.");let total=0,msg="Hello Nice Price! I want to order:%0A%0A";cart.forEach(x=>{let f=foods.find(y=>y.id==x.id);total+=f.p*x.q;msg+=encodeURIComponent(f.n)+" x "+x.q+" = ₹"+(f.p*x.q)+"%0A"});msg+="%0ATotal: ₹"+total+"%0A%0AName:%0AAddress:";window.open("https://wa.me/919999999999?text="+msg,"_blank")}
cats();render();update();