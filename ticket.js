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

// * Upload Image Text and Image Control Buttons
const uploadText = document.querySelector('.upload-text');
const uploadControl = document.querySelector('.upload-controls');
const removeImage = document.querySelector('.remove-button');
const changeImage = document.querySelector('.change-button');


//* Trigger the file selector when the element is clicked
selectImage.addEventListener('click', function(){
    avatarInput.click();
});


//* Listens for a file to be selected, creates an image element and displays the image 
avatarInput.addEventListener('change', function() {
    const userSelectedImage = this.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const imgUrl = reader.result;
        selectImage.innerHTML = '';
        const img = document.createElement('img');
        img.src = imgUrl;
        selectImage.appendChild(img);
        img.classList.add('uploaded-image');
        uploadText.style.display = 'none';
        uploadControl.style.display = 'flex';
    };

    reader.readAsDataURL(userSelectedImage);

    //* Remove the uploaded image 
    removeImage.addEventListener('click', function() {
        selectImage.innerHTML = '';
        uploadText.style.display = 'block';
        uploadControl.style.display = 'none';
        avatarInput.value = '';
    });

    //* Change the uploaded image
    let fileSelectorOpen = false; //? Flag to track if the file selector is open

    changeImage.addEventListener('click', function() {
        avatarInput.value = '';
        
        //? If the file selector is not open
        if (!fileSelectorOpen) {
            avatarInput.click();
            fileSelectorOpen = true;
        }
    });
});

