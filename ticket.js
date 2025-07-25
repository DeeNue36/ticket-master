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

// * Error Message
const errorMessage = document.querySelectorAll('.error-message');

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


//* Generate Ticket Button
generateTicket.addEventListener('click', function() {

    const fullName = nameInput.value;
    const email = emailInput.value;
    const githubUsername = githubInput.value;
    const avatar = avatarInput.files[0];

    if (fullName === '' || email === '' || githubUsername === '' || avatar === '') {
        errorMessage.forEach(error => {
            // const infoImg = document.createElement('img');
            // infoImg.src = 'images/icon-info.svg';
            // infoImg.classList.add('error-info-circle');
            // error.appendChild(infoImg);

            // const svgNamespace = 'http://www.w3.org/2000/svg';
            // const infoCircle = document.createElementNS(svgNamespace, 'svg');
            // infoCircle.setAttribute('width', '16');
            // infoCircle.setAttribute('height', '16');
            // infoCircle.setAttribute('fill', 'none');
            // infoCircle.setAttribute('viewBox', '0 0 16 16');
            // const path = document.createElementNS(svgNamespace, 'path');
            // path.setAttribute('stroke', '#D1D0D5');
            // path.setAttribute('stroke-linecap', 'round');
            // path.setAttribute('stroke-linejoin', 'round');
            // path.setAttribute('d', 'M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z');
            // path.setAttribute('fill', '#D1D0D5');
            // path.setAttribute('d', 'M8.004 10.462V7.596ZM8 5.57v-.042Z');
            // path.setAttribute('stroke', '#D1D0D5');
            // path.setAttribute('stroke-linecap', 'round');
            // path.setAttribute('stroke-linejoin', 'round');
            // path.setAttribute('d', 'M8.004 10.462V7.596ZM8 5.57v-.042Z');
            // infoCircle.appendChild(path);
            // const circle = document.createElementNS(svgNamespace, 'circle');
            // circle.setAttribute('fill', '#D1D0D5');
            // circle.setAttribute('cx', '8');
            // circle.setAttribute('cy', '5.57');
            // circle.setAttribute('r', '.042');

            const svgNamespace = 'http://www.w3.org/2000/svg';
            const infoCircle = document.createElementNS(svgNamespace, 'svg');
            infoCircle.setAttribute('width', '16');
            infoCircle.setAttribute('height', '16');
            infoCircle.setAttribute('fill', 'none');
            infoCircle.setAttribute('viewBox', '0 0 16 16');

            const path1 = document.createElementNS(svgNamespace, 'path');
            path1.setAttribute('stroke', '#e16151');
            path1.setAttribute('stroke-linecap', 'round');
            path1.setAttribute('stroke-linejoin', 'round');
            path1.setAttribute('d', 'M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z');

            const path2 = document.createElementNS(svgNamespace, 'path');
            path2.setAttribute('fill', '#e16151');
            path2.setAttribute('d', 'M8.004 10.462V7.596ZM8 5.57v-.042Z');

            const path3 = document.createElementNS(svgNamespace, 'path');
            path3.setAttribute('stroke', '#e16151');
            path3.setAttribute('stroke-linecap', 'round');
            path3.setAttribute('stroke-linejoin', 'round');
            path3.setAttribute('d', 'M8.004 10.462V7.596M8 5.569v-.042');

            infoCircle.appendChild(path1);
            infoCircle.appendChild(path2);
            infoCircle.appendChild(path3);

            error.appendChild(infoCircle);

            const message = document.createElement('span');
            message.textContent = 'This field is required';
            error.appendChild(message);
            if (fullName) {

            }
        });
    }

    // const formData = new FormData();
    // formData.append('avatar', avatar);
    // formData.append('fullName', fullName);
    // formData.append('email', email);
    // formData.append('githubUsername', githubUsername);

    // ticketApplicationContainer.classList.add('hide');
    // displayTicket.classList.remove('hide');
});


{/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path stroke="#D1D0D5" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
    <path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
    <path stroke="#D1D0D5" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/>
</svg> */}
