jQuery(function() {
    // Initialize lunr with the fields to be searched, plus the boost.
    window.idx = lunr(function () {
      this.field('id');
      this.field('title');
      this.field('content', { boost: 10 });
      this.field('author');
    });
  
    // Get the generated search_data.json file so lunr.js can search it locally.
    window.data = $.getJSON('/search_data.json');
  
    // Wait for the data to load and add it to lunr
    window.data.then(function(loaded_data){
      $.each(loaded_data, function(index, value){
        window.idx.add(
          $.extend({ "id": index }, value)
        );
      });
    });
  
    var form = document.getElementById('site_search');
    form.onkeyup = function() {
      if(canSubmit()){
        display_search_results();
      }
    }
   
    $("#site_search").submit(function(event){
      event.preventDefault();
      display_search_results();
    });
    
    function canSubmit() {
      var query = $("#search_box").val()
      if(query!=null && query!='') {
        return true
      }
      return false;
    }

    function display_search_results() {
      var query = $("#search_box").val(); // Get the value for the text field
      var results = window.idx.search(query); // Get lunr to perform a search
      var $search_results = $("#search_results");
  
      // Wait for data to load
      window.data.then(function(loaded_data) {
  
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
          $search_results.html('<li>No results found');
        }
      });
    }

    function format_result_string(item) {

      var appendString = '<div class="search_results">\
                          <h3><a href="' + item.url + '">' + item.title + '</a></h3>\
                          <p>'+item.content.split('.').slice(0,2)+'.</p>\
                          </div>';
      
      return appendString

    }
  });