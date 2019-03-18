jQuery(function() {
    // Initialize lunr with the fields to be searched, plus the boost.
    window.bookIdx = lunr(function () {
      this.field('id');
      this.field('title');
      this.field('author');
    });
  
    // Get the data so lunr.js can search it locally.
    window.bookData  = $.getJSON('../data/books/books.json');
  
    // Wait for the data to load and add it to lunr
    window.bookData.then(function(loaded_data){
      $.each(loaded_data, function(index, value){
        window.bookIdx.add(
          $.extend({ "id": index }, value)
        );  
      });
      display_all_books()
    });
  
    var form = document.getElementById('book-search');
    form.onkeyup = function() {
      if(canSubmit()){
        display_search_results();
      }
      else {
        display_all_books()
      }
    }
    
    function canSubmit() {
      var query = $("#book-search-box").val()
      if(query!=null && query!='') {
        return true
      }
      return false;
    }

    function display_search_results() {
      var query = $("#book-search-box").val(); // Get the value for the text field
      var results = window.bookIdx.search(query); // Get lunr to perform a search
      var $search_results = $("#book-search-results");
  
      // Wait for data to load
      window.bookData.then(function(loaded_data) {
  
        // Are there any results?
        if (results.length) {
          $search_results.empty(); // Clear any old results
  
          // Iterate over the results
          results.forEach(function(result) {
            var item = loaded_data[result.ref];
  
            // Build a snippet of HTML for this result
            var appendString = format_result_string(item)
  
            // Add the snippet to the collection of results.
            $search_results.append(appendString);
          });
        } else {
          // If there are no results, let the user know.
          $search_results.html('<p>No results found</p>');
        }
      });
    }

    function format_result_string(item) {

      var appendString = `<div class="book-search-results">\
                            <div class="wrapper">
                              <div class="left"><h3>${item.title}</a></h3></div>\
                              <div class="right">${'★'.repeat(item.stars)}</div>\
                            </div>\
                            <div class="author">${item.author}</div>\
                          </div>`;
      
      return appendString
    }

    function display_all_books() {
      var $search_results = $("#book-search-results");
      $search_results.empty()
      var bookList = Object.entries(window.bookData.responseJSON)
      bookList.forEach(function(item){
        book = item[1]
        book_div = format_result_string(book)
        $search_results.append(book_div)

      })
    }
    display_all_books()
  });