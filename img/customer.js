/*
 *
 * script on public customer
 *
 */

function addToCart(productID, productSkuID, productAttributeCrossID, imageUrl, amount) {
    jQuery.ajax({
        type: 'POST',
        url: '/include/customer/ajaxAddToCart.php',
        data: {
            'type': 'addToCart',
            'productID': productID,
            'productSkuID': productSkuID,
            'productAttributeCrossID': productAttributeCrossID,
            'imageUrl': imageUrl,
            'amount': amount
        },
        beforeSend: function (xhr) {  },
        success: function (data, textStatus, jqXHR) { 
            document.location.href = '/' + lang + '/cart';
        }
    });
} 

function drawWidgetCartFix() {
    jQuery.ajax({
        type: 'POST',
        url: '/include/ajaxDrawWidgetCartFix.php',
        success: function (data, textStatus, jqXHR) {
            jQuery('.widget_cart_fix_display').html(data);
        }
    });
}

function addToCartAll() {
    var productIDAllArr = new Array();
    $(".wishlist-list .product_id").each(function (key, val) {
        var stock_number = $(".wishlist-list .stockNumber:eq(" + key + ")").val();
        if (stock_number != 0) {
            productIDAllArr.push($(this).val());
        }
    });
    var productIDAllJSON = JSON.stringify(productIDAllArr);
    // console.log(productIDAllJSON);

    var productAttIDAllArr = new Array();
    $(".wishlist-list .product_attribute_cross_id").each(function (key, val) {
        var stock_number = $(".wishlist-list .stockNumber:eq(" + key + ")").val();
        if (stock_number != 0) {
            productAttIDAllArr.push($(this).val());
        }
    });
    var productAttIDAllJSON = JSON.stringify(productAttIDAllArr);
    // console.log(productAttIDAllJSON);

    var productImgAllArr = new Array();
    $(".wishlist-list .image_url").each(function (key, val) {
        var stock_number = $(".wishlist-list .stockNumber:eq(" + key + ")").val();
        if (stock_number != 0) {
            productImgAllArr.push($(this).val());
        }
    });
    var productImgAllJSON = JSON.stringify(productImgAllArr);
    // console.log(productImgAllJSON);

    jQuery.ajax({
        type: 'POST',
        url: '/include/customer/ajaxAddToCartAll.php',
        data: {
            'type': 'addAllToCart',
            'product_id': productIDAllJSON,
            'product_attribute_cross_id': productAttIDAllJSON,
            'image_url': productImgAllJSON,
            'amount': 1
        },
        beforeSend: function (xhr) {
        },
        success: function (data, textStatus, jqXHR) {
            /*console.log('data=' + data);*/
            document.location.href = '/' + lang + '/cart';
        }
    });

} /* end function addToCartAll */

$(window).on('load', function () {
    if ($(window).width() > 1024) {
        ScrollPosStyler.init({
            scrollOffsetY: parseFloat($('.headerDesktop #top-bar').height()) + 1
        });
    } else {
        ScrollPosStyler.init({
            scrollOffsetY: parseFloat($('.headerMobile #top-bar').height()) + 1
        });
        jQuery(".topwidget-menu > .navbar-nav.navbar-topmenu.public-topmenu a").find('.arrowCollapse').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).parent().siblings().toggleClass('show');
            jQuery(this).parent().parent().toggleClass('show');
            var objclick = jQuery(this).parent();
            var objarrow = jQuery(this).parent().siblings('ul');
            if(jQuery(this).parent().hasClass('abl1') && jQuery(this).parent().siblings().hasClass('show') && objclick.parent().position().top!==0){
                jQuery('#section-header.sps--blw .headerMobile #navbarNavDropdown').animate({
                    scrollTop: objclick.parent().position().top
                }, 800); 
            }  
            if(jQuery(this).parent().hasClass('abl2') && jQuery(this).parent().siblings().hasClass('show') && objclick.parent().position().top!==0){
                jQuery('#section-header.sps--blw .headerMobile #navbarNavDropdown').animate({
                    scrollTop: objclick.parent().position().top
                }, 800); 
            }
        });
        jQuery(".topwidget-menu").find('#chooseLanguage').on('click', function(e){
            var objclick = jQuery(this).parent();
            jQuery('#section-header.sps--blw .headerMobile #navbarNavDropdown').animate({
                scrollTop: objclick.position().top
            }, 500);
        });
    }

    if ($(window).width() > 1024) {
        calcWidthAfter();
        /*more auto left right*/
        jQuery(".topwidget-menu > .navbar-nav.navbar-topmenu > li.nav-item").hover(function(){
            var vjim = jQuery(this);
            if (jQuery('ul', this).length) {
                var elm = jQuery('ul:first', this);
                var off = elm.offset();
                var l = off.left;
                var w = elm.width();
                var docW = jQuery("#top-area > #top-sticky").width();
                var maxWidthLv2 = Math.max.apply( null, vjim.find('ul.dropdown-menu > li > ul.dropdown-menu').map( function () {
                    return jQuery( this ).outerWidth( true );
                }).get());

                var isEntirelyVisible = ((l + w + maxWidthLv2) <= docW);
                /*console.log(isEntirelyVisible);*/
                if (!isEntirelyVisible){
                    vjim.children('ul.dropdown-menu').addClass('dropdown-menu-right');
                    vjim.children('ul.dropdown-menu.dropdown-menu-right').find('ul.dropdown-menu').addClass('dropdownfix-menu-right');
                }
            }
        }, function(){
            jQuery(this).children('ul.dropdown-menu').removeClass('dropdown-menu-right');
            jQuery(this).children('ul.dropdown-menu').find('ul.dropdown-menu').removeClass('dropdownfix-menu-right');
        });
    }
});
$(window).on('resize', function () {
    if ($(window).width() > 1024) {
        calcWidthAfter();
        ScrollPosStyler.init({
            scrollOffsetY: parseFloat($('.headerDesktop #top-bar').height()) + 1
        });
    } else {
        ScrollPosStyler.init({
            scrollOffsetY: parseFloat($('.headerMobile #top-bar').height()) + 1
        });
    }
});
/* multiple dropdown menu */
$(document).ready(function () {

    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
        var $el = $(this);
        var $parent = $(this).offsetParent(".dropdown-menu");
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');
        $(this).parent("li").toggleClass('show');
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-menu .show').removeClass("show");
        });
        if (!$parent.parent().hasClass('navbar-nav')) {
            $el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 2});
        }
        return false;
    });

});

/* logout */
$(document).ready(function () {
    jQuery('#txtMemberLogout, #txtMemberLogouttopmenu, #txtMemberLogoutonmenu').on('click', function () {
        jQuery.ajax({
            type: 'POST',
            url: '/customer/member/ajaxAuthen.php',
            data: {
                'type': 'logout'
            },
            beforeSend: function (xhr) {
                jQuery('#divViewportLoading').addClass('active');
            },
            success: function (data, textStatus, jqXHR) {
                jQuery('#divViewportLoading').removeClass('active');
                var arrayData = jQuery.parseJSON(data);
                if (arrayData.code == '00') {
                    document.location.href = '/member';
                }
            }
        });
    });
});
/* search */
function clickSearch(textStringSearch) {
    if (textStringSearch != '') {
        document.location.href = '/search/' + encodeURI(textStringSearch);
    }
}
jQuery('input.textStringSearchTopWidget').on('keypress', function (e) {
   /* console.log(this.value);*/
    jQuery('input.textStringSearchTopWidget').val(this.value);
    if (e.keyCode == 13) {
        clickSearch(jQuery(this).val());
    }
});
jQuery("div.topSearchBar").on('shown.bs.collapse', function () {
    jQuery('input.textStringSearchTopWidget').trigger("touchstart");
});
jQuery('input.textStringSearchTopWidget').on('touchstart', function () {
    jQuery(this).focus();
});
/* end search */

/* wishlist*/
jQuery('.btnAddToCartwish').on('click', function () {
    var product_id = $(this).closest('.wishlist-item').find('.product_id').val();
    var product_sku_id = $(this).closest('.wishlist-item').find('.product_sku_id').val();
    var product_attribute_cross_id = $(this).closest('.wishlist-item').find('.product_attribute_cross_id').val();
    var image_url = $(this).closest('.wishlist-item').find('.image_url').val();

    addToCart(product_id, product_sku_id, product_attribute_cross_id, image_url, 1);
});

/* product details*/
jQuery(document).ready(function () {
    getProductData();
    jQuery(".dropdownDetail").on('change', function () {
        jQuery(this).parent().find(".dropdownDetail").removeClass('borderError');
        jQuery(this).parent().find(".hiddenAttributeSelected").val(jQuery(this).val());
        jQuery("#errorNumAttribute").hide();
        if(jQuery(this).parent().find(".hiddenAttributeSelected").val() == 0 ){ 
            jQuery(".productItemDetail .hiddenCheckAddToCart").val(0); 
            jQuery(".productItemDetail #hiddenProductSkuID").val(0);
        }
        getProductData();
    });
    jQuery(".buttonItems").on('click', function () {
        if(jQuery(this).parent().parent().find(".hiddenAttributeSelected").val() == jQuery(this).find(".hiddenAttributeID").val()){
            jQuery(this).removeClass("selected");
            jQuery(this).parent().parent().find(".hiddenAttributeSelected").val(0);
        }else {

            jQuery(this).parent().find(".buttonItems").removeClass("selected");
            jQuery(this).addClass("selected"); 
            jQuery(this).parent().parent().find(".hiddenAttributeSelected").val(jQuery(this).find(".hiddenAttributeID").val());
            jQuery(this).parent().find(".buttonItems").removeClass('borderError');
            jQuery("#errorNumAttribute").hide();
        }
        
        if(jQuery(this).parent().parent().find(".hiddenAttributeSelected").val() == 0 ){ 
            jQuery(".productItemDetail .hiddenCheckAddToCart").val(0); 
            jQuery(".productItemDetail #hiddenProductSkuID").val(0);
        }

        getProductData();
    });
    jQuery(".colorDetail div").on('click', function () {
        if(jQuery(this).parent().parent().find(".hiddenAttributeSelected").val() ==jQuery(this).find(".hiddenAttributeID").val()){
            jQuery(this).parent().find("div").removeClass("selected");
            jQuery(this).parent().parent().find(".hiddenAttributeSelected").val(0);
        }else {
            jQuery(this).parent().find("div").removeClass("selected");
            jQuery(this).addClass("selected");
            jQuery(this).parent().find(".colorItems").removeClass('borderError');
            jQuery("#errorNumAttribute").hide();
            jQuery(this).parent().parent().find(".hiddenAttributeSelected").val(jQuery(this).find(".hiddenAttributeID").val());

            if(jQuery(this).parent().parent().find(".hiddenAttributeSelected").val() == 0 ){ 
                jQuery(".productItemDetail .hiddenCheckAddToCart").val(0);
                jQuery(".productItemDetail #hiddenProductSkuID").val(0);
            }
        }
        getProductData();
    });
    jQuery(".product-thumbList a").click(function () {
        var largeImage = jQuery(this).find("div").attr('data-large');
        jQuery(".mainImg").attr('src', largeImage);
    });
    if(plugins['magnificpopup'].isEnable) {
        jQuery('.gall-item-container').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
    jQuery('.addWishlist').on('click', function () {
        if (parseInt(laogekgimember) > 0) {
            var product_id = jQuery("#hiddenProductID").val();
            var product_sku_id = jQuery("#hiddenProductSkuID").val();
            var product_attribute_cross_id = jQuery(".productItemDetail .hiddenAttributeGroupID").val();
            jQuery.ajax({
                type: "POST",
                url: "/page/page_product_item/ajaxPageProductItemController.php",
                data: {
                    type: 'addProductWishList',
                    product_id: product_id,
                    product_sku_id: product_sku_id,
                    product_attribute_cross_id: product_attribute_cross_id
                },
                success: function (result) {
                    document.location.href = "/" + laogekgilanguse + "/member/wishlist";
                }
            });
        } else {
            var product_id = jQuery("#hiddenProductID").val();
            var product_sku_id = jQuery("#hiddenProductSkuID").val();
            var product_attribute_cross_id = jQuery(".productItemDetail .hiddenAttributeGroupID").val();
            showModalBS(1, '/page/page_product_item/wishlistDialogMemberController.php?type=login&product_id=' + product_id + '&product_sku_id=' + product_sku_id + '&product_attribute_cross_id=' + product_attribute_cross_id + '', 'cartlogin');
        }
    });
});

jQuery(".btnAddToCartpdetail").on('click', function () {
    validateAttribute();
    var canAddTocart = jQuery(".productItemDetail .hiddenCheckAddToCart").val();
    
    if(canAddTocart == '1'){
        addToCart(jQuery("#hiddenProductID").val(), jQuery("#hiddenProductSkuID").val(), jQuery(".productItemDetail .hiddenAttributeGroupID").val(), jQuery('#hiddenCartImageDefault').val(), 1);
    }
});

jQuery(window).on('load', function () {
    showImageProductDetail();
});

function checkValidateProductAttribute(){
    var numAttribute = jQuery(".hiddenAttributeSelected").length;
    var numAttributeSelect = 0;
    if(jQuery('#hiddenProductTypeID').val() === '2'){
        jQuery(".hiddenAttributeSelected").each(function() {
            if(jQuery(this).val() === '0'){
                numAttributeSelect++;
            }
        });
        if(numAttribute == numAttributeSelect || numAttributeSelect == 0){
            return 1;
        }else {
            return 0;
        }
    } else {
        return 1;
    }
}

function getProductData() { 
    var tmpArr = new Array();
    var isProduct = 0;
    jQuery("input[name='hiddenAttributeSelected[]']").each(function () {
        tmpArr.push(jQuery(this).val());
        isProduct++;
    });
    
    if(tmpArr != '' && isProduct >0) {
        var isChangeData = checkValidateProductAttribute();
        if(isChangeData == 1){
            var attribute = JSON.stringify(tmpArr);
            getProductAttribute(attribute);
        }
    }
}
function getProductAttribute(attribute) {
    jQuery(".productItemDetail .productPrice").html('<div class="iconLoadSlider loader" style="width: 50px;"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>');
    jQuery.ajax({
        type: "POST",
        url: "/page/page_product_item/ajaxPageProductItemController.php",
        data: {
            'productID': jQuery("#hiddenProductID").val(),
            'productSkuID': jQuery("#hiddenProductSkuID").val(),
            'attributeSet': attribute,
            'type': 'getAttributeGroupID'
        },
        success: function (returnData) {
            //jQuery('#testBugs').html(returnData);
            arrayData = JSON.parse(returnData);
            jQuery(".productItemDetail #hiddenProductSkuID").val(arrayData.skuID);
            jQuery(".productItemDetail .productPrice").html(arrayData.price);
            jQuery(".productItemDetail .hiddenAttributeGroupID").val(arrayData.cross);
            jQuery(".productItemDetail #hiddenProductWeight").val(arrayData.weight);
            jQuery(".productItemDetail .hiddenCheckAddToCart").val(arrayData.cart);

            if (arrayData.skuID ==='0') {
                jQuery(".productItemDetail .productSku").hide();
                jQuery(".productItemDetail .productStock").hide();
                jQuery(".productItemDetail .btnAddToCartpdetail").attr('disabled', 'disabled');
            } else {
                jQuery(".productItemDetail .btnAddToCartpdetail").removeAttr('disabled');
                jQuery(".productItemDetail .productSku").show();
                jQuery(".productItemDetail .productSku").html(arrayData.sku);
                jQuery(".productItemDetail .productStock").show();
                jQuery(".productItemDetail .productStock").html(arrayData.stock);
            } 
            changeProductImage();
            changeUrlSku(arrayData.newUrl);
            
        }
    });
}

function changeUrlSku(url) {
    if (typeof (history.pushState) != "undefined") {
        var obj = { Title: '', Url: url };  
        history.pushState(obj, obj.Title, obj.Url); 
    } else {
        alert("Browser does not support HTML5.");
    }
}

function changeProductImage(){
    jQuery.ajax({
        type: "POST",
        url: "/page/page_product_item/ajaxPageProductItemController.php",
        data: {
            'productID': jQuery("#hiddenProductID").val(),
            'productSkuID': jQuery("#hiddenProductSkuID").val(),
            'type': 'changeImage'
        },
        success: function (returnData) {
            //jQuery('#testBugs').html(returnData);
            jQuery('#flslideProductUl').html('');
            var arrayData = JSON.parse(returnData);
            jQuery(".gall-item-container").remove();
            var j=0;
            jQuery.each(arrayData, function(i, item) {
                //jQuery('#testBugs').html(j);
                if(j == 0){
                    jQuery("#zoomProduct").html('<a id="" class="gall-item" title="'+item.product_name+'" href="'+item.image_url_full+'"><img class="zoomImage img-responsive" data-mag="info0" data-src="'+item.image_url_full+'" src="'+item.image_url_full+'" alt="'+item.product_name+'" title="'+item.image_title+'"/></a>');
                    jQuery('#hiddenCartImageDefault').val(item.image_url);
                    jQuery('#hiddenCartImageDefaultFull').val(item.image_url_full);
                    jQuery("#zoomProduct").after('<div id="fullImgZoom'+j+'" class="gall-item-container"><a href="'+item.image_url_full+'"></a></div>');
                }else{
                    jQuery("#fullImgZoom"+(j-1)).after('<div id="fullImgZoom'+j+'" class="gall-item-container"><a href="'+item.image_url_full+'"></a></div>');
                }
                
                jQuery("#flslideProductUl").append('<li href="'+item.image_url_full+'" style="width: 63px; float: left; display: block;"><a class="zoomThumbLink2"><div id="info'+i+'" class="infoThumbProduct1" data-large="'+item.image_url_full+'"><img src="'+item.image_url_thmb+'" alt="'+item.image_alt+'" title="'+item.image_title+'" draggable="false" style="opcity:1; max-height: 50px;"/></div></a></li>');
                jQuery("img.zoomImage").css('opacity','1');
                jQuery("#info"+i).find("img").css('opacity','1');
                j++;
            }); 
           jQuery('#info0').click();
           if(plugins['magnificpopup'].isEnable) {
                jQuery('.gall-item-container').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            }
           showImageProductDetail();
        }
    });
}

function showImageProductDetail(){
    jQuery(".iconLoadSlider").fadeOut();
    jQuery("#flslideProductUl").fadeIn();
    jQuery('#zoomProduct').zoom({
        touch: false
    });
    jQuery("#zoomProduct").on('click', function () {
        var index = $(this).find(".zoomImage").attr("data-mag").substring(4);
        if(plugins['magnificpopup'].isEnable) {
            jQuery('.gall-item-container').magnificPopup('open', index);
        }
    });
    jQuery(".infoThumbProduct1").on('click', function () {
        var largeImage = jQuery(this).attr('data-large');
        jQuery(".zoomImage").attr('src', largeImage);
        jQuery(".zoomImage").attr('data-mag', $(this).attr("id"));
        jQuery(".zoomImg").attr('src', largeImage);
    });
    jQuery('#flslideProduct').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 63,
        itemMargin: 15,
        customDirectionNav: $(".customProduct-navigation a")
    });
}

function validateAttribute(){ 
    var errorNum = 0;
    if(jQuery('#hiddenProductTypeID').val() === '2'){
        jQuery(".hiddenAttributeSelected").each(function() {
            if(jQuery(this).val() === '0'){
                jQuery(this).parent().find(".dropdownDetail").addClass('borderError');
                jQuery(this).parent().find(".colorItems").addClass('borderError');
                jQuery(this).parent().find(".buttonDetail span").addClass('borderError');
                errorNum++;
            } else {
                jQuery(this).parent().find(".dropdownDetail").removeClass('borderError');
                jQuery(this).parent().find(".colorItems").removeClass('borderError');
                jQuery(this).parent().find(".buttonDetail span").removeClass('borderError');
            }
        });

        if(errorNum > 0 ){
            jQuery.ajax({
                type: "POST",
                url: "/page/page_product_item/ajaxPageProductItemController.php",
                data: {
                    'type': 'returnTextChooseOption'
                },
                success: function (returnData) {
                    jQuery("#errorNumAttribute").show();
                    jQuery("#errorNumText").html(returnData);
                    jQuery(".productItemDetail .hiddenCheckAddToCart").val(0);
                }
            });
        } else {
            jQuery("#errorNumAttribute").hide();
        }
    }
    return errorNum;
}

function compareProductClickCheckbox(jQueryObj, productID, productSkuID, pathImage, warntxt) {
    jQuery.ajax({
        type: 'POST',
        url: '/include/cookieCompareProduct.php',
        data: {
            type: 'compareProductAdd',
            productID: productID,
            productSkuID: productSkuID,
            pathImage: pathImage
        },
        success: function (data, textStatus, jqXHR) {
            if (data == 'isfull') {
                bootbox.alert(warntxt, function () {
                    jQueryObj.prop('checked', false);
                });
            } else {
                document.location.href = '/compare';
            }
        }
    }); 
}

function compareProductClickDetail() {
    var productID = jQuery('#hiddenProductID').val();
    var productSkuID = jQuery('#hiddenProductSkuID').val();
    var productImage = jQuery('#hiddenCartImageDefaultFull').val();
    jQuery.ajax({
        type: 'POST',
        url: '/include/cookieCompareProduct.php',
        data: {
            type: 'compareProductAdd',
            productID: productID,
            productSkuID: productSkuID,
            pathImage: productImage
        },
        success: function (data, textStatus, jqXHR) {
            //jQuery('#testBugs').html(data);
            
        }
    }); 
}
/* END product details*/

/* content details*/
jQuery(document).ready(function () {
    jQuery('.divTextContentDetail img').each(function () {
        if (jQuery(this).closest("a").length !== 1) {
            jQuery(this).wrap('<a class="magnificPopImg" href="' + jQuery(this).attr('src') + '"></a>');
        }
    });
    if(plugins['magnificpopup'].isEnable) {
        jQuery('.gallcndetail-item').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
    if(plugins['magnificpopup'].isEnable) {
        jQuery('.divTextContentDetail').magnificPopup({
            delegate: 'a.magnificPopImg',
            type: 'image',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                opener: function (element) {
                    return element.find('img');
                }
            }
        });
    }
});
jQuery(window).on('load', function () {
    jQuery("#flslideProductUl2").fadeIn();
    jQuery(".zoomThumbLinkcon").on('click', function () {
        var zoomThumb = jQuery(".zoomThumbLinkcon");
        jQuery.each(zoomThumb.find("div"), function () {
            largeImage = jQuery(this).attr('data-large');
            jQuery(this).parent().parent().attr('href', largeImage);
        });
    });
    jQuery('#flslideContent').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 120,
        itemMargin: 15,
        customDirectionNav: $(".customcontent-navigation a")
    });
});
/* END content details*/

/* eventcalendar details*/
function nexevent(url) {
    document.location.href = url;
}
function addClassP() {
    jQuery(".fc-more-popover .fc-content").addClass('p');
}
/* END eventcalendar details*/

/* forum */
jQuery("#buttonAddTopic").on("click", function () {
    document.location.href = urlNewTopic;
});
/* END forum */

/*FAQ*/
jQuery('.faqList1 .collapse').on('show.bs.collapse', function () {
    jQuery(this).parent().find('.faqHeading').find('[data-fa-i2svg]').removeClass('fa-plus').addClass('fa-minus');
});
jQuery('.faqList1 .collapse').on('hide.bs.collapse', function () {
    jQuery(this).parent().find('.faqHeading').find('[data-fa-i2svg]').removeClass('fa-minus').addClass('fa-plus');
});
/*FAQ*/

/* Trackcode */
jQuery("#searchTrack").on('keypress', function (event) {
    if (event.which === 13) {
        event.preventDefault();
        jQuery("#buttonTrackSearch").click();
    }
}).on("blur", function () {
    if (jQuery.trim(jQuery(this).val()) !== "") {
        jQuery("#searchTrack").removeClass('borderError');
    }
});
jQuery("#buttonTrackSearch").on("click", function () {
    var searchTrack = jQuery.trim(jQuery("#searchTrack").val());
    jQuery("#searchTrack").removeClass('borderError');
    jQuery("#divError_searchTrack").hide();

    document.location.href = nextUrlTrack + '/' + searchTrack + '/';
});
/*end Trackcode*/

/*informpayment*/
jQuery(document).ready(function () {
    jQuery('#datePickerPayment').datetimepicker({
        /*format: "YYYY-MM-DD HH:mm",*/
        format: "DD/MM/YYYY",
        icons: {
            date: 'far fa-calendar-alt'
        }
    }).on('dp.change dp.show', function (e) {
        jQuery('#formInformPayment').formValidation('revalidateField', 'ip_paymentDate');
    });
    jQuery('#timePickerPayment').datetimepicker({
        format: "LT",
        icons: {
            time: 'far fa-clock'
        }
    }).on('dp.change dp.show', function (e) {
        jQuery('#formInformPayment').formValidation('revalidateField', 'ip_paymentTime');
    });
    jQuery("#ipPaymentTime").on("blur", function () {
        jQuery('#formInformPayment').formValidation('revalidateField', 'ip_paymentTime');
    });
    jQuery("#captchaInputinform").on("blur", function () {
        jQuery('#formInformPayment').formValidation('revalidateField', 'captcha');
    });
    jQuery("#refreshCaptchainform").on("click", function () {
        generateCaptchaifpm();
    });
    jQuery("#selectPaymentGateway").on('change', function () {
        transferPayment();
    });
});
function transferPayment() {
    if (jQuery("#selectPaymentGateway").val() === "transfer") {
        jQuery("#divTransferPaymentGateway").show();
    } else {
        jQuery("#divTransferPaymentGateway").hide();
    }
}
function randomNumberifpm(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function generateCaptchaifpm(task = null) {
    jQuery('#captchaOperation').html([randomNumberifpm(1, 9), '+', randomNumberifpm(1, 9), '='].join(' '));
    checkCaptcha(task);
}
function checkCaptcha(task = null) {
    var items = jQuery('#captchaOperation').html().split(' ');
    var sum = parseInt(items[0]) + parseInt(items[2]);
    jQuery("#checkCapt").val(sum);

    if (task) {
        jQuery.ajax({
            type: "POST",
            url: '/page/ajax_captcha.php',
            data: {
                type: "setCaptcha",
                task: task,
                sum: sum,
            },
            success: function (returnData) {
            }
        });
    }
}
/*end informpayment*/

/*CONTACT US*/
function initialize01() { // ฟังก์ชันแสดงแผนที่
    GGM = new Object(google.maps); // เก็บตัวแปร google.maps Object ไว้ในตัวแปร GGM
    GGM.visualRefresh = true;
    geocoder = new GGM.Geocoder(); // เก็บตัวแปร google.maps.Geocoder Object
    infowindow = new google.maps.InfoWindow({maxWidth: 300});
    // กำหนดจุดเริ่มต้นของแผนที่
    var my_Latlng = new GGM.LatLng(default_map_latitude, default_map_longtitude);
    var my_mapTypeId = GGM.MapTypeId.ROADMAP; // กำหนดรูปแบบแผนที่ที่แสดง
    // กำหนด DOM object ที่จะเอาแผนที่ไปแสดง ที่นี้คือ div id=map_canvas
    var my_DivObj = jQuery("#map_canvas01")[0];
    // กำหนด Option ของแผนที่
    var myOptions = {
        zoom: 16, // กำหนดขนาดการ zoom
        center: my_Latlng, // กำหนดจุดกึ่งกลาง
        mapTypeId: my_mapTypeId, // กำหนดรูปแบบแผนที่
        streetViewControl: false, //ปิดการใช้ streetview
        scrollwheel: false,
        draggable: googlemapdrag,
        styles: [googleStyle]
    };
    map = new GGM.Map(my_DivObj, myOptions); // สร้างแผนที่และเก็บตัวแปรไว้ในชื่อ map

    // สร้าง bounds เพื่อคำนวณจุดกึ่งกลาง
    var bounds = new GGM.LatLngBounds();
    if (arr_map_latitude !== null && arr_map_longitude !== null) {
        for (var i = 0; i < arr_map_latitude.length; i++) {
            my_Latlng = new GGM.LatLng(arr_map_latitude[i], arr_map_longitude[i]);
            my_Marker = new GGM.Marker({// สร้างตัว marker ไว้ในตัวแปร my_Marker
                position: my_Latlng, // กำหนดไว้ที่เดียวกับจุดกึ่งกลาง
                map: map, // กำหนดว่า marker นี้ใช้กับแผนที่ชื่อ instance ว่า map
                animation: GGM.Animation.DROP,
                draggable: false // กำหนดให้สามารถลากตัว marker นี้ได้
            });

            bounds.extend(my_Latlng); //เก็บพิกัดของแต่ละจุด

            interestings[i] = my_Marker;
            contentInfo[i] = '<table style="width: 100%; border: none;">' +
                    '<tr style="vertical-align: top;">' +
                    '<td style="width: 65px;">' +
                    '<img src="' + arr_map_logo[i] + '" style="max-height: 60px; max-width: 60px;">' +
                    '</td>' +
                    '<td style="width: 150px; color: #333333;">' +
                    '<span style="font-weight: bold;">' + arr_map_name[i] + '</span></br>' +
                    arr_map_detail[i] + '</br>' +
                    '<a target="_blank" style="color:#2200cc; font-size: 12px; font-family: Roboto,Arial,sans-serif;" href="https://www.google.com/maps/place/' + arr_map_latitude[i] + ',' + arr_map_longitude[i] + '">Direction</a>' +
                    '</td>' +
                    '</tr>' +
                    '</table>';

            // กำหนด event ให้กับตัวแผนที่ เมื่อมีการเปลี่ยนแปลง center
            GGM.event.addListener(my_Marker, 'click', (function (my_Marker, i) {
                return function () {
                    interestings[i].setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        interestings[i].setAnimation(null);
                    }, 1500); //animation bounce 2 times
                    infowindow.setContent(contentInfo[i]);
                    infowindow.open(map, interestings[i]);
                }
            })(my_Marker, i));
        }

        // กำหนดจุดกึ่งกลางของแผนที่
        if (arr_map_latitude.length > 1)
            map.fitBounds(bounds);
        else
            map.setCenter(my_Latlng);
    } else {
        map.setCenter(my_Latlng);
        my_Marker = new GGM.Marker({// สร้างตัว marker ไว้ในตัวแปร my_Marker
            position: my_Latlng, // กำหนดไว้ที่เดียวกับจุดกึ่งกลาง
            map: map, // กำหนดว่า marker นี้ใช้กับแผนที่ชื่อ instance ว่า map
            animation: GGM.Animation.DROP,
            draggable: false, // กำหนดให้สามารถลากตัว marker นี้ได้
            title: "MakeWebEasy" // แสดง title เมื่อเอาเมาส์มาอยู่เหนือ
        });
    }
}

function initialize02() { // ฟังก์ชันแสดงแผนที่
    GGM = new Object(google.maps); // เก็บตัวแปร google.maps Object ไว้ในตัวแปร GGM
    GGM.visualRefresh = true;
    geocoder = new GGM.Geocoder(); // เก็บตัวแปร google.maps.Geocoder Object
    infowindow = new google.maps.InfoWindow({maxWidth: 300});
    // กำหนดจุดเริ่มต้นของแผนที่
    var my_Latlng = new GGM.LatLng(default_map_latitude, default_map_longtitude);
    var my_mapTypeId = GGM.MapTypeId.ROADMAP; // กำหนดรูปแบบแผนที่ที่แสดง

    // กำหนด DOM object ที่จะเอาแผนที่ไปแสดง ที่นี้คือ div id=map_canvas
    var my_DivObj = jQuery("#map_canvas02")[0];
    // กำหนด Option ของแผนที่
    var myOptions = {
        zoom: 16, // กำหนดขนาดการ zoom
        center: my_Latlng, // กำหนดจุดกึ่งกลาง
        mapTypeId: my_mapTypeId, // กำหนดรูปแบบแผนที่
        streetViewControl: false, //ปิดการใช้ streetview
        scrollwheel: false,
        draggable: googlemapdrag,
        styles: [googleStyle]
    };
    map = new GGM.Map(my_DivObj, myOptions); // สร้างแผนที่และเก็บตัวแปรไว้ในชื่อ map

    // สร้าง bounds เพื่อคำนวณจุดกึ่งกลาง
    var bounds = new GGM.LatLngBounds();
    if (arr_map_latitude !== null && arr_map_longitude !== null) {
        for (var i = 0; i < arr_map_latitude.length; i++) {
            my_Latlng = new GGM.LatLng(arr_map_latitude[i], arr_map_longitude[i]);
            my_Marker = new GGM.Marker({// สร้างตัว marker ไว้ในตัวแปร my_Marker
                position: my_Latlng, // กำหนดไว้ที่เดียวกับจุดกึ่งกลาง
                map: map, // กำหนดว่า marker นี้ใช้กับแผนที่ชื่อ instance ว่า map
                animation: GGM.Animation.DROP,
                draggable: false // กำหนดให้สามารถลากตัว marker นี้ได้
            });

            bounds.extend(my_Latlng); //เก็บพิกัดของแต่ละจุด

            interestings[i] = my_Marker;
            contentInfo[i] = '<table style="width: 100%; border: none;">' +
                    '<tr style="vertical-align: top;">' +
                    '<td style="width: 65px;">' +
                    '<img src="' + arr_map_logo[i] + '" style="max-height: 60px; max-width: 60px;">' +
                    '</td>' +
                    '<td style="width: 150px; color: #333333;">' +
                    '<span style="font-weight: bold;">' + arr_map_name[i] + '</span></br>' +
                    arr_map_detail[i] + '</br>' +
                    '<a target="_blank" style="color:#2200cc; font-size: 12px; font-family: Roboto,Arial,sans-serif;" href="https://www.google.com/maps/place/' + arr_map_latitude[i] + ',' + arr_map_longitude[i] + '">Direction</a>' +
                    '</td>' +
                    '</tr>' +
                    '</table>';

            // กำหนด event ให้กับตัวแผนที่ เมื่อมีการเปลี่ยนแปลง center
            GGM.event.addListener(my_Marker, 'click', (function (my_Marker, i) {
                return function () {
                    interestings[i].setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        interestings[i].setAnimation(null);
                    }, 1500); //animation bounce 2 times
                    infowindow.setContent(contentInfo[i]);
                    infowindow.open(map, interestings[i]);
                }
            })(my_Marker, i));
        }

        // กำหนดจุดกึ่งกลางของแผนที่
        if (arr_map_latitude.length > 1)
            map.fitBounds(bounds);
        else
            map.setCenter(my_Latlng);
    } else {
        map.setCenter(my_Latlng);
        my_Marker = new GGM.Marker({// สร้างตัว marker ไว้ในตัวแปร my_Marker
            position: my_Latlng, // กำหนดไว้ที่เดียวกับจุดกึ่งกลาง
            map: map, // กำหนดว่า marker นี้ใช้กับแผนที่ชื่อ instance ว่า map
            animation: GGM.Animation.DROP,
            draggable: false, // กำหนดให้สามารถลากตัว marker นี้ได้
            title: "MakeWebEasy" // แสดง title เมื่อเอาเมาส์มาอยู่เหนือ
        });
    }
}
jQuery(".focusMap").click(function () {
    var id = jQuery(this).parent().parent().find(".hiddenBranchID").val();
    var lat = jQuery(this).parent().parent().find(".hiddenLatitude").val();
    var lng = jQuery(this).parent().parent().find(".hiddenLongitude").val();
    var yourLocation = new GGM.LatLng(lat, lng);
    map.setCenter(yourLocation);
    map.setZoom(12);
    GGM.event.trigger(interestings[id], 'click');
});
/**/

/*eventcalendar home*/
function loadEventCalendarListBox(month, year) {
    jQuery.ajax({
        type: 'POST',
        url: '/page/page_eventcalendar/ajaxEventCalendarHomeboxController.php',
        data: {
            'typ': 'gethtml',
            'month': month,
            'year': year
        },
        success: function (returnData) {
            if (returnData) {
                jQuery("#eventcalendarListBox").html(returnData);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
    });
}

$(document).ready(function () {
    $window = $(window);
    jQuery('.targethash').css('top', '-' + jQuery('#menutop').outerHeight() + 'px');
});

function couponClipboard(coupon) {
    var copyText = jQuery('[name="toUseCoupon_' + coupon+'"]').val();
    var $temp = $("<input class='tmp_coupon'>");
    $("body").append($temp);
    $temp.val(copyText).select();
    document.execCommand("copy");
    $temp.remove();
    jQuery('[name="toUseCoupon_' + coupon+'"]').parent().find('.btnCopyCodeCoupon').hide();
    jQuery('[name="toUseCoupon_' + coupon+'"]').parent().find('.btnCopyedCodeCoupon').show();
    setTimeout(function() {
        jQuery('[name="toUseCoupon_' + coupon+'"]').parent().find('.btnCopyCodeCoupon').show();
        jQuery('[name="toUseCoupon_' + coupon+'"]').parent().find('.btnCopyedCodeCoupon').hide();
    }, 1500);
}
// close out script
