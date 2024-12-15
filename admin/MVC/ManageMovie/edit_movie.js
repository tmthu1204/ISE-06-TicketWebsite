document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieID = urlParams.get('movieID');

    if (movieID) {
        fetch(`edit_movie.php?movieID=${movieID}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    document.getElementById("title").value = data.title;
                    document.getElementById("trailerURL").value = data.trailerURL;
                    document.getElementById("duration").value = data.duration;
                    document.getElementById("genre").value = data.genre;
                    document.getElementById("releaseDate").value = data.releaseDate;
                    document.getElementById("country").value = data.description.country;
                    document.getElementById("language").value = data.description.language;
                    document.getElementById("intro").value = data.description.intro;
                    document.getElementById("movieID").value = movieID;
                }
            })
            .catch(error => {
                alert('Có lỗi khi tải dữ liệu: ' + error);
            });
    } else {
        alert('Không tìm thấy thông tin phim.');
    }

    const form = document.getElementById("editMovieForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        // Append the old poster image if no new image is selected
        if (!formData.has('poster') || formData.get('poster').name === "") {
            const currentPoster = document.getElementById("posterImage").value;
            formData.append('posterImage', currentPoster);
        }

        fetch('edit_movie.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                window.location.href = 'show_movie.html';   
            } else {
                alert('Cập nhật phim thất bại: ' + data.message);
            }
        })
        .catch(error => {
            alert('Có lỗi khi cập nhật phim: ' + error);
        });
    });
});