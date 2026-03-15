const API = "/jobs"
let editId = null
let calendar = null
let reminded = new Set()

/* Ask notification permission */

if ("Notification" in window && Notification.permission !== "granted") {
Notification.requestPermission()
}
/* ---------------- LOAD JOBS ---------------- */

function loadJobs(){

fetch(API)
.then(res => res.json())
.then(data => {

const search = document.getElementById("search").value.toLowerCase()
const filter = document.getElementById("filterStatus").value

const table = document.getElementById("jobTable")
table.innerHTML=""

/* ---------- Statistics ---------- */

let total = data.length
let applied = 0
let interview = 0
let offer = 0
let rejected = 0

data.forEach(job => {

if(job.status==="Applied") applied++
if(job.status==="Interview") interview++
if(job.status==="Offer") offer++
if(job.status==="Rejected") rejected++

})

document.getElementById("totalJobs").innerText = total
document.getElementById("appliedJobs").innerText = applied
document.getElementById("interviewJobs").innerText = interview
document.getElementById("offerJobs").innerText = offer
document.getElementById("rejectedJobs").innerText = rejected

/* ---------- Reminder Check ---------- */

checkInterviewReminders(data)

/* ---------- Table Rendering ---------- */

data
.filter(job =>
(job.company.toLowerCase().includes(search) ||
job.role.toLowerCase().includes(search))
)
.filter(job =>
filter=="" || job.status==filter
)
.forEach(job => {

table.innerHTML += `

<tr>
<td>${job.id}</td>
<td>${job.company}</td>
<td>${job.role}</td>

<td>
<span class="status ${job.status.toLowerCase()}">
${job.status}
</span>
</td>

<td>${job.interviewDate ? job.interviewDate : "-"}</td>

<td>

<button class="edit-btn"
onclick="editJob(${job.id},'${job.company}','${job.role}','${job.status}','${job.interviewDate || ""}')">
Edit
</button>

<button class="delete-btn"
onclick="deleteJob(${job.id})">
Delete
</button>

</td>

</tr>
`

})

/* ---------- Calendar Events ---------- */

if(calendar){

calendar.removeAllEvents()

data.forEach(job => {

if(job.status==="Interview" && job.interviewDate){

calendar.addEvent({
title: job.company + " Interview",
start: job.interviewDate,
color:"#ecc94b"
})

}

})

}

})

}

/* ---------------- ADD OR UPDATE JOB ---------------- */

function addJob(){

const company = document.getElementById("company").value
const role = document.getElementById("role").value
const status = document.getElementById("status").value
const interviewDate = document.getElementById("interviewDate").value

if(editId === null){

fetch(API,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({company,role,status,interviewDate})
})
.then(()=>loadJobs())

}else{

fetch(API+"/"+editId,{
method:"PUT",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({company,role,status,interviewDate})
})
.then(()=>{
editId=null
loadJobs()
})

}

/* Clear form */

document.getElementById("company").value=""
document.getElementById("role").value=""
document.getElementById("status").value=""
document.getElementById("interviewDate").value=""

}

/* ---------------- DELETE ---------------- */

function deleteJob(id){

fetch(API+"/"+id,{
method:"DELETE"
})
.then(()=>loadJobs())

}

/* ---------------- EDIT ---------------- */

function editJob(id,company,role,status,interviewDate){

editId = id

document.getElementById("company").value = company
document.getElementById("role").value = role
document.getElementById("status").value = status
document.getElementById("interviewDate").value = interviewDate

}

/* ---------------- CALENDAR BUTTON ---------------- */

document.getElementById("calendarBtn").onclick = function(){

document.getElementById("calendarModal").style.display = "block"

if(!calendar){

const calendarEl = document.getElementById("calendar")

calendar = new FullCalendar.Calendar(calendarEl,{
initialView:"dayGridMonth",
height:350
})

calendar.render()

}

}

/* ---------------- CLOSE CALENDAR ---------------- */

document.getElementById("closeCalendar").onclick = function(){
document.getElementById("calendarModal").style.display = "none"
}

/* ---------------- INTERVIEW REMINDERS ---------------- */

function checkInterviewReminders(jobs){

const today = new Date()
today.setHours(0,0,0,0)

jobs.forEach(job => {

if(!job.interviewDate) return

const interview = new Date(job.interviewDate)
interview.setHours(0,0,0,0)

const diffDays = (interview - today) / (1000*60*60*24)
if(diffDays >= 0 && diffDays <= 3){

if(Notification.permission === "granted" && !reminded.has(job.id)){

new Notification("Interview Reminder",{
body: job.company + " interview " + (diffDays===0 ? "today" : "tomorrow")
})

reminded.add(job.id)

}

}

})

}

/* ---------------- AUTO REMINDER CHECK ---------------- */

/* Run reminder check every 5 minutes */

setInterval(loadJobs,300000)

/* ---------------- INITIAL LOAD ---------------- */

loadJobs()
setTimeout(() => {

if(Notification.permission === "granted"){

new Notification("Test Notification",{
body:"Notifications are working!"
})

}

},2000)