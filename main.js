const texts = ["WEB DEVELOPER", "STUDENT", "PROBLEM SOLVER"];
let index = 0;
const h2Element = document.querySelector(".animated-text");

function updateText() {
    h2Element.textContent = texts[index];
    h2Element.style.animation = "none"; 
    setTimeout(() => {
        h2Element.style.animation = ""; 
    }, 10);
    index = (index + 1) % texts.length; 
}

setInterval(updateText, 4000);

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNav() {
        let currentSection = 0; 

       
        const headerHeight = document.querySelector("header")?.offsetHeight || 0;

        sections.forEach((section, i) => {
            const sectionTop = section.offsetTop - headerHeight;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = i;
            }
        });

      
        const lastSection = sections.length - 1;
        const lastSectionBottom = sections[lastSection].offsetTop + sections[lastSection].offsetHeight;
        if (window.scrollY + window.innerHeight >= lastSectionBottom) {
            currentSection = lastSection;
        }

      
        navLinks.forEach((link) => link.classList.remove("active"));
        navLinks[currentSection].classList.add("active");
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    window.addEventListener("scroll", debounce(updateActiveNav, 100));


    updateActiveNav();

 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const start = window.scrollY;
                const end = targetSection.offsetTop;
                const distance = Math.abs(end - start);
                const duration = Math.min(800, distance); 

                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (targetId === "skills") {
                    animateProgressBars();
                }

                setTimeout(() => {
                    updateActiveNav();
                }, duration);
            }
        });
    });

    const fadeElements = document.querySelectorAll('.fade-in, .animated-img');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 });

    fadeElements.forEach(element => observer.observe(element));


    const skillsSection = document.getElementById("skills");
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        bar.style.setProperty('--progress-width', '0%');
    });

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            } 
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }


    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('aria-valuenow') + '%';
            bar.style.setProperty('--progress-width', width); 
        });
    }

  
    function resetProgressBars() {
        progressBars.forEach(bar => {
            bar.style.setProperty('--progress-width', '0%'); 
        });
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

   
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');

    submitText.textContent = 'Sending...';
    loadingSpinner.style.display = 'inline-block';
    submitBtn.disabled = true;

    setTimeout(() => {
      
        submitText.textContent = 'Send Message';
        loadingSpinner.style.display = 'none';
        submitBtn.disabled = false;
        document.getElementById('contactForm').reset();

      
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Your message has been sent successfully to pnith2428@gmail.com.',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'responsive-swal', // Add a custom class for the popup
            },
        });
    }, 2000);
});
document.querySelectorAll('.btn.btn-primary').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); 
        Swal.fire({
            title: 'Information',
            text: 'Please contact to NITH CODER for project details',
            icon: 'info',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'responsive-swal', // Add a custom class for the popup
            },
        });
    });
});