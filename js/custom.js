// wow js installation code

new WOW().init();

// make header active on scroll

$(window).on('scroll', function () {
    if ($(this).scrollTop() > 41) {
        $('.fHeader').addClass('active');
    } else {
        $('.fHeader').removeClass('active');
    }
});

// modal load 
$(window).on('load', function () {
    $('#modalonloadpophomepage').modal('show');
});

// window loading 

$(window).on('load', function () {
    $('#loading-widget').fadeOut(500, function () {
        $('#main-content').fadeIn(300);
    });
});

// testimonial starts here

$(document).ready(function () {
    // 1. Inject CSS styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .truncate-text {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 10px;
            }

            #customModal {
                display: none;
                position: fixed;
                z-index: 9999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0, 0, 0, 0.7);
            }

            #modalContent {
                background-color: #fff;
                margin: 5% auto;
                padding: 20px;
                width: 90%;
                max-width: 600px;
                position: relative;
                border-radius: 8px;
                font-size: 16px;
                line-height: 1.5em;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }

            #modalClose {
                position: absolute;
                top: 10px;
                right: 15px;
                cursor: pointer;
                font-size: 22px;
                font-weight: bold;
            }
        `)
        .appendTo('head');

    // 2. Truncate text and add Read More buttons
    $('.f-profile-text > p').each(function () {
        $(this)
            .addClass('truncate-text')
            .after('<button class="read-more-btn">Read More</button>');
    });

    // 3. Create modal
    const $modal = $(`
        <div id="customModal">
            <div id="modalContent">
                <span id="modalClose">&times;</span>
                <div id="modalProfile"></div>
                <div id="modalText"></div>
            </div>
        </div>
    `);
    $('body').append($modal);

    // ✅ 4. Use event delegation to catch clicks from cloned items
    $(document).on('click', '.read-more-btn', function () {
        const $item = $(this).closest('.item');

        // Extract profile info
        const imgSrc = $item.find('.profile .icon img').attr('src');
        const imgAlt = $item.find('.profile .icon img').attr('alt');
        const name = $item.find('.profile h4').contents().get(0).nodeValue.trim();
        const date = $item.find('.profile h4 span').text().trim();

        const fullText = $item.find('.f-profile-text > p').text().trim();

        // Set modal content
        $('#modalProfile').html(`
            <div class='modal-profile-icon'>
                <img src="${imgSrc}" alt="${imgAlt}">
            </div>
            <div class='modal-profile-text'>
                <h4>${name}<span>${date}</span></h4>
            </div>
        `);
        $('#modalText').text(fullText);
        $('#customModal').fadeIn();
    });

    // 5. Close modal
    $('#modalClose').on('click', function () {
        $('#customModal').fadeOut();
    });

    $('#customModal').on('click', function (e) {
        if (e.target === this) {
            $(this).fadeOut();
        }
    });
});
