$(document).ready( function() {
    connectEventHandlers();
    
} );

function connectEventHandlers() {
    //Connect song table to ajax
    $('#songs tr:has(td)').click( function() {
        var row = $(this)
        // Prevent accidental double clicks
        if( $(this).is(':animated') ) { return; }
        // Show the highlight
        $(this).effect('highlight', { color : '#999999'}, 1000 );
        
        // Post the request
        var POST = [ $(this).attr('id') ];
        $.ajax( '/ajax/add/', {
            type: 'POST',   //As a post request
            data: {"songs": JSON.stringify( POST )}, //Post the song list
            success: function() {
                row.css('color', '#AAAAAA'); //If successful, change color of row
            },
            error: function() {
                //TODO Error handling here.
                //alert( "There was an error adding " + POST.length + " file(s) to the current playlist." );
            }
        } );
    } );
    
    
    //Connect filter text box
    $('#filter').keyup( function() {
        if (event.keyCode == 27 || $(this).val() == '') {  
            //if esc is pressed we want to clear the value of search box  
            $(this).val('');  

            //we want each row to be visible because if nothing  
            //is entered then all rows are matched.  
            $('tbody tr').removeClass('hide');  
        }  
        query = $('#filter').val();
        
        $('#songs tr:has(td)').each( function() {
            $(this).text().search(new RegExp(query, "i")) < 0 ? $(this).addClass("hide") : $(this).removeClass("hide");
        } );
        
    } );
}
