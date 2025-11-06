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
document.getElementById("ndd").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    gp: document.getElementById("gp").value,
    ru: document.getElementById("ru").value,
    target1: document.getElementById("target1").value,
    achieve1: document.getElementById("achieve1").value,
    target2: document.getElementById("target2").value,
    achieve2: document.getElementById("achieve2").value,
    targetTotal: document.getElementById("targetTotal").value,
    achieveTotal: document.getElementById("achieveTotal").value,
    achievePercent:document.getElementById("achievePercent").value,
  };

  const responseEl = document.getElementById("response");
  responseEl.textContent = "Submitting...";

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbws3DMWd0ZgnOOYpgZduccMzt0zWzjLZl4ssvBZ6TAcv3tYmOqt8EnZEHU_IAlureOq/exec", {
      method: "POST",
      mode: "no-cors", // important for Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    responseEl.textContent = "✅ Report submitted successfully!";
    setTimeout(() => {
  responseEl.textContent = "";
}, 3000);
    document.getElementById("ndd").reset();
  } catch (error) {
    console.error(error);
    responseEl.textContent = "❌ Submission failed. Check console for details.";
    setTimeout(() => {
  responseEl.textContent = "";
}, 3000);
  }
});
