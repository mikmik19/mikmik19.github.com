document.getElementById('search').onclick = function(){
    modal = document.getElementById("search-modal-background")
    modal.style.display = "block"

    const modalContent = document.getElementById("search-modal");

    // Select the search box and put it in focus
    searchBox = document.getElementById("search-box")
    searchBox.focus();
    searchBox.select();

    // When the uses clicks escape, close the model
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.keyCode==27) {
          modal.style.display = "none";
        }
      }

    // When the user clicks the backgournd, close the modal
    modal.onclick = function() {
        modal.style.display = "none"
    }

    modalContent.onclick = function(event) {
      event.stopPropagation();
    }

    
}