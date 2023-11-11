window.addEventListener("DOMContentLoaded", () => {
    menuIcon = document.getElementById('toggleMenu');
    linksContainer = document.querySelector('.container-links');
    headerLinks = document.querySelectorAll('.header-links');

    const checkWindowSize = () => {
        const windowWidth = window.innerWidth;
        const breakpoint = 50 * parseFloat(getComputedStyle(document.documentElement).fontSize);

        if (windowWidth < breakpoint) {
            gsap.set(linksContainer, {opacity: 0});

            const squareContainer = document.getElementById('squareContainer');
            const squareSize = 100;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const numCols =  Math.ceil(screenWidth / squareSize);
            const numRows =  Math.ceil(screenHeight / squareSize);

            const numSquares = numCols * numRows;

            squareContainer.style.width = `${numCols * squareSize}px`;
            squareContainer.style.height = `${numRows * squareSize}px`;

            let squares = [];

            const createSquares = () => {
                for(let i = 0; i < numSquares; i++) {
                    const square = document.createElement("div");
                    square.classList.add('menu-squares');
                    squareContainer.appendChild(square);
                    squares.push(square)
                }
            }

            const animateSquares = () => {
                gsap.fromTo(squares, {
                    opacity: 0
                }, {
                    opacity: 1,
                    delay: 0.5,
                    duration: 0.0005,
                    stagger: {
                        each: 0.004,
                        from: 'random',
                    },
                });

                gsap.to(squares, {
                    opacity: 0,
                    delay: 1.3,
                    duration: 0.0005,
                    stagger: {
                        each: 0.004,
                        from: 'random',
                    },
                });
            }
            let overlayVisible = false;

            menuIcon.addEventListener('click', () => {
                linksContainer.classList.toggle('container-links-active');
                menuIcon.classList.toggle('open-menu');
                squareContainer.innerHTML = '',
                squares = [];
                createSquares();
                animateSquares();

                gsap.to(linksContainer, 0.025, {
                    opacity: overlayVisible ? 0 : 1,
                    visibility: overlayVisible ? 'hidden' : 'visible',
                    delay: 1.15,
                });

                gsap.to(linksContainer, {
                    zIndex: overlayVisible ? -1 : 0,
                    delay: overlayVisible ? 0 : 2,
                }),

                overlayVisible= !overlayVisible;
            })
        
            headerLinks.forEach((link) => {
                link.addEventListener('click', () => {
                    linksContainer.classList.remove('container-links-active');
                    menuIcon.classList.remove('open-menu');
                    squareContainer.innerHTML = '',
                        squares = [];
                        createSquares();
                        animateSquares();

                    gsap.to(linksContainer, 0.025, {
                        opacity: overlayVisible ? 0 : 1,
                        visibility: overlayVisible ? 'hidden' : 'visible',
                        delay: 1.15,
                    });

                    gsap.to(linksContainer, {
                        zIndex: overlayVisible ? -1 : 0,
                        delay: overlayVisible ? 0 : 2,
                    }),

                    overlayVisible= !overlayVisible;
                });
            });    

        } else{
            linksContainer.classList.remove('container-links-active');
            gsap.set(linksContainer, {
                opacity: 1,
                visibility: 'visible',
            });
            gsap.set(headerLinks, {
                opacity: 1,
                visibility: 'visible',
            });
        }
    }

    // game cards
    const gameCards = document.querySelector('.games');
    const cardsMediaQuery = window.matchMedia('(max-width: 800px)');
    let moveVal = 0;
    let lastScrollY = 0;
    let animationFrameId = null;

    const easeOutQuad = t => t * (2 - t);

    const animateCards = () => {
        const { scrollY } = window;
        if(scrollY !== lastScrollY) {
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

    window.addEventListener('load', checkWindowSize);  
    window.addEventListener('resize', checkWindowSize);
    window.addEventListener('resize', handleResizeCards);
    handleResizeCards();

     // portal
     const portalContainer = document.querySelector('.video-section');
     const portalAniStart = document.getElementById('portalAniStart');
     const portalImg = document.getElementById('portal');
     const portalVideo = document.getElementById('portalVideo');
     let isScaling = false;
     let scrollStartPosition = null; 
 
     const scaleImage = () => {
         isScaling = true;
         portalVideo.style.filter = 'blur(0)';
         portalImg.style.transform = 'scale(4)';
     }
 
     const resetImageScale = () => {
         isScaling = false;
         portalVideo.style.filter = 'blur(15px)';
         portalImg.style.transform = 'scale(1)';
     }
 
     const updateVideoPosition = () => {
        if (scrollStartPosition !== null) {
            const scrollPosition = window.scrollY;
            const pixelsScrolled = (scrollPosition - scrollStartPosition);
            const videoDuration = 8;
            
            const videoPosition = (pixelsScrolled / portalContainer.clientHeight) * videoDuration;

            portalVideo.currentTime = videoPosition;
        }
    }
 
     const observer = new IntersectionObserver(entries => {
         const entry = entries[0];
         if (entry.isIntersecting && entry.intersectionRatio >= .1) {
             scrollStartPosition = window.scrollY;
             scaleImage()
         } else {
             resetImageScale()
             scrollStartPosition = null;
         }
     }, {
         threshold: .1,
     });
 
     observer.observe(portalAniStart);
 
     window.addEventListener('scroll', () => {
         if (isScaling) {
             const scrollPosition = window.scrollY;
             isScrollingUp = scrollPosition < scrollStartPosition;
             updateVideoPosition()
         }
     });
 
});