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
		player.removeEventListener('ended', musicPlayEnd);
		player.addEventListener('ended', musicPlayEnd);
})
// 暂停音乐
$('#pause-audio').click(function() {
    player.pause();
    $('#play-audio').removeClass('hidden');
    $('#pause-audio').addClass('hidden');
})
// 下一首音乐
$('.next-audio').click(function() {
	if (currentMusicIndex < 5) {
		player = document.getElementById('audio-player' + currentMusicIndex);
		player.pause();
		currentMusicIndex++;
		player = document.getElementById('audio-player' + currentMusicIndex);
		player.play();
		player.removeEventListener("timeupdate", playProgress);
		player.addEventListener("timeupdate", playProgress);
		$('#play-audio').addClass('hidden');
		$('#pause-audio').removeClass('hidden');
		player.removeEventListener('ended', musicPlayEnd);
		player.addEventListener('ended', musicPlayEnd);

		const musicItem = musics[currentMusicIndex - 1];
		$('.song-pic').attr('src', $(musicItem).find('.music-img').attr('src'));
		$('.song-name').text($(musicItem).find('.music-name').text())
		$('.song-author').text($(musicItem).find('.music-artist').text())
	}
})
// 上一首音乐
$('.last-audio').click(function() {
	if (currentMusicIndex > 1) {
		player = document.getElementById('audio-player' + currentMusicIndex);
		player.pause();

		currentMusicIndex--;
		player = document.getElementById('audio-player' + currentMusicIndex);
		player.play();
		player.removeEventListener("timeupdate", playProgress);
		player.addEventListener("timeupdate", playProgress);
		$('#play-audio').addClass('hidden');
		$('#pause-audio').removeClass('hidden');
		player.removeEventListener('ended', musicPlayEnd);
		player.addEventListener('ended', musicPlayEnd);

		const musicItem = musics[currentMusicIndex - 1];
		$('.song-pic').attr('src', $(musicItem).find('.music-img').attr('src'));
		$('.song-name').text($(musicItem).find('.music-name').text())
		$('.song-author').text($(musicItem).find('.music-artist').text())
	}
})

function musicPlayEnd() {
	if (loop) {
		if (currentMusicIndex === 5) {
			currentMusicIndex = 0;
		}
		$('.next-audio').click();
	} else {
		currentMusicIndex = Math.floor(Math.random() * 4);
		$('.next-audio').click();
	}
}
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
$(".task-add-panel-close").click(function () {
	$(".task-add-panel").addClass("hidden");
});
$(".task-edit-panel-close").click(function () {
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

$('.add-column').click(function() {
	$('.add-column').hide()
	$('.add-column-panel').show();
})

$('#add_colum_title').click(function() {
	const columnTitle = $('#column_title').val();
	const task = tasks[curTaskIndex];
	task.columns.push({
		columnName: columnTitle,
		taskList: []
	});

	renderTask();

	$('#column_title').val('');
	$('.add-column').show()
	$('.add-column-panel').hide();
});

let curTaskIndex = 0;
let curTask;
let curEditTask;

const tasks = [
	{
		courseName: "DECO2014",
		columns: [
			{
				columnName: 'To Do',
				taskList: [
					{
						title: 'Concept Review',
						description: 'Review the storyboard concept',
						subject: 'Iteration',
						status: 'low',
						dueDate: new Date('2022-04-21'),
						duration: '2:45'
					},
					{
						title: 'Final Design',
						description: 'How it Responds to the Brief & Incorporate with your Research Findings',
						subject: 'Iteration',
						status: 'high',
						dueDate: new Date('2022-04-24'),
						duration: '4:00'
					},
					{
						title: 'Typography',
						description: '',
						subject: 'Appendix',
						status: 'mid',
						dueDate: new Date('2022-04-25'),
						duration: '1:30'
					}
				]
			},
			{
				columnName: 'On Process',
				taskList: [
					{
						title: 'User Journey Map',
						description: 'Updated user journey map',
						subject: 'Summary',
						status: 'low',
						dueDate: new Date('4/13/2022'),
						duration: '2:45'
					},
					{
						title: 'Concept Explanation',
						description: 'Rationale as to why chose to process with the design concept you did',
						subject: 'Summary',
						status: 'high',
						dueDate: new Date('4/13/2022'),
						duration: '1:00'
					}
				]
			},
			{
				columnName: 'Done',
				taskList: [
					{
						title: 'Check Reference',
						description: 'Check citations and formatting',
						subject: 'Summary',
						status: 'low',
						dueDate: new Date('4/21/2022'),
						duration: '1:45'
					},
					{
						title: 'Task and Criteria Check',
						description: 'Review the Design Brief and grading criteria',
						subject: 'Summary',
						status: 'high',
						dueDate: new Date('4/13/2022'),
						duration: '2:00'
					},
					{
						title: 'User Journey Map',
						description: 'Zone A (persona/scenario), Zone B (chunkable phrases/action/thoughts/emotional experience)',
						subject: 'Summary',
						status: 'high',
						dueDate: new Date('4/14/2022'),
						duration: '3:20'
					}
				]
			}
		]
	}
]

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function formatDueDate(date) {
	const day = date.getDate();
	const month = monthNames[date.getMonth()];
	const year = String(date.getFullYear()).slice(2,4);
	return `DUE ${day} ${month} ${year}`;
}
function formatDuration(duration) {
	const durationArr = duration.split(':');
	return `${durationArr[0]} Hr ${durationArr[1]} Min`;
}

$(function() {
	renderTask();
});

function renderTask() {
	$('#panel-content').html('');

	const task = tasks[curTaskIndex];
	const columns = task.columns;
	columns.forEach(col => {
		let taskListHtml = ''
		col.taskList.forEach((item, index) => {
			if (filterText === '' || (item.title.indexOf(filterText) >=0 || item.description.indexOf(filterText) >=0)) {
				taskListHtml += `
				<div id="${Date.now() + index}" draggable="true" class="w-11/12 mx-auto bg-white p-4 rounded-2xl shadow-lg mb-2 task">
					<div class="flex">
						<div class="px-1 font-bold border-2 mx-1 task-prior task-prior-${item.status}">${item.status.toUpperCase()}</div>
						<div class="px-1 border-2 mx-1 font-bold task-next-tag">${item.subject}</div>
						<div class="bg-purple-300 ml-auto rounded-lg text-sm p-1 task-edit hidden" data-col="${task.courseName + '-' + col.columnName + '-' + index}">
							<svg t="1654169499790" class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21827"><path d="M801.4 437.4L586.2 223.6l81.3-80.8 215.1 214-81.2 80.6zM356.2 880.2l-215.4-214 0.3 0.1 390-387.9 215.2 213.9-390.1 387.9zM140 881.4V775l106.9 106.2-106.9 0.2zM938 302L722.7 88c-14.4-14.9-34.4-23.1-55.2-22.6-20.6 0.1-40.4 8.3-55 22.8L85.9 611.5c-17.3 17.3-25.4 41.7-21.8 65.8-0.9 3.3-2.1 6.4-2.1 10v194.1c0 42.5 34.8 77.1 77.6 77.1h195.3c3.5 0 6.7-1.1 10-2 3.6 0.5 7.3 1 10.9 1 20 0 40.1-7.6 55.4-22.8l526.5-523.3c30.4-30.1 30.6-79.1 0.3-109.4z m0 0" p-id="21828"></path></svg>
						</div>
					</div>
					<div>
						<h1 class="font-bold text-xl mt-3 task-title">${item.title}</h1>
						<p class="task-desc">${item.description}</p>
					</div>
					<hr class="my-2" />
					<div class="flex justify-between">
						<p class="task-date font-bold">${formatDueDate(item.dueDate)}</p>
						<div class="p-2 rounded-lg task-period">${formatDuration(item.duration)}</div>
					</div>
				</div>
			`
			}
		});

		let panelHtml = `
			<div class="inline-flex flex-col mx-8 h-fit panel">
				<div class="inline-flex justify-center items-center">
					<div class="task-num">${col.taskList.length}</div>
					<h1 class="text-center text-2xl font-sans font-bold my-2 status">${col.columnName}</h1>
				</div>
				<div class="task-list">
					${taskListHtml}
				</div>
				<div class="h-12 text-white flex justify-center items-center w-full add-task" data-col="${task.courseName + '-' + col.columnName}">+ ADD TASK</div>
			</div>
		`

		$('#panel-content').append(panelHtml);
	});

	// 打开添加资源弹窗
	$(".add-task").click(function () {
		curTask = $(this).data('col');
		$(".task-add-panel").removeClass("hidden");
	});

	// 鼠标悬浮时显示编辑按钮
	$('.task').hover(function() {
		$('.task-edit',this).removeClass('hidden');
	},function() {
		$('.task-edit',this).addClass('hidden');
	});

	// 打开编辑资源弹窗并赋值
	$(".task-edit").click(function () {
		$(".task-edit-panel").removeClass("hidden");
		curEditTask = $(this).data('col');
		const colArr = curEditTask.split('-');
		const findTask = tasks.find(task => task.courseName === colArr[0]);
		if (findTask) {
			const findColumn = findTask.columns.find(col => col.columnName === colArr[1]);
			const taskItem = findColumn.taskList[Number(colArr[2])];

			const day = ("0" + taskItem.dueDate.getDate()).slice(-2);
			const month = ("0" + (taskItem.dueDate.getMonth() + 1)).slice(-2);
			const dueDate = taskItem.dueDate.getFullYear()+"-"+(month)+"-"+(day);

			const durationArr = taskItem.duration.split(':');

			$('#edit_title').val(taskItem.title);
			$('#edit_description').val(taskItem.description);
			$('#edit_subject').val(taskItem.subject);
			$('#edit_status').val(taskItem.status === 'mid' ? 'MIDDLE' : taskItem.status.toUpperCase());
			$('#edit_due_date').val(dueDate);
			$('#edit_duration').val((durationArr[0].length >= 2 ? durationArr[0] : '0' + durationArr[0]) + ':' + (durationArr[1].length >= 2 ? durationArr[1] : '0' + durationArr[1]));
		}
	});

	$('.task-list > div').bind('dragstart', function(e) {
		e.dataTransfer = e.originalEvent.dataTransfer;
		e.dataTransfer.setData("task", e.target.id);
	})

	$('.task-list').bind('dragover', function(e) {
		e.preventDefault();
	})

	$('.task-list').bind('drop', function(e) {
		e.preventDefault();
		e.dataTransfer = e.originalEvent.dataTransfer;
		const taskId = e.dataTransfer.getData("task");
		e.currentTarget.appendChild(document.getElementById(taskId));
	})
}

// 取消添加
$("#add_cancel").click(function () {
	$('#add_title').val('');
	$('#add_description').val('');
	$('#add_subject').val('');
	$('#add_status').val('');
	$('#add_due_date').val('');
	$('#add_duration').val('');
	$(".task-add-panel").addClass("hidden");
});
// 保存
$("#add_save").click(function () {
	const title = $('#add_title').val();
	const description = $('#add_description').val();
	const subject = $('#add_subject').val();
	const status = $('#add_status').val();
	const dueDate = $('#add_due_date').val();
	const duration = $('#add_duration').val();

	const curTaskArr = curTask.split('-');
	const findTask = tasks.find(task => task.courseName === curTaskArr[0]);

	if (findTask) {
		const findColumn = findTask.columns.find(col => col.columnName === curTaskArr[1]);
		if (findColumn) {
			findColumn.taskList.push({
				title,
				description,
				subject,
				status: status.toLowerCase(),
				dueDate: new Date(dueDate),
				duration
			});
		}
	}

	$('#add_title').val('');
	$('#add_description').val('');
	$('#add_subject').val('');
	$('#add_status').val('');
	$('#add_due_date').val('');
	$('#add_duration').val('');
	$(".task-add-panel").addClass("hidden");

	renderTask();
});

$('#edit_delete').click(function() {
	const colArr = curEditTask.split('-');
	const findTask = tasks.find(task => task.courseName === colArr[0]);
	if (findTask) {
		const findColumn = findTask.columns.find(col => col.columnName === colArr[1]);
		findColumn.taskList.splice(Number(colArr[2]), 1);
		renderTask();
		$(".task-edit-panel").addClass("hidden");
	}
});

$('#edit_save').click(function() {
	const colArr = curEditTask.split('-');
	const findTask = tasks.find(task => task.courseName === colArr[0]);
	if (findTask) {
		const findColumn = findTask.columns.find(col => col.columnName === colArr[1]);
		const taskItem = findColumn.taskList[Number(colArr[2])];

		taskItem.title = $('#edit_title').val();
		taskItem.description = $('#edit_description').val();
		taskItem.subject = $('#edit_subject').val();
		taskItem.status = $('#edit_status').val().toLowerCase() === 'middle' ? 'mid' : $('#edit_status').val().toLowerCase();
		taskItem.dueDate = new Date($('#edit_due_date').val());
		taskItem.duration = $('#edit_duration').val();

		renderTask();
		$(".task-edit-panel").addClass("hidden");
	}
});

let filterText = '';

$('#search-btn').click(function() {
	filterText = $('#search-text').val();
	renderTask();
});

let loop = true;

$('#loop-btn').click(function() {
	$(this).hide();
	$('#random-btn').show();
	loop = false;
});

$('#random-btn').click(function() {
	$(this).hide();
	$('#loop-btn').show();
	loop = true;
});

const contents = [
	{
		url: 'http://www.baidu.com',
		title: 'Title of article',
		subject: '',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea tempora, rem totam autem',
	},
	{
		url: 'http://www.google.com',
		title: 'Title of article',
		subject: '',
		description: 'It’s a description/quotes/summary of the reading/article/resoucres. It’s a description/quotes/summary of the reading/article/resoucres.',
	},
	{
		url: 'https://canvas.sydney.edu.au/',
		title: 'Title of article',
		subject: '',
		description: 'It’s a description/quotes/summary of the reading/article/resoucres. It’s a description/quotes/summary of the reading/article/resoucres.',
	},
	{
		url: 'https://canvas.sydney.edu.au/',
		title: 'Title of article',
		subject: '',
		description: 'It’s a description/quotes/summary of the reading/article/resoucres. It’s a description/quotes/summary of the reading/article/resoucres.',
	},
	{
		url: 'https://canvas.sydney.edu.au/',
		title: 'Title of article',
		subject: '',
		description: 'It’s a description/quotes/summary of the reading/article/resoucres. It’s a description/quotes/summary of the reading/article/resoucres.',
	},
	{
		url: 'https://canvas.sydney.edu.au/',
		title: 'Title of article',
		subject: '',
		description: 'It’s a description/quotes/summary of the reading/article/resoucres. It’s a description/quotes/summary of the reading/article/resoucres.',
	},
	{
		url: 'https://canvas.sydney.edu.au/',
		title: 'Title of article',
		subject: '',
		description: 'It’s a description/quotes/summary of the reading/article/resoucres. It’s a description/quotes/summary of the reading/article/resoucres.',
	},
	{
		url: 'https://canvas.sydney.edu.au/',
		title: 'Title of article',
		subject: '',
		description: 'It’s a description/quotes/summary of the reading/article/resoucres. It’s a description/quotes/summary of the reading/article/resoucres.',
	},
	{
		url: 'https://canvas.sydney.edu.au/',
		title: 'Title of article',
		subject: '',
		description: 'It’s a description/quotes/summary of the reading/article/resoucres. It’s a description/quotes/summary of the reading/article/resoucres.',
	},
	{
		url: 'https://canvas.sydney.edu.au/',
		title: 'Title of article',
		subject: '',
		description: 'It’s a description/quotes/summary of the reading/article/resoucres. It’s a description/quotes/summary of the reading/article/resoucres.',
	}
]

$(function() {
	renderContent();
});

function renderContent() {
	$('#content-list').html('');
	contents.forEach(content => {
		if (filterContentText === '' || (content.title.indexOf(filterContentText) >= 0 || content.description.indexOf(filterContentText) >= 0)) {
			let contentHtml = `
				<div class="shadow-md rounded-xl w-80 px-4 py-2 m-2 content-item">
					<div class="flex items-center justify-between">
						<p>
							<svg t="1654263233573" class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3165"><path d="M341.333333 554.666667h341.333334v-85.333334H341.333333v85.333334z m-174.933333-42.666667c0-98.133333 76.8-174.933333 174.933333-174.933333h128V256H341.333333c-140.8 0-256 115.2-256 256s115.2 256 256 256h128v-81.066667H341.333333c-98.133333 0-174.933333-76.8-174.933333-174.933333zM682.666667 256h-128v81.066667h128c98.133333 0 174.933333 76.8 174.933333 174.933333s-76.8 174.933333-174.933333 174.933333h-128V768h128c140.8 0 256-115.2 256-256s-115.2-256-256-256z" p-id="3166" data-spm-anchor-id="a313x.7781069.0.i3"></path></svg>
						</p>
						<a href="${content.url}" class="links" target="_blank">${content.url}</a>
						<p class="edit-resource cursor-pointer">
							<svg t="1654169499790" class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21827"><path d="M801.4 437.4L586.2 223.6l81.3-80.8 215.1 214-81.2 80.6zM356.2 880.2l-215.4-214 0.3 0.1 390-387.9 215.2 213.9-390.1 387.9zM140 881.4V775l106.9 106.2-106.9 0.2zM938 302L722.7 88c-14.4-14.9-34.4-23.1-55.2-22.6-20.6 0.1-40.4 8.3-55 22.8L85.9 611.5c-17.3 17.3-25.4 41.7-21.8 65.8-0.9 3.3-2.1 6.4-2.1 10v194.1c0 42.5 34.8 77.1 77.6 77.1h195.3c3.5 0 6.7-1.1 10-2 3.6 0.5 7.3 1 10.9 1 20 0 40.1-7.6 55.4-22.8l526.5-523.3c30.4-30.1 30.6-79.1 0.3-109.4z m0 0" p-id="21828"></path></svg>
						</p>
					</div>
					<hr class="h-1 w-full my-2" />
					<h1 class="font-bold text-xl">${content.title}</h1>
					<p>${content.description}</p>
				</div>
			`;

			$('#content-list').append(contentHtml);
		}
	})
}

$('#content_add_cancel').click(function() {
	$('.resource-edit-panel').addClass('hidden');
});

$('#content_add_save').click(function() {
	const url = $('#add_content_url').val();
	const title = $('#add_content_title').val();
	const subject = $('#add_content_subject').val();
	const description = $('#add_content_desc').val();
	contents.push({
		url,
		title,
		subject,
		description
	});
	renderContent();

	$('.resource-edit-panel').addClass('hidden');
});

let filterContentText = '';

$('#content-search-btn').click(function() {
	filterContentText = $('#content-search-text').val();
	renderContent();
});
