$(window).ready(function () {

    /* Set Time/Date */
    var now = new Date();
    var x = document.getElementById("times");
    x.innerHTML = now;


    /* Sample now next data */
    var now = [{
        name: "An American Treehouse",
        syn: "A haunted treehouse plagues a Northwestern family.",
        startime: "21:00",
        endTime: "23:00"
    }, {
        name: "Rats Nest",
        syn: "Pete Struggles to survive",
        startime: "21:00",
        endTime: "22:00"
    }, {
        name: "Cricket",
        syn: "The final test match",
        startime: "21:00",
        endTime: "23:30"
    }, {
        name: "Monteballo",
        syn: "Is this case as simple as it seems",
        startime: "21:00",
        endTime: "22:00"
    }];
    var next = [{
        name: "Newsnight",
        syn: "Politcal Show",
        startime: "23:00",
        endTime: "24:00"
    }, {
        name: "Top of the Pops",
        syn: "The Top 40",
        startime: "22:00",
        endTime: "23:00"
    }, {
        name: "Soccer",
        syn: "Man United take on Benfica",
        startime: "23:30",
        endTime: "00:30"
    }, {
        name: "Macbeth",
        syn: "Scene 2",
        startime: "22:00",
        endTime: "23:00"
    }];

    /* create window object to control movement */
    var epgwin = {};
    epgwin.nwelements = ["nw1", "nw2", "nw3", "nw4"];
    epgwin.nxtelements = ["nxt1", "nxt2", "nxt3", "nxt4"];
    epgwin.index = 0;
    epgwin.col = 0;
    epgwin.setFocus = function (x) {
        $("#" + x).focus();
        $("#" + x).css('border-color', '#50fdf0');
    };
    epgwin.setFocusNow = function (x) {
        console.log("Now event down");
        for (var i = 0; i <= this.nwelements.length; i++) {
            $("#" + this.nwelements[i]).blur();
            $("#" + this.nwelements[i]).css('border-color', 'black');
        }
        $("#" + this.nwelements[x]).focus();
        $("#" + this.nwelements[x]).css('border-color', '#50fdf0');

    };
    epgwin.setFocusNxt = function (x) {
        for (var i = 0; i <= this.nxtelements.length; i++) {
            $("#" + this.nxtelements[i]).blur();
            $("#" + this.nxtelements[i]).css('border-color', 'black');
        }
        $("#" + this.nxtelements[x]).focus();
        $("#" + this.nxtelements[x]).css('border-color', '#50fdf0');
    };

    epgwin.keyDown = function () {
        if (this.index >= (this.nwelements.length - 1)) {
            this.index = 0;
        } else {
            this.index = this.index + 1;

        }
        if (this.col == 0) {
            this.setFocusNow(this.index);
        } else {
            this.setFocusNxt(this.index);
        }
        this.setSyn(this.index);
    };
    epgwin.keyUp = function () {
        if (this.index == 0) {
            this.index = 0;
        } else {
            this.index = this.index - 1;
            if (this.col == 0) {
                this.setFocusNow(this.index);
            } else {
                this.setFocusNxt(this.index);
            }
        }
        this.setSyn(this.index);
    };
    epgwin.keyLeft = function () {
        epgwin.col = 0;
        $("#" + this.nxtelements[this.index]).blur();
        $("#" + this.nxtelements[this.index]).css('border-color', 'black');
        this.setFocusNow(this.index);
        this.setSyn(this.index);
    };

    epgwin.keyRight = function () {
        epgwin.col = 1;
        $("#" + this.nwelements[this.index]).blur();
        $("#" + this.nwelements[this.index]).css('border-color', 'black');
        this.setFocusNxt(this.index);
        this.setSyn(this.index);
    };

    epgwin.setSyn = function (x) {
        if (this.col == 0) {
            $("#eventinf").html(now[x].syn);
        } else {
            $("#eventinf").html(next[x].syn);
        }
    };



    /* initialization */
    epgwin.setFocus("nw1");
    epgwin.setSyn(0);
    /*  Data loader */
    for (var i = 0; i < (now.length); i++) {
        $("#nw" + (i + 1)).html(now[i].name);
        $("#nxt" + (i + 1)).html(next[i].name);
    }



    /* key handler */

    $("#screen").keyup(function (event) {
        if (event.which == 40) { /* down key */
            console.log("Key down detected");
            epgwin.keyDown();

        } else if (event.which == 38) {
            console.log("Key Up Detected");
            epgwin.keyUp();
        } else if (event.which == 13) {
            console.log("Enter Detected");
            epgwin.keyEnter();
        } else if (event.which == 39) {
            console.log("Right Detected");
            epgwin.keyRight();
        } else if (event.which == 37) {
            console.log("left Detected");
            epgwin.keyLeft();
        }
    });

});