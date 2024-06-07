// Array of quotes
const quotes = [
    "A room without books is like a body without a soul. – Marcus Tullius Cicero",
    "So many books, so little time. – Frank Zappa",
    "A book is a dream that you hold in your hand. – Neil Gaiman",
    "Books are a uniquely portable magic. – Stephen King",
    "The only thing you absolutely have to know is the location of the library. – Albert Einstein"
];

// Array of image URLs
const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    // Add more image URLs as needed
];

// Function to change the image
function changeImage() {
    // Get the image element
    const image = document.getElementById('carousel-image');
    // Get a random index to select a random image from the array
    const randomIndex = Math.floor(Math.random() * images.length);
    // Set the src attribute of the image element to the randomly selected image URL
    image.src = images[randomIndex];
}

// Function to change the background image
function changeBackgroundImage() {
    // Get the body element
    const body = document.body;
    // Get a random index to select a random background image from the array
    const randomIndex = Math.floor(Math.random() * images.length);
    // Set the background image of the body element to the randomly selected image URL
    body.style.backgroundImage = `url('${images[randomIndex]}')`;
}

// Function to fetch data based on query type
function fetchData(type) {
    console.log(`Fetching data for: ${type}`); // Debug statement
    fetch(`query.php?type=${type}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data); // Debug statement
            // Format the data into a readable table
            displayTable(data);
        })
        .catch(error => console.error('Error:', error));  // Log any errors
}

// Function to display the data in a table format
function displayTable(data) {
    // Get the result div element
    let result = document.getElementById('result');
    // Clear previous results
    result.innerHTML = '';

    // Check if data is empty
    if (data.length === 0) {
        result.innerHTML = '<p>No data found</p>';
        return;
    }

    // Create table elements
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Create table header row
    let headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
        let th = document.createElement('th');
        th.textContent = key.replace(/_/g, ' '); // Replace underscores with spaces
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table body rows
    data.forEach(item => {
        let row = document.createElement('tr');
        Object.values(item).forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    // Append thead and tbody to table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append table to result div
    result.appendChild(table);
}

// Function to display a random quote
function displayRandomQuote() {
    // Get a random quote from the array
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // Get the quote div element
    const quoteDiv = document.getElementById('quote');
    // Display the random quote
    quoteDiv.innerHTML = randomQuote;
}

// Display a new quote every 5 seconds
setInterval(displayRandomQuote, 5000);

// Display an initial quote when the page loads
document.addEventListener('DOMContentLoaded', displayRandomQuote);

// Apply CSS styles
const styles = `
/* Quote display styling */
#quote {
    margin-bottom: 20px;
    font-size: 1.5em;
    font-style: italic;
    text-align: center;
}

/* Result table styling */
#result {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    white-space: pre-wrap;
    text-align: left;
    width: 100%;
}
`;

// Create a style element and append the CSS styles
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

// Change the image and background every 5 seconds
setInterval(() => {
    changeImage();
    changeBackgroundImage();
}, 5000);
