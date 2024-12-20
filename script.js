document.addEventListener("DOMContentLoaded", function () {
    const snowContainer = document.querySelector(".snow-container");

    const particlesPerThousandPixels = 0.1;
    const fallSpeed = 1.25;
    const pauseWhenNotActive = true;
    const maxSnowflakes = 200;
    const snowflakes = [];

    let snowflakeInterval;
    let isTabActive = true;

    function resetSnowflake(snowflake) {
        const size = Math.random() * 5 + 1;
        const viewportWidth = window.innerWidth - size; 
        const viewportHeight = window.innerHeight;

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * viewportWidth}px`; 
        snowflake.style.top = `-${size}px`;

        const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationTimingFunction = "linear";
        snowflake.style.animationName =
            Math.random() < 0.5 ? "fall" : "diagonal-fall";

        setTimeout(() => {
            if (parseInt(snowflake.style.top, 10) < viewportHeight) {
                resetSnowflake(snowflake);
            } else {
                snowflake.remove(); 
            }
        }, animationDuration * 1000);
    }

    function createSnowflake() {
        if (snowflakes.length < maxSnowflakes) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflakes.push(snowflake);
            snowContainer.appendChild(snowflake);
            resetSnowflake(snowflake);
        }
    }

    function generateSnowflakes() {
        const numberOfParticles =
            Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
            particlesPerThousandPixels;
        const interval = 5000 / numberOfParticles;

        clearInterval(snowflakeInterval);
        snowflakeInterval = setInterval(() => {
            if (isTabActive && snowflakes.length < maxSnowflakes) {
                requestAnimationFrame(createSnowflake);
            }
        }, interval);
    }

    function handleVisibilityChange() {
        if (!pauseWhenNotActive) return;

        isTabActive = !document.hidden;
        if (isTabActive) {
            generateSnowflakes();
        } else {
            clearInterval(snowflakeInterval);
        }
    }

    generateSnowflakes();

    window.addEventListener("resize", () => {
        clearInterval(snowflakeInterval);
        setTimeout(generateSnowflakes, 1000);
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
});
$(function() {

	var date, dayName, day, month, year;
	var range = 270,
		sectionsDayName = 7,
		sectionsDay = 31,
		sectionsMonth = 12,
		charactersDayName = 3,
		charactersDay = 2,
		charactersMonth = 3,
		dayColor = '#FF2D55',
		monthColor = '#007AFF',
		dayNameColor = '#4CD964';
	

	
	function rotateRing(input, sections, characters, ring, text, color) {
		var sectionWidth = range / sections;
		var initialRotation = 135 - (sectionWidth / 2);
		var rotateAmount = initialRotation - sectionWidth * (input - 1);
		var start = (characters * (input - 1)) + (input - 1) + 1;
		
		$(ring).css({
			'-webkit-transform': 'rotate(' + rotateAmount + 'deg)',
			'-moz-transform': 'rotate(' + rotateAmount + 'deg)',
			'-ms-transform': 'rotate(' + rotateAmount + 'deg)',
			'transform': 'rotate(' + rotateAmount + 'deg)'
		});

		for (var i = start; i < start + characters; i++) {
			$(text).children('.char' + i).css({
				'color': color
			});
		}		
	}

	
	function clockRotation() {
		setInterval(function() {
			var date = new Date();
			var seconds = date.getSeconds();
			var minutes = date.getMinutes();
			var hours = date.getHours();
			var secondsRotation = seconds * 6;
			var minutesRotation = minutes * 6;
			var hoursRotation = hours * 30 + (minutes / 2);
			$("#seconds").css({
				'-webkit-transform': 'rotate(' + secondsRotation + 'deg)',
				'-moz-transform': 'rotate(' + secondsRotation + 'deg)',
				'-ms-transform': 'rotate(' + secondsRotation + 'deg)',
				'transform': 'rotate(' + secondsRotation + 'deg)'
			});
			$("#minutes").css({
				'-webkit-transform': 'rotate(' + minutesRotation  + 'deg)',
				'-moz-transform': 'rotate(' + minutesRotation + 'deg)',
				'-ms-transform': 'rotate(' + minutesRotation + 'deg)',
				'transform': 'rotate(' + minutesRotation + 'deg)'
			});
			$("#hours").css({
				'-webkit-transform': 'rotate(' + hoursRotation  + 'deg)',
				'-moz-transform': 'rotate(' + hoursRotation + 'deg)',
				'-ms-transform': 'rotate(' + hoursRotation + 'deg)',
				'transform': 'rotate(' + hoursRotation + 'deg)'
			});
		}, 1000);
	}
	
	
	function loadBars() {
		for(var i = 1; i <= dayName; i++){
			var newHeight = (Math.floor(Math.random() * 85) + 5);
			var newTop = 110 -  newHeight;
			$("#x"+i).css({
				'height' : newHeight + 'px',
			});	
		}
	}

	function init() {		
		$(".center-preview").lettering();
		$(".day-name-preview").lettering(); 
		$(".day-name-text").lettering();
		$(".day-preview").lettering();
		$(".day-text").lettering();
		$(".month-preview").lettering();
		$(".month-text").lettering();
		$('.day-preview').fadeTo(10, 1);
		$('.month-preview').fadeTo(10, 1);
		$('.day-name-preview').fadeTo(10, 1);
		$('.center-preview').fadeTo(10, 1);

		
		date = new Date();
		dayName = date.getDay(); 
		day = date.getDate(); 
		month = date.getMonth() + 1; 
		if (dayName == 0) {
			dayName = 7;
		}
		
		setTimeout(function() {
			$('.day-preview').fadeTo(500, 0);
			$('.day-text').fadeTo(500, 1, function() {
				rotateRing(day, sectionsDay, charactersDay, '#r3', '.day-text', dayColor);
			});
		}, 500);

		
		setTimeout(function() {
			$('.month-preview').fadeTo(500, 0);
			$('.fa-cloud').fadeTo(500, 1);
			$('.temperature').fadeTo(500, 1);
			$('.bars').fadeTo(500, 1);
			$('.month-text').fadeTo(500, 1, function() {
				rotateRing(month, sectionsMonth, charactersMonth, '#r2', '.month-text', monthColor);
				loadBars();
			});
		}, 1000);

		
		setTimeout(function() {
			$('.day-name-preview').fadeTo(500, 0);
			$('.day-name-text').fadeTo(500, 1, function() {
				rotateRing(dayName, sectionsDayName, charactersDayName, '#r1', '.day-name-text', dayNameColor);
			});
		}, 1500);

		
		setTimeout(function() {
			$('.center-preview').fadeTo(500, 0);
			$('.head').fadeTo(500, 0);
			$('.torso').fadeTo(500, 0);
			$(".hand-container").fadeTo(500, 1, function() {
				
			});
		}, 2000);

		
		clockRotation();
	}

	init();
});
function daysUntilChristmas() {
    const today = new Date(); 
    const currentYear = today.getFullYear();
    const christmasDate = new Date(currentYear, 11, 25); 

    
    if (today > christmasDate) {
        christmasDate.setFullYear(currentYear + 1);
    }

    
    const timeDifference = christmasDate - today;

    
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}


function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    const days = daysUntilChristmas();
    countdownElement.textContent = `Pozostało ${days} dni do Świąt Bożego Narodzenia! 🎅`;
}


updateCountdown();
