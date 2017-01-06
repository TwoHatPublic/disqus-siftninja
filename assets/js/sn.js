var SiftNinja = (function ($) {
	var jk = {};
/* --------------------------------------------------	
-------------------------------------------------- */
    jk.services = {
        classify : function (txt, userName, callBack) {
            
            var body = {
                "text" : txt,
                "user_id" : userName,
                "language": "ee"
            }
                        
            var payload = {
                "async": true,
                "crossDomain": true,
                "url": "https://twohat.com/api/sift-ninja/marketing/",
                "method": "POST",
                "processData": false,
                "data": JSON.stringify(body)
            }
           
            
            $.ajax(payload).done(function (response) {
                var _arr = [],
                    _hashes = "";
                                
                if (!response.response) {

                    if (response.hasOwnProperty("hashes")) {
                         _hashes = response.hashes[0].hashed;
                    }
                    if (response.hasOwnProperty("tags")) {
                        $.each(response.tags, function(index, element){
                            var _risk = "safe";
                                
                            if (element > 4/7) {
                                if (element == 5/7 ) {
                                    _risk = "mild"
                                }
                                if (element == 6/7) {
                                    _risk = "bad"
                                }
                                if (element == 7/7) {
                                    _risk = "severe"
                                }
                            }
                            
                            if (_risk != "safe") {
                                _arr.push({"tag" : index, "risk" : _risk});
                            }
                                
                        });
                    }
                    callBack(_arr, _hashes, response);
                } else {
                    callBack(_arr, _hashes, response);
                }
 
            }).fail(function() {
                    // "Ninja server was busy... try again."
            });
            
        }
            
    };	
/* --------------------------------------------------	
-------------------------------------------------- */
  	return jk;
})(jQuery);