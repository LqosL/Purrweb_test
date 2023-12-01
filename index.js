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
    const regex = /((\+7)|8)[3489][0-9]{9}/
    return regex.test(phone);
}

function validateForm(form) {
    const error_message = document.getElementsByClassName('contact_error-message')[0];

    const required = Array.from(form.getElementsByClassName('required'));
    required.forEach((block)=>{
        const value = block.value;
        if (value.length === 0) {
            error_message.classList.remove('hidden');
            const siblings = block.parentElement.children;
            siblings.item(siblings.length -1 ).classList.remove('hidden');
        }
    })

    const phone_input = form.getElementsByClassName('phone_input')[0];
    if (!validatePhone(phone_input.value)) {
        const siblings = block.parentElement.children;
        const phoneError = siblings.item(siblings.length -1 );
        phoneError.innerText = 'incorrect number';
        phoneError.classList.remove('hidden');
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

    submit_button.addEventListener('click', ()=> {
        validateForm(form);
    })


});

