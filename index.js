
window.addEventListener("DOMContentLoaded", () => {
    menuIcon = document.querySelector('.header-hamburger');
    animationContainer = document.querySelector('.animation-container');    
    linksContainer = document.querySelector('.container-links');
    headerLinks = document.querySelectorAll('.header-links');
    closeBtn = document.getElementById('closeBtn');

    const openMenu = () => {
        animationContainer.classList.add('animate-menu-open');
        animationContainer.classList.remove('animate-menu-close'); 
        linksContainer.classList.toggle('isActive');
        closeBtn.style.display = 'block'
        menuIcon.style.display = 'none'
    }
    const closeMenu = () => {
        animationContainer.classList.remove('animate-menu-open');
        animationContainer.classList.add('animate-menu-close');
        linksContainer.classList.remove('isActive');
        closeBtn.style.display = 'none'
        menuIcon.style.display = 'block'
    }
    
    menuIcon.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    headerLinks.forEach(link =>
        link.addEventListener('click', () => closeMenu())
    );

    // game cards
    const gameCards = document.querySelector('.games');
    const cardsMediaQuery = window.matchMedia('(max-width: 800px)');
    let moveVal = 0;
    let lastScrollY = 0;
    let animationFrameId = null;

    const easeOutQuad = t => t * (2 - t);

    const animateCards = () => {
        const { scrollY } = window;
        if (scrollY !== lastScrollY) {
            moveVal = easeOutQuad(scrollY * 0.0047);
            gameCards.style.transform = `translateX(${moveVal}%)`;
            lastScrollY = scrollY;
        }

        if (cardsMediaQuery.matches)
            animationFrameId = requestAnimationFrame(animateCards);
    }

    const handleResizeCards = () => {
        if (cardsMediaQuery.matches) {
            if (!animationFrameId)
                animationFrameId = requestAnimationFrame(animateCards);
        } else {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            gameCards.style.transform = 'translateX(0)';
        }
    }

    window.addEventListener('resize', handleResizeCards);
    handleResizeCards();

    // portal
    const portalContainer = document.querySelector('.video-section');
    const portalImg = document.getElementById('portal');
    const portalVidCont = document.querySelector('.portal-video');
    
    const scaleImage = () => {
        portalImg.style.transform = 'scale(12)';
        portalVidCont.style.filter = 'blur(0)' 
    }
    
    const resetImageScale = () => {
        portalImg.style.transform = 'scale(1)';
        portalVidCont.style.filter = 'blur(.6rem)' 
    }

    window.onload = () => 
        resetImageScale()

    const observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (entry.isIntersecting)
            resetImageScale();
        
        else 
            scaleImage();
        
    });
    
    new ScrollyVideo({
        scrollyVideoContainer: "scrolly-video",
        src: "./assets/media/portalVideo.mp4"
    });

    observer.observe(portalContainer);
});