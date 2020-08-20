//Enable tooltips:
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

const options = {
    bottom: '32px', // default: '32px'
    right: '32px', // default: '32px'
    left: 'unset', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: true, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
}

const darkmode = new Darkmode(options);
darkmode.showWidget();

const observer = new MutationObserver(function ()
{
    if (darkmode.isActivated())
    {
        $(".card").addClass("text-white bg-dark");
        $(".list-group-item").addClass("list-group-item-dark");
        $(".download-item").removeClass("list-group-item-dark");
    }
    else
    {
        $(".card").removeClass("text-white bg-dark");
        $(".card-darkmode-ignore").addClass("text-white bg-dark");
        $(".list-group-item").removeClass("list-group-item-dark");
    }
});
observer.observe(document.body, {attributes: true, childList: false, subtree: false});

let carousel = $("#carousel");
let aboutMeTab = $("#nav-about-me-tab");
let resumeTab = $("#nav-resume-tab");
let musicTab = $("#nav-music-tab");
let smartDisplayCard = $("#smartDisplayCard");
let websiteCard = $("#websiteCard");
let otherCard = $("#otherCard");
let webDevCard = $("#webDevCard");
let ethicsCard = $("#ethicsCard");
let card = $(".card");
let collapseOne = $("#collapseOne");
let collapseTwo = $("#collapseTwo");
let collapseThree = $("#collapseThree");
let collapseFour = $("#collapseFour");
let collapseFive = $("#collapseFive");

function scrollDown()
{
    $(document).scrollTop(sessionStorage.getItem("scrollValue"));
}

$(document).ready(function ()
{
    if (darkmode.isActivated())
    {
        $(".card").addClass("text-white bg-dark");
        $(".list-group-item").addClass("list-group-item-dark");
        $(".download-item").removeClass("list-group-item-dark");
    }

    if (localStorage.getItem("modal") !== "false")
    {
        $(".modal").modal();
    }
});

$(window).on('load', function()
{
    //Some of the pictures will be cut off, so we'll just turn this off
    //This apparently has to be checked after the page has been fully loaded; doesn't work using $(document).ready
    if ($(window).width() < $(window).height())
    {
        carousel.carousel('pause');
    }

    if (window.sessionStorage.getItem("selectedTab") !== null)
    {
        switch (sessionStorage.getItem("selectedTab"))
        {
            case "1":
                aboutMeTab.tab('show');
                scrollDown();
                break;
            case "2":
                resumeTab.tab('show');
                if (sessionStorage.getItem("scrollToCard") === "true")
                {
                    openCard();
                }
                else
                {
                    scrollDown();
                }
                break;
            case "3":
                musicTab.tab('show');
                scrollDown();
                break;
        }
        $("#footer").show();
    }
});

$(window).on('scroll', function()
{
    sessionStorage.setItem("scrollValue", $(document).scrollTop())
});

$("#dontShowAgain").click(function()
{
    localStorage.setItem("modal", "false");
});

$(window).resize(function ()
{
    if ($(window).width() < $(window).height())
    {
        carousel.carousel(0);
        carousel.carousel('pause');
    } else
    {
        carousel.carousel('cycle');
    }
    if ($(window).width() < 400)
    {
        darkModeButton.addClass("float");
    }
    else
    {
        darkModeButton.removeClass("float");
    }

});

$(".nav-item").click(function ()
{
    $("#footer").show();
    $('html, body').animate({
        scrollTop: $("#nav-tabContent").offset().top - 56
    }, 500);
});

aboutMeTab.click(function ()
{
    sessionStorage.setItem("selectedTab", "1");
});

resumeTab.click(function ()
{
    sessionStorage.setItem("selectedTab", "2");
});

musicTab.click(function ()
{
    sessionStorage.setItem("selectedTab", "3");
});

smartDisplayCard.click(function()
{
    sessionStorage.setItem("selectedCard", "1");
    $('html, body').animate({
        scrollTop: smartDisplayCard.offset().top - 74
    }, 500);
});

websiteCard.click(function ()
{
    sessionStorage.setItem("selectedCard", "2");
    $('html, body').animate({
        scrollTop: smartDisplayCard.offset().top - 6
    }, 500);
});

otherCard.click(function ()
{
    sessionStorage.setItem("selectedCard", "3");
    $('html, body').animate({
        scrollTop: smartDisplayCard.offset().top + 62
    }, 500);
});

webDevCard.click(function ()
{
    sessionStorage.setItem("selectedCard", "4");
    $('html, body').animate({
        scrollTop: smartDisplayCard.offset().top + 130
    }, 500);
});

ethicsCard.click(function ()
{
    sessionStorage.setItem("selectedCard", "5");
    $('html, body').animate({
        scrollTop: smartDisplayCard.offset().top + 198
    }, 500);
});

card.on('shown.bs.collapse', function()
{
    sessionStorage.setItem("scrollToCard", "true");
})

card.on('hidden.bs.collapse', function()
{
    sessionStorage.setItem("scrollToCard", "false");
})

function openCard()
{
    let tmp = sessionStorage.getItem("scrollValue"); //This value changes once we start showing the card, so we need to get it now
    //sessionStorage.setItem("scrollToCard", "true");
    switch (sessionStorage.getItem("selectedCard"))
    {
        case "1":
            collapseOne.collapse('show');
            collapseOne.on("shown.bs.collapse", function()
            {
                $(document).scrollTop(tmp)
            });
            break;
        case "2":
            collapseTwo.collapse('show');
            collapseTwo.on("shown.bs.collapse", function()
            {
                $(document).scrollTop(tmp)
            });
            break;
        case "3":
            collapseThree.collapse('show');
            collapseThree.on("shown.bs.collapse", function()
            {
                $(document).scrollTop(tmp)
            });
            break;
        case "4":
            collapseFour.collapse('show');
            collapseFour.on("shown.bs.collapse", function()
            {
                $(document).scrollTop(tmp)
            });
            break;
        case "5":
            collapseFive.collapse('show');
            collapseFive.on("shown.bs.collapse", function()
            {
                $(document).scrollTop(tmp)
            });
            break;
    }
}

let presses = [];
let keys = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];
document.addEventListener('keydown', function(e)
{
    presses.push(e.code);
    if (keys[presses.length - 1] !== presses[presses.length - 1])
    {
        presses = [];
    }
    else if (presses.toString() === keys.toString())
    {
        presses = [];
        alert("Cleared local storage and session storage.");
        localStorage.clear();
        sessionStorage.clear();
    }
});