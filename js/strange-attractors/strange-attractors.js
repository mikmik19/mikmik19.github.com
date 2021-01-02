
function createAttractors(base_name) {
    var img_path = "/assets/img/strange-attractors/"
    var imgs = [
        base_name+"-0.png",
        base_name+"-1.png",
        base_name+"-2.png",
        base_name+"-3.png",
        base_name+"-4.png",
        base_name+"-5.png",
        base_name+"-6.png",
        base_name+"-7.png",
        base_name+"-8.png",
        base_name+"-9.png",
        base_name+"-10.png",
        base_name+"-11.png",
    ];

    // Sets the main image to the first of the small images
    for(i = 0; i < imgs.length; i++)
    {
        document.getElementById("placeholder").innerHTML += "<img src='"+img_path+imgs[i] + "' class='small_image' width='15%'></img>";
    }
    d3.select("#main_image").attr("src", d3.select(".small_image").attr("src"))
    d3.selectAll(".small_image").on("mouseover", function(d){ 
        d3.select("#main_image").attr("src", d3.select(this).attr("src"))
    })
}

function updateSmallImages() {
    d3.selectAll("button")
        .on("click", function(d) {
            d3.selectAll("button").classed("selectedButton", false)
            d3.select(this).classed("selectedButton", true)
            d3.selectAll(".small_image").remove()
            base_name = d3.select(this).attr("alt")
            createAttractors(base_name)
        })    
}

createAttractors("clifford")
updateSmallImages() 