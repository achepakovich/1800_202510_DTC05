function titleCase(item) {
    item = item.toLowerCase().split(' ').map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
    });
    return item.join(' ');
}
function navigateToSearchPage(collection) {

    $("#searchButton").click(function () {
        let searchName = $('input[name="item"]').val()
        let searchTitleCase = titleCase(searchName)
        localStorage.setItem('searchItem', searchTitleCase);
        // handle clicking search button
        window.location.href = './search.html';

    })

    // Handle hitting enter in search box
    $("#searchBox").keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            let searchName = $('input[name="item"]').val()
            let searchTitleCase = titleCase(searchName)
            localStorage.setItem('searchItem', searchTitleCase);
            window.location.href = './search.html';
        }
    })

};

$(document).ready(function () {
    navigateToSearchPage("deals");
}); 