// For the delete Func. for the resturant
document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('.restaurants-main');
    // See the main of the ejs

    // fun. to delete the restaurant card
    async function deleteRestaurantCard(event) {
        if (event.target.classList.contains('delete-btn')) {
            const card = event.target.closest('.restaurant');
            const restaurantId = card.dataset.id;

            try {
                // Fetching to delete restaurant
                const response = await fetch(`/api/restaurants/${restaurantId}`, {
                    method: 'DELETE',
                });
                console.log('Fetching to delete restaurant');

                // remove the card if yes
                if (response.ok) {
                    card.remove();
                } else {
                    console.error('Failed to delete restaurant');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    main.addEventListener('click', deleteRestaurantCard);
});
