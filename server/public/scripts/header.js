document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');

    console.log('Header element:', header);
    console.log('Nav element:', nav);
    console.log('Footer element:', footer);

    // Had to add '/' before each of the src becuase in that act it will search through the repo to find the spec dir.
    function createHeader() {
        header.innerHTML = `
            <div class="header-container">
                <img src="/images/sf.webp" alt="San Francisco" class="header-image">
                <h1 class="header-title">San Francisco</h1>
            </div>
        `;
    }

    function createNav() {
        if (nav) {
            nav.innerHTML = `
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/attractions">Attractions</a></li>
                    <li><a href="/restaurants">Restaurants</a></li>
                    <li><a href="/new-restaurant">New Restaurant</a></li>
                </ul>
            `;
        } else {
            console.error('Navigation element not found');
        }
    }

    function createFooter() {
        footer.innerHTML = `
            <p>&copy; 2024 Your Travel Guide. All rights reserved.</p>
        `;
    }

    createHeader();
    createNav();
    createFooter();

    console.log('Header, Nav, and Footer creation attempted');
});