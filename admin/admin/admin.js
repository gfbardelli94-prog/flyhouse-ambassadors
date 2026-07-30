const STORAGE_KEY = 'flyhouse_reservations_v1';
const seed = [
  {id:1,client:'María Torres',phone:'',property:'Las Terrazas · Naplo',ambassador:'Jozef Jauregui',checkin:'2026-08-15',checkout:'2026-08-17',amount:1800,status:'Confirmada',notes:'Reserva de ejemplo'},
  {id:2,client:'Carlos Mendoza',phone:'',property:'Las Terrazas · Naplo',ambassador:'Jozef Jauregui',checkin:'2026-08-22',checkout:'2026-08-24',amount:1600,status:'Pendiente',notes:'Reserva de ejemplo'},
  {id:3,client:'Lucía Ramos',phone:'',property:'Las Terrazas · Naplo',ambassador:'Venta directa',checkin:'2026-09-05',checkout:'2026-09-07',amount:1750,status:'Consulta',notes:'Reserva de ejemplo'}
];
let reservations = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || seed;
const money = n => `S/ ${Number(n || 0).toLocaleString('es-PE',{minimumFractionDigits:0,maximumFractionDigits:2})}`;
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
const commissionOf = r => r.ambassador === 'Jozef Jauregui' && r.status === 'Confirmada' ? Number(r.amount)*0.10 : 0;

const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item');
function setView(id){views.forEach(v=>v.classList.toggle('active',v.id===id));navItems.forEach(n=>n.classList.toggle('active',n.dataset.view===id));document.getElementById('pageTitle').textContent=id.charAt(0).toUpperCase()+id.slice(1);document.getElementById('sidebar').classList.remove('open');}
navItems.forEach(n=>n.addEventListener('click',()=>setView(n.dataset.view)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.go)));
document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));

document.getElementById('todayLabel').textContent = new Intl.DateTimeFormat('es-PE',{day:'numeric',month:'long',year:'numeric'}).format(new Date());

function render(){
  const confirmed = reservations.filter(r=>r.status==='Confirmada');
  const revenue = confirmed.reduce((s,r)=>s+Number(r.amount),0);
  const commission = confirmed.reduce((s,r)=>s+commissionOf(r),0);
  document.getElementById('statReservations').textContent=confirmed.length;
  document.getElementById('statRevenue').textContent=money(revenue);
  document.getElementById('statCommission').textContent=money(commission);
  document.getElementById('statPending').textContent=money(commission);
  const jozef = confirmed.filter(r=>r.ambassador==='Jozef Jauregui');
  const jozefRevenue = jozef.reduce((s,r)=>s+Number(r.amount),0);
  const jozefCommission = jozefRevenue*.10;
  ['jozefReservations','ambReservations'].forEach(id=>document.getElementById(id).textContent=jozef.length);
  ['jozefCommission','ambCommission'].forEach(id=>document.getElementById(id).textContent=money(jozefCommission));
  document.getElementById('ambSales').textContent=money(jozefRevenue);
  renderRecent(); renderTable();
}
function renderRecent(){
  const el=document.getElementById('recentReservations');
  const rows=[...reservations].sort((a,b)=>b.id-a.id).slice(0,5);
  el.innerHTML=rows.length?rows.map(r=>`<div class="reservation-item"><div><strong>${escapeHtml(r.client)}</strong><span>${escapeHtml(r.property)} · ${escapeHtml(r.status)}</span></div><div class="amount"><strong>${money(r.amount)}</strong><small>${r.checkin||'Sin fecha'}</small></div></div>`).join(''):'<p class="muted">No hay actividad todavía.</p>';
}
function renderTable(){
  const q=document.getElementById('searchInput').value.toLowerCase(); const status=document.getElementById('statusFilter').value;
  const filtered=reservations.filter(r=>(status==='all'||r.status===status)&&`${r.client} ${r.property} ${r.ambassador}`.toLowerCase().includes(q));
  document.getElementById('reservationTable').innerHTML=filtered.map(r=>`<tr><td><strong>${escapeHtml(r.client)}</strong><br><small>${escapeHtml(r.phone||'')}</small></td><td>${escapeHtml(r.property)}</td><td>${escapeHtml(r.ambassador)}</td><td>${r.checkin||'—'}<br>${r.checkout||'—'}</td><td>${money(r.amount)}</td><td><span class="status-pill ${r.status.toLowerCase()}">${r.status}</span></td><td>${money(commissionOf(r))}</td><td><button class="delete-btn" data-delete="${r.id}" title="Eliminar">Eliminar</button></td></tr>`).join('');
  document.getElementById('emptyState').style.display=filtered.length?'none':'block';
  document.querySelectorAll('[data-delete]').forEach(b=>b.addEventListener('click',()=>{if(confirm('¿Eliminar esta reserva?')){reservations=reservations.filter(r=>r.id!==Number(b.dataset.delete));save();render();}}));
}
function escapeHtml(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

document.getElementById('searchInput').addEventListener('input',renderTable); document.getElementById('statusFilter').addEventListener('change',renderTable);
const modal=document.getElementById('reservationModal');
function openModal(){modal.showModal();}
function closeModal(){modal.close();document.getElementById('reservationForm').reset();}
document.getElementById('newReservation').addEventListener('click',openModal);document.getElementById('closeModal').addEventListener('click',closeModal);document.getElementById('cancelModal').addEventListener('click',closeModal);
document.getElementById('reservationForm').addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));reservations.push({...data,id:Date.now(),amount:Number(data.amount)});save();closeModal();render();setView('reservas');showToast('Reserva guardada');});
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.dataset.copy);showToast('Enlace copiado');}catch{showToast('Copia el enlace desde la barra del navegador');}}));
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);}
save();render();
