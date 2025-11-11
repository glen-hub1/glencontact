// Initialize EmailJS
(function() {
  emailjs.init("IJ_p9_cWHJSHPi1nb"); // Your Public Key
})();

// Initialize intl-tel-input for country flags
const phoneInputField = document.querySelector("#number");
const phoneInput = window.intlTelInput(phoneInputField, {
  initialCountry: "auto",
  geoIpLookup: function(success, failure) {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => success(data.country_code))
      .catch(() => success("us"));
  },
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
});

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const sendBtn = document.getElementById("sendBtn");

  // Show loading state
  sendBtn.disabled = true;
  sendBtn.classList.add("sending");
  sendBtn.innerHTML = `<div class="btn-loader"></div> Sending...`;

  const params = {
    name: document.getElementById("name").value,
    number: phoneInput.getNumber(),
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  const serviceID = "service_e842ldu";
  const templateID = "template_ffmnhcl";

  emailjs.send(serviceID, templateID, params)
    .then(() => {
      sendBtn.disabled = false;
      sendBtn.classList.remove("sending");
      sendBtn.innerHTML = "Send Message";
      document.getElementById("contact-form").reset();

      Swal.fire({
        html: `
          <div class="success-animation">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
              <path class="checkmark__check" fill="none" d="M14 27l7 7 16-16"/>
            </svg>
            <h2>Message Sent!</h2>
            <p>Your message has been successfully delivered.</p>
          </div>
        `,
        showConfirmButton: false,
        timer: 3000,
        background: "white",
        backdrop: `rgba(0,0,0,0.4)`
      });
    })
    .catch(error => {
      sendBtn.disabled = false;
      sendBtn.classList.remove("sending");
      sendBtn.innerHTML = "Send Message";

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong. Please try again.",
        showConfirmButton: true
      });

      console.error("Error:", error);
    });
});

// Initialize tsparticles background
tsParticles.load("tsparticles", {
  background: {
    color: "transparent"
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  particles: {
    color: { value: ["#00bcd4", "#007bff", "#ffffff"] },
    links: {
      color: "#00bcd4",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "out",
      random: false,
      speed: 1,
      straight: false
    },
    number: { density: { enable: true, area: 800 }, value: 60 },
    opacity: { value: 0.6 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 4 } }
  },
  detectRetina: true
});
