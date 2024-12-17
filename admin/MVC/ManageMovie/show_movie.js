// Fetch the movie data from the PHP API
fetch('show_movie.php')
    .then(response => response.json())
    .then(movies => {
        const movieListElement = document.getElementById('movie-list');
        movieListElement.innerHTML = ''; // Clear existing content

        // Loop through the movies and create a table row for each
        // movies.forEach((movie, index) => {
        //     const row = document.createElement('tr');
            
        //     // Create table cells
        //     const sttCell = document.createElement('td');
        //     sttCell.textContent = index + 1;

        //     const idCell = document.createElement('td');
        //     idCell.textContent = movie.movieID;

        //     const titleCell = document.createElement('td');
        //     titleCell.textContent = movie.title;

        //     const imageCell = document.createElement('td');
        //     if (movie.description.image) {
        //         const img = document.createElement('img');
        //         // Update image path to be relative to the project root
        //         img.src = './images/' + movie.description.image;  // Assuming images are in 'images' folder in the root
        //         img.alt = movie.title;
        //         img.style.width = '100px';  // Adjust image size
        //         imageCell.appendChild(img);
        //     }

        //     const countryCell = document.createElement('td');
        //     countryCell.textContent = movie.description.country || 'N/A';

        //     const languageCell = document.createElement('td');
        //     languageCell.textContent = movie.description.language || 'N/A';

        //     const introCell = document.createElement('td');
        //     introCell.textContent = movie.description.intro || 'N/A';

        //     const trailerCell = document.createElement('td');
        //     trailerCell.textContent = movie.trailerURL || 'N/A';

        //     const durationCell = document.createElement('td');
        //     durationCell.textContent = movie.duration || 'N/A';

        //     const genreCell = document.createElement('td');
        //     genreCell.textContent = movie.genre || 'N/A';

        //     const releaseDateCell = document.createElement('td');
        //     releaseDateCell.textContent = movie.releaseDate || 'N/A';

        //     const actionCell = document.createElement('td');
        //     actionCell.innerHTML = `
        //         <a href="edit_movie.html?movieID=${movie.movieID}">Edit</a> | 
        //         <button class="delete-button" data-movieID="${movie.movieID}">Delete</button>
        //     `;
        //     // Append cells to row
        //     row.appendChild(sttCell);
        //     row.appendChild(idCell);
        //     row.appendChild(titleCell);
        //     row.appendChild(imageCell);
        //     row.appendChild(countryCell);
        //     row.appendChild(languageCell);
        //     row.appendChild(introCell);
        //     row.appendChild(trailerCell);
        //     row.appendChild(durationCell);
        //     row.appendChild(genreCell);
        //     row.appendChild(releaseDateCell);
        //     row.appendChild(actionCell);

        //     // Append row to the table body
        //     movieListElement.appendChild(row);
        // });
        movies.forEach((movie, index) => {
            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">
                            <strong>ID:</strong> ${movie.movieID}<br>
                            <strong>Duration:</strong> ${movie.duration || 'N/A'}<br>
                            <strong>Country:</strong> ${movie.description.country || 'N/A'}<br>
                            <strong>Language:</strong> ${movie.description.language || 'N/A'}<br>
                            <strong>Genre:</strong> ${movie.genre || 'N/A'}<br>
                            <strong>Release Date:</strong> ${movie.releaseDate || 'N/A'}<br>
                            <strong>Trailer:</strong> ${movie.trailerURL ? 'Available' : 'N/A'}<br>
                            <strong>Introduction:</strong> ${movie.description.intro || 'N/A'}
                        </p>
                    </div>
                    ${movie.description.image ? `
                        <img src="./images/${movie.description.image}" class="card-img-top" alt="${movie.title}" style="height: 200px; object-fit: cover;">
                    ` : ''}
                    <div class="card-footer">
                        <a href="edit_movie.html?movieID=${movie.movieID}" class="btn btn-primary btn-sm">Edit</a>
                        <button class="btn btn-danger btn-sm delete-button" data-movieid="${movie.movieID}">Delete</button>
                    </div>
                </div>
            `;
    
            movieListElement.appendChild(card);
        });
        // Add delete functionality
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const movieID = this.getAttribute('data-movieID');
                if (confirm(`Are you sure you want to delete movie ID ${movieID}?`)) {
                    fetch('delete_movie.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: 'movieID=' + encodeURIComponent(movieID)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            window.location.reload(); // Reload the page to update the movie list
                        } else {
                            alert('Error: ' + data.message);
                        }
                    })
                    .catch(error => {
                        alert('An error occurred: ' + error);
                    });
                }
            });
        });
    })
    .catch(error => {
    console.error('Error fetching movie data:', error);
    });
   