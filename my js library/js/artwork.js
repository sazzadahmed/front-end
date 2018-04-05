
(function($){ 

  // Load masonry images (gallery) on portfolio modal on load

  $('#portfolioModal').on('shown.bs.modal', function (evt) {

    evt.stopImmediatePropagation();
    /// Ajax post to fetch artwork cover from remote url
    $("#portfolioModal #id_embed_content").on("input", function(){
          /// POST RESULT AND GET DATA ACCORDINGLY
          var artworkEmbedUrl = $(this).val();
          var fetchArtworkCoverUrl = $('#portfolioModal').find('.artwork_cover_pic').data('remote-cover-url');
          
          $.ajax({
              type: "post",
              url: fetchArtworkCoverUrl,
              data: {
                    'artwork_url' : artworkEmbedUrl,
                    'csrfmiddlewaretoken' : $("input[name=csrfmiddlewaretoken]").val()
                },
              beforeSend : function() {                         
                     $(' #portfolioModal .artwork_cover_pic .spinner_contant').show();
                    },
              success : function(data) {
                   if (data.status == 'success'){    
                     var hiddenElement = $('<input type="hidden" name = "artwork-remote-cover-url" />')
                .val(data.artwork_cover);
            if($('#portfolioModal .artwork_cover_pic input[name="artwork-remote-cover-url"]').length){
                  $('#portfolioModal .artwork_cover_pic input[name="artwork-remote-cover-url"]').val(data.artwork_cover);
                }else{
                  $('#portfolioModal .artwork_cover_pic').append(hiddenElement);   
                }                                     
                    $('#portfolioModal .artwork_cover_pic img').attr('src', data.artwork_cover);
                    $('#portfolioModal .artwork_cover_pic img').show();
                    $(".upload_artwork_cover_wrapper").remove();

                   }else{ 
                      $(".upload_artwork_cover_wrapper").remove();
                      $('#portfolioModal .artwork_cover_pic img').show();
                    }
               },

              complete : function() {
                  $(' #portfolioModal .artwork_cover_pic .spinner_contant').hide();

                  }
        });

    });


      // Add gallery form to portfolio modal

  $("#portfolioModal").on('click','.add_gallery_button', function(evt){

        var self = $(this);
        self.parent('form').find('#id_embed_content').val(''); 
        $('.fetch_results')
        evt.stopImmediatePropagation();  
        $.ajax({
            type: "get", 
            url: $(this).attr('href'),                              
            beforeSend : function() {
              $('#portfolioModal .form-audio-video').hide();
              $('#portfolioModal #artwork_gallery .spinner_contant').show(); 
              $('#portfolioModal #artwork_gallery .upload-form').html('');           
            },                        
            success : function(data) {                            
            $('#portfolioModal #artwork_gallery .upload-form').append(data); 
            $('#portfolioModal #artwork_gallery .spinner_contant').hide();
            self.parent(".add_gallery_with_url").hide();
            $(".delete_gallery").show();
                  
             },                  
      }); 
      return false;

    });

  // Update artwork cover from remote url on click "From URL"
  $("#portfolioModal").on('click','.add_artwork_cover_from_url', function(evt){
    if($("#portfolioModal #id_embed_content").val()!=''){          
        $("#portfolioModal #id_embed_content").trigger("input");
    }else{
      return false;
    }

   });

  // Add artwork cover form to portfolio modal

  $("#portfolioModal").on('click','.add_artwork_cover', function(evt){
        var self = $(this);
        var url = $(this).parent('.remote-cover').data('cover-form-url');
        console.log(url)
        evt.stopImmediatePropagation();  
        $.ajax({
            type: "get", 
            url: url,                              
            beforeSend : function() {                
              $('#portfolioModal .artwork_cover_pic .spinner_contant').show(); 
                  
            },                        
            success : function(data) {                                         
              $('#portfolioModal .artwork_cover_pic span').append(data);
              $('#portfolioModal .artwork_cover_pic span.remote-cover img').hide();

              if($('#portfolioModal .artwork_cover_pic input[name="artwork-remote-cover-url"]').length){
                $('#portfolioModal .artwork_cover_pic input[name="artwork-remote-cover-url"]').remove();
              }

              $('#portfolioModal .artwork_cover_pic .spinner_contant').hide();    
              $(".delete_artwork_cover").show();                    
            },                  
      }); 
      return false;

    });

    // Check if gallery-images / masonry-conatainer there
     if ($('#portfolioModal #artwork_gallery .masonry-container').length){
        $(".delete_gallery, .add_gallery").show();
        $(".add_gallery_with_url").hide();
        var url = $(this).find('#artwork_gallery .masonry-container').data('current-gallery-url');             
         $.ajax({
                type: "get",                   
                url: url,
                beforeSend : function() {                
                  $('#portfolioModal #artwork_gallery .spinner_contant').show(); 
                  $('#portfolioModal #artwork_gallery .masonry-container').html('');           
                },  

                success : function(data) {                            
                $('#portfolioModal #artwork_gallery .masonry-container').append(data); 
                $('#portfolioModal #artwork_gallery .spinner_contant').hide(); 
                initializeMasonry();
                var $container = $('#artwork_gallery .masonry-container'); 
                $container.masonry();
                      
                 },                  
          });

     }

     // load all making of images on portfolio modal load 

     if ($('#portfolioModal #makingof_gallery .masonry-container').length){
        $(".delete_makingof").show();
        var url = $(this).find('#makingof_gallery .masonry-container').data('current-makingof-url');             
         $.ajax({
                type: "get",                   
                url: url,
                beforeSend : function() {                
                  $('#portfolioModal #makingof_gallery .spinner_contant').show(); 
                  $('#portfolioModal #makingof_gallery .masonry-container').html('');           
                },  

                success : function(data) {                            
                $('#portfolioModal #makingof_gallery .masonry-container').append(data); 
                $('#portfolioModal #makingof_gallery .spinner_contant').hide(); 
                initializeMakingOfMasonry();
                var $container = $('#makingof_gallery .masonry-container'); 
                $container.masonry();
                      
                 },                  
          });

     }

     $("#portfolioModal .artwork_cover_pic button").click(function () {
            $("#portfolioModal .artwork_cover_pic input").trigger('click');
        });

      $( "#portfolioModal .datepicker" ).datepicker({
          dateFormat: 'yy-mm-dd',
          changeMonth: true,
          changeYear: true,
          yearRange: "1900:2090",
          // You can put more options here.

        });

      if ($("#portfolioModal #id_pub_date").val()==''){
        $("#portfolioModal .datepicker").datepicker("setDate", new Date());
      }

     function initializeMasonry(){
        var $container = $('#portfolioModal #artwork_gallery .masonry-container');        
            $container.imagesLoaded(function() {                      
                $container.masonry({
                    isInitLayout : true,
                    columnWidth: '.item',
                    itemSelector: '.item',
                });
            });
      }

    function initializeMakingOfMasonry(){
          var $container = $('#portfolioModal #makingof_gallery .masonry-container');        
          $container.imagesLoaded(function() {                      
              $container.masonry({
                  isInitLayout : true,
                  columnWidth: '.item',
                  itemSelector: '.item',
              });
          });
    }

      $("#portfolioModal #add_artwork_publish_date_input" ).datepicker();

     //Delete Artwork based on artwork id  
     $("#portfolioModal .select2-selection__placeholder").text("Choose User");

      $("#portfolioModal #portfolioModalDelete").on('click','#delete_confirm_no', function(evt){                
          $("#portfolioModalDelete").modal("hide");
      });

      $("#portfolioModal #portfolioModalDelete").on('click','#delete_confirm_yes', function(evt){ 
          data = {  
            csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
          }              
          evt.preventDefault();            
          $.ajax({
              type: "post", 
              url: $(this).data('delete-url'), 
              data : data,          
              beforeSend : function() {
                $('#portfolioModal .spinner_contant').show();
                $(this).text("Deleting..");
              },
              success : function(data) {
                   $('#portfolioModal .spinner_contant').hide(); 
                    $("#portfolioModal").modal("hide");  
                    window.location = window.location         
               },                  
        }); 
        return false;

      });

      // Init file field using AjaxUploadWidget

      var initialFormCount = parseInt($('#portfolioModal #id_making_image' + '-TOTAL_FORMS').val());

        for(i=0;i<initialFormCount;i++){  

           new AjaxUploadWidget($("#portfolioModal #initAjax #id_making_image-"+i+"-makingof_image"));
           $("#portfolioModal #initAjax #id_making_image-"+i+"-makingof_image").attr('name', 'file'); 
          
        }                    

        $('#portfolioModal #empty_making_img input').attr('data-filename', '');

          // Code adapted from http://djangosnippets.org/snippets/1389/ 


          function updateElementIndex(el, prefix, ndx) {
              var id_regex = new RegExp('(' + prefix + '-\\d+-)');
              var replacement = prefix + '-' + ndx + '-';
              if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex,
              replacement));
              if (el.id) el.id = el.id.replace(id_regex, replacement);
              if (el.name) el.name = el.name.replace(id_regex, replacement);
          }

          function deleteForm(btn, prefix) {

              var formCount = parseInt($('#portfolioModal #id_' + prefix + '-TOTAL_FORMS').val());
              //console.log("form count in delete form" + formCount);
              if (formCount > 1) {
                  // Delete the item/form
                  $(btn).parents('.' + prefix).hide();
                  $(btn).parents('.' + prefix).find('.form-delete-checkbox input').attr('checked', 'checked');
                  var form_selectors = $('.' + prefix);
                  if (prefix == 'making_image'){
                   // console.log("Making image formset");
                    form_selectors = $('.' + prefix + ':not(#portfolioModal #empty_making_img)');
                  }else{
                       form_selectors = $('#portfolioModal '+ '.' + prefix + ':not(#portfolioModal #empty_collab)');

                  }
                  //console.log(form_selectors);

                  var forms = form_selectors; // Get all the forms  
                  // Update the total number of forms (1 less than before)
                  console.log("Total forms after delete -- " + forms.length)
                  $('#portfolioModal #id_' + prefix + '-TOTAL_FORMS').val(forms.length);
                  var i = 0;
                  // Go through the forms and set their indices, names and IDs
                  for (formCount = forms.length; i < formCount; i++) {
                      $(forms.get(i)).children().children().each(function () {
                          /*if ($(this).attr('type') == 'text')*/         
                            updateElementIndex(this, prefix, i);
                            //console.log('index updated...')           

                      });
                  }
              } // End if
              else {
                 return false;
              }
              return false;
          }

          function addForm(btn, prefix) {
              var formCount = parseInt($('#portfolioModal #id_' + prefix + '-TOTAL_FORMS').val());
              // You can only submit a maximum of 10 todo items 
              if (formCount < 100) {
                  // Clone a form (without event handlers) from the first form


                  var row = $("#portfolioModal " +"." + prefix + ":first").clone(false).get(0);
                  // Insert it after the last form
                  $(row).removeAttr('id').hide().insertAfter("#portfolioModal "+ "." + prefix +":last").slideDown(300);
                  // Remove the bits we don't want in the new row/form
                  // e.g. error messages
                  $("#portfolioModal .errorlist", row).remove();
                  $(row).children().removeClass("error");

                  // Relabel or rename all the relevant bits
                  $(row).children().children().each(function () {
                      updateElementIndex(this, prefix, formCount);
                      $(this).val("");
                  });

                  // Add an event handler for the delete item/form link 
                  $(row).find("#portfolioModal .delete-" + prefix).click(function () {
                      return deleteForm(this, prefix);
                  });
                  // Update the total form count
                  $("#portfolioModal #id_" + prefix + "-TOTAL_FORMS").val(formCount + 1); 
                  //console.log("form count in add form" + formCount);       
                  new AjaxUploadWidget($("#portfolioModal #id_making_image-"+(formCount)+"-makingof_image"));

                  // Add collaborator formset and bind select2
                
                  $("#portfolioModal #id_collab-"+(formCount)+"-user").djangoSelect2({
                      placeholder: 'Choose User',
                      dropdownParent: $('#all-collab'),
                  });
                  $("#portfolioModal .select2-selection__placeholder").text("Choose User");
                  

              } // End if
              else {
                  alert("Sorry, you can only enter a maximum of 100 items.");
              }
              return false;
          }

          // Register the click event handlers
          $("#portfolioModal").on("click", "#add-collaborator", function () {
             return addForm(this, "collab");

          });

          $("#portfolioModal").on("click", ".delete-collab", function () {
              console.log('here');
              console.log(this);
              return deleteForm(this, "collab");
          });






    });

    // Remove single gallery image from portfolio/artwork modal 

    $("#portfolioModal").on('click', '.remove_gallery_image', function(evt){
        evt.stopImmediatePropagation();
        evt.preventDefault(); 
        var delete_url = $(this).data('delete-gallery-img-url');
        var data = {  
              csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
            }
        var self = $(this);
        $.ajax({
                type: "post", 
                url: delete_url,  
                data : data,                            
                beforeSend : function() {                
                            
                },                        
                success : function(data) {  
                  self.parent('.item').remove();                         
                  var $container = $('#portfolioModal #artwork_gallery .masonry-container');
                  /*initializeMasonry();   */                 
                  $container.masonry({
                          itemSelector: '.item',
                          isInitLayout: false
                      }
                    );
                      
                 },                  
          });


    });



    // Remove single making of image from portfolio/artwork modal 

    $("#portfolioModal").on('click', '.remove_makingof_image', function(evt){
        evt.stopImmediatePropagation();
        evt.preventDefault(); 
        var delete_url = $(this).data('delete-makingof-img-url');
        var data = {  
              csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
            }
        var self = $(this);
        $.ajax({
                type: "post", 
                url: delete_url,  
                data : data,                            
                beforeSend : function() {                
                            
                },                        
                success : function(data) {  
                  self.parent('.item').remove();                         
                  var $container = $('#portfolioModal #makingof_gallery .masonry-container');
                   $container.masonry({
                          itemSelector: '.item',
                          isInitLayout: false
                      }
                    );
                      
                 },                  
          });


    });


  // Delete whole gallery from artwork modal
   

  $("#portfolioModal").on('click','.delete_gallery_button', function(evt){
        var self = $(this);
        evt.stopImmediatePropagation();
        var deleteConfirm = new jBox('Confirm', {
            title: '<div class="text-danger">Delete Confirmation</div>',
            content: '<div class="confirm_message text-danger">Are you sure you want to delete the gallery and add embed code?</div>',
            confirmButton: 'Delete',
            cancelButton: 'Cancel',
            confirm: function(ev){                  
                if ($('#portfolioModal #artwork_gallery .masonry-container').length){      
                  var deleteUrl = self.data('delete-url');                           
                  data = {  
                      csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
                    }

                    $.ajax({
                        type: "post", 
                        url: deleteUrl, 
                        data : data,          
                        beforeSend : function() {                               
                          $('#portfolioModal .spinner_contant').show();
                        },
                        success : function(data) {
                          $('#portfolioModal .spinner_contant').hide(); 
                          $('#portfolioModal #artwork_gallery .upload-form').html('');
                          $("#portfolioModal .form-audio-video").show();
                          $("#portfolioModal .add_gallery_with_url").show();
                          $("#portfolioModal .add_gallery_with_delete").hide();
                          $('#portfolioModal .delete_gallery').hide();                            
                          $('#portfolioModal .gallery_masonry_wrapper').html('');
                                           
                         },                  
                    }); 
                    return false;

                }else{
                  $('#portfolioModal #artwork_gallery .upload-form').html('');
                  $(".form-audio-video").show();
                  $(".add_gallery_with_url").show();
                  $('.delete_gallery').hide();
                }
            },
        });

        deleteConfirm.open();


    });



  // Delete all making of images 
  $("#portfolioModal").on('click','.delete_makingof_button', function(evt){
        var self = $(this);
        evt.stopImmediatePropagation();
        var deleteConfirm = new jBox('Confirm', {
            title: '<div class="text-danger">Delete Confirmation</div>',
            content: '<div class="confirm_message text-danger">Are you sure you want to delete all gmaking of images? Please note you cant revert.</div>',
            confirmButton: 'Delete',
            cancelButton: 'Cancel',
            confirm: function(ev){                  
                if ($('#portfolioModal #makingof_gallery .masonry-container').length){      
                  var deleteUrl = self.data('delete-url');                           
                  data = {  
                      csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
                    }

                    $.ajax({
                        type: "post", 
                        url: deleteUrl, 
                        data : data,          
                        beforeSend : function() {                               
                        },
                        success : function(data) {                      
                          $('#portfolioModal .makingof_masonry_wrapper').html('');                                   
                         },                  
                    }); 
                    return false;

                }
            },
        });

        deleteConfirm.open();


    });


    
  })(jQuery);  

