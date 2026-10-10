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
TATTOO GALLERY
----------------------- */

const galleryGrid = document.querySelector("#gallery-grid");

if (galleryGrid) {
    const galleryFolderUrl = "https://api.github.com/repos/tragediapng/tragedia.png/contents/images/tattoos?ref=main";
    const galleryImageFile = /\.(avif|gif|jpe?g|png|webp)$/i;

    const readableGalleryName = (filename) => filename
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]+/g, " ")
        .trim();

    fetch(galleryFolderUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("The tattoo folder could not be loaded.");
            }

            return response.json();
        })
        .then((files) => {
            const images = files
                .filter((file) => file.type === "file" && galleryImageFile.test(file.name))
                .sort((first, second) => first.name.localeCompare(second.name, undefined, { numeric: true, sensitivity: "base" }));

            if (!images.length) {
                galleryGrid.innerHTML = '<p class="gallery-placeholder">New work coming soon.</p>';
                return;
            }

            galleryGrid.replaceChildren();

            images.forEach((file) => {
                const item = document.createElement("a");
                const image = document.createElement("img");
                const label = readableGalleryName(file.name) || "Tattoo by Dia";

                item.className = "gallery-item";
                item.href = "https://instagram.com/tragedia.png";
                item.target = "_blank";
                item.rel = "noreferrer";
                item.setAttribute("aria-label", `See more work on Instagram: ${label}`);

                image.src = file.download_url;
                image.alt = label;
                image.loading = "lazy";

                item.append(image);
                galleryGrid.append(item);
            });
        })
        .catch(() => {
            // Keep the loading placeholder if GitHub is temporarily unavailable.
        });
}


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
MOBILE DOODLE PLACEMENT
----------------------- */

const mobileDoodleQuery = window.matchMedia("(max-width: 700px)");
const mobileDoodles = Array.from(document.querySelectorAll(".doodle:not(.hero-flower)"));
const doodleImagePattern = /\.(avif|gif|jpe?g|png|webp)$/i;
const doodleFolderUrl = "https://api.github.com/repos/tragediapng/tragedia.png/contents/images/doodles?ref=main";
let mobileDoodlesLoaded = false;

mobileDoodles.forEach((doodle) => {
    doodle.dataset.originalSrc = doodle.getAttribute("src");
});

const randomBetween = (minimum, maximum) =>
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

const shuffle = (items) => {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }

    return shuffled;
};

const loadMobileDoodleImages = () => {
    if (!mobileDoodleQuery.matches || mobileDoodlesLoaded) {
        return;
    }

    mobileDoodlesLoaded = true;

    fetch(doodleFolderUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("The doodle folder could not be loaded.");
            }

            return response.json();
        })
        .then((files) => {
            const images = shuffle(files.filter((file) =>
                file.type === "file" &&
                doodleImagePattern.test(file.name) &&
                !/^kvet\./i.test(file.name)
            ));

            if (!images.length) {
                return;
            }

            mobileDoodles.forEach((doodle, index) => {
                const file = images[index % images.length];
                doodle.src = file.download_url;
            });
        })
        .catch(() => {
            // Keep the existing doodle images if GitHub is temporarily unavailable.
        });
};

const placeMobileDoodles = () => {
    if (!mobileDoodleQuery.matches) {
        mobileDoodles.forEach((doodle) => {
            ["top", "right", "bottom", "left", "width", "max-height", "opacity", "z-index"].forEach((property) => {
                doodle.style.removeProperty(property);
            });

            if (doodle.dataset.originalSrc) {
                doodle.src = doodle.dataset.originalSrc;
            }
        });

        mobileDoodlesLoaded = false;
        return;
    }

    loadMobileDoodleImages();

    const sections = Array.from(document.querySelectorAll("section"));

    sections.forEach((section) => {
        const sectionDoodles = mobileDoodles.filter((doodle) =>
            doodle.closest("section") === section
        );

        if (!sectionDoodles.length) {
            return;
        }

        const sectionRect = section.getBoundingClientRect();
        const content = section.querySelector(".container");
        const contentRect = content?.getBoundingClientRect();

        if (!contentRect) {
            return;
        }

        const topSpace = Math.max(0, contentRect.top - sectionRect.top);
        const bottomSpace = Math.max(0, sectionRect.bottom - contentRect.bottom);
        const topSlots = sectionDoodles.filter((doodle) => !doodle.closest(".hero-image"));
        const placedTop = [];
        const placedBottom = [];

        topSlots.forEach((doodle, index) => {
            const useTop = topSlots.length === 1
                ? topSpace >= bottomSpace
                : index % 2 === 0;
            const availableSpace = useTop ? topSpace : bottomSpace;
            const size = Math.min(randomBetween(44, 72), Math.max(24, availableSpace - 8));
            const position = Math.max(2, (availableSpace - size) / 2);
            const side = Math.random() < 0.5 ? "left" : "right";

            doodle.style.width = `${size}px`;
            doodle.style.maxHeight = `${Math.max(20, availableSpace - 6)}px`;
            doodle.style.opacity = (0.24 + Math.random() * 0.12).toFixed(2);
            doodle.style.zIndex = "1";
            doodle.style.left = side === "left" ? "6px" : "auto";
            doodle.style.right = side === "right" ? "6px" : "auto";
            doodle.style.top = useTop ? `${position}px` : "auto";
            doodle.style.bottom = useTop ? "auto" : `${position}px`;

            (useTop ? placedTop : placedBottom).push(doodle);
        });

        sectionDoodles.filter((doodle) => doodle.closest(".hero-image")).forEach((doodle) => {
            const size = randomBetween(44, 68);
            doodle.style.width = `${size}px`;
            doodle.style.maxHeight = "72px";
            doodle.style.opacity = "0.35";
            doodle.style.zIndex = "2";
            doodle.style.top = "8px";
            doodle.style.right = "8px";
            doodle.style.bottom = "auto";
            doodle.style.left = "auto";
        });
    });
};

placeMobileDoodles();
mobileDoodleQuery.addEventListener("change", placeMobileDoodles);

let doodleResizeFrame;
window.addEventListener("resize", () => {
    if (!mobileDoodleQuery.matches) {
        return;
    }

    window.cancelAnimationFrame(doodleResizeFrame);
    doodleResizeFrame = window.requestAnimationFrame(placeMobileDoodles);
});


/* -----------------------
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
