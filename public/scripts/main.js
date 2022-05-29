let time = 1500;
let timer;
let ifPause = false;
let player;
$(".start-timer").click(function () {
	$(".timer-stop").addClass("hidden");
	$(".timer-start").removeClass("hidden");
	timer = setInterval(countdown, 1000);
});
function countdown() {
	if (!ifPause) {
		time--;
		let min = Math.floor(time / 60);
		let sec = time - min * 60;
		$(".curr-time").text(min + ":" + sec);
        $('.timer-time-nav').text(min + ":" + sec);
	}
}
$(".end-timer").click(function () {
	clearInterval(timer);
    $(".curr-time").text('25:00');
    $(".timer-stop").removeClass("hidden");
	$(".timer-start").addClass("hidden");
    $('.timer-time-nav').text('TIMER OFF');
});
$('.cancel-timer').click(function() {
    $('.timer-stop').addClass('hidden');
})
$(".pause-timer").click(function () {
    if (ifPause) {
        ifPause = false;
    } else {
        ifPause = true;
    }
});
$('.add-five').click(function() {
    time += 300;
})
$('.add-ten').click(function() {
    time += 600;
})
$('.add-fifteen').click(function() {
    time += 900;
})

$(".timer-btn").click(function () {
	if ($(".timer-stop").hasClass("hidden")) {
		$(".timer-stop").removeClass("hidden");
	} else {
		$(".timer-stop").addClass("hidden");
	}
});


$('#play-audio').click(function() {
    player = document.getElementById('audio-player');
    player.play();
    $('#play-audio').addClass('hidden');
    $('#pause-audio').removeClass('hidden');
})
$('#pause-audio').click(function() {
    player.pause();
    $('#play-audio').removeClass('hidden');
    $('#pause-audio').addClass('hidden');
})
$('.next-audio').click(function() {
    player = document.getElementById('audio-player');
    player.pause();
    player = document.getElementById('audio-player2');
    player.play();
    $('.song-pic').attr('src','/oldtown.aed55324.jpg');
    $('.song-name').text('OLD TOWN ROAD')
    $('.song-author').text('Lil Nas X')
})
$('.last-audio').click(function() {
    player = document.getElementById('audio-player2');
    player.pause();
    player = document.getElementById('audio-player');
    player.play();
    $('.song-pic').attr('src','/ellemidit.eb22e763.jfif');
    $('.song-name').text('Elle Me Dit');
    $('.song-author').text('MIKA');
})



$(".list-btn").click(function () {
	$(".playlist").toggle();
});
$(".TCtoggle").click(function () {
    if ($('.task-btn').hasClass('bg-white')) {
        $('.task-btn').removeClass('bg-white');
        $('.content-btn').addClass('bg-white');
    } else {
        $('.task-btn').addClass('bg-white');
        $('.content-btn').removeClass('bg-white');
    }
	$(".task").toggle();
	$(".content").toggle();
});
$(".task-edit-panel-close").click(function () {
	$(".task-edit-panel").addClass("hidden");
});
$(".task-edit").click(function () {
	$(".task-edit-panel").removeClass("hidden");
});
$(".add-task").click(function () {
	$(".task-edit-panel").removeClass("hidden");
});
$(".cancel-add").click(function () {
	$(".task-edit-panel").addClass("hidden");
});
$(".save-task").click(function () {
	$(".task-edit-panel").addClass("hidden");
});
$('.open-all-link').click(function() {
    $('.links').each(function(i) {
        window.open($(this).text(), '_blank').focus();
    })
})
$('.deco2020-btn').click(function() {
    $('.deco2020').removeClass('hidden');
    $('.deco2014').addClass('hidden');
})
$('.deco2014-btn').click(function() {
    $('.deco2014').removeClass('hidden');
    $('.deco2020').addClass('hidden');
})
$('.add-new-resource').click(function() {
    $('.resource-edit-panel').removeClass('hidden')
})
$('.edit-resource').click(function() {
    $('.resource-edit-panel').removeClass('hidden')
})
$('.resource-edit-panel-close').click(function() {
    $('.resource-edit-panel').addClass('hidden')
})