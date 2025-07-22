// * Get DOM Elements

// * Sections to be displayed toggled
const ticketApplicationContainer = document.querySelector('.ticket-application');
const displayTicket = document.querySelector('.ticket-container');

// * Ticket Application Form and Inputs
const ticketApplicationForm = document.querySelector('.ticket-form');
const selectImage = document.querySelector('.upload-icon');
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
    const selectedFile = this.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = document.querySelector('.upload-icon');
        img.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
});