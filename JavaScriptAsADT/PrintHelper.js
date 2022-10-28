"use strict";
/**
 * Created by kurmasz on 2/10/15.
 */

var PrintHelper = (function () {

    var print = function (p) {
        document.getElementById("output").innerHTML += p;
    }

    var println = function (p) {
        print(p);
        print("<br>");
    }

    return {
        print: print,
        println: println,
        tab: "<span style='margin-right: 25px'>&nbsp</span>"
    }
})();