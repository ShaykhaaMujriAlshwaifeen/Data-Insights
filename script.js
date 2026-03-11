/* --- TYPED EFFECT --- */
let typingEffect = new Typed(".typedText", {
    strings: ["Senior Data Analyst", "Power BI", "SQL"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000
});

/* --- GLOBAL SCROLL REVEAL --- */
const sr = ScrollReveal({
    origin: 'left',
    distance: '80px',
    duration: 1500,
    delay: 300,
    reset: false
});

sr.reveal('.featured-text-card');
sr.reveal('.featured-name');
sr.reveal('.featured-text-info');
sr.reveal('.top-header');
sr.reveal('.about-info');
sr.reveal('.project-header');
sr.reveal('.contact-info');

/* --- FETCH PROJECTS --- */
fetch("projects.json")
.then(res => res.json())
.then(projects => {
    const container = document.getElementById("projects-container");

    projects.forEach((project, index) => {
        
        // --- NEW VISIBILITY FEATURE ---
        // If "visible" is set to false in JSON, skip this project entirely
        if (project.visible === false) {
            return; 
        }

        // 1. Create the Card
        container.innerHTML += `
            <div class="col-md-4">
                <div class="admin-container project-box">
                    <h4 class="project-title">${project.title}</h4>
                    <div class="preview-wrapper">
                        <img src="${project.image}" class="project-preview img-fluid">
                    </div>
                    <p class="project-desc">${project.description}</p>
                    <button class="bt" data-bs-toggle="modal" data-bs-target="#modal${index}">
                        VIEW DASHBOARD
                    </button>
                </div>
            </div>`;

        // 2. Create the Modal
        const modalHTML = `
            <div class="modal fade" id="modal${index}" tabindex="-1">
                <div class="modal-dialog modal-fullscreen-sm-down modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${project.title}</h5>
                            <button class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body p-0">
                            <div class="ratio ratio-16x9 h-100-mobile">
                                ${
                                    project.type === "gallery"
                                    ? `
                                    <div id="carousel${index}" class="carousel slide h-100" data-bs-ride="carousel">
                                        <div class="carousel-indicators">
                                            ${project.images.map((_, i) => `
                                                <button type="button" data-bs-target="#carousel${index}" data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}"></button>
                                            `).join('')}
                                        </div>
                                        <div class="carousel-inner h-100">
                                            ${project.images.map((img, i) => `
                                                <div class="carousel-item ${i === 0 ? 'active' : ''} h-100">
                                                    <img src="${img}" class="d-block w-100 h-100 object-fit-contain">
                                                </div>
                                            `).join('')}
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${index}" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#carousel${index}" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>
                                    </div>`
                                    : project.type === "image"
                                        ? `<img src="${project.image}" class="img-fluid object-fit-contain">`
                                        : project.type === "video"
                                            ? `<video controls class="w-100 h-100" style="background:#000;"><source src="${project.link}" type="video/mp4"></video>`
                                            : `<iframe src="${project.link}" allowfullscreen></iframe>`
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    });

    // Reveal the project boxes after they are added to the dom
    ScrollReveal().reveal('.project-box', {
        origin: 'left',
        distance: '50px',
        duration: 1000,
        interval: 200
    });
});