let isDarkMode = false;

function switchModes(){
    if(isDarkMode === false){
        document.documentElement.style.setProperty("--col-01", "#050306");
        document.documentElement.style.setProperty("--col-02", "#faf8f4");
        document.getElementById("modeButton").innerHTML = "Light Mode";
        isDarkMode = true;
    } else {
        document.documentElement.style.setProperty("--col-01", "#faf8f4");
        document.documentElement.style.setProperty("--col-02", "#050306");
        document.getElementById("modeButton").innerHTML = "Dark Mode";
        isDarkMode = false;
    }
}