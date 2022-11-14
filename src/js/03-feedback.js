'use strict';
const formEl = document.querySelector('.feedback-form'),
    STORAGE_KEY = 'data-form';

let savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};

Object.entries(savedData).forEach(([name, value]) => {
        formEl.elements[name].value = value;
    });


formEl.addEventListener('input', onFormElInput);

function onFormElInput(e) {
    const { name, value } = e.target;
    
    savedData = {
        ...savedData,
        [name]: value,
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
}

formEl.addEventListener('submit', onFormElSubmit);

function onFormElSubmit(e) {
    e.preventDefault();
    const objData = {};

    const dataForm = new FormData(formEl);
    
    for (let [name, value] of dataForm.entries()) {
        if (!value) {
            console.log('fill input');
            return;
        }
        objData[name] = value;
    }
    localStorage.removeItem(STORAGE_KEY);
    formEl.reset();
    console.log(objData);
}