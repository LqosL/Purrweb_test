function rollup(element){
    element.style.transform= "translateY(-100vh)";
}

function checkIfEmpty (form) {
    let empty = true;
    const fields = form.getElementsByClassName('contact__input');
    Array.from(fields).forEach((field) => {
        if (field.value) empty = false
    })
    return empty;
}

function validatePhone (phone) {
    const gapless = phone.replaceAll(' ', '');
    const regexP7 = /\+7[3489][0-9]{9}/;
    const regex8 = /8[3489][0-9]{9}/;
    return regexP7.test(gapless) || regex8.test(gapless);
}

function phoneMask(element, string) {
    function removeGaps(string){
        let result = '';
        const letterless = string.replaceAll(/[^\d+]/g, '')
        const gapless =  letterless.replaceAll(' ', '')
        if ((gapless.length > 11 && gapless.startsWith('8')) || (gapless.length > 12 && gapless.startsWith('+7'))) {
            result = gapless.slice(0, -1)
        } else {
            result = gapless;
        }
        if (result.length === 1 && result.slice(0,1) !== '+' && result.slice(0,1) !== '8'){
            result = ''
        }
        if (result.length === 2 && result.slice(0,1) === '+' && (result.slice(1,2) !== '7')) {
            result = '+'
        }
        if (result.slice(0,2) === '+7' && (result.length > 2 && !/[3489]/.test(result.substring(2, 3)))){
            result = result.slice(0, -1)
        }

        if (result.slice(0,1) === '8' && (result.length > 1 && !/9/.test(result.substring(1, 2)))){
            console.log('look here')
            result = result.slice(0, -1)
        }
        return result
    }
    function addGaps(string) {
        if (string.slice(0,1) === '+') {
            if (string.slice(2,3) === '3' || string.slice(2,3) === '4' || string.slice(2,3) === '8'){
                return (string.substring(0,2) + ' ' + string.substring(2, 6)  + ' ' + string.substring(6, 8) + ' ' + string.substring(8, 10) + ' ' + string.substring(10)).trim();
            }
            return (string.substring(0,2) + ' ' + string.substring(2, 5)  + ' ' + string.substring(5, 8) + ' ' + string.substring(8, 10) + ' ' + string.substring(10)).trim();
        }
        if (string.slice(0,1) === '8') {
            return (string.substring(0,1) + ' ' + string.substring(1, 4)  + ' ' + string.substring(4, 7) + ' ' + string.substring(7, 9) + ' ' + string.substring(9)).trim();
        }
        return ''
    }
    element.value = addGaps(removeGaps(string));
}

function validateForm(form) {
    let isValid = true;
    const error_message = document.getElementsByClassName('contact_error-message')[0];
    const required = Array.from(form.getElementsByClassName('required'));
    required.forEach((block)=>{
        const value = block.value;
        const siblings = block.parentElement.children;
        if (value.length === 0) {
            siblings.item(siblings.length -1 ).classList.remove('hidden');
            error_message.classList.remove('hidden');
            isValid = false;
        } else {
            siblings.item(siblings.length -1 ).classList.add('hidden');
        }
    })

    const phone_input = form.getElementsByClassName('phone_input')[0];
    const siblings = phone_input.parentElement.children;
    const phoneError = siblings.item(siblings.length -1 );
    if (phone_input.value.length === 0) {
        phoneError.innerText = 'This field is required';
        phoneError.classList.remove('hidden');
        isValid = false;
        return;
    }
    if (!validatePhone(phone_input.value)) {
        phoneError.innerText = 'incorrect number';
        phoneError.classList.remove('hidden');
        isValid = false;
    } else {
        phoneError.classList.add('hidden');
    }

    if(isValid) {
        console.log('all right')
        const form_box = document.getElementsByClassName('contact__box')[0];
        form_box.classList.add('hidden');
        const thanks_message = document.getElementsByClassName('contact__thanks-message')[0];
        thanks_message.classList.remove('hidden');
    }
}

window.addEventListener('load', ()=> {

    const cookie_window = document.getElementsByClassName('cookie__box')[0];
    cookie_window.classList.remove('hidden')
    setTimeout(()=> {
        rollup(cookie_window);
    }, 500)

    cookie_window.addEventListener('click', ()=> {
        cookie_window.classList.add('hidden')
    })

    const contact_window = document.getElementsByClassName('contact__box')[0];
    const close_contacts = contact_window.getElementsByClassName('contact__close-btn')[0];

    const contact_buttons = [];
    contact_buttons.push(...document.getElementsByClassName('burger__contact-button'));
    contact_buttons.push(...document.getElementsByClassName('button_contact'));

    contact_buttons.forEach((element)=> {
        element.addEventListener('click', ()=> {
            contact_window.classList.remove('hidden');
        })
    })

    close_contacts.addEventListener('click', ()=> {
        contact_window.classList.add('hidden');
    })

    const form = document.getElementsByClassName('contact__form')[0];
    const submit_button = document.getElementsByClassName('contact__submit')[0];
    submit_button.disabled = true;


    const fields = Array.from(document.getElementsByClassName('contact__input '));
    fields.forEach((field)=> {
        addEventListener('input', ()=>{
            if (checkIfEmpty(form) && field.value.length === 0) {
                submit_button.disabled = true;
                return;
            }
            submit_button.disabled = false;
        })
    })



    const phone_input = form.getElementsByClassName('phone_input')[0];
    phone_input.addEventListener('input', ()=> {
        phoneMask(phone_input, phone_input.value)
    })

    const thanks_window = document.getElementsByClassName('contact__thanks-message')[0];
    const close__thanks = thanks_window.getElementsByClassName('contact__close-btn')[0];
     close__thanks.addEventListener('click', () => {
         thanks_window.classList.add('hidden');
     })
    const close__thanks_lower = thanks_window.getElementsByClassName('contact__thanks-button')[0];
    close__thanks_lower.addEventListener('click', () => {
        thanks_window.classList.add('hidden');
    })

    submit_button.addEventListener('click', ()=> {
        validateForm(form);
    })


    const burger = document.getElementsByClassName('burger')[0];
    const burger_close = document.getElementsByClassName('burger__close-btn')[0];
    const burger_box = document.getElementsByClassName('burger__menu')[0];

    burger.addEventListener('click', () => {
        burger_box.classList.remove('hidden');
    })
    burger_close.addEventListener('click', () => {
        burger_box.classList.add('hidden');
    })
});

