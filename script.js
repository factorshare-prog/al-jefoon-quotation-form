const scriptURL = "https://script.google.com/macros/s/AKfycbz9saz11Xb60kyjQ7-FtUPKM0VYDgVenH2w6ecnja2n2z9nFPXjpevq_6Eb7NpE3gLvgA/exec";


document.getElementById("quoteForm").addEventListener("submit", function(e){

    e.preventDefault();


    const button = document.querySelector("button");

    button.innerHTML = "Submitting...";
    button.disabled = true;


    let selectedServices = [];

    document.querySelectorAll(".services input:checked")
    .forEach(function(item){

        selectedServices.push(item.value);

    });


    const formData = {

        company: document.getElementById("company").value,

        contact: document.getElementById("contact").value,

        phone: document.getElementById("phone").value,

        email: document.getElementById("email").value,

        eventType: document.getElementById("eventType").value,

        eventDate: document.getElementById("eventDate").value,

        dismantlingDate: document.getElementById("dismantlingDate").value,

        venue: document.getElementById("venue").value,

        emirate: document.getElementById("emirate").value,

        services: selectedServices.join(", "),

        notes: document.getElementById("notes").value

    };


    fetch(scriptURL, {

        method: "POST",

        body: JSON.stringify(formData)

    })

    .then(response => response.json())

    .then(data => {


        document.getElementById("result").innerHTML =

        `
        Thank you for your enquiry.<br><br>
        Your quotation reference number is:<br>
        <strong>${data.quotationNumber}</strong><br><br>
        Our team will contact you shortly.
        `;


        document.getElementById("quoteForm").reset();


        button.innerHTML = "Submit Quotation Request";
        button.disabled = false;


    })


    .catch(error => {


        document.getElementById("result").innerHTML =

        "Something went wrong. Please try again.";


        button.innerHTML = "Submit Quotation Request";
        button.disabled = false;


        console.log(error);


    });


});
