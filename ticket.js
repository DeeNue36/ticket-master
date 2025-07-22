// * Get DOM Elements

// * Sections to be displayed toggled
const ticketApplicationContainer = document.querySelector('.ticket-application');
const displayTicket = document.querySelector('.ticket-container');

// * Ticket Application Form and Inputs
const ticketApplicationForm = document.querySelector('.ticket-form');
const selectImage = document.querySelector('.upload');
const avatarInput = document.querySelector('#avatar');
const nameInput = document.querySelector('#fullname');
const emailInput = document.querySelector('#email');
const githubInput = document.querySelector('#github-uname');

// * Submit Button
const generateTicket = document.getElementById('generate-ticket');


selectImage.addEventListener('click', function(){
    avatarInput.click();
});

avatarInput.addEventListener('change', function() {
    const userSelectedImage = this.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const imgUrl = reader.result;
        const img = document.createElement('img');
        img.src = imgUrl;
        // selectImage.innerHTML = '';
        selectImage.appendChild(img);
        img.classList.add('uploaded-image');
    };

    reader.readAsDataURL(userSelectedImage);
});