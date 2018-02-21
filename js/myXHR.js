//api:  http://www.ist.rit.edu/api/
/* On Document load the myXHR functions are loaded */
$(document).ready(function(){
	// Get the ABOUT page info
	myXHR('get', {'path':'/about/'}).done(function(json){
		var x='<h2>'+json.title+'</h2>';
		$('#about-title').html(x);
		var y= '<p>'+json.description+'</p>';
		$('#about-desc').html(y);
		var j= '<blockquote>'+json.quote+'</blockquote>';
		$('#about-quote').html(j);
		var k= '<cite>- '+json.quoteAuthor+'</cite>';
		$('#about-qa').html(k);
	});//end ABOUT

	// Get UNDERGRADUATE page info
	myXHR('get',{'path':'/degrees/undergraduate'}).done(function(json){
		$.each(json.undergraduate, function(){
			var x='';
			x+='<div onclick="uDegMore(this)" data-id="'+$(this)[0].degreeName+'" class="deg">';
			x+='<h2>'+$(this)[0].title+'</h2>';
			x+='<p>'+$(this)[0].description+'</p>';
			x+='<img src="images/'+$(this)[0].degreeName+'.png"/></div>';
			$('#undergrad').append(x);
		});
	});//end UNDERGRADUATE

	// Get the GRADUATE page info
	myXHR('get',{'path':'/degrees/graduate'}).done(function(json){
		$.each(json.graduate, function(){
			var x='';
			if($(this)[0].degreeName != "graduate advanced certificates"){
				x+='<div onclick="gDegMore(this)" data-id="'+$(this)[0].degreeName+'" class="deg">';
				x+='<h2 id="'+$(this)[0].degreeName+'-h">'+$(this)[0].title+'</h2>';
				x+='<p id="'+$(this)[0].degreeName+'-p">'+$(this)[0].description+'</p></div>';
				$('#grad').append(x);
			}
			else{
				x+='<div id="cert">';
				x+='<h2 id="gac-h">Our Graduate Advanced Certificates</h2>';
				x+='<a href="http://www.rit.edu/programs/web-development-adv-cert"><img src="images/js.png"/><h3>'+$(this)[0].availableCertificates[0]+'</h3></a>';
				x+='<a href="http://www.rit.edu/programs/networking-planning-and-design-adv-cert"><img src="images/ntwrk.png"/><h3>'+$(this)[0].availableCertificates[1]+'</h3></a></div>';
				$('#grad').after(x);
			}
		});
	});//end GRADUATE

	// Get UNDERGRADUATE MINORS
	myXHR('get',{'path':'/minors/UgMinors'}).done(function(json){
		$.each(json.UgMinors, function(){
			var x='';
			x+='<div onclick="ugmMore(this)" data-id="'+$(this)[0].name+'" class="minor">';
			x+='<h2 id="'+$(this)[0].name+'-h">'+$(this)[0].title+'</h2><img src="images/minors/'+$(this)[0].name+'.png"/>';
			$('#minors').append(x);
		});
	});//end UNDERGRADUATE MINORS

	// Get EMPLOYMENT page info
	myXHR('get',{'path':'/employment/'}).done(function(json){
		var y='<h1>'+json.introduction.title+'</h1>';
		$('#emp-title').html(y);
		var i='<h4>'+json.introduction.content[0].title+'</h4><hr>';
		i+='<p>'+json.introduction.content[0].description+'</p>';
		$('#emp-desc').html(i);
		var j='<h4>'+json.degreeStatistics.title+'</h4><hr id="emp-stats-title">';
		$('#emp-stats').html(j);
		var a = 0;
		$.each(json.degreeStatistics.statistics, function(){
			a++;
			var x='';
			x+='<div data-id="stat'+a+'" class="stat">';
			x+='<h1>'+$(this)[0].value+'</h1>';
			x+='<p>'+$(this)[0].description+'</p></div>';
			$('#emp-stats-title').after(x);
		});
		var k='<h4>'+json.introduction.content[1].title+'</h4><hr>';
		k +='<p>'+json.introduction.content[1].description+'</p>';
		$('#coop-edu-desc').html(k);
		var n='<h4>'+json.employers.title+'</h4><hr>';
	  $.each(json.employers.employerNames, function(i, item){
			n +='<h5 class="employer-name">'+item+'</h5>';
		});
		$('#employers').html(n);
		var h='<h4>'+json.careers.title+'</h4><hr>';
		$.each(json.careers.careerNames, function(i, item){
			h +='<h5 class="employer-name">'+item+'</h5>';
		});
		$('#careers').html(h);
		var t='<h4>Where Our Students Work</h4><hr><div id="stu-hist-tables">';
		t+='<div onclick="ctMore()" class="table"><h3>'+json.coopTable.title+'</h3></div>';
		t+='<div onclick="etMore()" class="table"><h3>'+json.employmentTable.title+'</h3></div></div>';
		$('#stu-hist').append(t);
	});//end EMPLOYMENT

	// Get PEOPLE page info
	myXHR('get',{'path':'/people/'}).done(function(json){
		var x='<h1>'+json.title+'</h1>';
		$('#ppl_title').html(x);
		$.each(json.faculty, function(){
			var y='<li onclick="facMore(this)" data-id="'+$(this)[0].username+'" class="faculty">';
			y+='<h5>'+$(this)[0].name+'</h5>';
			y+='<h6>'+$(this)[0].title+'</h6></li>';
			$('#fac').append(y);
		});
		$.each(json.staff, function(){
			var j='<li onclick="staffMore(this)" class="staff" data-id="'+$(this)[0].username+'">';
			j+='<h5>'+$(this)[0].name+'</h5>';
			j+='<h6>'+$(this)[0].title+'</h6></li>';
			$('#staff').append(j);
		});
	});//end PEOPLE

	// Get RESEARCH page info
	myXHR('get',{'path':'/research/'}).done(function(json){
		$.each(json.byInterestArea, function(){
			var x='<li class="area" onclick="aoiMore(this)" data-id="'+$(this)[0].areaName+'">';
			x+='<h2>'+$(this)[0].areaName+'</h2></li>';
			$('#aoi').append(x);
		});
		$.each(json.byFaculty, function(){
			var y='<li class="facmem" onclick="fmMore(this)" data-id="fac-'+$(this)[0].username+'">';
			y+='<h5>'+$(this)[0].facultyName+'</h5></li>';
			$('#fm').append(y);
		});
		// Call to add profile photos to faculty research members
		bgFaculty();
	});//end RESEARCH

	// Get RESOURCES page info
	myXHR('get',{'path':'/resources/'}).done(function(json){
		var x='<h1>'+json.title+'</h1>';
		x+='<h4>'+json.subTitle+'</h4>';
		$('#sr-title').html(x);
		var y='<div class="resource" onclick="ceMore()"><h4>'+json.coopEnrollment.title+'</h4></div>';
		y+='<div class="resource" onclick="formsMore()"><h4>Forms</h4></div>';
		y+='<div class="resource" onclick="tliMore()"><h4>'+json.tutorsAndLabInformation.title+'</h4></div>';
		y+='<div class="resource" onclick="ssMore()"><h4>'+json.studentServices.title+'</h4></div>';
		y+='<div class="resource" onclick="stuAmMore()"><h4>'+json.studentAmbassadors.title+'</h4></div>';
		y+='<div class="resource" onclick="stuAbMore()"><h4>'+json.studyAbroad.title+'</h4></div>';
		$('.resources').html(y);
	});//end RESOURCES

	// Get FOOTER page info
	myXHR('get',{'path':'/footer/'}).done(function(json){
		var x='<h1>'+json.social.title+'</h1>';
		$('#social-title').html(x);
		y='<h5>'+json.social.tweet+'</h5>';
		y+='<h6>'+json.social.by+'</h6>';
		y+='<div id="soc-links"><a href="'+json.social.twitter+'"></a>';
		y+='<a href="'+json.social.facebook+'></a></div>';
		$('#social').html(y);
		var j='<div id="qlinks"><ul>';
		$.each(json.quickLinks, function(){
			j+='<li><a href="'+$(this)[0].href+'">'+$(this)[0].title+'</a></li>';
		});
		j+='</ul></div>';
		j+='<div id="copyright">'+json.copyright.html+'</div>';
		j+='<div id="news" onclick="news()"><p>News</p></div>';
		$('#footer-links').html(j);
	});//end FOOTER
});//end document ready

// Adds profile photos to faculty research members
function bgFaculty(){
	myXHR('get',{'path':'/people/'}).done(function(json){
		$.each(json.faculty, function(){
			var x=$(this)[0].username;
			$('[data-id="fac-'+x+'"]').css({"background": "url('images/faculty/"+x+".jpg') no-repeat"});
		});
	});
	$('[data-id="fac-dgcics"]').css({"background": "url('images/faculty/dgcics.jpg') no-repeat", "background-size": "200px 200px"});
}

// Pop up dialog html for Coop Enrollment Information
function ceMore(){
	myXHR('get',{'path':'/resources/'}).done(function(json){
		var x='<div id="dl-ce" style="display: none"><h1>'+json.coopEnrollment.title+'</h1>';
		$.each(json.coopEnrollment.enrollmentInformationContent, function(){
			x+='<h2>'+$(this)[0].title+'</h2>';
			x+='<p>'+$(this)[0].description+'</p><br>';
		});
		x+='</div>';
		$('body').append(x);
		createDialog("#dl-ce");
	});
}

// Pop up dialog html for Forms Information
function formsMore(){
	myXHR('get',{'path':'/resources/'}).done(function(json){
		var x='<div id="dl-forms" style="display: none"><h1>Forms</h1>';
		x+='<h2>Undergraduate</h2>';
		x+='<a href="'+json.forms.undergraduateForms[0].href+'">'+json.forms.undergraduateForms[0].formName+'</a>';
		x+='<h2>Graduate</h2>';
		$.each(json.forms.graduateForms, function(){
			x+='<a href="doc/'+$(this)[0].href+'">'+$(this)[0].formName+'</a><br>';
		});
		x+='</div>';
		$('body').append(x);
		createDialog("#dl-forms");
	});
}

// Pop up dialog html for Tutors and Lab Information
function tliMore(){
	myXHR('get',{'path':'/resources/'}).done(function(json){
		var x='<div id="dl-tli" style="display: none"><h1>'+json.tutorsAndLabInformation.title+'</h1>';
		x+='<p>'+json.tutorsAndLabInformation.description+'</p>';
		x+='<a href="'+json.tutorsAndLabInformation.tutoringLabHoursLink+'">Tutoring Lab Hours</a></div>';
		$('body').append(x);
		createDialog("#dl-tli");
	});
}

// Pop up dialog html for Student Services Information
function ssMore(){
	myXHR('get',{'path':'/resources/'}).done(function(json){
		var x='<div id="dl-ss" style="display: none"><h1>'+json.studentServices.title+'</h1>';
		x+='<h2>'+json.studentServices.academicAdvisors.title+'</h2>';
		x+='<p>'+json.studentServices.academicAdvisors.description+'</p>';
		x+='<a href="'+json.studentServices.academicAdvisors.faq.contentHref+'">'+json.studentServices.academicAdvisors.faq.title+'</a>';
		x+='<h2>'+json.studentServices.professonalAdvisors.title+'</h2>';
		$.each(json.studentServices.professonalAdvisors.advisorInformation, function(){
			x+='<h3>'+$(this)[0].name+'</h3>';
			x+='<ul><li>Department: '+$(this)[0].department+'</li>';
			x+='<li>Email: '+$(this)[0].email+'</li></ul>';
		});
		x+='<h2>'+json.studentServices.facultyAdvisors.title+'</h2>';
		x+='<p>'+json.studentServices.facultyAdvisors.description+'</p>';
		x+='<h2>'+json.studentServices.istMinorAdvising.title+'</h2>';
		$.each(json.studentServices.istMinorAdvising.minorAdvisorInformation, function(){
			x+='<h3>'+$(this)[0].advisor+'</h3>';
			x+='<ul><li>Department: '+$(this)[0].title+'</li>';
			x+='<li>Email: '+$(this)[0].email+'</li></ul>';
		});
		x+='</div>';
		$('body').append(x);
		createDialog("#dl-ss");
	});
}

// Pop up dialog html for Coop Enrollment Information
function stuAmMore(){
	myXHR('get',{'path':'/resources/'}).done(function(json){
		var x='<div id="dl-stuAm" style="display: none"><h1>'+json.studentAmbassadors.title+'</h1>';
		x+='<img src="'+json.studentAmbassadors.ambassadorsImageSource+'" alt="studen ambass"/>';
		$.each(json.studentAmbassadors.subSectionContent, function(){
			x+='<h3>'+$(this)[0].title+'</h3>';
			x+='<p>'+$(this)[0].description+'</p>';
		});
		x+='<h4>'+json.studentAmbassadors.note+'</h4>';
		x+='<a href="'+json.studentAmbassadors.applicationFormLink+'">Apply</a>';
		x+='</div>';
		$('body').append(x);
		createDialog("#dl-stuAm");
	});
}

// Pop up dialog html for Study Abroad Information
function stuAbMore(){
	myXHR('get',{'path':'/resources/'}).done(function(json){
		var x='<div id="dl-stuAb" style="display: none"><h1>'+json.studyAbroad.title+'</h1>';
		x+='<p>'+json.studyAbroad.description+'</p>';
		$.each(json.studyAbroad.places, function(){
			x+='<h2>'+$(this)[0].nameOfPlace+'</h2>';
			x+='<p>'+$(this)[0].description+'</p>';
		});
		x+='</div>';
		$('body').append(x);
		createDialog("#dl-stuAb");
	});
}

// Pop up dialog html for Undergraduate Degree Information
function uDegMore(d){
	var id = $(d).attr('data-id');
	myXHR('get',{'path':'/degrees/undergraduate/degreeName='+id}).done(function(json){
		var x='<div id="dl-udeg" style="display: none"><h1>'+json.title+'</h1>';
		x+='<h3>'+json.description+'</h3>';
		x+='<ul>';
		$.each(json.concentrations, function(i, item){
			x+='<li class="dlog-items"><h3>'+item+'</h3></li>';
		});
		x+='</ul></div>';
		$('body').append(x);
		createDialog("#dl-udeg");
	});
}

// Pop up dialog html for Graduate Degree Information
function gDegMore(d){
	var id = $(d).attr('data-id');
	myXHR('get',{'path':'/degrees/graduate/degreeName='+id}).done(function(json){
		var x='<div id="dl-gdeg" style="display: none"><h1>'+json.title+'</h1>';
		x+='<h3>'+json.description+'</h3>';
		x+='<ul>';
		$.each(json.concentrations, function(i, item){
			x+='<li class="dlog-items"><h3>'+item+'</h3></li>';
		});
		x+='</ul></div>';
		$('body').append(x);
		createDialog("#dl-gdeg");
	});
}

// Pop up dialog html for Undergraduate Minor Information
function ugmMore(d){
	var id = $(d).attr('data-id');
	myXHR('get',{'path':'/minors/UgMinors/name='+id}).done(function(json){
		var x='<div id="dl-ugm" style="display: none"><h1>'+json.title+'</h1>';
		x+='<h3>'+json.description+'</h3>';
		x+='<ul>';
		$.each(json.courses, function(i, item){
			x+='<li class="dlog-items"><h3>'+item+'</h3></li>';
		});
		x+='</ul><p>'+json.note+'</p></div>';
		$('body').append(x);
		createDialog("#dl-ugm");
	});
}

// Pop up dialog html for Faculty Information
function facMore(w){
	var id=$(w).attr('data-id');
	myXHR('get',{'path':'/people/faculty/username='+id}).done(function(json){
		var x='<div id="dl-fac" style="display: none"><h1>'+json.name+', '+json.title+'</h1><hr>';
		x+='<img src="'+json.imagePath+'" alt="'+id+'"/><br>';
		x+='<ul><li>Office: '+json.office+'</li><li>Phone: '+json.phone+'</li><li>Email: '+json.email+'</li></ul></div>';
		$('body').append(x);
		createDialog("#dl-fac");
	});
}

// Pop up dialog html for Staff Information
function staffMore(w){
	var id=$(w).attr('data-id');
	myXHR('get',{'path':'/people/staff/username='+id}).done(function(json){
		var x='<div id="dl-staff" style="display: none"><h1>'+json.name+', '+json.title+'</h1>';
		x+='<img src="'+json.imagePath+'" alt="'+id+'"/><br>';
		x+='<ul><li>Office: '+json.office+'</li><li>Phone: '+json.phone+'</li><li>Email: '+json.email+'</li></ul></div>';
		$('body').append(x);
		createDialog("#dl-staff");
	});
}

// Pop up dialog html for Area of Interest Information
function aoiMore(w){
	var id=$(w).attr('data-id');
	myXHR('get',{'path':'/research/byInterestArea/areaName='+id}).done(function(json){
		var x='';
		if(id=="Ubiquitous Computing"){
			myXHR('get',{'path':'/research/'}).done(function(json){
				x='<div id="dl-aoi" style="display: none"><h1>'+json.byInterestArea[11].areaName+'</h1>';
				x+='<ul>';
				$.each(json.byInterestArea[11].citations, function(i, item){
					x+='<li>'+item+'</li>';
				});
				x+='</ul></div>';
				$('body').append(x);
				createDialog("#dl-aoi");
			});
		}
		else if (id=="System Administration") {
			myXHR('get',{'path':'/research/'}).done(function(json){
				x='<div id="dl-aoi" style="display: none"><h1>'+json.byInterestArea[10].areaName+'</h1>';
				x+='<ul>';
				$.each(json.byInterestArea[10].citations, function(i, item){
					x+='<li>'+item+'</li>';
				});
				x+='</ul></div>';
				$('body').append(x);
				createDialog("#dl-aoi");
			});
		}
		else if (id=="Health Informatics") {
			myXHR('get',{'path':'/research/'}).done(function(json){
				x='<div id="dl-aoi" style="display: none"><h1>'+json.byInterestArea[8].areaName+'</h1>';
				x+='<ul>';
				$.each(json.byInterestArea[8].citations, function(i, item){
					x+='<li>'+item+'</li>';
				});
				x+='</ul></div>';
				$('body').append(x);
				createDialog("#dl-aoi");
			});
		}
		else{
			x='<div id="dl-aoi" style="display: none"><h1>'+json.areaName+'</h1>';
			x+='<ul>';
			$.each(json.citations, function(i, item){
				x+='<li>'+item+'</li>';
			});
			x+='</ul></div>';
			$('body').append(x);
			createDialog("#dl-aoi");
		}
	});
}

// Pop up dialog html for Faculty Members Information
function fmMore(w){
	var pid=$(w).attr('data-id');
	var index= pid.indexOf('-');
	var id = pid.substr(index+1, index+6);
	alert(id);
	myXHR('get',{'path':'/research/byFaculty/username='+id}).done(function(json){
		var x='<div id="dl-fm" style="display: none"><h1>'+json.facultyName+'</h1>';
		x+='<ul>';
		$.each(json.citations, function(i, item){
			x+='<li>'+item+'</li>';
		});
		x+='</ul></div>';
		$('body').append(x);
		createDialog("#dl-fm");
	});
}

// Pop up dialog html for News Information
function news(){
	myXHR('get',{'path':'/news/'}).done(function(json){
		var x='<div id="dl-news" style="display: none"><h1>News</h1>';
		x+='<ul>';
		var a=0;
		$.each(json.year, function(){
			x+='<li style="cursor: pointer" data-id="'+a+'" onclick="newsMore(this)"><h3>'+$(this)[0].title+'</h3><h4>Date: '+$(this)[0].date+'</h4></li>';
			a++;
		});
		x+='</u></div>';
		$('body').append(x);
		createDialog("#dl-news");
	});
}

// Pop up dialog html for Coop Table` Information
function ctMore(){
	myXHR('get',{'path':'/employment/'}).done(function(json){
		var x='<div id="dl-ct" style="display: none"><h1>'+json.coopTable.title+'</h1>';
		x+='<table><thead><tr><th>Employer</th><th>Degree</th><th>Location</th><th>Term</th></tr></thead>';
		x+='<tbody>';
		$.each(json.coopTable.coopInformation, function(){
			x+='<tr><td>'+$(this)[0].employer+'</td>';
			x+='<td>'+$(this)[0].degree+'</td>';
			x+='<td>'+$(this)[0].city+'</td>';
			x+='<td>'+$(this)[0].term+'</td></tr>';
		});
		x+='</tbody></table></div>';
		$('body').append(x);
		createDialog("#dl-ct");
	});
}

// Pop up dialog html for Employment Table Information
function etMore(){
	myXHR('get',{'path':'/employment/'}).done(function(json){
		var x='<div id="dl-et" style="display: none"><h1>'+json.employmentTable.title+'</h1>';
		x+='<table><thead><tr><th>Employer</th><th>Degree</th><th>Location</th><th>Title</th><th>Start Date</th></tr></thead>';
		x+='<tbody>';
		$.each(json.employmentTable.professionalEmploymentInformation, function(){
			x+='<tr><td>'+$(this)[0].employer+'</td>';
			x+='<td>'+$(this)[0].degree+'</td>';
			x+='<td>'+$(this)[0].city+'</td>';
			x+='<td>'+$(this)[0].title+'</td>';
			x+='<td>'+$(this)[0].startDate+'</td></tr>';
		});
		x+='</tbody></table></div>';
		$('body').append(x);
		createDialog("#dl-et");
	});
}

// Pop up dialog html for News pop up dialog Information
function newsMore(n){
	var id = $(n).attr('data-id');
	myXHR('get',{'path':'/news/'}).done(function(json){
		var x='<div id="dl-nm" style="display: none"><h1>'+json.year[id].title+'</h1>';
		x+='<p>'+json.year[id].description+'</p>';
		$('body').append(x);
		createDialog("#dl-nm");
	});
}

// Function to create dialog boxes
function createDialog(s){
	$(s).dialog({
		modal: true,
		draggable: false,
		hide: { effect: "explode", duration: 400 },
		resizable: false,
		maxWidth: 1200,
		open: function(event, ui) {
        $(event.target).dialog('widget')
            .css({ position: 'fixed' })
            .position({ my: 'center', at: 'center', of: window });
    },
		maxHeight: 800,
		width: 1200,
		buttons: {
			"Close": function () {
				$(this).dialog("close");
				$(s).empty().remove();
			}
		}
	});
	$(".ui-dialog-titlebar").hide();
}

//AJAX Utility
//t='get' or 'put'
//d = {'path':'/undergrad/'}
function myXHR(t,d){
	return $.ajax({
		type:t,
		cache:false,
		async:true,
		dataType:"json",
		url:'php/proxy.php',
		data:d,
		beforeSend:function(){
		//happens before sending...
		}

	}).always(function(){
	//happens no matter what...
	}).fail(function(){
	//handle any failures
	});
} //end function myXHR
