document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    // Parallax
    function scrollBanner() {
        document.addEventListener('scroll', function () {
            var scrollPos = window.scrollY;
            document.querySelector('.parallax-fade-top').style.top = (scrollPos / 2) + 'px';
            document.querySelector('.parallax-fade-top').style.opacity = 1 - (scrollPos / 700);
            document.querySelector('.parallax-00').style.top = (scrollPos / -3.5) + 'px';
            document.querySelector('.parallax-01').style.top = (scrollPos / -2.8) + 'px';
            document.querySelector('.parallax-top-shadow').style.top = (scrollPos / -2) + 'px';
        });
    }
    scrollBanner();

    // Page cursors
    document.body.addEventListener("mousemove", function (event) {
        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";
        cursor2.style.left = event.clientX + "px";
        cursor2.style.top = event.clientY + "px";
        cursor3.style.left = event.clientX + "px";
        cursor3.style.top = event.clientY + "px";
    });

    var cursor = document.getElementById("cursor"),
        cursor2 = document.getElementById("cursor2"),
        cursor3 = document.getElementById("cursor3");

    function addHover() {
        cursor2.classList.add("hover");
        cursor3.classList.add("hover");
    }

    function removeHover() {
        cursor2.classList.remove("hover");
        cursor3.classList.remove("hover");
    }

    removeHover();

    var hoverTargets = document.querySelectorAll(".hover-target");

    hoverTargets.forEach(function (target) {
        target.addEventListener("mouseover", addHover);
        target.addEventListener("mouseout", removeHover);
    });

    // Scroll back to top
    var offset = 300;
    var duration = 400;
    window.addEventListener('scroll', function () {
        if (window.scrollY > offset) {
            document.querySelector('.scroll-to-top').classList.add('active-arrow');
        } else {
            document.querySelector('.scroll-to-top').classList.remove('active-arrow');
        }
    });

    document.querySelector('.scroll-to-top').addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hero Case study images
    var caseStudyNames = document.querySelectorAll('.case-study-name');
    var caseStudyImages = document.querySelectorAll('.case-study-images li');

    caseStudyNames.forEach(function (name, index) {
        name.addEventListener('mouseenter', function () {
            document.querySelector('.case-study-name.active').classList.remove('active');
            document.querySelector('.case-study-images li.show').classList.remove("show");
            caseStudyImages[index].classList.add("show");
            name.classList.add('active');
        });
    });

    caseStudyNames[0].dispatchEvent(new Event('mouseenter'));
});
