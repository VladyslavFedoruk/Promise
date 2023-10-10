

const commentsContainer = document.getElementById("commentsContainer");
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  const getCommentsButton = document.getElementById("getCommentsButton");
  
  searchButton.addEventListener("click", searchPost);
  getCommentsButton.addEventListener("click", getComments);
  
  function searchPost() {
    const postId = document.getElementById("postId").value;
    if (!postId || postId < 1 || postId > 100) {
      alert("Будь ласка, введіть коректний ід поста від 1 до 100.");
      return;
    }
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Помилка при отриманні даних");
        }
        return response.json();
      })
      .then(data => {
        const postContainer = document.getElementById("postContainer");
        postContainer.innerHTML = `
                        <h2>Пост №${data.id}</h2>
                        <h3>${data.title}</h3>
                        <p>${data.body}</p>
                    `;
        commentsContainer.innerHTML ='';
      })
      .catch(error => {
        alert(`Сталася помилка: ${error.message}`);
      });
  }
  
  function getComments() {
    const postId = document.getElementById("postId").value;
    if (!postId || postId < 1 || postId > 100) {
      alert("Будь ласка, введіть коректний ід поста від 1 до 100.");
      return;
    }
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Помилка при отриманні коментарів");
        }
        return response.json();
      })
      .then(data => {
        commentsContainer.innerHTML = "<h2>Коментарі:</h2>";
        data.forEach(comment => {
          commentsContainer.innerHTML += `
                            <h3>${comment.name}</h3>
                            <p>${comment.body}</p>
                        `;
        });
      })
      .catch(error => {
        alert(`Сталася помилка: ${error.message}`);
      });
  }
});