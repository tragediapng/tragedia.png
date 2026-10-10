/* ==========================================
   tragedia.png
   script.js
========================================== */


/* -----------------------
SMOOTH SCROLL
----------------------- */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/* -----------------------
ACTIVE MENU
----------------------- */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        if(window.scrollY>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/* -----------------------
FLASH GALLERY
----------------------- */

const flashGrid = document.querySelector("#flash-grid");

if (flashGrid) {
    const flashFolderUrl = "https://api.github.com/repos/tragediapng/tragedia.png/contents/images/flash?ref=main";
    const imageFile = /\.(avif|gif|jpe?g|png|webp)$/i;

    const readableName = (filename) => filename
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]+/g, " ")
        .trim();

    fetch(flashFolderUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("The flash folder could not be loaded.");
            }

            return response.json();
        })
        .then((files) => {
            const images = files.filter((file) => file.type === "file" && imageFile.test(file.name));

            if (!images.length) {
                return;
            }

            flashGrid.replaceChildren();

            images.forEach((file) => {
                const item = document.createElement("a");
                const image = document.createElement("img");
                const label = readableName(file.name) || "Flash design";

                item.className = "flash-item";
                item.href = file.download_url;
                item.target = "_blank";
                item.rel = "noreferrer";
                item.setAttribute("aria-label", `Open ${label}`);

                image.src = file.download_url;
                image.alt = label;
                image.loading = "lazy";

                item.append(image);
                flashGrid.append(item);
            });
        })
        .catch(() => {
            // The existing placeholder stays visible if GitHub is temporarily unavailable.
        });
}


/* -----------------------
<<<<<<< HEAD
MY WORK GALLERY
----------------------- */

const tattooGrid = document.querySelector("#tattoo-grid");

if (tattooGrid) {
    const tattooFolderUrl = "https://api.github.com/repos/tragediapng/tragedia.png/contents/images/tattoos?ref=main";
    const imageFile = /\\.(avif|gif|jpe?g|png|webp)$/i;

    fetch(tattooFolderUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("The tattoo folder could not be loaded.");
            }
            return response.json();
        })
        .then((files) => {
            const images = files
                .filter((file) => file.type === "file" && imageFile.test(file.name))
                .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));

            if (!images.length) {
                tattooGrid.innerHTML = '<p class="gallery-placeholder">New tattoos coming soon.</p>';
                return;
            }

            tattooGrid.replaceChildren();

            images.forEach((file) => {
                const item = document.createElement("a");
                const image = document.createElement("img");
                const label = file.name.replace(/\\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();

                item.className = "gallery-item";
                item.href = "https://instagram.com/tragedia.png";
                item.target = "_blank";
                item.rel = "noreferrer";
                item.setAttribute("aria-label", `See more tattoos by Dia on Instagram`);

                image.src = file.download_url;
                image.alt = label ? `Tattoo by Dia: ${label}` : "Tattoo by Dia";
                image.loading = "lazy";

                item.append(image);
                tattooGrid.append(item);
            });
        })
        .catch(() => {
            tattooGrid.innerHTML = '<p class="gallery-placeholder">Tattoos could not be loaded right now. Please try again later.</p>';
        });
}


/* -----------------------
=======
>>>>>>> 8072b759d7b2396bb58d2669d545d88e840dc375
REVEAL ON SCROLL
----------------------- */

const revealItems=document.querySelectorAll(

".hero-text,.about,.gallery,.flash,.booking"

);

const revealObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

revealItems.forEach(item=>{

revealObserver.observe(item);

});


/* -----------------------
IMAGE HOVER
----------------------- */



/* -----------------------
HEADER SHADOW
----------------------- */

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>20){

header.style.boxShadow="0 8px 24px rgba(0,0,0,.06)";

}else{

header.style.boxShadow="none";

}

});
