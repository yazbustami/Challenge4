var clear = document.getElementById("clear");
var TPlist = document.getElementById("TPlist");

function postHighScores () {
    let list = JSON.parse(localStorage.getItem("HighScores"));
    console.log(list);

    for (let i= 0; i< list.length; i++) {
        console.log(list[i]);
        const initialCreation = document.createElement("li");
        initialCreation.textContent = list[i].initals + " : " + list[i].score;
        TPlist.append(initialCreation);
    }
}

clear.addEventListener("click", function(){
    localStorage.clear();
    TPlist.innerHTML = "";
})

postHighScores();