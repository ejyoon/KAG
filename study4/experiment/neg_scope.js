var filename = "EJY_KAG_context"
var condCounts = "1,12;2,12" //Example: "1,20;2,20;3,20"


// ############################## Helper functions ##############################

// Shows slides
function showSlide(id) {
    // Hide all slides
    $(".slide").hide();
    // Show just the slide we want to show
    $("#" + id).show();
}

// Get random integers.
function random(a, b) {
    if (typeof b == "undefined") {
        a = a || 2;
        return Math.floor(Math.random() * a);
    } else {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }
}

// Add a random selection function to all arrays (e.g., <code>[4,8,7].random()</code> could return 4, 8, or 7). This is useful for condition randomization.
Array.prototype.random = function () {
    return this[random(this.length)];
}

// shuffle function
function shuffle(a) {
    var o = [];
    for (var i = 0; i < a.length; i++) {
        o[i] = a[i];
    }
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// substitution function - do we want to save all these factors to a data object? FIXME
function doSentSubs(sents, scale, domain) {
    sent_quant = sents["scales"][scale]["sent_quant"];
    quant = sents["scales"][scale]["sent_quant"];
    scope = sents["scales"][scale]["scope"];
    neg = sents["scales"][scale]["neg"];
    pre_context = sents["domains"][domain]["pre_context"];
    context = sents["domains"][domain]["sent_context"];
//    video = sents["domains"][domain]["video_context"];
    presentence = sents["scales"][scale]["sent_pre"];
    postsentence = sents["scales"][scale]["sent_post"];
    pre_sent = sents["scales"][scale]["pre_sent"];

    SUBJ = sents["domains"][domain]["SUBJ"]; //Speaker
    PART1 = sents["domains"][domain]["PART1"];
    PART2 = sents["domains"][domain]["PART2"];
    SNV = sents["domains"][domain]["SNV"];
    LNV = sents["domains"][domain]["LNV"];
    QUANT1 = sents["domains"][domain]["QUANT1"];
    QUANT2 = sents["domains"][domain]["QUANT2"];
    OBJ = sents["domains"][domain]["OBJ"];
    PAR2 = sents["domains"][domain]["PAR2"];
    if (scope == "QN") {
        PRE_SENT = sents["domains"][domain]["pre_sent_QN"];
        PRE_SENT1 = "";
    } else if (scope == "NQ" || scope == "NQ+") {
        PRE_SENT = sents["domains"][domain]["pre_sent_NQ"];
        PRE_SENT1 = "";
    } else if (scope == "filler") {
        PRE_SENT = sents["domains"][domain]["pre_sent_filler"];
        PRE_SENT1 = "";
    } else {
        PRE_SENT = "";
        PRE_SENT1 = sents["domains"][domain]["pre_sent_QN_plus"];
    }

    pre_context = pre_context.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("scope", scope);
    context = context.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("scope", scope).replace("neg", neg);
    quant = quant.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("scope", scope);
    presentence = presentence.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SUBJ", SUBJ).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("PAR2", PAR2).replace("OBJ", OBJ).replace("scope", scope);
    postsentence = postsentence.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SUBJ", SUBJ).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("PAR2", PAR2).replace("OBJ", OBJ).replace("scope", scope);
    PRE_SENT1 = PRE_SENT1.replace("SUBJ", SUBJ).replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("PAR2", PAR2).replace("PAR2", PAR2).replace("scope", scope);
    pre_sent = pre_sent.replace("SUBJ", SUBJ).replace("SUBJ", SUBJ).replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("scope", scope);

    // pre-context scaffolds the scope under question all the time
    if (scope == "NQ" || scope == "NQ+" || scope == "QN" || scope == "filler") {
        pre_sent = pre_sent.replace("PRE_SENT", PRE_SENT)
    } else if (scope == "QN+") {
        pre_sent = pre_sent.replace("PRE_SENT", PRE_SENT1)
    } else {
        pre_sent = pre_sent.replace("PRE_SENT", "")
    }

    return [context, quant, presentence, postsentence, pre_context, pre_sent];
}

// ############ LOAD CONDITION #############
var cond = random(2) + 1; // (1-6)
//call the maker getter to get the cond variable 
//var xmlHttp = null;
//xmlHttp = new XMLHttpRequest();
//xmlHttp.open( "GET", "http://langcog.stanford.edu/cgi-bin/subject_equalizer/maker_getter.php?conds=" + condCounts +"&filename=" + filename, false );
//xmlHttp.send( null );
//var cond = xmlHttp.responseText;




// ############################## BP Changes Configuration settings ##############################
speakers = shuffle([["철수", "가", "는"], ["민준", "이", "은"], ["지호", "가", "는"], ["주원", "이", "은"], ["지우", "가", "는"], ["서연", "이", "은"], ["민서", "가", "는"], ["지아", "가", "는"], ["하은", "이", "는"], ["서윤", "이", "은"], ["태민", "이", "은"], ["재승", "이", "은"], ["은지", "가", "는"], ["사랑", "이", "는"], ["우석", "이", "은"], ["성진", "이", "은"], ["해령", "이", "은"], ["주미", "가", "는"]]);

var myimages = new Array();

function preloading() {
    for (x = 0; x < preloading.arguments.length; x++) {
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
    "images/filler_bucket_post.jpg",
    "images/filler_bucket_pre.jpg",
    "images/filler_apple_post.jpg",
    "images/filler_apple_pre.jpg",
    "images/filler_crane_post.jpg",
    "images/filler_crane_pre.jpg",
    "images/filler_door_post.jpg",
    "images/filler_door_pre.jpg",
    "images/filler_egg_post.jpg",
    "images/filler_egg_pre.jpg",
    "images/filler_lock_post.jpg",
    "images/filler_lock_pre.jpg",
    "images/filler_onion_post.jpg",
    "images/filler_onion_pre.jpg",
    "images/filler_umbrella_post.jpg",
    "images/filler_umbrella_pre.jpg",
    "images/training001.jpg",
    "images/training002.jpg");



var sents = {
    scales: {
        training1: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJ의 OBJPAR2 잘 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 LNV.",
            scope: "",
            neg: "NA",
            quant: "NA",
            pre_sent: ""

        },
        training2: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJ의 OBJPAR2 잘 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "",
            neg: "NA",
            quant: "NA",
            pre_sent: ""

        },
        test1: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            //            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_post: "결국 어떻게 되었는지 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "QN",
            neg: "short",
            quant: "regular",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        test2: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            //            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_post: "결국 어떻게 되었는지 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "NQ",
            neg: "short",
            quant: "regular",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"

        },
        test3: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            //            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_post: "결국 어떻게 되었는지 보세요.",
            sent_quant: "SUBJPART1 QUANT2 OBJPAR2 SNV.",
            //            scope: "QN+",
            scope: "QN", // FIXME - should be QN+
            quant: "moreThan",
            neg: "short",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        test4: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            //            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_post: "결국 어떻게 되었는지 보세요.",
            sent_quant: "SUBJPART1 QUANT2 OBJPAR2 LNV.",
            neg: "short",
            quant: "moreThan",
            scope: "NQ", // fixme: should be NQ+
//            scope: "NQ+", 
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        test5: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            //            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_post: "결국 어떻게 되었는지 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 LNV.",
            scope: "QN",
            neg: "long",
            quant: "regular",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        test6: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            //            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_post: "결국 어떻게 되었는지 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 LNV.",
            scope: "NQ",
            neg: "long",
            quant: "regular",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        test7: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            //            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_post: "결국 어떻게 되었는지 보세요.",
            sent_quant: "SUBJPART1 QUANT2 OBJPAR2 LNV.",
//            scope: "QN+",
            scope: "QN",
            neg: "long",
            quant: "moreThan",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        test8: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            //            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_post: "결국 어떻게 되었는지 보세요.",
            sent_quant: "SUBJPART1 QUANT2 OBJPAR2 LNV.",
//            scope: "NQ+",
            scope: "NQ", // fixme: should be NQ+
            neg: "long",
            quant: "moreThan",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },

        filler1: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        filler2: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        filler3: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        filler4: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        filler5: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        filler6: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        filler7: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
        },
        filler8: {
            sent_pre: "다음은 SUBJ의 OBJ입니다.",
            sent_post: "SUBJPART1 한 일을 보세요.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT 과연 어떻게 되었을까요?"
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
            PART1: speakers[0][1],
            PART2: speakers[0][2],
            SNV: "안 가지고 있다",
            LNV: "가지고 있지 않다",
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
            PART1: speakers[1][1],
            PART2: speakers[1][2],
            SNV: "안 가지고 있다",
            LNV: "가지고 있지 않다",
            QUANT1: "두 마리의 ",
            QUANT2: "두 마리 이상의",
            OBJ: "고양이",
            PAR2: "를"
        },
//        balloon: {
//            pre_context: "images/scope_balloon_pre.jpg",
//            pre_sent_QN_plus: "풍선을 여덟 개 불어놓았습니다. 게임에서 이기려면 SUBJPART2 풍선을 모두 터트려야합니다.",
//            pre_sent_QN: "풍선을 여섯 개 불어놓았습니다. 게임에서 이기려면 SUBJPART2 풍선을 모두 터트려야합니다.",
//            pre_sent_NQ: "풍선을 네 개 불어놓았습니다. 게임에서 이기려면 SUBJPART2 이 중 세 개 이상 터트려야합니다.", // 받습니다
//            sent_context: "images/scope_balloon_post.jpg",
//            SUBJ: speakers[2][0],
//            PART1: speakers[2][1],
//            PART2: speakers[2][2],
//            SNV: "안 터트렸다",
//            LNV: "터트리지 않았다",
//            QUANT1: "세 개의 ",
//            QUANT2: "세 개 이상의",
//            OBJ: "풍선",
//            PAR2: "을"
//        },
        book: {
            pre_context: "scope_book.mp4",
            pre_sent_QN_plus: "책이 여덟 권 있습니다. SUBJPART2 숙제로 책을 모두 펼쳐서 읽어야합니다.",
            pre_sent_QN: "책이 여섯 권 있습니다. SUBJPART2 숙제로 책을 모두 펼쳐서 읽어야합니다.",
            pre_sent_NQ: "책이 네 권 있습니다. SUBJPART2 숙제로 책을 세 권 이상 펼쳐서 읽어야합니다. ",
            sent_context: "scope_book_neg.mp4",
            SUBJ: speakers[3][0],
            PART1: speakers[3][1],
            PART2: speakers[3][2],
            SNV: "안 펼쳤다",
            LNV: "펼치지 않았다",
            QUANT1: "세 권의 ",
            QUANT2: "세 권 이상의",
            OBJ: "책",
            PAR2: "을"
        },
        out: {
            pre_context: "scope_out.mp4",
            pre_sent_QN_plus: "풍선을 여덟 개 불어놓았습니다. 게임에서 이기려면 SUBJPART2 풍선을 모두 터트려야합니다.",
            pre_sent_QN: "풍선을 여섯 개 불어놓았습니다. 게임에서 이기려면 SUBJPART2 풍선을 모두 터트려야합니다.",
            pre_sent_NQ: "풍선을 네 개 불어놓았습니다. 게임에서 이기려면 SUBJPART2 이 중 세 개 이상 터트려야합니다.", // 받습니다
            sent_context: "scope_out_neg.mp4",
            SUBJ: speakers[2][0],
            PART1: speakers[2][1],
            PART2: speakers[2][2],
            SNV: "안 터트렸다",
            LNV: "터트리지 않았다",
            QUANT1: "세 개의 ",
            QUANT2: "세 개 이상의",
            OBJ: "풍선",
            PAR2: "을"
        },
//        box: {
//            pre_context: "images/scope_box_pre.jpg",
//            pre_sent_QN_plus: "상자가 여덟 개 있습니다. SUBJPART2 이삿짐 정리를 위해 상자를 모두 열어놔야합니다.",
//            pre_sent_QN: "상자가 여섯 개 있습니다. SUBJPART2 이삿짐 정리를 위해 상자를 모두 열어놔야합니다.",
//            pre_sent_NQ: "상자가 네 개 있습니다. SUBJPART2 이삿짐 정리를 위해 상자를 세 개 이상 열어놔야합니다.",
//            sent_context: "images/scope_box_post.jpg",
//            SUBJ: speakers[4][0],
//            PART1: speakers[4][1],
//            PART2: speakers[4][2],
//            SNV: "안 열었다",
//            LNV: "열지 않았다",
//            QUANT1: "세 개의 ",
//            QUANT2: "세 개 이상의",
//            OBJ: "상자",
//            PAR2: "를"
//        },
        cup: {
            pre_context: "scope_cup.mp4",
            pre_sent_QN_plus: "컵이 열 개 있습니다. 아빠는 SUBJ에게 컵을 모두 씻어서 뒤집어 놓으라고 했습니다.",
            pre_sent_QN: "컵이 여덟 개 있습니다. 아빠는 SUBJ에게 컵을 모두 씻어서 뒤집어 놓으라고 했습니다.",
            pre_sent_NQ: "컵이 여섯 개 있습니다. 아빠는 SUBJ에게 컵을 네 개 이상 씻어서 뒤집어 놓으라고 했습니다.", // fixme: 중에? 중?
            sent_context: "scope_cup_neg.mp4",
            SUBJ: speakers[5][0],
            PART1: speakers[5][1],
            PART2: speakers[5][2],
            SNV: "안 뒤집었다",
            LNV: "뒤집지 않았다",
            QUANT1: "네 개의 ",
            QUANT2: "네 개 이상의",
            OBJ: "컵",
            PAR2: "을"
        },
        pen: {
            pre_context: "scope_pen.mp4",
            pre_sent_QN_plus: "종이가 열 개 있습니다. 엄마는 SUBJ에게 종이를 모두 구겨서 버리라고 했습니다.",
            pre_sent_QN: "종이가 여덟 개 있습니다. 엄마는 SUBJ에게 종이를 모두 구겨서 버리라고 했습니다.",
            pre_sent_NQ: "종이가 여섯 개 있습니다. 엄마는 SUBJ에게 종이를 네 개 이상 구겨서 버리라고 했습니다.",
            sent_context: "scope_pen_neg.mp4",
            SUBJ: speakers[6][0],
            PART1: speakers[6][1],
            PART2: speakers[6][2],
            SNV: "안 구겼다",
            LNV: "구기지 않았다",
            QUANT1: "네 장의 ",
            QUANT2: "네 장 이상의",
            OBJ: "종이",
            PAR2: "를"
        },
        paper: {
            pre_context: "scope_paper.mp4",
            pre_sent_QN_plus: "종이가 열 개 있습니다. 엄마는 SUBJ에게 종이를 모두 구겨서 버리라고 했습니다.",
            pre_sent_QN: "종이가 여덟 개 있습니다. 엄마는 SUBJ에게 종이를 모두 구겨서 버리라고 했습니다.",
            pre_sent_NQ: "종이가 여섯 개 있습니다. 엄마는 SUBJ에게 종이를 네 개 이상 구겨서 버리라고 했습니다.",
            sent_context: "scope_paper_neg.mp4",
            SUBJ: speakers[6][0],
            PART1: speakers[6][1],
            PART2: speakers[6][2],
            SNV: "안 구겼다",
            LNV: "구기지 않았다",
            QUANT1: "네 장의 ",
            QUANT2: "네 장 이상의",
            OBJ: "종이",
            PAR2: "를"
        },
        sticker: {
            pre_context: "scope_sticker.mp4",
            pre_sent_QN_plus: "상자가 여덟 개 있습니다. SUBJPART2 이삿짐 정리를 위해 상자를 모두 열어놔야합니다.",
            pre_sent_QN: "상자가 여섯 개 있습니다. SUBJPART2 이삿짐 정리를 위해 상자를 모두 열어놔야합니다.",
            pre_sent_NQ: "상자가 네 개 있습니다. SUBJPART2 이삿짐 정리를 위해 상자를 세 개 이상 열어놔야합니다.",
            sent_context: "scope_sticker_neg.mp4",
            SUBJ: speakers[4][0],
            PART1: speakers[4][1],
            PART2: speakers[4][2],
            SNV: "안 열었다",
            LNV: "열지 않았다",
            QUANT1: "세 개의 ",
            QUANT2: "세 개 이상의",
            OBJ: "상자",
            PAR2: "를"
        },
        toothpick: {
            pre_context: "scope_toothpick.mp4",
            pre_sent_QN_plus: "SUBJPART2 연필을 열 개 가지고 있습니다. 동생과의 내기에서 이기려면 재빨리 연필을 모두 부러뜨려야 합니다.", //fixme: neg!
            pre_sent_QN: "SUBJPART2 연필을 여덟 개 가지고 있습니다. 동생과의 내기에서 이기려면 재빨리 연필을 모두 부러뜨려야 합니다.",
            pre_sent_NQ: "SUBJPART2 연필을 여섯 개 가지고 있습니다. 동생과의 내기에서 이기려면 재빨리 연필을 네 개 이상 부러뜨려야 합니다.",
            sent_context: "scope_toothpick_neg.mp4",
            SUBJ: speakers[7][0],
            PART1: speakers[7][1],
            PART2: speakers[7][2],
            SNV: "안 부러뜨렸다",
            LNV: "부러뜨리지 않았다",
            QUANT1: "네 개의 ",
            QUANT2: "네 개 이상의",
            OBJ: "연필",
            PAR2: "을"
        },
        triangle: {
            pre_context: "scope_triangle.mp4",
            pre_sent_QN_plus: "세모가 여덟 개 있습니다. 아빠는 SUBJ에게 세모를 모두 색칠하라고 했습니다.", //fixme: neg!
            pre_sent_QN: "세모가 여섯 개 있습니다. 아빠는 SUBJ에게 세모를 모두 색칠하라고 했습니다.",
            pre_sent_NQ: "세모가 네 개 있습니다. 아빠는 SUBJ에게 세모를 세 개 이상 색칠하라고 했습니다.",
            sent_context: "scope_triangle_neg.mp4",
            SUBJ: speakers[8][0],
            PART1: speakers[8][1],
            PART2: speakers[8][2],
            SNV: "안 칠했다",
            LNV: "칠하지 않았다",
            QUANT1: "세 개의 ",
            QUANT2: "세 개 이상의",
            OBJ: "세모",
            PAR2: "를"
        },
        clip: {
            pre_context: "clip-context1.mp4", // fixme: counterbalance?
            pre_sent_filler: "통이 여덟 개 있습니다. SUBJPART2 통을 모래로 채워야합니다.",
            sent_context: "clip-four-false.mp4", // fixme: counterbalance?
            SUBJ: speakers[10][0],
            PART1: speakers[10][1],
            PART2: speakers[10][2],
            SNV: "안 채웠다",
            LNV: "채우지 않았다",
            QUANT1: "",
            QUANT2: "",
            OBJ: "통",
            PAR2: "을"
        },
        postit: {
            pre_context: "postit-context2.mp4", // fixme: counterbalance?
            pre_sent_filler: "통이 여덟 개 있습니다. SUBJPART2 통을 모래로 채워야합니다.",
            sent_context: "postit-short-false.mp4", // fixme: counterbalance?
            SUBJ: speakers[10][0],
            PART1: speakers[10][1],
            PART2: speakers[10][2],
            SNV: "안 채웠다",
            LNV: "채우지 않았다",
            QUANT1: "",
            QUANT2: "",
            OBJ: "통",
            PAR2: "을"
        },
        ring: {
            pre_context: "ring-context1.mp4", // fixme: counterbalance?
            pre_sent_filler: "통이 여덟 개 있습니다. SUBJPART2 통을 모래로 채워야합니다.",
            sent_context: "ring-long-false.mp4", // fixme: counterbalance?
            SUBJ: speakers[10][0],
            PART1: speakers[10][1],
            PART2: speakers[10][2],
            SNV: "안 채웠다",
            LNV: "채우지 않았다",
            QUANT1: "",
            QUANT2: "",
            OBJ: "통",
            PAR2: "을"
        },
        rubber: {
            pre_context: "rubber-context2.mp4", // fixme: counterbalance?
            pre_sent_filler: "통이 여덟 개 있습니다. SUBJPART2 통을 모래로 채워야합니다.",
            sent_context: "rubber-four-false.mp4", // fixme: counterbalance?
            SUBJ: speakers[10][0],
            PART1: speakers[10][1],
            PART2: speakers[10][2],
            SNV: "안 채웠다",
            LNV: "채우지 않았다",
            QUANT1: "",
            QUANT2: "",
            OBJ: "통",
            PAR2: "을"
        },
//        bucket: {
//            pre_context: "images/scope_bucket_pre.jpg",
//            pre_sent_filler: "통이 여덟 개 있습니다. SUBJPART2 통을 모래로 채워야합니다.",
//            sent_context: "images/scope_bucket_post.jpg",
//            SUBJ: speakers[10][0],
//            PART1: speakers[10][1],
//            PART2: speakers[10][2],
//            SNV: "안 채웠다",
//            LNV: "채우지 않았다",
//            QUANT1: "",
//            QUANT2: "",
//            OBJ: "통",
//            PAR2: "을"
//        },
//        lock: {
//            pre_context: "images/scope_lock_pre.jpg",
//            pre_sent_filler: "자물쇠가 여섯 개 있습니다. SUBJPART2 자물쇠를 가능한 많이 열어야합니다.",
//            sent_context: "images/scope_lock_post.jpg",
//            SUBJ: speakers[11][0],
//            PART1: speakers[11][1],
//            PART2: speakers[11][2],
//            SNV: "열었다",
//            LNV: "열었다",
//            QUANT1: "세 개 이상의",
//            QUANT2: "세 개 이상의",
//            OBJ: "자물쇠",
//            PAR2: "를"
//        },
//        apple: {
//            pre_context: "images/scope_apple_pre.jpg",
//            pre_sent_filler: "사과가 여섯 개 있습니다. SUBJPART2 사과를 가능한 많이 먹어야합니다.",
//            sent_context: "images/scope_apple_post.jpg",
//            SUBJ: speakers[12][0],
//            PART1: speakers[12][1],
//            PART2: speakers[12][2],
//            SNV: "먹었다",
//            LNV: "먹었다",
//            QUANT1: "네 개 이상의",
//            QUANT2: "네 개 이상의",
//            OBJ: "사과",
//            PAR2: "를"
//        },
//        crane: {
//            pre_context: "images/scope_crane_pre.jpg",
//            pre_sent_filler: "종이가 여섯 장 있습니다. SUBJPART2 종이로 학을 가능한 많이 접으려 합니다.",
//            sent_context: "images/scope_crane_post.jpg",
//            SUBJ: speakers[13][0],
//            PART1: speakers[13][1],
//            PART2: speakers[13][2],
//            SNV: "접었다",
//            LNV: "접었다",
//            QUANT1: "세 개 이상의",
//            QUANT2: "세 개 이상의",
//            OBJ: "학",
//            PAR2: "을"
//        },
//        onion: {
//            pre_context: "images/scope_onion_pre.jpg",
//            pre_sent_filler: "양파가 두 개 있습니다. SUBJPART2 양파를 잘라야합니다.",
//            sent_context: "images/scope_onion_post.jpg",
//            SUBJ: speakers[14][0],
//            PART1: speakers[14][1],
//            PART2: speakers[14][2],
//            SNV: "안 잘랐다",
//            LNV: "자르지 않았다",
//            QUANT1: "",
//            QUANT2: "",
//            OBJ: "양파",
//            PAR2: "를"
//        },
//        egg: {
//            pre_context: "images/scope_egg_pre.jpg",
//            pre_sent_filler: "달걀이 네 개 있습니다. SUBJPART2 달걀을 깨뜨리지 않고 그대로 두려 합니다.",
//            sent_context: "images/scope_egg_post.jpg",
//            SUBJ: speakers[15][0],
//            PART1: speakers[15][1],
//            PART2: speakers[15][2],
//            SNV: "안 깨뜨렸다",
//            LNV: "깨뜨리지 않았다",
//            QUANT1: "",
//            QUANT2: "",
//            OBJ: "달걀",
//            PAR2: "을"
//        },
//        umbrella: {
//            pre_context: "images/scope_umbrella_pre.jpg",
//            pre_sent_filler: "우산이 여섯 개 있습니다. SUBJPART2 우산을 가능한 많이 펼쳐야합니다.",
//            sent_context: "images/scope_umbrella_post.jpg",
//            SUBJ: speakers[16][0],
//            PART1: speakers[16][1],
//            PART2: speakers[16][2],
//            SNV: "펼쳤다",
//            LNV: "펼쳤다",
//            QUANT1: "네 개 이상의",
//            QUANT2: "네 개 이상의",
//            OBJ: "우산",
//            PAR2: "을"
//        },
//        door: {
//            pre_context: "images/scope_door_pre.jpg",
//            pre_sent_filler: "문이 세 개 있습니다. SUBJPART2 문을 닫아야합니다.",
//            sent_context: "images/scope_door_post.jpg",
//            SUBJ: speakers[17][0],
//            PART1: speakers[17][1],
//            PART2: speakers[17][2],
//            SNV: "안 닫았다",
//            LNV: "닫지 않았다",
//            QUANT1: "",
//            QUANT2: "",
//            OBJ: "문",
//            PAR2: "을"
//        }

    }
};


// Parameters for this participant

var scales = Object.keys(sents.scales);
var domains = Object.keys(sents.domains);

// remove the first two elements - the training trials
scales.shift();
scales.shift();
domains.shift();
domains.shift();

// now put the training trials up front and shuffle the rest of the trials.
scales = ["training1", "training2"].concat(shuffle([scales[8], scales[9], scales[10], scales[11] 
//                                                    scales[12], scales[13], scales[14], scales[15]
                                                   ])).concat(shuffle([scales[0], scales[1], scales[2], scales[3], scales[4], scales[5], scales[6], scales[7]]));
scales = [
//    scales[0], scales[1],
          scales[2], scales[10],
          scales[3], scales[11],
          scales[4], scales[12],
          scales[5], scales[13],
          scales[6], scales[14],
          scales[7], scales[15],
//          scales[8], scales[16],
//          scales[9], scales[17]
]
domains = ["training1", "training2"].concat(shuffle([domains[8], domains[9], domains[10], domains[11], 
//                                                     domains[12], domains[13], domains[14], domains[15]
                                                    ])).concat(shuffle([domains[0], domains[1], domains[2], domains[3], domains[4], domains[5], domains[6], domains[7]]));
domains = [
//    domains[0], domains[1],
          domains[2], domains[10],
          domains[3], domains[11],
          domains[4], domains[12],
          domains[5], domains[13],
          domains[6], domains[14],
          domains[7], domains[15],
//          domains[8], domains[16],
//          domains[9], domains[17]
]

var totalTrials = scales.length;

var currentdate = new Date()
var month = currentdate.getMonth() + 1


// ############################## The main event ##############################

// Show the instructions slide -- this is what we want subjects to see first.
showSlide("instructions");

var experiment = {

    // The object to be submitted.
    data: {
        context: "context_provided",
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
    end: function () {
        showSlide("finished");
    },

    // LOG RESPONSE
    log_response: function () {
        var response_logged = false;

        //Array of radio buttons
        var radio = document.getElementsByName("judgment");

        // Loop through radio buttons
        for (i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                var dataforTrial = experiment.email + "," + experiment.subid + "," + experiment.time
                dataforTrial += "," + experiment.scale + "," + experiment.domain + "," + experiment.scope + "," + experiment.neg + "," + experiment.quant + "," + sent_materials[2] + "," + sent_materials[0] + "," + sent_materials[1] + "," + radio[i].value + "\n";
                $.post("https://langcog.stanford.edu/cgi-bin/EJY/KAG/KAGstudysave.php", {
                    postresult_string: dataforTrial
                });
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
    next: function () {

        showSlide("pre_stage");
        // clear the test message and adjust progress bar
        $("#testMessage").html('');
        $("#prog").attr("style", "width:" +
            String(100 * (1 - scales.length / totalTrials)) + "%")

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
        //        $("#sent_context_pre").html("<center>" + sent_materials[2] + " <center><br>");
        $("#sent_context_pre").html("<center><video width=\"500\" src=\"videos/actions/" + sent_materials[4] + "\" controls autoplay></video> <center><br>");
        $("#picture_pre").html("<center><img src = " + sent_materials[4] + " height=275px><center><br>");
//        $("#pre_sent").html("<center>" + sent_materials[5] + "<center><br>");
        $("#pre_sent").html("<center>다음 상황을 잘 보세요.<center><br>");

        // Display the sentence stimuli
        $("#sent_context").html("<center>" + sent_materials[3] + " <center><br>");
        $("#video_context").html("<center><video width=\"500\" src=\"videos/sentences/" + sent_materials[0] + "\" controls autoplay></video> <center><br>");
        $("#picture").html("<center><img src = " + sent_materials[0] + " height=275px><center><br>");
        $("#sent_question").html("<center>위 그림에 따르면 다음 문장의 내용이 사실인가요?</b></center>");
        $("#sent").html("<center>\"<b>" + sent_materials[1] + "</b>\"<center><br>");

        experiment.scale = scale;
        experiment.domain = domain;
        experiment.scope = scope;
        experiment.neg = neg;
        experiment.quant = quant;
    },

    //	go to debriefing slide
    debriefing: function () {
        showSlide("debriefing");
    },

    submit_comments: function () {
        if ($('input[name="gender"]:checked').val() && document.getElementById("age").value &&
            $('input[name="education"]:checked').val() && $('input[name="english_age"]:checked').val() && $('input[name="foreign_time"]:checked').val()) {
            // save responses
            var dataforTrial = experiment.email + "," + experiment.subid + "," + experiment.time + "," + experiment.participant_name + "," + experiment.participation_date
            dataforTrial += "," + "DEMOGRAPHICS" + "," + " " + "," + " "
            dataforTrial += "," + $('input[name="gender"]:checked').val() + "," +
                document.getElementById("age").value + "," + $('input[name="education"]:checked').val() + "," +
                $('input[name="english_age"]:checked').val()
            dataforTrial += "," + $('input[name="foreign_time"]:checked').val() + "," +
                document.getElementById("other_langs").value + "\n";

            $.post("https://langcog.stanford.edu/cgi-bin/EJY/KAG/KAGstudysave_participantInfo.php", {
                postresult_string: dataforTrial
            });

            experiment.end();
        } else {
            $("#messagedemo").html('<font color="red">질문에 답해주십시오. </font>');
        }
    }
}
