var base_url = "http://jsonplaceholder.typicode.com/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(base_url + "users").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.forEach(function(article) {
            articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${article.name}</span>
                      <p>Username: ${article.username}</p>
                      <p>Email: ${article.email}</p>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url + "users")
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.forEach(function(article) {
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${article.id}">
                  
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.name}</span>
                  <p>Username: ${article.username}</p>
                  <p>Email: ${article.email}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(base_url + "users/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                
              </div>
              <div class="card-content">
                <span class="card-title">${data.post_title}</span>
                ${snarkdown(data.post_content)}
              </div>
            </div>
          `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articleHTML;
        });
      }
    });
  }

  fetch(base_url + "users/" + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              
            </div>
            <div class="card-content">
              <span class="card-title">${data.post_title}</span>
              ${snarkdown(data.post_content)}
            </div>
          </div>
        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
    });
}
