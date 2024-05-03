const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('ratingInput');

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        const clickedIndex = index + 1;

        // Toggle 'filled' class on clicked star
        if (star.classList.contains('filled')) {
            star.classList.remove('filled');
        } else {
            star.classList.add('filled');
        }

        // Update rating input value based on filled stars
        let filledStarsCount = 0;
        stars.forEach((star) => {
            if (star.classList.contains('filled')) {
                filledStarsCount++;
            }
        });
        ratingInput.value = filledStarsCount.toString();
    });
});
