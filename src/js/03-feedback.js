'use strict';

const formEl = document.querySelector('.feedback-form'),
      STORAGE_KEY = 'data-form';

formEl.addEventListener('input', onFormElInput);
formEl.addEventListener('submit', onFormElSubmit);
initialPage();

function onFormElInput(e) {
    const { name, value } = e.target;

    let localSt = localStorage.getItem(STORAGE_KEY);
    localSt = localSt ? JSON.parse(localSt) : {};
    
    localSt[name] = value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(localSt));
}

function onFormElSubmit(e) {
    e.preventDefault();
    const objData = {};

    const formData = new FormData(formEl);
    formData.forEach((value, name) => {
        objData[name] = value;
    }); 
        
    console.log(objData);
    formEl.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function initialPage(e) {
    let storageData = localStorage.getItem(STORAGE_KEY);

    if (storageData) {
        storageData = JSON.parse(storageData);
        
        Object.entries(storageData).forEach(([name, value]) => {
            formEl.elements[name].value = value;
        });
    }
}
// ===================== FIRST VARIANT =====================

// import throttle from "lodash.throttle";

// const formEl = document.querySelector('.feedback-form'),
//     STORAGE_KEY = 'data-form';

// let savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};

// Object.entries(savedData).forEach(([name, value]) => {
//         formEl.elements[name].value = value;
//     });


// formEl.addEventListener('input', throttle(onFormElInput, 500));

// function onFormElInput(e) {
//     const { name, value } = e.target;
    
//     savedData = {
//         ...savedData,
//         [name]: value,
//     };
    
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
// }

// formEl.addEventListener('submit', onFormElSubmit);

// function onFormElSubmit(e) {
//     e.preventDefault();
//     const objData = {};

//     const dataForm = new FormData(formEl);
    
//     for (let [name, value] of dataForm.entries()) {
//         if (!value) {
//             console.log('fill input');
//             return;
//         }
//         objData[name] = value;
//     }
//     localStorage.removeItem(STORAGE_KEY);
//     formEl.reset();
//     console.log(objData);
// }