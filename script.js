document.addEventListener('DOMContentLoaded', () => {
/*-------------------------------------------------------*/
const modalWindow = document.querySelector('#modal__window'),
      modalShadow = document.querySelector('#modal__shadow'),
      popUp = document.querySelector('#pop__up'),
      modalThanks = document.querySelector('#modal__thanks'),
      formBlock = document.querySelector('#form__block'),
      modalForm = document.querySelector('#modal__form'),
      iconClose = document.querySelector('#icon__close'),
      callModal = document.querySelector('#call__modal');


let autoPopup = true;

/* Вызов и закрытие модального окна
============================================================*/
function showModal() {
    modalWindow.classList.remove('div__hidden');
    modalWindow.classList.add('div__show');
    // document.body.style.overflow = 'hidden';
}


function closeModal() {
    modalWindow.classList.remove('div__show');
    modalWindow.classList.add('div__hidden');
    modalThanks.classList.add('display__none');
    formBlock.classList.remove('display__none');
    // document.body.style.overflow = '';

    clearTimeout(modalTimeout50);
    autoPopup = false;


    
}


callModal.addEventListener('click', () => {
    showModal();
});


modalShadow.addEventListener('click', () => {
    if(modalWindow.classList.contains('div__show')) {
        closeModal();
    }
});


iconClose.addEventListener('click', () => {
    if(modalWindow.classList.contains('div__show')) {
        closeModal();
    }
});


const modalTimeout50 = setTimeout(() => {
    if (modalWindow.classList.contains('div__hidden')) {
        showModal();
    }
}, 50000);



/* Отправка данных с формы на сервер
============================================================*/
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(modalForm);
    data.append('date', new Date(Date.now()));

    const request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    request.send(convertJson(data));

    const spinner = document.createElement('img');
    spinner.setAttribute('src', 'img/spinner.svg');
    modalForm.insertAdjacentElement('afterend', spinner);

    request.addEventListener('load', () => {
        if (request.status === 200) {
            modalForm.reset();
            spinner.remove();
            formBlock.classList.add('display__none');
            modalThanks.classList.remove('display__none');
            clearTimeout(modalTimeout50);

            setTimeout(() => {
                if (!modalThanks.classList.contains('display__none')){
                    closeModal();
                    modalThanks.classList.add('display__none');
                    formBlock.classList.remove('display__none');    
                }
            }, 4000);
        }
    });
    console.log(convertJson(data));
});


function convertJson(formData) {
    const object = {};
    formData.forEach((item, key) => {
        object[key] = item;
    });

    return JSON.stringify(object, null, "\t");
}


/*----------------------------------------------------*/
});
