const projects=[
 {id:"observations",number:"07",name:"ALL OBSERVATIONS",sub:"Interface observations, product patterns and design concepts",cats:["Design","Experiments"],date:"FIELD NOTES / ONGOING",problem:"Small interface decisions reveal larger product patterns. This is a working collection of observations, critiques and concepts across products.",what:["Collected interface observations across familiar products.","Explored interaction patterns, product logic and design opportunities.","Documented concepts that can be tested or developed further."],metrics:[["07","Project records"],["∞","Patterns to explore"],["01","Observation loop"]],stamp:"FIELD NOTES",screen:"FIELD NOTES",screenCopy:"Product details worth noticing, questioning and improving."},
 {id:"hitha",number:"06",name:"HITHA AGRITECH",sub:"Field Activity Management Platform for Farmers",cats:["Product","Design"],date:"PRODUCT / AGRITECH",problem:"Agricultural operations are coordinated through notebooks, messages and memory. Field teams need a reliable, timestamped record of what happens across farms.",what:["Designed a structured system for farm profiles and activity records.","Mapped day-to-day field logging for observations, inputs and crop stages.","Considered offline-first capture for field officers working with poor connectivity."],metrics:[["FARM","Profiles"],["FIELD","Activity logs"],["OFFLINE","Capture"],],stamp:"PRODUCT CASE STUDY",screen:"AGROTRACK",screenCopy:"A field activity record for farms, officers and operations teams."},
 {id:"statement",number:"05",name:"STATEMENT ANALYZER",sub:"AI-Powered Bank Statement Intelligence",cats:["Product","AI"],date:"PRODUCT / FINANCIAL AI",problem:"Manual bank-statement review is slow and inconsistent. Credit officers need structured insight into cash flow, income stability and borrower behaviour.",what:["Designed the credit-score dashboard and financial health overview.","Created advanced filters for investigating transaction patterns.","Designed contextual search suggestions and a reusable component system."],metrics:[["20 MIN","→ seconds"],["60%+","Filter usage"],["89%","Search adoption"]],stamp:"AI PRODUCT",screen:"STATEMENT ANALYZER",screenCopy:"Raw statement data becomes structured, reviewable financial insight."},
 {id:"trust",number:"04",name:"TRUST",sub:"Loan Workflow Orchestration Platform",cats:["Product","AI"],date:"ENTERPRISE / NBFC",problem:"Loan applications move across sales, operations, credit and field teams. Manual handoffs make ownership unclear and applications difficult to track.",what:["Designed role-based ownership and permissions across actors.","Structured the loan lifecycle as a non-skippable state machine.","Designed deviation handling and document lifecycle management."],metrics:[["ROLE","Ownership"],["STATE","Lifecycle"],["AUDIT","Deviations"]],stamp:"ENTERPRISE PRODUCT",screen:"TRUST",screenCopy:"A governed workflow that makes ownership and application state explicit."},
 {id:"performance",number:"03",name:"PERFORMANCE SYSTEM",sub:"Making incentives transparent and actionable for frontline sales",cats:["Product","Growth","Design"],date:"PRODUCT / INCENTIVE SYSTEM",problem:"Field sales teams could not see what they had earned or what actions would improve earnings. Incentives were complex, changed often and lived in spreadsheets and messages.",what:["Led discovery with salespeople, accounting and finance.","Shaped flows for live earnings, potential earnings and actionable guidance.","Worked with the team on product direction and UX."],metrics:[["50% → 25%","Sales attrition"],["~15%","Higher disbursement"],["80+","Asked where it went"]],stamp:"PRODUCT CASE STUDY",screen:"PERFORMANCE SYSTEM",screenCopy:"Turn incentive rules into live earnings visibility and next actions."},
 {id:"loopx",number:"02",name:"LOOPX",sub:"Agentic Growth Strategist for D2C Brands",cats:["Product","Growth","AI"],date:"PRODUCT / AI / GROWTH",problem:"D2C brands often apply retention offers uniformly. A human strategist cannot continuously analyse the customer and margin signals needed to make each decision precise.",what:["Developed a six-agent growth intelligence platform concept.","Defined specialist agents for insights, strategy, segmentation, offers and playbooks.","Designed a continuous loop from customer signals to margin-aware action."],metrics:[["06","Specialist agents"],["100+","Customer features"],["DAILY","Signal analysis"]],stamp:"PRODUCT CONCEPT",screen:"LOOPX",screenCopy:"Customer signals become margin-aware growth strategies and action plans."},
 {id:"growx",number:"01",name:"GROWX",sub:"Prompt-to-Production Growth Experimentation Platform",cats:["Product","Growth","AI","Experiments"],date:"PRODUCT / GROWTH / EXPERIMENTS",problem:"Growth experiments were slow, manual and scattered across tools, making it hard to iterate and learn quickly.",what:["Designed the end-to-end experiment flow.","Built the v1 product with a prompt-to-build flow.","Shipped core growth experiments for a D2C use case.","Iterated based on usage and early results."],metrics:[["50%","Faster experiments"],["15%","Lift in conversions"],["3×","More tests per week"]],stamp:"PRODUCT CASE STUDY",screen:"GROWX",screenCopy:"Run growth experiments from a prompt."}
];
const files=document.getElementById("files"),filters=document.getElementById("filters");
const site=document.querySelector(".site"),dossier=document.getElementById("dossier"),closeFileButton=document.getElementById("closeFile");
let active="growx",activeFilter="All";
let fileIsOpen=false;
function makeFolder(p,slot){
 const b=document.createElement("button");b.type="button";b.className="file";b.dataset.id=p.id;b.dataset.slot=String(slot);b.style.setProperty("--offset",(slot*58.5)+"px");b.style.setProperty("--offset-mobile",(slot*49)+"px");b.style.setProperty("--indent",(slot*10)+"px");b.innerHTML='<span class="tab"></span><span class="file-name"></span><span class="file-num"></span><span class="file-desc"></span>';
 b.querySelector(".file-name").textContent=p.name;b.querySelector(".file-num").textContent=p.number;b.querySelector(".file-desc").textContent=p.sub;
 if(p.id==="growx")b.insertAdjacentHTML("beforeend",'<span class="halftone"></span><span class="paperclip"><svg viewBox="0 0 34 72" aria-hidden="true"><path d="M22 5c-9 0-14 6-14 15v36c0 8 4 12 10 12s10-4 10-12V19c0-5-3-8-7-8s-7 3-7 8v31" fill="none" stroke="#5b574f" stroke-width="4" stroke-linecap="round"/><path d="M22 5c-9 0-14 6-14 15v36c0 8 4 12 10 12s10-4 10-12V19c0-5-3-8-7-8s-7 3-7 8v31" fill="none" stroke="#d9d5ca" stroke-width="1.2" stroke-linecap="round"/></svg></span>');
 b.addEventListener("click",()=>openFile(p.id,b));return b;
}
function renderFiles(){
 files.innerHTML="";
 const filtered=projects.filter(p=>activeFilter==="All"||p.cats.includes(activeFilter));
 filtered.forEach((p,i)=>{const b=makeFolder(p,i);if(p.id===active)b.classList.add("selected");files.appendChild(b)});
 document.getElementById("plaqueCount").textContent=String(filtered.length).padStart(2,"0")+" RECORDS";
}
function openFile(id,trigger){
 if(fileIsOpen)return;
 const dossierStyle=getComputedStyle(dossier);
 const dossierLeft=parseFloat(dossierStyle.left)||0;
 const dossierTop=parseFloat(dossierStyle.top)||0;
 const dossierWidth=parseFloat(dossierStyle.width)||window.innerWidth;
 const dossierHeight=parseFloat(dossierStyle.height)||window.innerHeight;
 const fileRect=trigger.getBoundingClientRect();
 const originX=((fileRect.left+fileRect.width/2-dossierLeft)/dossierWidth)*100;
 const originY=((fileRect.top+fileRect.height/2-dossierTop)/dossierHeight)*100;
 dossier.style.setProperty("--origin-x",originX+"%");
 dossier.style.setProperty("--origin-y",originY+"%");
 selectProject(id);
 fileIsOpen=true;
 dossier.setAttribute("aria-hidden","false");
 document.body.classList.add("file-is-open");
 requestAnimationFrame(()=>site.classList.add("is-open-file"));
}
function closeFile(){
 if(!fileIsOpen)return;
 fileIsOpen=false;
 site.classList.remove("is-open-file");
 dossier.setAttribute("aria-hidden","true");
 document.body.classList.remove("file-is-open");
 const selected=files.querySelector('[data-id="'+active+'"]');
 if(selected)selected.focus({preventScroll:true});
}
function selectProject(id){
 const p=projects.find(x=>x.id===id);if(!p)return;active=id;
 renderFiles();
 document.getElementById("caseKicker").textContent="CASE "+p.number+" / 07";
 document.getElementById("docTitle").textContent=p.name;
 document.getElementById("docSub").textContent=p.sub;
 document.getElementById("docDate").textContent=p.date;
 document.getElementById("problem").textContent=p.problem;
 document.getElementById("what").innerHTML=p.what.map(x=>"<p>— "+x+"</p>").join("");
 document.getElementById("metrics").innerHTML=p.metrics.map(m=>'<div class="metric"><strong>'+m[0]+'</strong><span>'+m[1]+'</span></div>').join("");
 document.getElementById("stamp").textContent=p.stamp;
 document.getElementById("screenKicker").textContent=p.screen;
 document.getElementById("screenTitle").textContent=p.screen;
 document.getElementById("screenCopy").textContent=p.screenCopy;
 const spread=document.getElementById("spread");spread.classList.remove("changed");void spread.offsetWidth;spread.classList.add("changed");
}
filters.addEventListener("click",e=>{
 const b=e.target.closest(".filter");if(!b)return;activeFilter=b.dataset.filter;
 filters.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));
 const available=projects.filter(p=>activeFilter==="All"||p.cats.includes(activeFilter));
 if(!available.some(p=>p.id===active))active=available[0].id;
 renderFiles();selectProject(active);
});
renderFiles();selectProject(active);
closeFileButton.addEventListener("click",closeFile);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&fileIsOpen)closeFile();});
