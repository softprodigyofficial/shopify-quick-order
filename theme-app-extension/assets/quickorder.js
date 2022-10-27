

document.addEventListener('DOMContentLoaded', function() {



  $("#productsearch").submit(function (event) {
    event.preventDefault();
   
      console.log('entry per');
      //$(this).data('oldval', $(this).val());
            
            // Kill outstanding ajax request
            //if(currReqObj != null) currReqObj.abort();
            
            // Kill previous search
            //clearTimeout(searchTimeoutID);
          
            var $form = $(this);
          
            //Search term
            var term = '*' + $form.find('input[name="q"]').val() + '*';
  
            var values = '';
  $.each($("input[name='product_vendor[]']:checked"), function() {
    values += "&filter.p.vendor="+$(this).val();
    // or you can do something to the actual checked checkboxes by working directly with  'this'
    // something like $(this).hide() (only something useful, probably) :P
  });
            
            //URL for full search page
           //URL for full search page
           var linkURL = $form.attr('action') + '?type=product&q=' + term+"&filter.v.price.gte="+$("#price_range_from").val()+"&filter.v.price.lte="+$("#price_range_to").val()+values;
            //alert(linkURL);
           // console.log('Hiii krishnagffff');
            //console.log('Hiii krishna1');
            //currentAjaxRequest = jQuery.getJSON(searchURL, function(data) {
  
              $.ajax({
                  url: linkURL,
                  data: {
                    type: 'product',
                    view: 'json',
                    q: term,
                    filters:{variants:{price:{lte:1000,gte:900}}},
  
                  },
                  dataType: "json",
                  success: function(data) {
                  //  console.log(data);
                      //console.log("Product Object: ", response);
                  // console.log(data.results_total);
                      
                      htmldiv11 = '<div class="col-md-12"><div class="row">';
                     // $resultsBox.html('<div class="load"></div>');
  
                      $.each(data.results, function(index, item){
                       // console.log(item.variants);
                        product_name = item.title;
                       /* htmldiv11 += '<div class="products_quantity flex_row space-between row"><div class="product_with_name col-sm-4"><img src="'+item.thumb+'" width="25" height="25"><a class="prd_name_click" id="'+item.id+'" name="'+product_name.replaceAll(' ', '-')+'" href="#">'+item.title+'<img src="'+item.thumb+'" width="25" height="25"></a></div></div></div>'; */
  
                       if(item.special_price){
                       htmldiv11 += '<div class="col-md-6 col-sm-6"><div class="product_inner"><a href="#" class="prd_name_click" id="'+item.id+'" name="'+product_name.replaceAll(' ', '-')+'"><img src="'+item.thumb+'">  <h3>'+item.title+'</h3><div class="prices_list"><span><del>$'+parseFloat(item.price/100).toFixed(2)+'</del></span></div></a><div class="cartbutton"><button onclick="addtocart('+item.variant+')">Add To Cart</button><button id="view_cart" class="viewcart">View Cart</button></div></div></div>';
                       }else{
                        htmldiv11 += '<div class="col-md-6 col-sm-6"><div class="product_inner"><a href="#" class="prd_name_click" id="'+item.id+'" name="'+product_name.replaceAll(' ', '-')+'"><img src="'+item.thumb+'">  <h3>'+item.title+'</h3><div class="prices_list"><span>$'+parseFloat(item.price/100).toFixed(2)+'</span></div></a><div class="cartbutton"><button onclick="addtocart('+item.variant+')">Add To Cart</button><button id="view_cart" class="viewcart">View Cart</button></div></div></div>';
                       }
                        
                      });https://developer-stoore-my.myshopify.com/
  
                      htmldiv11 += '</div></div>';
                      if(data.results_total>0){
                      $("#product_shopify_div").html(htmldiv11); } else{
                        $("#product_shopify_div").html('<span>No results found</span>');
                      }
                      if(data.results_total>0){ 
                      htmldiv12 = '<div class="col-md-12"><div class="message"><span>There are '+data.results_total+' results found so far. Press the Tab key to move to the first result</span></div><div class="row">';}
                      else{
                        htmldiv12 = '<div class="col-md-12"><div class="message"><span>Nothing found. Please change your request</span></div><div class="row">';
                      }

                      $("#notification_div").html(htmldiv12);
  
                  },
                  error: function(error) {
                    console.log("test" + JSON.stringify(error))
                      console.log("This Error: "+ error);
                  }
  
              });
  
  

  });
  
  /// Main search input
  $('#pageheader .search-box input[type="text"]').bind('focusin focusout', function(e){
      $(this).closest('.search-box').toggleClass('focus', e.type == 'focusin');
  });
   

  /// Live search
  var preLoadLoadGif = $('<img src="{{ "ajax-load.gif" | asset_url }}" />');
  var searchTimeoutThrottle = 500;
  var searchTimeoutID = -1;
  var currReqObj = null;
  var currentAjaxRequest = null;
 // var $resultsBox = $('<div class="results-box" />').appendTo('#pageheader .search-box');
 $('.search_bar input[type="text"]').on("keypress", function(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    console.log('entry per');
    $(this).data('oldval', $(this).val());
          
          // Kill outstanding ajax request
          if(currReqObj != null) currReqObj.abort();
          
          // Kill previous search
          clearTimeout(searchTimeoutID);
        
          var $form = $(this).closest('form');
        
          //Search term
          var term = '*' + $form.find('input[name="q"]').val() + '*';

          var values = '';
$.each($("input[name='product_vendor[]']:checked"), function() {
  values += "&filter.p.vendor="+$(this).val();
  // or you can do something to the actual checked checkboxes by working directly with  'this'
  // something like $(this).hide() (only something useful, probably) :P
});
          
          //URL for full search page
         //URL for full search page
         var linkURL = $form.attr('action') + '?type=product&q=' + term+"&filter.v.price.gte="+$("#price_range_from").val()+"&filter.v.price.lte="+$("#price_range_to").val()+values;
          //alert(linkURL);
         // console.log('Hiii krishnagffff');
          //console.log('Hiii krishna1');
          //currentAjaxRequest = jQuery.getJSON(searchURL, function(data) {

            $.ajax({
                url: linkURL,
                data: {
                  type: 'product',
                  view: 'json',
                  q: term,
                  filters:{variants:{price:{lte:1000,gte:900}}},

                },
                dataType: "json",
                success: function(data) {
                    //console.log("Product Object: ", response);
                 console.log(data.results_total);
                    
                    htmldiv11 = '<div class="col-md-12"><div class="row">';
                   // $resultsBox.html('<div class="load"></div>');

                    $.each(data.results, function(index, item){
                      product_name = item.title;
                     /* htmldiv11 += '<div class="products_quantity flex_row space-between row"><div class="product_with_name col-sm-4"><img src="'+item.thumb+'" width="25" height="25"><a class="prd_name_click" id="'+item.id+'" name="'+product_name.replaceAll(' ', '-')+'" href="#">'+item.title+'<img src="'+item.thumb+'" width="25" height="25"></a></div></div></div>'; */

                     if(item.special_price){
                     htmldiv11 += '<div class="col-md-6 col-sm-6"><div class="product_inner"><a href="#" class="prd_name_click" id="'+item.id+'" name="'+product_name.replaceAll(' ', '-')+'"><img src="'+item.thumb+'">  <h3>'+item.title+'</h3><div class="prices_list"><span><del>$'+parseFloat(item.price/100).toFixed(2)+'</del></span></div></a><div class="cartbutton"><button onclick="addtocart('+item.variant+')">Add To Cart</button><button id="view_cart" class="viewcart">View Cart</button></div></div></div>';
                     }else{
                      htmldiv11 += '<div class="col-md-6 col-sm-6"><div class="product_inner"><a href="#" class="prd_name_click" id="'+item.id+'" name="'+product_name.replaceAll(' ', '-')+'"><img src="'+item.thumb+'">  <h3>'+item.title+'</h3><div class="prices_list"><span>$'+parseFloat(item.price/100).toFixed(2)+'</span></div></a><div class="cartbutton"><button onclick="addtocart('+item.variant+')">Add To Cart</button><button id="view_cart" class="viewcart">View Cart</button></div></div></div>';
                     }
                      
                    });

                    htmldiv11 += '</div></div>';

                    if(data.results_total>0){ 
                    $("#product_shopify_div").html(htmldiv11);}
                    else{
                      $("#product_shopify_div").html('<span>No results found</span>');
                    }

                    if(data.results_total>0){ 
                      htmldiv12 = '<div class="col-md-12"><div class="message"><span>There are '+data.results_total+' results found so far. Press enter to see results or press alt+n to move to filters</span></div><div class="row">';}
                      else{
                        htmldiv12 = '<div class="col-md-12"><div class="message"><span>Nothing found. Please change your request</span></div><div class="row">';
                      }

                    $("#notification_div").html(htmldiv12);

                },
                error: function(error) {
                  console.log("test" + JSON.stringify(error))
                    console.log("This Error: "+ error);
                }

            });

  }
});




  $('.search_bar input[type="text"]').bind('keyup change', function(){
      //Only search if search string longer than 2, and it has changed
if($(this).val().length > 2 && $(this).val() != $(this).data('oldval')) {
          //Reset previous value
          $(this).data('oldval', $(this).val());
          
          // Kill outstanding ajax request
          if(currReqObj != null) currReqObj.abort();
          
          // Kill previous search
          clearTimeout(searchTimeoutID);
        
          var $form = $(this).closest('form');
        
          //Search term
          var term = '*' + $form.find('input[name="q"]').val() + '*';

          var values = '';
          $.each($("input[name='product_vendor[]']:checked"), function() {
            values += "&filter.p.vendor="+$(this).val();
            // or you can do something to the actual checked checkboxes by working directly with  'this'
            // something like $(this).hide() (only something useful, probably) :P
          });

                    
                    //URL for full search page
                   //URL for full search page
                   var linkURL = $form.attr('action') + '?type=product&q=' + term+"&filter.v.price.gte="+$("#price_range_from").val()+"&filter.v.price.lte="+$("#price_range_to").val()+values;
          
          //URL for full search page
         //URL for full search page
        
          //alert(linkURL);
         // console.log('Hiii krishnagffff');
          //console.log('Hiii krishna1');
          //currentAjaxRequest = jQuery.getJSON(searchURL, function(data) {

            $.ajax({
                url: linkURL,
                data: {
                  type: 'product',
                  view: 'json',
                  q: term,
                },
                dataType: "json",
                success: function(data) {
                    //console.log("Product Object: ", response);
                 console.log(data.results_total);
                    
                 if(data.results_total>0){ 
                  htmldiv11 = '<div class="col-md-12"><div class="message"><span>There are '+data.results_total+' results found so far. Press enter to see results or press alt+n to move to filters</span></div><div class="row">';}
                  else{
                    htmldiv11 = '<div class="col-md-12"><div class="message"><span>Nothing found. Please change your request</span></div><div class="row">';
                  }

                    $("#notification_div").html(htmldiv11);

                },
                error: function(error) {
                  console.log("test" + JSON.stringify(error))
                    console.log("This Error: "+ error);
                }

            });


           
          //Show loading
          
          
          // Do next search (in X milliseconds)
        
      } else if ($(this).val().length <= 2) {
          //Deleted text? Clear results
          $resultsBox.empty();
      }
  }).attr('autocomplete', 'off').data('oldval', '').bind('focusin', function(){
      //Focus, show results
      $resultsBox.fadeIn(200);
  }).bind('click', function(e){
      //Click, prevent body from receiving click event
      e.stopPropagation();
  });

 
    $(document).on('click','.prd_name_click',function(e){
      //console.log(e.keyCode);
      //if ((e.keyCode || e.which) == 13) {
      $('#productsearch .search-box input[type="text"]').val($('#productsearch .search-box input[type="text"]').val());
      $('button#moveback').prop('disabled', false);
      /** Get product data by product id */

         jQuery.getJSON(window.Shopify.routes.root + 'products/'+$(this).attr('name')+'.js', function(product) {
         // console.log(product);
        /*  product_page_content = "'The title of this product is =='" + product.title+"'"; */
          //$("#product_shopify_div").html("'The variant of this product is =='" + product.variants+"'");
          product_page_content = '';
         
          $.each(product.variants, function(index, vari){
           // product_name = vari.title;
         /*  product_page_content += "'The title of this product variant is =='" + vari.title+"' and the product id is '"+vari.id+"'"; */

          if(product.special_price){
            product_page_content += '<section class="single__product_list"><div class="containers"><div class="row"><div class="col-sm-4 col-xs-12 text-center"><a href="#"><img src="'+product.images[0]+'"></a></div><div class="col-sm-8 col-xs-12"><div class="product__list_col"><h3>'+product.title+'</h3><div class="price"><del><span><bdi><span>$</span>'+parseFloat(product.price/100).toFixed(2)+'</bdi></span></del> <ins><span><bdi><span>$</span>'+parseFloat(product.price/100).toFixed(2)+'</bdi></span></ins></div><p>'+product.description+'</p><div class="quanity_field"><input type="number" value="1"><button onclick="addtocart('+vari.id+')" min="0">add to cart</button><button id="view_cart" >View cart</button></div><div class="product_list_meta"><span>SKU:001</span><span>Categories: <a href="#">Discounted</a>,<a href="#">Web</a></span><span>Tags: <a href="#">Books</a>,<a href="#">CMS</a>,<a href="#">HTML 5</a>,<a href="#">Programming</a>,<a href="#">Wordpress</a></span></div><div class="tabs_additional"><ul class="nav nav-tabs"><li class="active"><a data-toggle="tab" href="#home">Description</a></li></ul><div class="tab-content"><div id="home" class="tab-pane fade in active"><h3>Description</h3><p>'+product.description+'</p></div></div></div></div></div></div></div></div>';
          }else{
            product_page_content += '<section class="single__product_list"><div class="containers"><div class="row"><div class="col-sm-3 col-xs-12 text-center"><a href="#"><img src="'+product.images[0]+'"></a></div><div class="col-sm-9 col-xs-12"><div class="product__list_col"><h3>'+product.title+'</h3><div class="price"><span></bdi><span>$</span>'+parseFloat(product.price/100).toFixed(2)+'</span></bdi> <ins><span></div><div class="quanity_field"><input type="number" value="1" min="0"><button onclick="addtocart('+vari.id+')">add to cart</button><button id="view_cart">View cart</button></div><div class="product_list_meta"><span>SKU:'+vari.sku+'</span><span>Categories: <a href="#">Discounted</a>,<a href="#">Web</a></span><span>Tags: <a href="#">Books</a>,<a href="#">CMS</a>,<a href="#">HTML 5</a>,<a href="#">Programming</a>,<a href="#">Wordpress</a></span></div><div class="tabs_additional"><ul class="nav nav-tabs"><li class="active"><a data-toggle="tab" href="#home">Description</a></li></ul><div class="tab-content"><div id="home" class="tab-pane fade in active"><h3>Description</h3><p>'+product.description+'</p></div></div></div></div></div></div></div></div>';
          }


           })

          $("#product_shopify_div").html(product_page_content);
          console.log(product);
          $("#notification_div").html('<div class="col-md-12"><div class="message"><span>Product '+product.title.charAt(0).toUpperCase() + product.title.slice(1)+' loaded</span></div></div>');
        });

      /** Get product data by product id */
     // }

    });
    
    $(".open_fillter").click(function () {
      $(".popup_fillter").show();
  });
  $(".close_popup ").click(function () {
      $(".popup_fillter").hide();
  });

  $('button#moveback').on('click', function(e){
    $('#productsearch .search-box input[type="text"]').val('flo');
    $('#productsearch').submit();
    $(this).prop('disabled', true);
});

$('button#returntoshoping').on('click', function(e){
  $('#productsearch .search-box input[type="text"]').val('flo');
  $('#productsearch').submit();
  $(this).prop('disabled', true);
});

$("#MainContent .apply_btn").click(function (event) {
  var $form = $('#productsearch');
  var term = '*' + $form.find('input[name="q"]').val() + '*';
  

  var values = '';
  $.each($("input[name='product_vendor[]']:checked"), function() {
    values += "&filter.p.vendor="+$(this).val();
  });
            
            //URL for full search page
           //URL for full search page
           var linkURL = $form.attr('action') + '?type=product&q=' + term+"&filter.v.price.gte="+$("#price_range_from").val()+"&filter.v.price.lte="+$("#price_range_to").val()+values;
            //alert(linkURL);
           // console.log('Hiii krishnagffff');
            //console.log('Hiii krishna1');
            //currentAjaxRequest = jQuery.getJSON(searchURL, function(data) {
  
              $.ajax({
                  url: linkURL,
                  data: {
                    type: 'product',
                    view: 'json',
                    q: term,
                    filters:{variants:{price:{lte:1000,gte:900}}},
  
                  },
                  dataType: "json",
                  success: function(data) {
                      //console.log("Product Object: ", response);
                   console.log(data.results_total);
                      
                      htmldiv11 = '<div class="col-md-12"><div class="row">';
                     // $resultsBox.html('<div class="load"></div>');
  
                      $.each(data.results, function(index, item){
                        product_name = item.title;
                       /* htmldiv11 += '<div class="products_quantity flex_row space-between row"><div class="product_with_name col-sm-4"><img src="'+item.thumb+'" width="25" height="25"><a class="prd_name_click" id="'+item.id+'" name="'+product_name.replaceAll(' ', '-')+'" href="#">'+item.title+'<img src="'+item.thumb+'" width="25" height="25"></a></div></div></div>'; */
  
                       if(item.special_price){
                       htmldiv11 += '<div class="col-md-6 col-sm-6"><div class="product_inner"><a href="#" class="prd_name_click" id="'+item.id+'" name="'+product_name.replaceAll(' ', '-')+'"><img src="'+item.thumb+'">  <h3>'+item.title+'</h3><div class="prices_list"><span><del>$'+parseFloat(item.price/100).toFixed(2)+'</del></span></div></a><div class="cartbutton"><button onclick="addtocart('+item.variant+')">Add To Cart</button><button id="view_cart" class="viewcart">View Cart</button></div></div></div>';
                       }else{
                        htmldiv11 += '<div class="col-md-6 col-sm-6"><div class="product_inner"><a href="#" class="prd_name_click" id="'+item.id+'" name="'+product_name.replaceAll(' ', '-')+'"><img src="'+item.thumb+'">  <h3>'+item.title+'</h3><div class="prices_list"><span>$'+parseFloat(item.price/100).toFixed(2)+'</span></div></a><div class="cartbutton"><button onclick="addtocart('+item.variant+')">Add To Cart</button><button id="view_cart" class="viewcart">View Cart</button></div></div></div>';
                       }
                        
                      });
  
                      htmldiv11 += '</div></div>';
                      if(data.results_total>0){ 
                      $("#product_shopify_div").html(htmldiv11); }else{
                        $("#product_shopify_div").html('<span>No results found</span>');
                      }

                      if(data.results_total>0){ 
                        htmldiv12 = '<div class="col-md-12"><div class="message"><span>There are '+data.results_total+' results found so far. Press enter to see results or press alt+n to move to filters</span></div><div class="row">';}
                        else{
                          htmldiv12 = '<div class="col-md-12"><div class="message"><span>Nothing found. Please change your request</span></div><div class="row">';
                        }

                    $("#notification_div").html(htmldiv12);
  
                  },
                  error: function(error) {
                    console.log("test" + JSON.stringify(error))
                      console.log("This Error: "+ error);
                  }
  
              });

});
$(document).on('click','#view_cart',function(){
  $.ajax({
    url: "/cart.js",
    dataType: "json",
    success: function(data) {
      $('button#moveback').prop('disabled', false);
      console.log(data.items.length);
      $("#notification_div").html('<div class="col-md-12"><div class="message"><span>Cart page loaded. Use tab key for navigation.</span></div></div>');
      htmldiv13 = '<div id="cart_table" class="cart_table"><table><thead><th></th><th></th><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th></thead><tbody><form id="updatecart">';
      $.each(data.items, function(index, vari){

        htmldiv13 += '<tr><td><a href="#" onclick="deletefromcart('+vari.id+')">x</a></td><td><img src="'+vari.featured_image.url+'"></td><td>'+vari.product_title+'</td><td>$'+parseFloat(vari.price/100).toFixed(2)+'</td><td><input name='+vari.id+' type="number" value='+vari.quantity+' min="0" onChange="DoSomething('+vari.quantity+')"></td><td>$'+parseFloat(vari.quantity*vari.final_price/100).toFixed(2)+'</td></tr>';
      
      });
      htmldiv13 += '<tr><td colspan="6"><div class="update_card"><button id="updatecartd" onclick="updatecart()" disabled="disabled">update cart</button></div></td></tr></form></tbody></table></div><div class="cart_total"><h3>cart totals</h3><div class="total_col d-flex"><div class="cart_row"><div class="col-md-6 total"><h4>Subtotal</h4></div><div class="col-md-6"><div class="sub_total"><h5>$'+parseFloat(data.items_subtotal_price/100).toFixed(2)+'</h5></div></div></div><div class="clearfix "></div><div class="cart_row_total"><div class="col-md-6 total"><h4>Total</h4></div><div class="col-md-6"><div class="sub_total"><h5><strong>$'+parseFloat(data.total_price/100).toFixed(2)+'</strong></h5></div></div></div></div><div class="checkout_button"><button class="checkout_btn" onclick="checkoutrefer()">Proceed to checkout</button></div></div>';
      if(data.items.length>0){
      $("#product_shopify_div").html(htmldiv13);}else{
        $("#product_shopify_div").html("<span>Your cart is currently empty.</span>");
      }
    }
  });
});

$("body").keydown(function(e){
  //  e.preventDefault();
   //now we caught the key code.
    var keyCode = e.keyCode || e.which;
   //your keyCode contains the key code, F1 to F12 
    //is among 112 and 123. Just it.
    console.log(keyCode); 
    console.log('test codes');   
    
     if(keyCode == 78){
      $("#price_range_from").focus();
      $(".panel-heading").focus();
     }
     else if(keyCode == 83){
      
      $(".popup_fillter").show();
      $("#search_text").focus();
     // $(".panel-heading").focus();
     }
     else if(keyCode == 67){
      viewcartdata();
     }
     else if(keyCode == 66){
      $('#productsearch .search-box input[type="text"]').val('flo');
      $('#productsearch').submit();
      $(this).prop('disabled', true);
     }
     else if(keyCode == 88){
      var updateData = [];
      $("div#cart_table :input[type='number']").each(function(){
        updateData.push($(this).attr('name')+':'+$(this).val());
       });
      window.location.href = "/cart/"+updateData.join(",");
     }
     else if(keyCode == 27){
      $(".popup_fillter").hide();
     }
    else if(e.key === 'ArrowLeft'){
      $('#productsearch .search-box input[type="text"]').val('flo');
      $('#productsearch').submit();
      $(this).prop('disabled', true);
    }
  
  });


});

function addtocart(variantid){
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: {
      quantity: 1,
      id:variantid
    },
      dataType: 'json', 
     success: function (data) { 
     // $('#CartCount span:first').text(data.quantity);
    // $('#productsearch').append('<p class="alert alert-success">Item added to cart successfully</p>');
     htmldiv11 = '<div class="col-md-12"><div class="message"><span>Product successfully added to your cart. To go to the cart press alt+c. To go to the checkout press alt+x</span></div></div>';

    $("#notification_div").html(htmldiv11);
     // console.log(data);
     
     } 
     });
}
function updatecart(){
  var updatedata = [];
//  console.log('hello');
  $("div#cart_table :input[type='number']").each(function(){
 //   console.log($(this).val());
    updatedata.push($(this).val()); // This is the jquery object of the input, do what you will
   });
  
  jQuery.post(window.Shopify.routes.root + 'cart/update.js', { updates: updatedata }).done(function(response){
    viewcartdata();
});
}
function deletefromcart(variantid){
  var updateData = {}
  updateData[variantid] = 0;
  $.ajax({
    type: 'POST',
    url: '/cart/update.js',
    data: {
      updates: updateData
    },
      dataType: 'json', 
     success: function (data) { 
     // $('#CartCount span:first').text(data.quantity);
     console.log(data.items.length);
     viewcartdata();
      console.log(data);
     
     } 
     });
    
}
function checkoutrefer(){
  var updateData = [];
 
   $.ajax({
    url: "/cart.js",
    dataType: "json",
    success: function(data) {
      $.each(data.items, function(index, vari){
        updateData.push(vari.id+':'+vari.quantity);
      });
      window.location.href = "/cart/"+updateData.join(",");
    }
    });


 // window.location.href = "/cart/"+updateData.join(",");
}



function viewcartdata(){
  $.ajax({
    url: "/cart.js",
    dataType: "json",
    success: function(data) {
      $('button#moveback').prop('disabled', false);
      $("#notification_div").html('<div class="col-md-12"><div class="message"><span>Cart page loaded. Use tab key for navigation.</span></div></div>');
      console.log(data);
      htmldiv13 = '<div id="cart_table" class="cart_table"><table><thead><th></th><th></th><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th></thead><tbody><form id="updatecart">';
      $.each(data.items, function(index, vari){

        htmldiv13 += '<tr><td><a href="#" onclick="deletefromcart('+vari.id+')">x</a></td><td><img src="'+vari.featured_image.url+'"></td><td>'+vari.product_title+'</td><td>$'+parseFloat(vari.price/100).toFixed(2)+'</td><td><input name='+vari.id+' type="number" value='+vari.quantity+' min="0" onChange="DoSomething('+vari.quantity+')"></td><td>$'+parseFloat(vari.quantity*vari.final_price/100).toFixed(2)+'</td></tr>';
      
      });
      htmldiv13 += '<tr><td colspan="6"><div class="update_card"><button id="updatecartd" onclick="updatecart()" disabled="disabled">update cart</button></div></td></tr></form></tbody></table></div><div class="cart_total"><h3>cart totals</h3><div class="total_col d-flex"><div class="cart_row"><div class="col-md-6 total"><h4>Subtotal</h4></div><div class="col-md-6"><div class="sub_total"><h5>$'+parseFloat(data.items_subtotal_price/100).toFixed(2)+'</h5></div></div></div><div class="clearfix "></div><div class="cart_row_total"><div class="col-md-6 total"><h4>Total</h4></div><div class="col-md-6"><div class="sub_total"><h5><strong>$'+parseFloat(data.total_price/100).toFixed(2)+'</strong></h5></div></div></div></div><div class="checkout_button"><button class="checkout_btn" onclick="checkoutrefer()">Proceed to checkout</button></div></div>';
      if(data.items.length>0){
      $("#product_shopify_div").html(htmldiv13);}else{
        $("#product_shopify_div").html("<span>Your cart is currently empty.</span>");
      }
    }
  });
}

//function clearfilter(){


 // $('#filterdiv').find('input')
                //    .each(function () {
                 //       $(this).val('');
                  //  });
 // $('#filterdiv').find('input[name='product_vendor[]']:checked').remove();  
 // $('#filterdiv .checkmark:after').remove();
  //$('#filterdiv .checkmark').css("background-color","none");
        
               //     $('#search_btn_apply').click();
//}

function DoSomething(quantity){
 $("#updatecartd").prop('disabled', false);
}
$('.clear_apply_btn').click(function () {
	$(':checkbox').each(function () {
		$(this).removeAttr('checked');
		$('input[type="checkbox"]').prop('checked', false);
	})
  $('#search_btn_apply').click();
});