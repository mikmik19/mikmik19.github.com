
function createAttractors(base_name, main_image_DOM, image_selection_DOM) {
    var img_path = "/assets/img/creating-you-own-strange-attractor/"
    var imgs = [
        base_name+"_0.png",
        base_name+"_1.png",
        base_name+"_2.png",
        base_name+"_3.png",
        base_name+"_4.png",
        base_name+"_5.png",
        base_name+"_6.png",
        base_name+"_7.png",
        base_name+"_8.png",
        base_name+"_9.png",
        base_name+"_10.png",
        base_name+"_11.png",
        base_name+"_12.png",
        base_name+"_13.png",
        base_name+"_14.png",
    ];

    // Sets the main image to the first of the small images
    for(i = 0; i < imgs.length; i++)
    {
        document.getElementById(image_selection_DOM).innerHTML += "<img src='"+img_path+imgs[i] + "' class='small_image' width='5%'></img>";
    }
    var small_image = "#"+image_selection_DOM+" .small_image"
    d3.select(main_image_DOM).attr("src", d3.select(small_image).attr("src"))
    d3.selectAll(small_image).on("mouseover", function(d){ 
        d3.select(main_image_DOM).attr("src", d3.select(this).attr("src"))
    })
}

createAttractors("clifford_discovery", "#shape_selection_main_image", "shape_selection_small")
createAttractors("color_selection", "#color_selection_main_image", "color_selection_small")