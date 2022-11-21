function search() {
    let val = document.getElementById('elastic').value.trim().toLowerCase();
    let elasticItems = document.querySelectorAll('.elastic li');

    if (val != '') {
        elasticItems.forEach(function (elem) {
            if (elem.innerText.toLowerCase().search(val) == -1) {
                elem.classList.add('hide');
            }
            else {
                elem.classList.remove('hide');
            }
        });
    }
    else {
        elasticItems.forEach(function (elem) {

            elem.classList.remove('hide');
        });
    }
}
