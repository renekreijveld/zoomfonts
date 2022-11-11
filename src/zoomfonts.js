jQuery(document).ready(function($)
{
    let $cElements = $("body").find("*");
    let fonts = [];
    let font_resizer_counter = 0;
    function getFontSize() {
        for(var i = 0; i < $cElements.length; i++) {
            fonts.push(parseFloat($cElements.eq(i).css('font-size')));
        }
    }
    function setZoomCookie(cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "fontzoom=" + cvalue + ";" + expires + ";path=/";
    }
    function getZoomCookie() {
        let name = "fontzoom=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }
    function checkFontsizeCookie() {
        let fontzoom = getZoomCookie();
        if (fontzoom == "") {
            font_resizer_counter = 0;
        } else {
            font_resizer_counter = parseInt(fontzoom);
            if (font_resizer_counter > 0) {
                for (var i = 0; i < $cElements.length; i++) {
                    for (t = 0; t < font_resizer_counter; t++) {
                        ++fonts[i];
                    }
                    $cElements.eq(i).css('font-size', fonts[i]);
                }
            } else if (font_resizer_counter < 0) {
                for (var i = 0; i < $cElements.length; i++) {
                    for (t = 0; t > font_resizer_counter; t--) {
                        --fonts[i];
                    }
                    $cElements.eq(i).css('font-size', fonts[i]);
                }
            }
        }
    }
    getFontSize();
    checkFontsizeCookie();
    $(".zoomin").on('click', function() {
        font_resizer_counter++;
        setZoomCookie(font_resizer_counter, 365);
        for (var i = 0; i < $cElements.length; i++) {
            ++fonts[i];
            $cElements.eq(i).css('font-size', fonts[i]);
        }
    });

    $(".zoomout").on('click', function() {
        font_resizer_counter--;
        setZoomCookie(font_resizer_counter, 365);
        for (var i = 0; i < $cElements.length; i++) {
            --fonts[i];
            $cElements.eq(i).css('font-size', fonts[i]);
        }
    });
    $(".zoomreset").on('click', function() {
        if (font_resizer_counter > 0) {
            for (var i = 0; i < $cElements.length; i++) {
                for (t = 0; t < font_resizer_counter; t++) {
                    --fonts[i];
                }
                $cElements.eq(i).css('font-size', fonts[i]);
            }
        } else if (font_resizer_counter < 0) {
            for (var i = 0; i < $cElements.length; i++) {
                for (t = 0; t > font_resizer_counter; t--) {
                    ++fonts[i];
                }
                $cElements.eq(i).css('font-size', fonts[i]);
            }
        }
        font_resizer_counter = 0;
        setZoomCookie(font_resizer_counter, 365);
    });
});