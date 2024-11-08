const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    // data from form
    const form = event.target;
    const formData = new FormData(form);
    const newRestaurant = Object.fromEntries(formData.entries());
    console.log('New restaurant:', newRestaurant);

    try {
        // Fetching to create restaurant
        console.log('Fetching to create restaurant');
        const response = await fetch('/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRestaurant),
        });
        console.log('Response:', response);

        if (response.ok) {
            // it did create the restaurant
            const createdRestaurant = await response.json();
            console.log('Created restaurant:', createdRestaurant);
            window.location.href = '/restaurants';
        } else {
            // it did not create the restaurant
            console.error('Failed to create restaurant');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-restaurant-form');
    form.addEventListener('submit', handleSubmit);
});
