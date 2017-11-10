var filename = "EJY_KAG_context"
var condCounts = "1,12;2,12" //Example: "1,20;2,20;3,20"


// ############################## Helper functions ##############################

// Shows slides
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}

// Get random integers.
function random(a,b) {
	if (typeof b == "undefined") {
		a = a || 2;
		return Math.floor(Math.random()*a);
	} else {
		return Math.floor(Math.random()*(b-a+1)) + a;
	}
}

// Add a random selection function to all arrays (e.g., <code>[4,8,7].random()</code> could return 4, 8, or 7). This is useful for condition randomization.
Array.prototype.random = function() {
  return this[random(this.length)];
}

// shuffle function
function shuffle (a) 
{ 
    var o = [];    
    for (var i=0; i < a.length; i++) {
	o[i] = a[i];
    }    
    for (var j, x, i = o.length;
	 i;
	 j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);	
    return o;
}

// substitution function - do we want to save all these factors to a data object? FIXME
function doSentSubs (sents, scale, domain)
{
    sent_quant = sents["scales"][scale]["sent_quant"];
    quant = sents["scales"][scale]["quant"];
    scope = sents["scales"][scale]["scope"];
    neg = sents["scales"][scale]["neg"];
    pre_context = sents["domains"][domain]["pre_context"];
    context = sents["domains"][domain]["sent_context"];
    presentence = sents["scales"][scale]["sent_pre"];
    postsentence = sents["scales"][scale]["sent_post"];
    pre_sent = sents["scales"][scale]["pre_sent"];
 
    SUBJ = sents["domains"][domain]["SUBJ"]; //Speaker
    PART = sents["domains"][domain]["PART"];
    SNV = sents["domains"][domain]["SNV"];
    LNV = sents["domains"][domain]["LNV"];
    QUANT1 = sents["domains"][domain]["QUANT1"];
    QUANT2 = sents["domains"][domain]["QUANT2"];
    OBJ = sents["domains"][domain]["OBJ"];
    PAR2 = sents["domains"][domain]["PAR2"];
    if (cond == 1) {
        PRE_SENT = sents["domains"][domain]["pre_sent_QN"];
        PRE_SENT1 = sents["domains"][domain]["pre_sent_QN_plus"];
    } else {
        PRE_SENT = sents["domains"][domain]["pre_sent_NQ"];
    }
    
    pre_context = pre_context.replace("SUBJ",SUBJ).replace("PART",PART).replace("PART",PART).replace("SNV",SNV).replace("LNV",LNV).replace("QUANT1",QUANT1).replace("QUANT2",QUANT2).replace("OBJ",OBJ).replace("PAR2",PAR2).replace("scope",scope);
    context = context.replace("SUBJ",SUBJ).replace("PART",PART).replace("PART",PART).replace("SNV",SNV).replace("LNV",LNV).replace("QUANT1",QUANT1).replace("QUANT2",QUANT2).replace("OBJ",OBJ).replace("PAR2",PAR2).replace("scope",scope);
    sent_quant = sent_quant.replace("SUBJ",SUBJ).replace("PART",PART).replace("PART",PART).replace("SNV",SNV).replace("LNV",LNV).replace("QUANT1",QUANT1).replace("QUANT2",QUANT2).replace("OBJ",OBJ).replace("PAR2",PAR2).replace("scope",scope);
    presentence = presentence.replace("SUBJ",SUBJ).replace("PART",PART).replace("PART",PART).replace("SUBJ",SUBJ).replace("SNV",SNV).replace("LNV",LNV).replace("QUANT1",QUANT1).replace("QUANT2",QUANT2).replace("PAR2",PAR2).replace("OBJ",OBJ).replace("scope",scope);
    postsentence = postsentence.replace("SUBJ",SUBJ).replace("PART",PART).replace("PART",PART).replace("SUBJ",SUBJ).replace("SNV",SNV).replace("LNV",LNV).replace("QUANT1",QUANT1).replace("QUANT2",QUANT2).replace("PAR2",PAR2).replace("OBJ",OBJ).replace("scope",scope);
    pre_sent = pre_sent.replace("SUBJ",SUBJ).replace("PART",PART).replace("PART",PART).replace("SNV",SNV).replace("LNV",LNV).replace("QUANT1",QUANT1).replace("QUANT2",QUANT2).replace("OBJ",OBJ).replace("PAR2",PAR2).replace("scope",scope);
    if (cond == 1) {
        if (scope == "QN") {
        pre_sent = pre_sent.replace("PRE_SENT",PRE_SENT)
        } else if (scope == "QN+") {
        pre_sent = pre_sent.replace("PRE_SENT",PRE_SENT1)            
        } else {
        pre_sent = pre_sent.replace("PRE_SENT","")
        }
    } else {
        if (scope == "NQ" || scope == "NQ+") {
        pre_sent = pre_sent.replace("PRE_SENT",PRE_SENT)
        } else {
        pre_sent = pre_sent.replace("PRE_SENT","")
        }
    }
    
     return [context, sent_quant, presentence, postsentence, pre_context, pre_sent];
}

// ############ LOAD CONDITION #############
var cond = random(2)+1; // (1-6)

// ############################## BP Changes Configuration settings ##############################
// FIXME: ask ppl about whether the sentence sounds natural?
speakers = shuffle([["철수","가"],["민준이","가"],["지호","가"],["주원이","가"],["지우","가"],["서연이","가"], ["민서","가"],["지아","가"], ["하은이","가"],["서윤이","가"]]);

var myimages = new Array();
function preloading(){
    for (x=0; x<preloading.arguments.length; x++){
	myimages[x] = new Image();
	myimages[x].src = preloading.arguments[x];
    }
}
preloading("images/NQ_balloon_post.jpg",
"images/NQ_balloon_pre.jpg",
"images/NQ_book_post.jpg",
"images/NQ_book_pre.jpg",
"images/NQ_bowling_post.jpg",
"images/NQ_bowling_pre.jpg",
"images/NQ_box_post.jpg",
"images/NQ_box_pre.jpg",
"images/NQ_cup_post.jpg",
"images/NQ_cup_pre.jpg",
"images/NQ_paper_post.jpg",
"images/NQ_paper_pre.jpg",
"images/NQ_pencil_post.jpg",
"images/NQ_pencil_pre.jpg",
"images/NQ_triangle_post.jpg",
"images/NQ_triangle_pre.jpg",
"images/QN_balloon_post.jpg",
"images/QN_balloon_pre.jpg",
"images/QN_book_post.jpg",
"images/QN_book_pre.jpg",
"images/QN_bowling_post.jpg",
"images/QN_bowling_pre.jpg",
"images/QN_box_post.jpg",
"images/QN_box_pre.jpg",
"images/QN_cup_post.jpg",
"images/QN_cup_pre.jpg",
"images/QN_paper_post.jpg",
"images/QN_paper_pre.jpg",
"images/QN_pencil_post.jpg",
"images/QN_pencil_pre.jpg",
"images/QN_triangle_post.jpg",
"images/QN_triangle_pre.jpg",
"images/QN+_balloon_post.jpg",
"images/QN+_balloon_pre.jpg",
"images/QN+_book_post.jpg",
"images/QN+_book_pre.jpg",
"images/QN+_bowling_post.jpg",
"images/QN+_bowling_pre.jpg",
"images/QN+_box_post.jpg",
"images/QN+_box_pre.jpg",
"images/QN+_cup_post.jpg",
"images/QN+_cup_pre.jpg",
"images/QN+_paper_post.jpg",
"images/QN+_paper_pre.jpg",
"images/QN+_pencil_post.jpg",
"images/QN+_pencil_pre.jpg",
"images/QN+_triangle_post.jpg",
"images/QN+_triangle_pre.jpg",
"images/training001.jpg",
"images/training002.jpg");



var sents = {
    scales: {
		training1: {
            //FIXME: 이것은, 봐주세요.
            sent_pre: "다음은 SUBJ의 전시용 OBJ입니다.",
            sent_post: "SUBJ의 OBJPAR2 잘 보세요.",
            sent_quant: "SUBJPART QUANT1 OBJPAR2 LNV.",
            scope: "",
            neg: "NA",
            quant: "NA",
            pre_sent: ""

		},	
	   training2: {
            sent_pre: "다음은 SUBJ의 애완동물 OBJ입니다.",
            sent_post: "SUBJ의 OBJPAR2 잘 보세요.",
            sent_quant: "SUBJPART QUANT1 OBJPAR2 SNV.",
            scope: "",
            neg: "NA",
            quant: "NA",
            pre_sent: ""

		},
        test1: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART 한 일을 보세요.",
            sent_quant: "SUBJPART QUANT1 OBJPAR2 SNV.",
            scope: "QN",
            neg: "short",
            quant: "regular",
            pre_sent: "PRE_SENT"
  	    },
        test2: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART 한 일을 보세요.",
            sent_quant: "SUBJPART QUANT1 OBJPAR2 SNV.",
            scope: "NQ",
            neg: "short",
            quant: "regular",
            pre_sent: "PRE_SENT"

  	},
        test3: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART 한 일을 보세요.",
            sent_quant: "SUBJPART QUANT2 OBJPAR2 SNV.",
            scope: "QN+",
            quant: "moreThan",
            neg: "short",
            pre_sent: "PRE_SENT"
  	},
        test4: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART 한 일을 보세요.",
            sent_quant: "SUBJPART QUANT2 OBJPAR2 SNV.",
            scope: "NQ+",
            neg: "short",
            quant: "moreThan",
            pre_sent: "PRE_SENT"
  	},
        test5: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART 한 일을 보세요.",
            sent_quant: "SUBJPART QUANT1 OBJPAR2 LNV.",
            scope: "QN",
            neg: "long",
            quant: "regular",
            pre_sent: "PRE_SENT"
  	    },
        test6: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART 한 일을 보세요.",
            sent_quant: "SUBJPART QUANT1 OBJPAR2 LNV.",
            scope: "NQ",
            neg: "long",
            quant: "regular",
            pre_sent: "PRE_SENT"
  	},
        test7: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART 한 일을 보세요.",
            sent_quant: "SUBJPART QUANT2 OBJPAR2 LNV.",
            scope: "QN+",
            neg: "long",
            quant: "moreThan",
            pre_sent: "PRE_SENT"
  	},
        test8: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART 한 일을 보세요.",
            sent_quant: "SUBJPART QUANT2 OBJPAR2 LNV.",
            scope: "NQ+",
            neg: "long",
            quant: "moreThan",
            pre_sent: "PRE_SENT"
  	},
        
    },
    domains: {
	training1: {
	    pre_context: "images/training001.jpg",
	    pre_sent_QN_plus: "",
        pre_sent_QN: "",
        pre_sent_NQ: "",
	    sent_context: "images/training001.jpg",
        SUBJ: speakers[0][0],
        PART: speakers[0][1],
	    SNV: "안 전시해 놓았다",
        LNV: "전시해 놓지 않았다",
        QUANT1: "네 개의 ", 
        QUANT2: "네 개 이상의", 
        OBJ: "곰인형",
        PAR2: "을"
	},
	training2: {
	    pre_context: "images/training002.jpg",
	    pre_sent_QN_plus: "",
	    pre_sent_QN: "",
        pre_sent_NQ: "",
	    sent_context: "images/training002.jpg",
        SUBJ: speakers[1][0],
        PART: speakers[1][1],
	    SNV: "안 키운다",
        LNV: "키우지 않는다",
        QUANT1: "두 마리의 ", 
        QUANT2: "두 마리 이상의", 
        OBJ: "고양이",
        PAR2: "를"
	},
    balloon: {
	    pre_context: "images/scope_balloon_pre.jpg",
        pre_sent_QN_plus: "여섯 개 중에 적어도 세 개는 터지지 않은 상태로 놔두어야 합니다.", // fixme: 놓아두어야? 6개? 여섯 개? 부풀어져있는 (상태인) 채로 / 채인 상태로, 여섯 개의 풍선, 세 개를
        // fixme: object vs subject, same word vs different from test
        pre_sent_QN: "여섯 개 중에 적어도 세 개는 터지지 않은 상태로 놔두어야 합니다.",
        pre_sent_NQ: "네 개의 풍선 중 세 개나 그 이상 터트리면 벌을 받을 것입니다.", // 받습니다
	    sent_context: "images/scope_balloon_post.jpg",
        SUBJ: speakers[2][0],
        PART: speakers[2][1],
        SNV: "안 터트렸다",
        LNV: "터트리지 않았다",
        QUANT1: "세 개의 ", 
        QUANT2: "세 개 이상의", 
        OBJ: "풍선",
        PAR2: "을"
	},
    book: {
	    pre_context: "images/scope_book_pre.jpg",
	    pre_sent_QN_plus: "여덟 권 중에 세 권은 읽지 않아도 된다고 선생님이 말씀하셨습니다.", // FIXME: negation? JS
	    pre_sent_QN: "여섯 권 중에 세 권은 읽지 않아도 된다고 선생님이 말씀하셨습니다.",
        pre_sent_NQ: "네 권 중에 세 권은 읽으라고 선생님이 말씀하셨습니다",
	    sent_context: "images/scope_book_post.jpg",
        SUBJ: speakers[3][0],
        PART: speakers[3][1],
        SNV: "안 펼쳤다",
        LNV: "펼치지 않았다",
        QUANT1: "세 권의 ", 
        QUANT2: "세 권 이상의", 
        OBJ: "책",
        PAR2: "을"
	},
    box: {
	    pre_context: "images/scope_box_pre.jpg",
	    pre_sent_QN_plus: "여덟 개 중 세 개의 상자 안에 뭐가 들었는지는 이미 알고 있어서 열어볼 필요가 없습니다.",
	    pre_sent_QN: "여섯 개 중 세 개의 상자 안에 뭐가 들었는지는 이미 알고 있어서 열어볼 필요가 없습니다.",
        pre_sent_NQ: "네 개 중 하나를 제외하고 세 개 안에 무엇이 들었는지 아직 모르는 상태여서 세 개를 열어봐야 합니다.",
	    sent_context: "images/scope_box_post.jpg",
        SUBJ: speakers[4][0],
        PART: speakers[4][1],
        SNV: "안 열었다",
        LNV: "열지 않았다",
        QUANT1: "세 개의 ", 
        QUANT2: "세 개 이상의", 
        OBJ: "상자",
        PAR2: "를"
	},
    cup: {
	    pre_context: "images/scope_cup_pre.jpg",
	    pre_sent_QN_plus: "열 개 중에 네 개의 잔은 물이 들어 있어서 뒤집으면 안 됩니다.",
	    pre_sent_QN: "여덟 개 중에 네 개의 잔은 물이 들어 있어서 뒤집으면 안 됩니다.",
        pre_sent_NQ: "여섯 개 중에 네 개의 잔이 비어있어서 뒤집을 수 있습니다.", // fixme: 중에? 중?
	    sent_context: "images/scope_cup_post.jpg",
        SUBJ: speakers[5][0],
        PART: speakers[5][1],
        SNV: "안 뒤집었다",
        LNV: "뒤집지 않았다",
        QUANT1: "네 개의 ", 
        QUANT2: "네 개 이상의", 
        OBJ: "컵",
        PAR2: "을"
	},
    paper: {
	    pre_context: "images/scope_paper_pre.jpg",
	    pre_sent_QN_plus: "열 장의 종이 중에 네 장의 종이는 소중해서 구기면 안 됩니다.",
	    pre_sent_QN: "여덟 장의 종이 중에 네 장의 종이는 소중해서 구기면 안 됩니다.",
        pre_sent_NQ: "여섯 장의 종이 중에 네 장을 구겨서 버려야 합니다.",
	    sent_context: "images/scope_paper_post.jpg",
        SUBJ: speakers[6][0],
        PART: speakers[6][1],
        SNV: "안 구겼다",
        LNV: "구기지 않았다",
        QUANT1: "네 장의 ", 
        QUANT2: "네 장 이상의", 
        OBJ: "종이",
        PAR2: "를"
	},
    pencil: {
	    pre_context: "images/scope_pencil_pre.jpg",
	    pre_sent_QN_plus: "열 개의 연필 중에 네 개의 연필은 부러지지 않은 상태로 남겨놓아야 합니다.", //fixme: neg!
	    pre_sent_QN: "여덟 개의 연필 중에 네 개의 연필은 부러지지 않은 상태로 남겨놓아야 합니다.",
        pre_sent_NQ: "여섯 개의 연필 중에 네 개는 쉽게 부러지는 연필입니다.",
	    sent_context: "images/scope_pencil_post.jpg",
        SUBJ: speakers[7][0],
        PART: speakers[7][1],
        SNV: "안 부러뜨렸다",
        LNV: "부러뜨리지 않았다",
        QUANT1: "네 개의 ", 
        QUANT2: "네 개 이상의", 
        OBJ: "연필",
        PAR2: "을"
	},
    triangle: {
	    pre_context: "images/scope_triangle_pre.jpg",
	    pre_sent_QN_plus: "여덟 개 중에 네 개의 세모는 안 칠한 상태로 남겨둬야 합니다", //fixme: neg!
	    pre_sent_QN: "여섯 개 중에 네 개의 세모는 안 칠한 상태로 남겨둬야 합니다",
        pre_sent_NQ: "네 개의 세모 중에 세 개 이상을 칠해야 합니다.",
	    sent_context: "images/scope_triangle_post.jpg",
        SUBJ: speakers[8][0],
        PART: speakers[8][1],
        SNV: "안 칠했다",
        LNV: "칠하지 않았다",
        QUANT1: "세 개의 ", 
        QUANT2: "세 개 이상의", 
        OBJ: "세모",
        PAR2: "를"
	},
    bowling: {
	    pre_context: "images/scope_bowling_pre.jpg",
	    pre_sent_QN_plus: "열 개 중에 네 개 이상의 볼링핀이 안 넘어진 상태이면 게임에서 집니다.", //fixme: neg!
	    pre_sent_QN: "여덟 개 중에 네 개 이상의 볼링핀이 안 넘어진 상태이면 게임에서 집니다.",
        pre_sent_NQ: "여섯 개 중에 네 개 이상의 볼링핀을 넘어뜨리면 게임에 이깁니다.",
	    sent_context: "images/scope_bowling_post.jpg",
        SUBJ: speakers[9][0],
        PART: speakers[9][1],
        SNV: "안 넘어뜨렸다",
        LNV: "넘어뜨리지 않았다",
        QUANT1: "네 개의 ", 
        QUANT2: "네 개 이상의", 
        OBJ: "볼링핀",
        PAR2: "을"
	}
}};  


// Parameters for this participant

var scales = Object.keys(sents.scales);
var domains = Object.keys(sents.domains);

// remove the first two elements - the training trials
scales.shift();
scales.shift();
domains.shift();
domains.shift();

// now put the training trials up front and shuffle the rest of the trials.
scales = ["training1","training2"].concat(shuffle(scales));
domains = ["training1","training2"].concat(shuffle(domains));

var totalTrials = scales.length;

var currentdate = new Date()
var month = currentdate.getMonth() +  1


// ############################## The main event ##############################

// Show the instructions slide -- this is what we want subjects to see first.
showSlide("instructions");

var experiment = {
    
    // The object to be submitted.
    data: {
    context: "no_context",
	scale: [],
	domain: [],
    scope: [],
    neg: [],
    quant: [],
    picture: [],
	utterance: [],
    sent_context: [],
	judgment: [],
	language: [],
	expt_aim: [],
	character_thoughts: [],
	expt_gen: [],
    },
    
    // end the experiment
    end: function() {
	showSlide("finished");
    },


    // LOG RESPONSE
    log_response: function() {
	var response_logged = false;
	
	//Array of radio buttons
	var radio = document.getElementsByName("judgment");
	
	// Loop through radio buttons
	for (i = 0; i < radio.length; i++) {
	    if (radio[i].checked) {
        var dataforTrial = experiment.email  + "," + experiment.subid + "," + experiment.time
        dataforTrial += "," + experiment.scale + "," + experiment.domain + ","  + experiment.scope + ","  + experiment.neg + ","  + experiment.quant + "," + sent_materials[2] + "," + sent_materials[0] + "," + sent_materials[1] + "," + radio[i].value + "\n";
        $.post("https://langcog.stanford.edu/cgi-bin/EJY/KAG/KAGstudysave.php", {postresult_string : dataforTrial});	
		response_logged = true;		    
	    }
	}
	
	if (response_logged) {
	    nextButton.blur();
	    
	    // uncheck radio buttons
	    for (i = 0; i < radio.length; i++) {
		radio[i].checked = false
	    }
	    experiment.next();
	} else {
	    $("#testMessage").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
    },
    
    button_response: function () {
    showSlide("stage");
    },
    
    confirm: function () {
            if (document.getElementById("email").value) {
            experiment.email = document.getElementById("email").value;
            experiment.subid = Math.floor((Math.random() * 1000000) + 1);
            experiment.time = currentdate.getDate() + "-" + month + " " + 
                currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            experiment.confirm1();
        } else {
			$("#emailfield").html('<font color="red">질문에 답해주십시오. </font>');  
        }
    },
    
    confirm1: function () {
    showSlide("consent_form");
    },
    
    confirm2: function () {
            if (document.getElementById("participation_date").value && document.getElementById("participant_name").value) {
            experiment.participant_name = document.getElementById("participant_name").value;
            experiment.participation_date = document.getElementById("participation_date").value;
            experiment.next();
        } else {
			$("#namefield").html('<font color="red">성명과 날짜를 적어주십시오. </font>');  
        }
    },

    
    // The work horse of the sequence - what to do on every trial.
    next: function() {
        showSlide("stage");
	    // clear the test message and adjust progress bar
	    $("#testMessage").html('');  
	    $("#prog").attr("style","width:" +
			    String(100 * (1 - scales.length/totalTrials)) + "%")
	    
	    // Get the current trial - <code>shift()</code> removes the first element
	    // randomly select from our scales array,
	    // stop exp after we've exhausted all the domains
	    var scale = scales.shift();
	    var domain = domains.shift();

	    // if the current trial is undefined, call the end function.
	    if (typeof scale == "undefined") {
		return experiment.debriefing();
	    }
	    
	    // Generate the sentence stimuli 

	    //set sent_context

	   sent_materials = doSentSubs(sents, scale, domain);	
	    
	    // Display pre_stage slide
        $("#sent_context_pre").html("<center>" + sent_materials[2] + " <center><br>");
        $("#picture_pre").html("<center><img src = " + sent_materials[4] + " height=275px><center><br>");
        $("#pre_sent").html("<center>" + sent_materials[5] + " <center><br>"); 
        
        // Display the sentence stimuli
        $("#sent_context").html("<center>" + sent_materials[2] + " " + sent_materials[3] + " <center><br>");
	    $("#picture").html("<center><img src = " + sent_materials[0] + " height=275px><center><br>");
	    $("#sent_question").html("<center>다음 문장의 내용은 사실인가요?</b></center>");
        $("#sent").html("<center>\"<b>" + sent_materials[1] + "</b>\"<center><br>");


        experiment.scale = scale;
        experiment.domain = domain; 
        experiment.scope = scope; 
        experiment.neg = neg;
        experiment.quant = quant;
        
    },

    //	go to debriefing slide
    debriefing: function() {
	showSlide("debriefing");
    },

    // submitcomments function
    submit_comments: function() {
	        if ($('input[name="gender"]:checked').val() && document.getElementById("age").value &&
            $('input[name="education"]:checked').val() && $('input[name="english_age"]:checked').val() && $('input[name="foreign_time"]:checked').val()){            
            // save responses
            var dataforTrial = experiment.email  + "," + experiment.subid + "," + experiment.time + "," + experiment.participant_name + "," + experiment.participation_date
            dataforTrial += "," + "DEMOGRAPHICS" + "," + " "  + "," + " "
            dataforTrial += "," + $('input[name="gender"]:checked').val() + ","
            + document.getElementById("age").value + "," + $('input[name="education"]:checked').val() + "," 
            + $('input[name="english_age"]:checked').val() 
            dataforTrial += "," + $('input[name="foreign_time"]:checked').val() + ","
            + document.getElementById("other_langs").value + "\n";
    
            $.post("https://langcog.stanford.edu/cgi-bin/EJY/KAG/KAGstudysave_participantInfo.php", 
                   {postresult_string : dataforTrial});	
        
	experiment.end();
    } else {
    $("#messagedemo").html('<font color="red">질문에 답해주십시오. </font>');
    }
    }
}

