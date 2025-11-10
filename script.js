//auto calculate target
const target1=document.getElementById('target1');
const target2=document.getElementById('target2');
const total = document.getElementById('targetTotal');
function calculateTarget(){
const targetChild1= parseFloat(target1.value)||0;
const targetChild2 = parseFloat(target2.value)||0;
total.value = targetChild1 + targetChild2;
calculatePercent();
};
target1.addEventListener('input',calculateTarget);
target2.addEventListener('input', calculateTarget);

//auto calculate achievement
const x = document.getElementById('achieve1');
const y = document.getElementById('achieve2');
const z = document.getElementById('achieveTotal');


function calculateAchiement(){
const achieveChild1 = parseFloat(x.value)||0;
const achieveChild2 = parseFloat(y.value)||0;
z.value = achieveChild1 + achieveChild2;
calculatePercent();
};
x.addEventListener('input', calculateAchiement);
y.addEventListener('input', calculateAchiement); 

//calcucalte percentage 
const a = document.getElementById('targetTotal');
const b = document.getElementById('achieveTotal');
const c = document.getElementById('achievePercent');

function calculatePercent() {
  const target = parseFloat(a.value) || 0;
  const achieved = parseFloat(b.value) || 0;

  if (target > 0) {
    c.value = ((achieved / target) * 100).toFixed(1)+'%';
  } else {
    c.value = "0%";
  }
}

a.addEventListener('input', calculatePercent);
b.addEventListener('input', calculatePercent);


//cascade dropdown
const data={
    Budhakhali:['Rajnagar Srianthgram I', 'Rajnagar Srianthgram II', 'Budhakhali', 'Bishalaxmipur', 'Fatikpur'],
    Narayanpur:['Ganeshnagar East', 'Ganeshnagar West', 'Iswaripur', 'Narayanpur Part', 'Narayanpur PHC SC', 'Nandabhanga'],
    Namkhana:['Namkhana I', 'Namkhana II', 'Shibanagar Abad I', 'Shibnagar Abad II', 'Debnagar', 'Dwariknagar'],
    Haripur:['Uttar Chandanpiri','Dakshin Chandanpiri','Dakshin Chandranagar','Haripur','Maharajganj'],
    Shibrampur:['Rajnagar','Radhanagar','Uttar Shibrampur','Dakshin Shibrampur','Dakshin Durgapur','Patibunia'],
    Moushuni:['Moushuni 1st Gheri','Bagdanga','Kusumtala','Baliara New','Baliara Old'],
    Freserganj:['Amarabati','Bijoybati','Shibpur','Debnibas']
};
const gp=document.getElementById('gp');
const ru=document.getElementById('ru');

Object.keys(data).forEach(function(gpList){
    const option = document.createElement('option');
    option.value=gpList;
    option.textContent=gpList;
    gp.appendChild(option);
});
gp.addEventListener('change', function(x){
    ru.innerHTML='<option value="">--Select reporting Unit--</option>';
    const gpvalue=this.value;
    if(!gpvalue){
        ru.diabled=true;
        return;    
    }
    const reportingUnit=data[gpvalue];
    reportingUnit.forEach(function(z){
        const option = document.createElement('option');
        option.value=z;
        option.textContent=z;
        ru.appendChild(option);
    })
ru.diabled=false;
});

//Submit data to google sheet
document.getElementById("ndd").addEventListener("submit", async function(event) {
    event.preventDefault();

    
   
    showMessage("⏳ Submitting your report...", "info");

    const formData = new FormData(event.target);
    const url = "https://script.google.com/macros/s/AKfycbws3DMWd0ZgnOOYpgZduccMzt0zWzjLZl4ssvBZ6TAcv3tYmOqt8EnZEHU_IAlureOq/exec";

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            showMessage("✅ Submitted successfully!", "success");
            event.target.reset();
            
        } else {
            throw new Error("Server responded with an error");
        }
    } catch (error) {
        showMessage("❌ Submission failed! Please try again.", "error");
        console.error("Submission error:", error);
    }
});


// ✅ Modern centered message popup with overlay
function showMessage(message, type = "info") {
    // Create overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    // Create message box
    let msgBox = document.createElement("div");
    msgBox.textContent = message;
    msgBox.className = `popup-message ${type}`;

    // Add overlay and message box to body
    overlay.appendChild(msgBox);
    document.body.appendChild(overlay);

    // Fade-in
    setTimeout(() => {
        overlay.classList.add("show");
        msgBox.classList.add("show");
    }, 10);

    // Auto remove after 3s
    setTimeout(() => {
        msgBox.classList.remove("show");
        overlay.classList.remove("show");
        setTimeout(() => overlay.remove(), 500);
    }, 3000);
    
};

