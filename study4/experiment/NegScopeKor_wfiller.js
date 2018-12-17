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
    } else if (scope == "NQ" || scope == "NQ+") {
        PRE_SENT = sents["domains"][domain]["pre_sent_NQ"];
    } else if (scope == "filler") {
        PRE_SENT = sents["domains"][domain]["pre_sent_filler"];
    } else {
        PRE_SENT = "";
        PRE_SENT1 = sents["domains"][domain]["pre_sent_QN_plus"];
    }

    pre_context = pre_context.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("scope", scope);
    context = context.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("scope", scope);
    quant = quant.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("scope", scope);
    presentence = presentence.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SUBJ", SUBJ).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("PAR2", PAR2).replace("OBJ", OBJ).replace("scope", scope);
    postsentence = postsentence.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SUBJ", SUBJ).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("PAR2", PAR2).replace("OBJ", OBJ).replace("scope", scope);
    //    if (cond == 1) {
    PRE_SENT = PRE_SENT.replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("PAR2", PAR2).replace("PAR2", PAR2).replace("scope", scope);
    PRE_SENT1 = PRE_SENT1.replace("SUBJ", SUBJ).replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART2", PART2).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("PAR2", PAR2).replace("PAR2", PAR2).replace("scope", scope);
    //    } else {
    //    PRE_SENT = PRE_SENT.replace("SUBJ",SUBJ).replace("PART1",PART1).replace("PART2",PART2).replace("SUBJ",SUBJ).replace("PART1",PART1).replace("PART2",PART2).replace("SNV",SNV).replace("LNV",LNV).replace("QUANT1",QUANT1).replace("QUANT2",QUANT2).replace("OBJ",OBJ).replace("PAR2",PAR2).replace("PAR2",PAR2).replace("PAR2",PAR2).replace("scope",scope);
    //    }    
    pre_sent = pre_sent.replace("SUBJ", SUBJ).replace("SUBJ", SUBJ).replace("SUBJ", SUBJ).replace("PART1", PART1).replace("PART1", PART1).replace("PART2", PART2).replace("SNV", SNV).replace("LNV", LNV).replace("QUANT1", QUANT1).replace("QUANT2", QUANT2).replace("OBJ", OBJ).replace("PAR2", PAR2).replace("scope", scope);

    // conditioning by scope, so that pre-context scaffolds only one of the two scopes per condition
    //    if (cond == 1) {
    //        if (scope == "QN") {
    //        pre_sent = pre_sent.replace("PRE_SENT",PRE_SENT)
    //        } else if (scope == "QN+") {
    //        pre_sent = pre_sent.replace("PRE_SENT",PRE_SENT1)            
    //        } else {
    //        pre_sent = pre_sent.replace("PRE_SENT","")
    //        }
    //    } else {
    //        if (scope == "NQ" || scope == "NQ+") {
    //        pre_sent = pre_sent.replace("PRE_SENT",PRE_SENT)
    //        } else {
    //        pre_sent = pre_sent.replace("PRE_SENT","")
    //        }
    //    }
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
// FIXME: ask ppl about whether the sentence sounds natural?
speakers = shuffle([["ì² ìˆ˜", "ê°€", "ëŠ”"], ["ë¯¼ì¤€", "ì´", "ì€"], ["ì§€í˜¸", "ê°€", "ëŠ”"], ["ì£¼ì›", "ì´", "ì€"], ["ì§€ìš°", "ê°€", "ëŠ”"], ["ì„œì—°", "ì´", "ì€"], ["ë¯¼ì„œ", "ê°€", "ëŠ”"], ["ì§€ì•„", "ê°€", "ëŠ”"], ["í•˜ì€", "ì´", "ëŠ”"], ["ì„œìœ¤", "ì´", "ì€"], ["íƒœë¯¼", "ì´", "ì€"], ["ìž¬ìŠ¹", "ì´", "ì€"], ["ì€ì§€", "ê°€", "ëŠ”"], ["ì‚¬ëž‘", "ì´", "ëŠ”"], ["ìš°ì„", "ì´", "ì€"], ["ì„±ì§„", "ì´", "ì€"], ["í•´ë ¹", "ì´", "ì€"], ["ì£¼ë¯¸", "ê°€", "ëŠ”"]]);

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
            //FIXME: ì´ê²ƒì€, ë´ì£¼ì„¸ìš”.
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            sent_post: "SUBJì˜ OBJPAR2 ìž˜ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 LNV.",
            scope: "",
            neg: "NA",
            quant: "NA",
            pre_sent: ""

        },
        training2: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            sent_post: "SUBJì˜ OBJPAR2 ìž˜ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "",
            neg: "NA",
            quant: "NA",
            pre_sent: ""

        },
        test1: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            //            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_post: "ê²°êµ­ ì–´ë–»ê²Œ ë˜ì—ˆëŠ”ì§€ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "QN",
            neg: "short",
            quant: "regular",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        test2: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            //            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_post: "ê²°êµ­ ì–´ë–»ê²Œ ë˜ì—ˆëŠ”ì§€ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "NQ",
            neg: "short",
            quant: "regular",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"

        },
        test3: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            //            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_post: "ê²°êµ­ ì–´ë–»ê²Œ ë˜ì—ˆëŠ”ì§€ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT2 OBJPAR2 SNV.",
            scope: "QN+",
            quant: "moreThan",
            neg: "short",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        test4: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            //            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_post: "ê²°êµ­ ì–´ë–»ê²Œ ë˜ì—ˆëŠ”ì§€ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT2 OBJPAR2 LNV.",
            neg: "short",
            quant: "moreThan",
            scope: "NQ+",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        test5: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            //            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_post: "ê²°êµ­ ì–´ë–»ê²Œ ë˜ì—ˆëŠ”ì§€ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 LNV.",
            scope: "QN",
            neg: "long",
            quant: "regular",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        test6: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            //            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_post: "ê²°êµ­ ì–´ë–»ê²Œ ë˜ì—ˆëŠ”ì§€ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 LNV.",
            scope: "NQ",
            neg: "long",
            quant: "regular",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        test7: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            //            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_post: "ê²°êµ­ ì–´ë–»ê²Œ ë˜ì—ˆëŠ”ì§€ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT2 OBJPAR2 LNV.",
            scope: "QN+",
            neg: "long",
            quant: "moreThan",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        test8: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            //            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_post: "ê²°êµ­ ì–´ë–»ê²Œ ë˜ì—ˆëŠ”ì§€ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT2 OBJPAR2 LNV.",
            scope: "NQ+",
            neg: "long",
            quant: "moreThan",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },

        filler1: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        filler2: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        filler3: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        filler4: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        filler5: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        filler6: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        filler7: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
        },
        filler8: {
            sent_pre: "ë‹¤ìŒì€ SUBJì˜ OBJìž…ë‹ˆë‹¤.",
            sent_post: "SUBJPART1 í•œ ì¼ì„ ë³´ì„¸ìš”.",
            sent_quant: "SUBJPART1 QUANT1 OBJPAR2 SNV.",
            scope: "filler",
            //            pre_sent: "PRE_SENT"
            neg: "NA",
            quant: "NA",
            pre_sent: "PRE_SENT ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”?"
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
            SNV: "ì•ˆ ê°€ì§€ê³  ìžˆë‹¤",
            LNV: "ê°€ì§€ê³  ìžˆì§€ ì•Šë‹¤",
            QUANT1: "ë„¤ ê°œì˜ ",
            QUANT2: "ë„¤ ê°œ ì´ìƒì˜",
            OBJ: "ê³°ì¸í˜•",
            PAR2: "ì„"
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
            SNV: "ì•ˆ ê°€ì§€ê³  ìžˆë‹¤",
            LNV: "ê°€ì§€ê³  ìžˆì§€ ì•Šë‹¤",
            QUANT1: "ë‘ ë§ˆë¦¬ì˜ ",
            QUANT2: "ë‘ ë§ˆë¦¬ ì´ìƒì˜",
            OBJ: "ê³ ì–‘ì´",
            PAR2: "ë¥¼"
        },
        balloon: {
            pre_context: "images/scope_balloon_pre.jpg",
            pre_sent_QN_plus: "í’ì„ ì„ ì—¬ëŸ ê°œ ë¶ˆì–´ë†“ì•˜ìŠµë‹ˆë‹¤. ê²Œìž„ì—ì„œ ì´ê¸°ë ¤ë©´ SUBJPART2 í’ì„ ì„ ëª¨ë‘ í„°íŠ¸ë ¤ì•¼í•©ë‹ˆë‹¤.",
            pre_sent_QN: "í’ì„ ì„ ì—¬ì„¯ ê°œ ë¶ˆì–´ë†“ì•˜ìŠµë‹ˆë‹¤. ê²Œìž„ì—ì„œ ì´ê¸°ë ¤ë©´ SUBJPART2 í’ì„ ì„ ëª¨ë‘ í„°íŠ¸ë ¤ì•¼í•©ë‹ˆë‹¤.",
            pre_sent_NQ: "í’ì„ ì„ ë„¤ ê°œ ë¶ˆì–´ë†“ì•˜ìŠµë‹ˆë‹¤. ê²Œìž„ì—ì„œ ì´ê¸°ë ¤ë©´ SUBJPART2 ì´ ì¤‘ ì„¸ ê°œ ì´ìƒ í„°íŠ¸ë ¤ì•¼í•©ë‹ˆë‹¤.", // ë°›ìŠµë‹ˆë‹¤
            sent_context: "images/scope_balloon_post.jpg",
            SUBJ: speakers[2][0],
            PART1: speakers[2][1],
            PART2: speakers[2][2],
            SNV: "ì•ˆ í„°íŠ¸ë ¸ë‹¤",
            LNV: "í„°íŠ¸ë¦¬ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "ì„¸ ê°œì˜ ",
            QUANT2: "ì„¸ ê°œ ì´ìƒì˜",
            OBJ: "í’ì„ ",
            PAR2: "ì„"
        },
        book: {
            pre_context: "images/scope_book_pre.jpg",
            pre_sent_QN_plus: "ì±…ì´ ì—¬ëŸ ê¶Œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ìˆ™ì œë¡œ ì±…ì„ ëª¨ë‘ íŽ¼ì³ì„œ ì½ì–´ì•¼í•©ë‹ˆë‹¤.", // FIXME: negation? JS
            pre_sent_QN: "ì±…ì´ ì—¬ì„¯ ê¶Œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ìˆ™ì œë¡œ ì±…ì„ ëª¨ë‘ íŽ¼ì³ì„œ ì½ì–´ì•¼í•©ë‹ˆë‹¤.",
            pre_sent_NQ: "ì±…ì´ ë„¤ ê¶Œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ìˆ™ì œë¡œ ì±…ì„ ì„¸ ê¶Œ ì´ìƒ íŽ¼ì³ì„œ ì½ì–´ì•¼í•©ë‹ˆë‹¤. ",
            sent_context: "images/scope_book_post.jpg",
            SUBJ: speakers[3][0],
            PART1: speakers[3][1],
            PART2: speakers[3][2],
            SNV: "ì•ˆ íŽ¼ì³¤ë‹¤",
            LNV: "íŽ¼ì¹˜ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "ì„¸ ê¶Œì˜ ",
            QUANT2: "ì„¸ ê¶Œ ì´ìƒì˜",
            OBJ: "ì±…",
            PAR2: "ì„"
        },
        box: {
            pre_context: "images/scope_box_pre.jpg",
            pre_sent_QN_plus: "ìƒìžê°€ ì—¬ëŸ ê°œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ì´ì‚¿ì§ ì •ë¦¬ë¥¼ ìœ„í•´ ìƒìžë¥¼ ëª¨ë‘ ì—´ì–´ë†”ì•¼í•©ë‹ˆë‹¤.",
            pre_sent_QN: "ìƒìžê°€ ì—¬ì„¯ ê°œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ì´ì‚¿ì§ ì •ë¦¬ë¥¼ ìœ„í•´ ìƒìžë¥¼ ëª¨ë‘ ì—´ì–´ë†”ì•¼í•©ë‹ˆë‹¤.",
            pre_sent_NQ: "ìƒìžê°€ ë„¤ ê°œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ì´ì‚¿ì§ ì •ë¦¬ë¥¼ ìœ„í•´ ìƒìžë¥¼ ì„¸ ê°œ ì´ìƒ ì—´ì–´ë†”ì•¼í•©ë‹ˆë‹¤.",
            sent_context: "images/scope_box_post.jpg",
            SUBJ: speakers[4][0],
            PART1: speakers[4][1],
            PART2: speakers[4][2],
            SNV: "ì•ˆ ì—´ì—ˆë‹¤",
            LNV: "ì—´ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "ì„¸ ê°œì˜ ",
            QUANT2: "ì„¸ ê°œ ì´ìƒì˜",
            OBJ: "ìƒìž",
            PAR2: "ë¥¼"
        },
        cup: {
            pre_context: "images/scope_cup_pre.jpg",
            pre_sent_QN_plus: "ì»µì´ ì—´ ê°œ ìžˆìŠµë‹ˆë‹¤. ì•„ë¹ ëŠ” SUBJì—ê²Œ ì»µì„ ëª¨ë‘ ì”»ì–´ì„œ ë’¤ì§‘ì–´ ë†“ìœ¼ë¼ê³  í–ˆìŠµë‹ˆë‹¤.",
            pre_sent_QN: "ì»µì´ ì—¬ëŸ ê°œ ìžˆìŠµë‹ˆë‹¤. ì•„ë¹ ëŠ” SUBJì—ê²Œ ì»µì„ ëª¨ë‘ ì”»ì–´ì„œ ë’¤ì§‘ì–´ ë†“ìœ¼ë¼ê³  í–ˆìŠµë‹ˆë‹¤.",
            pre_sent_NQ: "ì»µì´ ì—¬ì„¯ ê°œ ìžˆìŠµë‹ˆë‹¤. ì•„ë¹ ëŠ” SUBJì—ê²Œ ì»µì„ ë„¤ ê°œ ì´ìƒ ì”»ì–´ì„œ ë’¤ì§‘ì–´ ë†“ìœ¼ë¼ê³  í–ˆìŠµë‹ˆë‹¤.", // fixme: ì¤‘ì—? ì¤‘?
            sent_context: "images/scope_cup_post.jpg",
            SUBJ: speakers[5][0],
            PART1: speakers[5][1],
            PART2: speakers[5][2],
            SNV: "ì•ˆ ë’¤ì§‘ì—ˆë‹¤",
            LNV: "ë’¤ì§‘ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "ë„¤ ê°œì˜ ",
            QUANT2: "ë„¤ ê°œ ì´ìƒì˜",
            OBJ: "ì»µ",
            PAR2: "ì„"
        },
        paper: {
            pre_context: "images/scope_paper_pre.jpg",
            pre_sent_QN_plus: "ì¢…ì´ê°€ ì—´ ê°œ ìžˆìŠµë‹ˆë‹¤. ì—„ë§ˆëŠ” SUBJì—ê²Œ ì¢…ì´ë¥¼ ëª¨ë‘ êµ¬ê²¨ì„œ ë²„ë¦¬ë¼ê³  í–ˆìŠµë‹ˆë‹¤.",
            pre_sent_QN: "ì¢…ì´ê°€ ì—¬ëŸ ê°œ ìžˆìŠµë‹ˆë‹¤. ì—„ë§ˆëŠ” SUBJì—ê²Œ ì¢…ì´ë¥¼ ëª¨ë‘ êµ¬ê²¨ì„œ ë²„ë¦¬ë¼ê³  í–ˆìŠµë‹ˆë‹¤.",
            pre_sent_NQ: "ì¢…ì´ê°€ ì—¬ì„¯ ê°œ ìžˆìŠµë‹ˆë‹¤. ì—„ë§ˆëŠ” SUBJì—ê²Œ ì¢…ì´ë¥¼ ë„¤ ê°œ ì´ìƒ êµ¬ê²¨ì„œ ë²„ë¦¬ë¼ê³  í–ˆìŠµë‹ˆë‹¤.",
            sent_context: "images/scope_paper_post.jpg",
            SUBJ: speakers[6][0],
            PART1: speakers[6][1],
            PART2: speakers[6][2],
            SNV: "ì•ˆ êµ¬ê²¼ë‹¤",
            LNV: "êµ¬ê¸°ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "ë„¤ ìž¥ì˜ ",
            QUANT2: "ë„¤ ìž¥ ì´ìƒì˜",
            OBJ: "ì¢…ì´",
            PAR2: "ë¥¼"
        },
        pencil: {
            pre_context: "images/scope_pencil_pre.jpg",
            pre_sent_QN_plus: "SUBJPART2 ì—°í•„ì„ ì—´ ê°œ ê°€ì§€ê³  ìžˆìŠµë‹ˆë‹¤. ë™ìƒê³¼ì˜ ë‚´ê¸°ì—ì„œ ì´ê¸°ë ¤ë©´ ìž¬ë¹¨ë¦¬ ì—°í•„ì„ ëª¨ë‘ ë¶€ëŸ¬ëœ¨ë ¤ì•¼ í•©ë‹ˆë‹¤.", //fixme: neg!
            pre_sent_QN: "SUBJPART2 ì—°í•„ì„ ì—¬ëŸ ê°œ ê°€ì§€ê³  ìžˆìŠµë‹ˆë‹¤. ë™ìƒê³¼ì˜ ë‚´ê¸°ì—ì„œ ì´ê¸°ë ¤ë©´ ìž¬ë¹¨ë¦¬ ì—°í•„ì„ ëª¨ë‘ ë¶€ëŸ¬ëœ¨ë ¤ì•¼ í•©ë‹ˆë‹¤.",
            pre_sent_NQ: "SUBJPART2 ì—°í•„ì„ ì—¬ì„¯ ê°œ ê°€ì§€ê³  ìžˆìŠµë‹ˆë‹¤. ë™ìƒê³¼ì˜ ë‚´ê¸°ì—ì„œ ì´ê¸°ë ¤ë©´ ìž¬ë¹¨ë¦¬ ì—°í•„ì„ ë„¤ ê°œ ì´ìƒ ë¶€ëŸ¬ëœ¨ë ¤ì•¼ í•©ë‹ˆë‹¤.",
            sent_context: "images/scope_pencil_post.jpg",
            SUBJ: speakers[7][0],
            PART1: speakers[7][1],
            PART2: speakers[7][2],
            SNV: "ì•ˆ ë¶€ëŸ¬ëœ¨ë ¸ë‹¤",
            LNV: "ë¶€ëŸ¬ëœ¨ë¦¬ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "ë„¤ ê°œì˜ ",
            QUANT2: "ë„¤ ê°œ ì´ìƒì˜",
            OBJ: "ì—°í•„",
            PAR2: "ì„"
        },
        triangle: {
            pre_context: "images/scope_triangle_pre.jpg",
            pre_sent_QN_plus: "ì„¸ëª¨ê°€ ì—¬ëŸ ê°œ ìžˆìŠµë‹ˆë‹¤. ì•„ë¹ ëŠ” SUBJì—ê²Œ ì„¸ëª¨ë¥¼ ëª¨ë‘ ìƒ‰ì¹ í•˜ë¼ê³  í–ˆìŠµë‹ˆë‹¤.", //fixme: neg!
            pre_sent_QN: "ì„¸ëª¨ê°€ ì—¬ì„¯ ê°œ ìžˆìŠµë‹ˆë‹¤. ì•„ë¹ ëŠ” SUBJì—ê²Œ ì„¸ëª¨ë¥¼ ëª¨ë‘ ìƒ‰ì¹ í•˜ë¼ê³  í–ˆìŠµë‹ˆë‹¤.",
            pre_sent_NQ: "ì„¸ëª¨ê°€ ë„¤ ê°œ ìžˆìŠµë‹ˆë‹¤. ì•„ë¹ ëŠ” SUBJì—ê²Œ ì„¸ëª¨ë¥¼ ì„¸ ê°œ ì´ìƒ ìƒ‰ì¹ í•˜ë¼ê³  í–ˆìŠµë‹ˆë‹¤.",
            sent_context: "images/scope_triangle_post.jpg",
            SUBJ: speakers[8][0],
            PART1: speakers[8][1],
            PART2: speakers[8][2],
            SNV: "ì•ˆ ì¹ í–ˆë‹¤",
            LNV: "ì¹ í•˜ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "ì„¸ ê°œì˜ ",
            QUANT2: "ì„¸ ê°œ ì´ìƒì˜",
            OBJ: "ì„¸ëª¨",
            PAR2: "ë¥¼"
        },
        bowling: {
            pre_context: "images/scope_bowling_pre.jpg",
            pre_sent_QN_plus: "ë³¼ë§í•€ì´ ì—´ ê°œ ì„œìžˆìŠµë‹ˆë‹¤. ì—„ë§ˆëŠ” SUBJPART1 ë³¼ë§í•€ì„ ëª¨ë‘ ë„˜ì–´ëœ¨ë¦¬ë©´ ì•„ì´ìŠ¤í¬ë¦¼ì„ ì‚¬ì£¼ê² ë‹¤ê³  ì•½ì†í–ˆìŠµë‹ˆë‹¤.", //fixme: neg!
            pre_sent_QN: "ë³¼ë§í•€ì´ ì—¬ëŸ ê°œ ì„œìžˆìŠµë‹ˆë‹¤. ì—„ë§ˆëŠ” SUBJPART1 ë³¼ë§í•€ì„ ëª¨ë‘ ë„˜ì–´ëœ¨ë¦¬ë©´ ì•„ì´ìŠ¤í¬ë¦¼ì„ ì‚¬ì£¼ê² ë‹¤ê³  ì•½ì†í–ˆìŠµë‹ˆë‹¤.",
            pre_sent_NQ: "ë³¼ë§í•€ì´ ì—¬ì„¯ ê°œ ì„œìžˆìŠµë‹ˆë‹¤. ì—„ë§ˆëŠ” SUBJPART1 ë³¼ë§í•€ì„ ë„¤ ê°œ ì´ìƒ ë„˜ì–´ëœ¨ë¦¬ë©´ ì•„ì´ìŠ¤í¬ë¦¼ì„ ì‚¬ì£¼ê² ë‹¤ê³  ì•½ì†í–ˆìŠµë‹ˆë‹¤.",
            sent_context: "images/scope_bowling_post.jpg",
            SUBJ: speakers[9][0],
            PART1: speakers[9][1],
            PART2: speakers[9][2],
            SNV: "ì•ˆ ë„˜ì–´ëœ¨ë ¸ë‹¤",
            LNV: "ë„˜ì–´ëœ¨ë¦¬ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "ë„¤ ê°œì˜ ",
            QUANT2: "ë„¤ ê°œ ì´ìƒì˜",
            OBJ: "ë³¼ë§í•€",
            PAR2: "ì„"
        },
        bucket: {
            pre_context: "images/scope_bucket_pre.jpg",
            pre_sent_filler: "í†µì´ ì—¬ëŸ ê°œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 í†µì„ ëª¨ëž˜ë¡œ ì±„ì›Œì•¼í•©ë‹ˆë‹¤.",
            sent_context: "images/scope_bucket_post.jpg",
            SUBJ: speakers[10][0],
            PART1: speakers[10][1],
            PART2: speakers[10][2],
            SNV: "ì•ˆ ì±„ì› ë‹¤",
            LNV: "ì±„ìš°ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "",
            QUANT2: "",
            OBJ: "í†µ",
            PAR2: "ì„"
        },
        lock: {
            pre_context: "images/scope_lock_pre.jpg",
            pre_sent_filler: "ìžë¬¼ì‡ ê°€ ì—¬ì„¯ ê°œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ìžë¬¼ì‡ ë¥¼ ê°€ëŠ¥í•œ ë§Žì´ ì—´ì–´ì•¼í•©ë‹ˆë‹¤.",
            sent_context: "images/scope_lock_post.jpg",
            SUBJ: speakers[11][0],
            PART1: speakers[11][1],
            PART2: speakers[11][2],
            SNV: "ì—´ì—ˆë‹¤",
            LNV: "ì—´ì—ˆë‹¤",
            QUANT1: "ì„¸ ê°œ ì´ìƒì˜",
            QUANT2: "ì„¸ ê°œ ì´ìƒì˜",
            OBJ: "ìžë¬¼ì‡ ",
            PAR2: "ë¥¼"
        },
        apple: {
            pre_context: "images/scope_apple_pre.jpg",
            pre_sent_filler: "ì‚¬ê³¼ê°€ ì—¬ì„¯ ê°œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ì‚¬ê³¼ë¥¼ ê°€ëŠ¥í•œ ë§Žì´ ë¨¹ì–´ì•¼í•©ë‹ˆë‹¤.",
            sent_context: "images/scope_apple_post.jpg",
            SUBJ: speakers[12][0],
            PART1: speakers[12][1],
            PART2: speakers[12][2],
            SNV: "ë¨¹ì—ˆë‹¤",
            LNV: "ë¨¹ì—ˆë‹¤",
            QUANT1: "ë„¤ ê°œ ì´ìƒì˜",
            QUANT2: "ë„¤ ê°œ ì´ìƒì˜",
            OBJ: "ì‚¬ê³¼",
            PAR2: "ë¥¼"
        },
        crane: {
            pre_context: "images/scope_crane_pre.jpg",
            pre_sent_filler: "ì¢…ì´ê°€ ì—¬ì„¯ ìž¥ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ì¢…ì´ë¡œ í•™ì„ ê°€ëŠ¥í•œ ë§Žì´ ì ‘ìœ¼ë ¤ í•©ë‹ˆë‹¤.",
            sent_context: "images/scope_crane_post.jpg",
            SUBJ: speakers[13][0],
            PART1: speakers[13][1],
            PART2: speakers[13][2],
            SNV: "ì ‘ì—ˆë‹¤",
            LNV: "ì ‘ì—ˆë‹¤",
            QUANT1: "ì„¸ ê°œ ì´ìƒì˜",
            QUANT2: "ì„¸ ê°œ ì´ìƒì˜",
            OBJ: "í•™",
            PAR2: "ì„"
        },
        onion: {
            pre_context: "images/scope_onion_pre.jpg",
            pre_sent_filler: "ì–‘íŒŒê°€ ë‘ ê°œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ì–‘íŒŒë¥¼ ìž˜ë¼ì•¼í•©ë‹ˆë‹¤.",
            sent_context: "images/scope_onion_post.jpg",
            SUBJ: speakers[14][0],
            PART1: speakers[14][1],
            PART2: speakers[14][2],
            SNV: "ì•ˆ ìž˜ëžë‹¤",
            LNV: "ìžë¥´ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "",
            QUANT2: "",
            OBJ: "ì–‘íŒŒ",
            PAR2: "ë¥¼"
        },
        egg: {
            pre_context: "images/scope_egg_pre.jpg",
            pre_sent_filler: "ë‹¬ê±€ì´ ë„¤ ê°œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ë‹¬ê±€ì„ ê¹¨ëœ¨ë¦¬ì§€ ì•Šê³  ê·¸ëŒ€ë¡œ ë‘ë ¤ í•©ë‹ˆë‹¤.",
            sent_context: "images/scope_egg_post.jpg",
            SUBJ: speakers[15][0],
            PART1: speakers[15][1],
            PART2: speakers[15][2],
            SNV: "ì•ˆ ê¹¨ëœ¨ë ¸ë‹¤",
            LNV: "ê¹¨ëœ¨ë¦¬ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "",
            QUANT2: "",
            OBJ: "ë‹¬ê±€",
            PAR2: "ì„"
        },
        umbrella: {
            pre_context: "images/scope_umbrella_pre.jpg",
            pre_sent_filler: "ìš°ì‚°ì´ ì—¬ì„¯ ê°œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ìš°ì‚°ì„ ê°€ëŠ¥í•œ ë§Žì´ íŽ¼ì³ì•¼í•©ë‹ˆë‹¤.",
            sent_context: "images/scope_umbrella_post.jpg",
            SUBJ: speakers[16][0],
            PART1: speakers[16][1],
            PART2: speakers[16][2],
            SNV: "íŽ¼ì³¤ë‹¤",
            LNV: "íŽ¼ì³¤ë‹¤",
            QUANT1: "ë„¤ ê°œ ì´ìƒì˜",
            QUANT2: "ë„¤ ê°œ ì´ìƒì˜",
            OBJ: "ìš°ì‚°",
            PAR2: "ì„"
        },
        door: {
            pre_context: "images/scope_door_pre.jpg",
            pre_sent_filler: "ë¬¸ì´ ì„¸ ê°œ ìžˆìŠµë‹ˆë‹¤. SUBJPART2 ë¬¸ì„ ë‹«ì•„ì•¼í•©ë‹ˆë‹¤.",
            sent_context: "images/scope_door_post.jpg",
            SUBJ: speakers[17][0],
            PART1: speakers[17][1],
            PART2: speakers[17][2],
            SNV: "ì•ˆ ë‹«ì•˜ë‹¤",
            LNV: "ë‹«ì§€ ì•Šì•˜ë‹¤",
            QUANT1: "",
            QUANT2: "",
            OBJ: "ë¬¸",
            PAR2: "ì„"
        }

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
scales = ["training1", "training2"].concat(shuffle([scales[8], scales[9], scales[10], scales[11], scales[12], scales[13], scales[14], scales[15]])).concat(shuffle([scales[0], scales[1], scales[2], scales[3], scales[4], scales[5], scales[6], scales[7]]));
scales = [scales[0], scales[1],
          scales[2], scales[10],
          scales[3], scales[11],
          scales[4], scales[12],
          scales[5], scales[13],
          scales[6], scales[14],
          scales[7], scales[15],
          scales[8], scales[16],
          scales[9], scales[17]]
domains = ["training1", "training2"].concat(shuffle([domains[8], domains[9], domains[10], domains[11], domains[12], domains[13], domains[14], domains[15]])).concat(shuffle([domains[0], domains[1], domains[2], domains[3], domains[4], domains[5], domains[6], domains[7]]));
domains = [domains[0], domains[1],
          domains[2], domains[10],
          domains[3], domains[11],
          domains[4], domains[12],
          domains[5], domains[13],
          domains[6], domains[14],
          domains[7], domains[15],
          domains[8], domains[16],
          domains[9], domains[17]]

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
            $("#emailfield").html('<font color="red">ì§ˆë¬¸ì— ë‹µí•´ì£¼ì‹­ì‹œì˜¤. </font>');
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
            $("#namefield").html('<font color="red">ì„±ëª…ê³¼ ë‚ ì§œë¥¼ ì ì–´ì£¼ì‹­ì‹œì˜¤. </font>');
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
        //        $("#picture_pre").html("<center> ê³¼ì—° ì–´ë–»ê²Œ ë˜ì—ˆì„ê¹Œìš”? <center><br>");
        $("#sent_context_pre").html("<center>" + sent_materials[2] + " <center><br>");
        $("#picture_pre").html("<center><img src = " + sent_materials[4] + " height=275px><center><br>");
        $("#pre_sent").html("<center>" + sent_materials[5] + "<center><br>");

        // Display the sentence stimuli
        $("#sent_context").html("<center>" + sent_materials[3] + " <center><br>");
        $("#picture").html("<center><img src = " + sent_materials[0] + " height=275px><center><br>");
        $("#sent_question").html("<center>ìœ„ ê·¸ë¦¼ì— ë”°ë¥´ë©´ ë‹¤ìŒ ë¬¸ìž¥ì˜ ë‚´ìš©ì´ ì‚¬ì‹¤ì¸ê°€ìš”?</b></center>");
        $("#sent").html("<center>\"<b>" + sent_materials[1] + "</b>\"<center><br>");

        experiment.scale = scale;
        experiment.domain = domain;
        experiment.scope = scope;
        experiment.neg = neg;
        experiment.quant = quant;

        //        if (response_logged) {
        //	    nextButton1.blur();
        //        // save data
        //        var dataforTrial = experiment.email  + "," + experiment.subid + "," + experiment.time
        //        dataforTrial += "," + scale + "," + domain + "," + sent_materials[2] + "," + sent_materials[0] + "," + sent_materials[1] + "," + document.getElementsByName("judgment") + "\n";
        //		$.post("http://langcog.stanford.edu/cgi-bin/EJY/KAG/KAGstudysave.php", {postresult_string : dataforTrial});	
        //
        //	    
        //	    // uncheck radio buttons
        //	    for (i = 0; i < radio.length; i++) {
        //		radio[i].checked = false
        //	    }
        //	    experiment.next();
        //	} else {
        //	    $("#testMessage").html('<font color="red">' + 
        //				   'Please make a response!' + 
        //				   '</font>');
        //	}

    },

    //	go to debriefing slide
    debriefing: function () {
        showSlide("debriefing");
    },

    // submitcomments function
//    submit_comments: function () {
//        if ($('input[name="korean_age"]:checked').val() &&
//            $('input[name="english_age"]:checked').val() && $('input[name="korean_speech"]:checked').val()) {
//            // save responses
//            var dataforTrial = experiment.email + "," + experiment.subid + "," + experiment.time
//            dataforTrial += "," + "DEMOGRAPHICS" + "," + " " + "," + " "
//            dataforTrial += "," + $('input[name="korean_age"]:checked').val() + "," +
//                $('input[name="english_age"]:checked').val()
//            dataforTrial += "," + $('input[name="korean_speech"]:checked').val() + "," +
//                document.getElementById("other_langs").value + "\n";
//
//            $.post("http://stanford.edu/group/langcog/cgi-bin/EJY/KAG/KAGstudysave.php", {
//                postresult_string: dataforTrial
//            });
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
            $("#messagedemo").html('<font color="red">ì§ˆë¬¸ì— ë‹µí•´ì£¼ì‹­ì‹œì˜¤. </font>');
        }
    }
}