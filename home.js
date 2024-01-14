document.addEventListener('DOMContentLoaded', function () {
    const starField = document.querySelector('.stars');
    const stars = [];

    for (let i = 0; i < 150; i++) {
        createStar();
    }

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 7;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.borderRadius = `${size / 2}px`;
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.speedX = (Math.random() - 0.5) * 2;
        star.speedY = (Math.random() - 0.5) * 2;

        starField.appendChild(star);
        stars.push(star);
    }

    document.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        stars.forEach((star) => {
            const starX = star.getBoundingClientRect().left + star.clientWidth / 2;
            const starY = star.getBoundingClientRect().top + star.clientHeight / 2;

            const deltaX = mouseX - starX;
            const deltaY = mouseY - starY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const moveAwayFactor = 200;
            const speedFactor = 0.1;

            if (distance < moveAwayFactor) {
                const moveX = (moveAwayFactor - distance) * (deltaX / distance) * speedFactor;
                const moveY = (moveAwayFactor - distance) * (deltaY / distance) * speedFactor;

                star.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
            } else {
                star.style.transform = 'translate(0, 0)';
            }
        });
    });

    function updateStars() {
        stars.forEach((star) => {
            star.style.left = `${parseFloat(star.style.left) + star.speedX}px`;
            star.style.top = `${parseFloat(star.style.top) + star.speedY}px`;

            // Check if stars are out of the screen, then reset their position
            if (
                parseFloat(star.style.left) < 0 ||
                parseFloat(star.style.left) > window.innerWidth ||
                parseFloat(star.style.top) < 0 ||
                parseFloat(star.style.top) > window.innerHeight
            ) {
                star.style.left = `${Math.random() * window.innerWidth}px`;
                star.style.top = `${Math.random() * window.innerHeight}px`;
            }
        });

        requestAnimationFrame(updateStars);
    }

    updateStars();

    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        card.addEventListener('mouseenter', function () {
            card.style.transform = 'scale(1.25)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'scale(1)';
        });
    });
});