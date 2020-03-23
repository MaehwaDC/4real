const allAnimationBlocks = Array.from(document.querySelectorAll('.with-animation'));

const scrollProggres = document.querySelector('.progress');
const dendiBorder = document.querySelector('.dendi-border');
console.log(scrollProggres)
const offset = 100;

const scrollHandler = function () {
    const bottomDocPos = document.documentElement.scrollTop;
    const topDocPos = document.documentElement.scrollTop + document.documentElement.clientHeight;
    const percentScroll = (bottomDocPos / (document.documentElement.offsetHeight - document.documentElement.clientHeight)) * 100;
    scrollProggres.style.height = `${percentScroll}%`;

    if(percentScroll === 100) {
        dendiBorder.classList.add('active');
    } else {
        dendiBorder.classList.remove('active');
    }
    
    allAnimationBlocks.forEach((el) => {
        const elPos = el.getBoundingClientRect().top + document.documentElement.scrollTop;
        if (
            bottomDocPos < elPos
            && topDocPos > elPos
            ) {
            const elChildrens = Array.from(el.childNodes);
            if (elChildrens.find(el => el.classList && el.classList.contains('arrow'))) {
                allAnimationBlocks
                    .filter(el => Array.from(el.childNodes).find(el => el.classList && el.classList.contains('arrow')))
                    .forEach(el => el.classList.add('start-animation'));
            } else {
                el.classList.add('start-animation')
            }
        }
    })
}

window.addEventListener('scroll', scrollHandler);
window.onload = scrollHandler;
