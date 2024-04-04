document.addEventListener('DOMContentLoaded', function() {
    // Assuming postTitle and postBody are defined somewhere in your script
    var postTitle = "Your dynamic title";
    var postBody = "Your dynamic body content";

    // Set the value of the input field
    document.querySelector('input[name="postTitle"]').value = postTitle;

    // Set the value of the textarea
    document.getElementById('postbody').value = postBody;
});
