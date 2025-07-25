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
const uploadInstructions = document.querySelector('.upload-instructions');
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
        uploadInstructions.style.display = 'none';
        uploadControl.style.display = 'flex';
    };

    reader.readAsDataURL(userSelectedImage);
});


//* Remove the uploaded image 
removeImage.addEventListener('click', function() {
    selectImage.innerHTML = '';
    avatarInput.value = '';
    uploadInstructions.style.display = 'block'; //? Display the upload instructions
    uploadControl.style.display = 'none'; //? Hide the upload control buttons
});

//* Change the uploaded image
changeImage.addEventListener('click', function() {
    avatarInput.value = '';
    console.log('Change image button clicked');
    avatarInput.click(); //? OR selectImage.click();
});

//* Drag and Drop Image Upload
selectImage.addEventListener('dragover', function(e) {
    e.preventDefault();
    selectImage.style.border = '1px dashed #8784a4';
});

selectImage.addEventListener('dragleave', function() {
    selectImage.style.border = '1px solid #8784a480';
});

selectImage.addEventListener('drop', function(e) {
    e.preventDefault();
    // The DataTransfer object's files property returns a DataTransferItemList object,
    // which is a list of the files being dragged. We assign this to the files variable.
    const files = e.dataTransfer.files;
    avatarInput.files = files;
    avatarInput.dispatchEvent(new Event('change'));
    selectImage.style.border = '1px solid #8784a480';
});

