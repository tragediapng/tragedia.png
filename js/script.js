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
