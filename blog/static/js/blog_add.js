document.addEventListener("DOMContentLoaded", () => {
    const addLink = document.querySelector('.top-menu');
    addLink.addEventListener('click', (e) => {
        e.preventDefault();
        const formContainer = document.getElementById('add-modal');
        formContainer.classList.remove('d-none');

        const saveButton = document.getElementById('add-form-save');
        const cancelButton = document.getElementById('add-form-cancel');

        saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            const form = formContainer.getElementsByTagName('form')[0];
            const data = new FormData(form);
            axios.post('/add_api/', data)
                .then((response) => {
                    console.log(response);
                    const message = response.data.message;
                    alert(message);
                    const blogData = response.data.post;

                    const postsList = document.getElementById('posts');
                    if (postsList) {
                        const blogHTML = `<div class="post">
                <div class="date">
                    <p class="date__value">Опубликовано: ${blogData.date}</p>
                </div>
                <h1 class="post_header">
                    <a class="post_header__link" href="${blogData.link}">${blogData.title}</a>
                </h1>
                <p class="post__text">${blogData.text}</p>
            </div>`;
                        postsList.innerHTML += blogHTML;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        cancelButton.addEventListener('click', (e) => {
            e.preventDefault();
            formContainer.classList.add('d-none');
        });
    });
});