
// const logo = document.querySelectorAll("#logo path")
// console.log(logo)

// for(let i = 0; i < logo.length; i++)
// {
//     console.log(`Letter ${i+1} is  ${logo[i].getTotalLength()}`)
// }

$(document).ready(function(){

    var scrollLink = $('.scroll');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list li');


    scrollLink.click(function(ev){
        ev.preventDefault();
        $('html').stop().animate({
            scrollTop: $(this.hash).offset().top - 40
        }, 1000);
    });

    $(window).scroll(function(){
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function(){
            var sectionOffset = $(this.hash).offset().top - 50;

            if(sectionOffset <= scrollbarLocation)
            {
                $(this).parent().addClass('selected');
                $(this).parent().siblings().removeClass('selected');
            }
        });
    });
});

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.4}s`;

            }
        });

        burger.classList.toggle('toggle');
    });


}

navSlide();