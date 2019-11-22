window.addEventListener('DOMContentLoaded', () => {
  app();
});

let data = {
  heroComponent: {

  },
  bannerComponent: {

  },
  pillsComponent: {
      pillDetails: {

      },
      pillCriteria: {
      
      },
      pillExclusions: {

      }
  },
  bookingComponent: {


  }
};

function app() {

  let heroBannerForm = document.querySelector('#hero-banner');
  heroBannerForm.style.display = "none";

  let countdownBannerForm = document.querySelector('#countdown-banner');
  countdownBannerForm.style.display = "none";

  let pillsForm = document.querySelector('#pills');
  pillsForm.style.display = "none";

  let exitPopupForm = document.querySelector('#exit-popup');
  exitPopupForm.style.display = "none";

  let buttons = document.querySelectorAll('.component-menu-btn');

  let formInputs = document.querySelectorAll('input[type="text"], input[type="datetime-local"]');

  formInputs.forEach((input) => {
    input.onchange = (e) => saveValue(e);
  })

  buttons.forEach((b)=>{
    b.onclick = (e)=>{
      formButtonClick(e.target.id);
    }
  });

  function formButtonClick(id){
    switch(id){
      case 'hero-banner-button':
        showForm('hero-banner');
        //populateForm('hero-input');
        break;
      case 'countdown-banner-button':
        showForm('countdown-banner');
        break;
      case 'pills-button':
        showForm('pills');
        break;
      case 'exit-popup-button':
        showForm('exit-popup');
        break;
    }     
  }
}

function showForm(id){
  document.querySelectorAll('.forms').forEach((form)=> {
    form.style.display = 'none'
  })
  document.getElementById(id).style.display = 'block';
}

// SAVES USER TEXT INPUTS INTO DATA OBJECT
function saveValue(e) {
  console.log(e.target.value);
  let id = e.target.id;
  let val = e.target.value;

  if (e.target.classList.contains('hero-input')) {
      data.heroComponent[id] = val;
  } else if (e.target.classList.contains('banner-input')) {
      data.bannerComponent[id] = val;
  } else if (e.target.classList.contains('pill-input')) {
      if (e.target.classList.contains('pill-criteria')) {
          data.pillsComponent.pillCriteria[id] = val
      } else if (e.target.classList.contains('pill-exclusions')) {
          data.pillsComponent.pillExclusions[id] = val
      } else if (e.target.classList.contains('pill-details')) {
          data.pillsComponent.pillDetails[id] = val
      }
  } 

  console.log(data)
  // //localStorage.setItem(id, val)
}
