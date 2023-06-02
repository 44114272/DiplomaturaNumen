window.addEventListener("DOMContentLoaded", () => {
    menuIcon = document.getElementById('toggleMenu');
    linksContainer = document.querySelector('.container-links');
    headerLinks = document.querySelectorAll('.header-links');

    function checkWindowSize() {
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

            function createSquares() {
                for(let i = 0; i < numSquares; i++) {
                    const square = document.createElement("div");
                    square.classList.add('menu-squares');
                    squareContainer.appendChild(square);
                    squares.push(square)
                }
            }

            function animateSquares() {
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
    window.addEventListener('resize', checkWindowSize);
    window.addEventListener('load', checkWindowSize);  
})