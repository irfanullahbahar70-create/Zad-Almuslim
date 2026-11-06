const content=document.getElementById("content");

function show(page){
let html="";

if(page==="quran"){
html=`
<h2>📖 قرآن کریم</h2>
<p>د قرآن کریم د مطالعې برخه.</p>
<p>د عربي متن او پښتو ژباړې بشپړ او باوري معلومات به په راتلونکي پړاو کې ورزیاتوو.</p>
<a href="https://tanzil.net/" target="_blank">د قرآن کریم آنلاین متن</a>
`;
}

if(page==="azkar"){
html=`
<h2>📿 د ذکر شمېرونکی</h2>
<p>سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</p>
<h2 id="count">0</h2>
<button class="action" onclick="zikr()">ذکر وشمېره</button>
<button class="action" onclick="resetZikr()">له سره پیل</button>
`;
}

if(page==="books"){
html=`
<h2>📚 اسلامي کتابتون</h2>
<p>د اسلامي کتابونو د مطالعې برخه.</p>
<p><a href="https://waqfeya.net/" target="_blank">المکتبة الوقفیة</a></p>
<p><a href="https://shamela.ws/" target="_blank">المکتبة الشاملة</a></p>
<p>کتابونه به د حقونو او باوري نسخو له ارزونې وروسته ورزیاتوو.</p>
`;
}

if(page==="deeds"){
let tasks=["پنځه وخته لمونځ","د قرآن تلاوت","سهار اذکار","ماښام اذکار","استغفار","درود شریف","صدقه","د مور او پلار خدمت"];
html="<h2>🌙 د نن ورځې نېک اعمال</h2>";
tasks.forEach((t,i)=>{
html+=`<label><input type="checkbox" class="task" data-id="${i}"> ${t}</label><br>`;
});
html+=`<button class="action" onclick="saveTasks()">اعمال ثبت کړه</button>`;
html+=`<p id="saved"></p>`;
}
if(page==="report"){
let tasks=JSON.parse(localStorage.getItem("deeds")||"[]");
html=`<h2>📊 د اعمالو راپور</h2>
<p>نن ثبت شوي اعمال: ${tasks.filter(Boolean).length}</p>
<p>ټول اعمال: 8</p>`;
}
if(page==="about"){
html=`
<h2>زاد المسلم</h2>
<p>دا اپلیکیشن د قرآن، اذکارو، اسلامي زده کړو او ورځنیو نېکو اعمالو لپاره جوړېږي.</p>
<p>الله تعالی دې دا د ټولو مسلمانانو لپاره د خیر وسیله وګرځوي.</p>`;
}
content.innerHTML=html;
if(page==="deeds") loadTasks();
}

function zikr(){
let n=Number(localStorage.getItem("zikr")||0)+1;
localStorage.setItem("zikr",n);
document.getElementById("count").innerText=n;
}
function resetZikr(){
localStorage.setItem("zikr",0);
document.getElementById("count").innerText=0;
}
function saveTasks(){
let values=[...document.querySelectorAll(".task")].map(x=>x.checked);
localStorage.setItem("deeds",JSON.stringify(values));
document.getElementById("saved").innerText="ستاسو اعمال ثبت شول.";
}
function loadTasks(){
let values=JSON.parse(localStorage.getItem("deeds")||"[]");
document.querySelectorAll(".task").forEach((x,i)=>x.checked=!!values[i]);
}
if("serviceWorker" in navigator){
navigator.serviceWorker.register("./sw.js");
}
