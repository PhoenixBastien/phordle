<?php
require_once('_config.php');
?>

<div id="word1">--</div>
<button id="secret">Secret Word</button>

<script>
const word1 = document.getElementById("word1");
const secret = document.getElementById("secret");
secret.onclick = function(e) {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                word1.innerHTML = xmlhttp.responseText;
            }
        }
    };

    xmlhttp.open("GET", "/api.php?action=secret", true);
    xmlhttp.send();
}
</script>