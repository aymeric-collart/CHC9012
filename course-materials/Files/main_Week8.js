PennController.ResetPrefix(null)

Sequence("Welcome page", "Background information", "Instructions", "AnnouncementPractice", "Practice", "AnnouncementEndPractice", randomize("Experiment"), "Send", "Goodbye")

/// 1. Welcome page
// 1.1 Hello page, ICF

newTrial("Welcome page",
    newText("This is the welcome page.")
        .print()
        .center()
    ,
    newText("You can type the Informed Consent Form here.")
        .print()
        .center()
,
    newButton("Continue")
        .center()
        .print()
        .wait()
)

// 1.2 Background questionnaire

newTrial("Background information",
    newText("We will ask you some questions about your background. Please feel free to skip some questions if you do not wish to answer.")
        .print()
        .center()
    ,
    newText("Your age:")
        .print()
        .center()
    ,
    newTextInput("Age")
        .print()
        .center()
        .log("final")
    ,
    newText("Your highest degree:")
        .print()
        .center()
    ,
    newDropDown("Degree", "Please select one option")
        .add("Elementary school", "Junior high school", "Senior high school", "BA", "MA", "Ph.D.")
        .print()
        .center()
        .log()
    ,
    newButton("Continue")
        .center()
        .print()
        .wait()
    ,
    newVar("Age")
        .global()
        .set(getTextInput("Age"))
    ,
    newVar("Degree")
        .global()
        .set(getDropDown("Degree"))
    )

// 1.3 Instructions

newTrial("Instructions",
    newText("This is the instruction page.")
        .print()
        .center()
    ,
    newText("In this experiment, you will ... [Please enter the instructions depending on your experiment].")
        .print()
        .center()
    ,
    newText("Example: In this experiment, you will read sentences on the screen. These sentences will appear one at a time. Your task is to judge these sentences [add a word about how to judge the sentences].")
        .print()
        .center()
    ,
    newText("Here is an example: 'I will must do it.' This sentence is not acceptable, please click on 'not acceptable'.")
        .print()
        .center()
    ,
    newText("Please click on 'I understood' if you read and understood the instructions.")
        .print()
        .center()
    ,
    newDropDown("InstructionsCheck", "Please select one option")
        .add("I read and understood the instructions.", "I did not read the instructions.")
        .print()
        .center()
        .log()
    ,
    newButton("Continue")
        .center()
        .print()
        .wait()
    )

/// 2. Practice trials

newTrial("AnnouncementPractice",
    newText("The practice trials are about to begin.")
        .print()
        .center()
    ,
    newButton("Continue")
        .center()
        .print()
        .wait()
)

newTrial("Practice",
    newText("FirstPractice", "This is a grammatical sentence")
        .print()
        .center()
        .log()
    ,
    newScale("Scale", "1", "2", "3", "4", "5", "6", "7")
        .labelsPosition("bottom")
        .before(newText("Not acceptable"))
        .after(newText("Acceptable"))
        .print()
        .center()
        .wait()
        .log()
    )
    
newTrial("AnnouncementEndPractice",
    newText("The practice is over. Please click on 'Continue' to start the experiment.")
        .print()
        .center()
    ,
    newButton("Continue")
        .center()
        .print()
        .wait()
)

/// 3. Experimental trials

Template("material.csv", row => 
newTrial("Experiment",
    newText("Sentence", row.Sentence)
        .print()
        .center()
    ,
    newScale("Scale", "1", "2", "3", "4", "5", "6", "7")
        .labelsPosition("bottom")
        .before(newText("Not acceptable"))
        .after(newText("Acceptable"))
        .print()
        .center()
        .wait()
        .log()
    )
    .log("ItemNo", row.ItemNo)
    .log("Condition", row.Condition)
    .log("Sentence", row.Sentence)
    .log("List", row.group)
    .log("Age", getVar("Age"))
    .log("Degree", getVar("Degree"))
)

/// 4. Goodbye page
SendResults("Send")
newTrial("Goodbye",
    newText("GoodbyeMessage", "Thank you very much for your participation!")
        .print()
        .center()
        .wait()
        )