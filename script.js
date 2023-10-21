document.addEventListener("DOMContentLoaded", () => {
    searchFilters = document.querySelectorAll('[data-search-filter]')

    searchFilters.forEach(filter => {
        filter.addEventListener('click', function () {
            filter.parentNode.querySelector('.checkboxes').style.display = filter.parentNode.querySelector('.checkboxes').style.display == 'grid' ? 'none' : 'grid'
        })
    })

    searchForm = document.getElementById('search-form')
    searchInput = document.getElementById('search-input')
    products = document.querySelectorAll('.explore-card');

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    search = document.getElementById("changeMessage");

    searchInput.addEventListener("input", debounce(function () {
        search = searchInput.value;
        filterCards(search)
    }, 250));


    document.querySelector('.sort-dropdown').addEventListener('click', function () {
        curr = document.querySelector('.sort-dropdown-options').style.display;

        document.querySelector('.sort-dropdown-options').style.display = curr == 'flex' ? 'none' : 'flex';
    })

    document.addEventListener('click', function handleClickOutsideBox(event) {
        sortDropdown = document.querySelector('.sort-dropdown-options');
        sortDiv = document.querySelector('.sort-dropdown');

        if (!sortDropdown.contains(event.target) && !sortDiv.contains(event.target)) {
            sortDropdown.style.display = 'none';
        }
    });


    filter = document.querySelectorAll('.filter-category-list label input')

    filter.forEach(filter => {
        filter.addEventListener('change', function () {
            filterCards()
        })
    })

    showAll = false;

    loadMore = document.querySelector('.load-more a')

    loadMore.addEventListener('click', function () {
        loadMore.style.display = 'none'
        showAll = true
        filterCards()
    })

    cards = document.querySelectorAll('.w-dyn-item');

    for (let i = 0; i < cards.length; i++) {
        if (i >= 3) {
            cards[i].style.display = 'none';
        }
    }
});


function debounce(callback, delay) {
    let timerId;
    return function () {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback.apply(this, arguments);
        }, delay);
    };
}

function filterCards() {
    count = 0;
    cards = document.querySelectorAll('.w-dyn-item')

    categoryFilters = document.querySelectorAll('[data-filter-category]')
    categoryData = [];
    categoryFilters.forEach(filter => {
        if (filter.querySelector('input').checked) {
            categoryData.push(filter.dataset.filterCategory)
        }
    })

    bankFilters = document.querySelectorAll('[data-filter-bank]')
    bankData = [];
    bankFilters.forEach(filter => {
        if (filter.querySelector('input').checked) {
            bankData.push(filter.dataset.filterBank)
        }
    })

    loungesFilter = Array.from(document.querySelectorAll('[data-lounges]')).filter(element => {
        return element.getAttribute('data-lounges') === null
            || element.getAttribute('data-lounges') === '';
    });

    insuranceFilter = Array.from(document.querySelectorAll('[data-insurance]')).filter(element => {
        return element.getAttribute('data-insurance') === null
            || element.getAttribute('data-insurance') === '';
    });

    cashbackFilter = Array.from(document.querySelectorAll('[data-cashback]')).filter(element => {
        return element.getAttribute('data-cashback') === null
            || element.getAttribute('data-cashback') === '';
    });

    couponFilter = Array.from(document.querySelectorAll('[data-couponback]')).filter(element => {
        return element.getAttribute('data-couponback') === null
            || element.getAttribute('data-couponback') === '';
    });

    hotelsFilter = Array.from(document.querySelectorAll('[data-hotels]')).filter(element => {
        return element.getAttribute('data-hotels') === null
            || element.getAttribute('data-hotels') === '';
    });

    cards.forEach(card => {

        if (categoryData.length !== 0) {
            if (!categoryData.includes(card.querySelector('.product-best-card').innerText)) {
                card.style.display = 'none'

                return
            }
        }

        if (bankData.length !== 0) {
            if (!bankData.includes(card.querySelector('[data-bank]').dataset.bank)) {
                card.style.display = 'none'

                return
            }
        }

        loungesFilter.forEach(filter => {
            filter.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        })

        insuranceFilter.forEach(filter => {
            filter.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        })

        cashbackFilter.forEach(filter => {
            filter.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        })

        couponFilter.forEach(filter => {
            filter.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        })

        hotelsFilter.forEach(filter => {
            filter.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        })


        if (!showAll && count > 2) {
            card.style.display = 'none'

            return;
        }

        if (search && search !== '') {
            const pattern = new RegExp(search, "i");
            if (!pattern.test(card.querySelector('.card-name').innerText)) {
                card.style.display = 'none'

                return;
            }
        }

        card.style.display = 'block'
        count++
    })

    if (count < 3) {
        loadMore.style.display = 'none'
        toggleEmptyState()
    }

    if (count > 2 && !showAll) {
        loadMore.style.display = 'flex'
    }

    toggleEmptyState()
}

function toggleEmptyState()
{
    if (count === 0) {
        document.querySelector('.card-data').style.display = 'none';
        document.querySelector('.empty-state-sep').style.display = 'flex';
    } else {
        document.querySelector('.card-data').style.display = 'block';
        document.querySelector('.empty-state-sep').style.display = 'none';
    }
}