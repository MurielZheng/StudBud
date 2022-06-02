let time = 1500;
let timer;
let sw = 0;
let swtimer;
let ifPause = false;
let player;

// 番茄时钟
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
// 结束番茄时钟
$(".end-timer").click(function () {
	clearInterval(timer);
    $(".curr-time").text('25:00');
    $(".timer-stop").removeClass("hidden");
	$(".timer-start").addClass("hidden");
    $('.timer-time-nav').text('TIMER OFF');
});
// 取消番茄时钟
$('.cancel-timer').click(function() {
    $('.timer-stop').addClass('hidden');
})
// 暂停时钟
$(".pause-timer").click(function () {
    if (ifPause) {
        ifPause = false;
    } else {
        ifPause = true;
    }
});
// 增加时间
$('.add-five').click(function() {
    time += 300;
})
$('.add-ten').click(function() {
    time += 600;
})
$('.add-fifteen').click(function() {
    time += 900;
})
// 打开时钟弹窗
$(".timer-btn").click(function () {
	if ($(".timer-stop").hasClass("hidden")) {
		$(".timer-stop").removeClass("hidden");
	} else {
		$(".timer-stop").addClass("hidden");
	}
});
$(".timer").click(function () {
	if ($(".timer-stop").hasClass("hidden")) {
		$(".timer-stop").removeClass("hidden");
	} else {
		$(".timer-stop").addClass("hidden");
	}
});

let currentMusicIndex = 1;
const musics = $('.playlist-scroll > div');
function playProgress() {
	player.addEventListener("timeupdate", function() {
		const currentTime = player.currentTime;
		const duration = player.duration;
		const progress = currentTime / duration * 100 + '%';
		$('#music_progress').css('width', progress);
	});
}

// 播放音乐
$('#play-audio').click(function() {
    player = document.getElementById('audio-player' + currentMusicIndex);
    player.play();
		player.removeEventListener("timeupdate", playProgress);
		player.addEventListener("timeupdate", playProgress);

    $('#play-audio').addClass('hidden');
    $('#pause-audio').removeClass('hidden');
})
// 暂停音乐
$('#pause-audio').click(function() {
    player.pause();
    $('#play-audio').removeClass('hidden');
    $('#pause-audio').addClass('hidden');
})
// 下一首音乐
$('.next-audio').click(function() {
    player = document.getElementById('audio-player' + currentMusicIndex);
    player.pause();
		currentMusicIndex++;
    player = document.getElementById('audio-player' + currentMusicIndex);
    player.play();
		player.removeEventListener("timeupdate", playProgress);
		player.addEventListener("timeupdate", playProgress);

		const musicItem = musics[currentMusicIndex - 1];
    $('.song-pic').attr('src', $(musicItem).find('.music-img').attr('src'));
    $('.song-name').text($(musicItem).find('.music-name').text())
    $('.song-author').text($(musicItem).find('.music-artist').text())
})
// 上一首音乐
$('.last-audio').click(function() {
    player = document.getElementById('audio-player' + currentMusicIndex);
    player.pause();

		currentMusicIndex--;
    player = document.getElementById('audio-player' + currentMusicIndex);
    player.play();
		player.removeEventListener("timeupdate", playProgress);
		player.addEventListener("timeupdate", playProgress);

		const musicItem = musics[currentMusicIndex - 1];
		$('.song-pic').attr('src', $(musicItem).find('.music-img').attr('src'));
		$('.song-name').text($(musicItem).find('.music-name').text())
		$('.song-author').text($(musicItem).find('.music-artist').text())
})
// 切换番茄时钟与秒表
$('.swap-watch').click(function() {
    if ($('.pomodoro').hasClass('hidden')) {
        $('.pomodoro').removeClass('hidden');
        $('.stopwatch').addClass('hidden');
        $('.sw-btn').removeClass('bg-white')
        $('.pomodoro-btn').addClass('bg-white')
    } else {
        $('.pomodoro').addClass('hidden');
        $('.stopwatch').removeClass('hidden');
        $('.sw-btn').addClass('bg-white')
        $('.pomodoro-btn').removeClass('bg-white')
    }
})
// 开始秒表
$('.start-sw').click(function() {
    swtimer = setInterval(() => {
        sw = sw + 50;
		if (sw) {
            let min = Math.floor(sw / 6000);
        }
		let sec = sw - min * 6000;
        let milisec = 0;
		$(".sw").text(min + ":" + sec);
        // $('.timer-time-nav').text(min + ":" + sec);
    }, 50);
})
// 取消秒表
$('.cancel-sw').click(function() {
    sw = 0;
    $(".sw").text('00:00:00');
    clearInterval(swtimer);
})
// 打开播放列表弹窗
$(".list-btn").click(function () {
	$(".playlist").toggle();
});
// 切换资源和看板
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
// 关闭编辑资源弹窗
$(".task-edit-panel-close").click(function () {
	$(".task-edit-panel").addClass("hidden");
});
// 打开编辑资源弹窗并赋值
$(".task-edit").click(function () {
	$(".task-edit-panel").removeClass("hidden");
    let title = $(this).parent().parent().find('.task-title').text();
    let desc = $(this).parent().parent().find('.task-desc').text();
    let status = $(this).parent().parent().parent().find('.status').text();
    let prior = $(this).parent().parent().find('.task-prior').text();
    $('.add-title').val(title);
    $('.add-desc').val(desc);
    $('.add-prior').val(prior);
    $('.add-status').val(status);
    $('.add-subject').val('DECO2020');
});
// 打开添加资源弹窗
$(".add-task").click(function () {
	$(".task-edit-panel").removeClass("hidden");
});
// 取消添加
$(".cancel-add").click(function () {
	$(".task-edit-panel").addClass("hidden");
});
// 保存
$(".save-task").click(function () {
	$(".task-edit-panel").addClass("hidden");
});
// 打开所有资源链接
$('.open-all-link').click(function() {
    $('.links').each(function(i) {
        window.open($(this).text(), '_blank').focus();
    })
})
$('.open-all-link-wrapper').click(function() {
	$('.links').each(function(i) {
		window.open($(this).text(), '_blank').focus();
	})
})
// 切换课程
$('.deco2020-btn').click(function() {
    $('.deco2020').removeClass('hidden');
    $('.deco2014').addClass('hidden');
})
$('.deco2014-btn').click(function() {
    $('.deco2014').removeClass('hidden');
    $('.deco2020').addClass('hidden');
})
// 打开添加资源弹窗
$('.add-new-resource').click(function() {
    $('.resource-edit-panel').removeClass('hidden')
})
// 打开添加资源弹窗
$('.add-new-resource-wrapper').click(function() {
	$('.resource-edit-panel').removeClass('hidden')
})
// 打开编辑资源弹窗
$('.edit-resource').click(function() {
    $('.resource-edit-panel').removeClass('hidden')
})
// 关闭编辑资源弹窗
$('.resource-edit-panel-close').click(function() {
    $('.resource-edit-panel').addClass('hidden')
})
// 鼠标悬浮时显示编辑按钮
$('.task').hover(function() {
    $('.task-edit',this).removeClass('hidden');
},function() {
    $('.task-edit',this).addClass('hidden');
})
