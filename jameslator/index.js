document.addEventListener("keydown", function(event) {
    switch (event.key.toLowerCase()) {
        case "s":
            if (document.activeElement != document.body) return;// dont leave the textbox to search lol smh my head
            document.getElementsByClassName("search-input")[0].focus();
            break;
    }
});