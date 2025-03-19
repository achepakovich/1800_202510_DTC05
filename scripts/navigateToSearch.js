function navigateToSearchPage(collection) {

    $("#searchButton").click(function () {
        let searchName = $('input[name="item"]').val()
        localStorage.setItem('searchItem', searchName);
        // handle clicking search button
        window.location.href = './search.html';

    })

    // Handle hitting enter in search box
    $("#searchBox").keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            let searchName = $('input[name="item"]').val()
            localStorage.setItem('searchItem', searchName);
            window.location.href = './search.html';
        }
    })

};

$(document).ready(function () {
    navigateToSearchPage("deals");
}); 