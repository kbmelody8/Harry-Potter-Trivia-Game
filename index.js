// Initial time for the timer in ms
let timer = 30000;
// Var to track remaining time for each question
let timeToNext = timer;
// Counter for correct answers
let pointCounter = 0;
// Counter for wrong answers
let wrongAnswersCount = 0;
// Counter for late answers
let lateAnswers = 0;
// Extracting the current page's URL
const url = window.location.href.split("/").slice(-1);
// Extracting the category from the URL
const category = url[0].split(".")[0];
// Array to store past questions to avoid repetition
const pastQuestions = [];
// Display element for the timer
const timerDisplay = document.getElementById("timer-display");
// Array to store wrong answers for review or tracking
const wrongAnswers = [];
// Var to store the interval reference for the timer
let interval = null;

// Define questions for different categories
const questions = {
    "houses": [
        {
            question: "Which house values bravery and courage?",
            options: ["a) Hufflepuff", "b) Ravenclaw", "c) Slytherin", "d) Gryffindor"],
            answer: "d) Gryffindor",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The house known for its loyalty and dedication is:",
            options: ["a) Gryffindor", "b) Ravenclaw", "c) Hufflepuff", "d) Slytherin"],
            answer: "c) Hufflepuff",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Who is the head of Ravenclaw house?",
            options: ["a) Professor Flitwick", "b) Professor Snape", "c) Professor McGonagall", "d) Professor Sprout"],
            answer: "a) Professor Flitwick",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "In which house did Cedric Diggory belong?",
            options: ["a) Gryffindor", "b) Hufflepuff", "c) Ravenclaw", "d) Slytherin"],
            answer: "b) Hufflepuff",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The house associated with ambition and cunning is:",
            options: ["a) Gryffindor", "b) Hufflepuff", "c) Ravenclaw", "d) Slytherin"],
            answer: "d) Slytherin",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which house ghost is known for his bloody past?",
            options: ["a) Nearly Headless Nick", "b) The Fat Friar", "c) The Bloody Baron", "d) The Grey Lady"],
            answer: "c) The Bloody Baron",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The common room entrance for Gryffindor is behind a portrait of:",
            options: ["a) The Fat Lady", "b) The Grey Lady", "c) Nearly Headless Nick", "d) The Bloody Baron"],
            answer: "a) The Fat Lady",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which house values intelligence and creativity?",
            options: ["a) Gryffindor", "b) Hufflepuff", "c) Ravenclaw", "d) Slytherin"],
            answer: "c) Ravenclaw",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The founder of Hufflepuff house is:",
            options: ["a) Godric Gryffindor", "b) Helga Hufflepuff", "c) Rowena Ravenclaw", "d) Salazar Slytherin"],
            answer: "b) Helga Hufflepuff",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The house with a badger as its emblem is:",
            options: ["a) Gryffindor", "b) Hufflepuff", "c) Ravenclaw", "d) Slytherin"],
            answer: "b) Hufflepuff",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "In the Triwizard Tournament, which house is represented by Viktor Krum?",
            options: ["a) Gryffindor", "b) Hufflepuff", "c) Ravenclaw", "d) Slytherin"],
            answer: "d) Durmstrang",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which house is associated with the element of water?",
            options: ["a) Gryffindor", "b) Hufflepuff", "c) Ravenclaw", "d) Slytherin"],
            answer: "c) Ravenclaw",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The house ghost of Hufflepuff is:",
            options: ["a) Nearly Headless Nick", "b) The Fat Friar", "c) The Bloody Baron", "d) The Grey Lady"],
            answer: "b) The Fat Friar",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The entrance to the Slytherin common room is hidden behind:",
            options: ["a) A tapestry of dancing trolls", "b) A suit of armor", "c) A bookshelf", "d) A stone wall"],
            answer: "a) A tapestry of dancing trolls",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The house with a snake as its emblem is:",
            options: ["a) Gryffindor", "b) Hufflepuff", "c) Ravenclaw", "d) Slytherin"],
            answer: "d) Slytherin",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The house known for its focus on intelligence and wisdom is:",
            options: ["a) Gryffindor", "b) Hufflepuff", "c) Ravenclaw", "d) Slytherin"],
            answer: "c) Ravenclaw",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The Hufflepuff common room is located near:",
            options: ["a) The Great Hall", "b) The Black Lake", "c) The Owlery", "d) The Forbidden Forest"],
            answer: "b) The Black Lake",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The house founded by Helga Hufflepuff values:",
            options: ["a) Ambition and cunning", "b) Loyalty and dedication", "c) Bravery and courage", "d) Intelligence and creativity"],
            answer: "b) Loyalty and dedication",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The sorting hat once belonged to:",
            options: ["a) Godric Gryffindor", "b) Helga Hufflepuff", "c) Rowena Ravenclaw", "d) Salazar Slytherin"],
            answer: "a) Godric Gryffindor",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The house associated with the animal symbol of a lion is:",
            options: ["a) Gryffindor", "b) Hufflepuff", "c) Ravenclaw", "d) Slytherin"],
            answer: "a) Gryffindor",
            id: "houses",
            points: 1,
            bonusPoints: 2,
        },
    ],

    "characters": [
        {
            question: "Who is the headmaster of Hogwarts in the first book?",
            options: ["a) Albus Dumbledore", "b) Severus Snape", "c) Minerva McGonagall", "d) Remus Lupin"],
            answer: "a) Albus Dumbledore",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of Harry Potter's best friend?",
            options: ["a) Hermione Granger", "b) Ron Weasley", "c) Draco Malfoy", "d) Neville Longbottom"],
            answer: "b) Ron Weasley",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The nickname 'Moony' refers to which character?",
            options: ["a) Sirius Black", "b) Remus Lupin", "c) James Potter", "d) Peter Pettigrew"],
            answer: "b) Remus Lupin",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Who is known as the Half-Blood Prince?",
            options: ["a) Draco Malfoy", "b) Severus Snape", "c) Tom Riddle", "d) Sirius Black"],
            answer: "b) Severus Snape",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The caretaker of Hogwarts with a strong dislike for students is:",
            options: ["a) Argus Filch", "b) Rubeus Hagrid", "c) Pomona Sprout", "d) Filius Flitwick"],
            answer: "a) Argus Filch",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The Defense Against the Dark Arts teacher in the first book is:",
            options: ["a) Gilderoy Lockhart", "b) Remus Lupin", "c) Alastor Moody", "d) Quirinus Quirrell"],
            answer: "d) Quirinus Quirrell",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which character is an animagus that can transform into a rat?",
            options: ["a) Sirius Black", "b) James Potter", "c) Remus Lupin", "d) Peter Pettigrew"],
            answer: "d) Peter Pettigrew",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of the house-elf who serves the Malfoy family?",
            options: ["a) Winky", "b) Dobby", "c) Kreacher", "d) Hokey"],
            answer: "a) Winky",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The head of the Department of Magical Law Enforcement is:",
            options: ["a) Kingsley Shacklebolt", "b) Mad-Eye Moody", "c) Nymphadora Tonks", "d) Dolores Umbridge"],
            answer: "a) Kingsley Shacklebolt",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which character is an expert in magical creatures and teaches Care of Magical Creatures?",
            options: ["a) Sybill Trelawney", "b) Rubeus Hagrid", "c) Filius Flitwick", "d) Pomona Sprout"],
            answer: "b) Rubeus Hagrid",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The founder of the Order of the Phoenix is:",
            options: ["a) Albus Dumbledore", "b) Sirius Black", "c) James Potter", "d) Remus Lupin"],
            answer: "a) Albus Dumbledore",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Who is the head of Gryffindor house during Harry's time at Hogwarts?",
            options: ["a) Professor Snape", "b) Professor McGonagall", "c) Professor Flitwick", "d) Professor Sprout"],
            answer: "b) Professor McGonagall",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of the caretaker at Hogwarts with a love for Mrs. Norris, his cat?",
            options: ["a) Argus Filch", "b) Horace Slughorn", "c) Gilderoy Lockhart", "d) Dolores Umbridge"],
            answer: "a) Argus Filch",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "In the Room of Requirement, what did Dumbledore find that helped him defeat Grindelwald?",
            options: ["a) The Elder Wand", "b) The Resurrection Stone", "c) The Invisibility Cloak", "d) The Mirror of Erised"],
            answer: "a) The Elder Wand",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of Harry's father?",
            options: ["a) Sirius Black", "b) Remus Lupin", "c) James Potter", "d) Albus Dumbledore"],
            answer: "c) James Potter",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Who is the ghost of Ravenclaw house?",
            options: ["a) Nearly Headless Nick", "b) The Fat Friar", "c) The Bloody Baron", "d) The Grey Lady"],
            answer: "d) The Grey Lady",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What magical creature serves as the steed for the Beauxbatons Academy of Magic?",
            options: ["a) Thestral", "b) Hippogriff", "c) Abraxan", "d) Blast-Ended Skrewt"],
            answer: "c) Abraxan",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which wizarding newspaper covers magical news and events?",
            options: ["a) The Daily Prophet", "b) The Quibbler", "c) The Wizarding World Times", "d) The Daily Bugle"],
            answer: "a) The Daily Prophet",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of the vault in Gringotts where the Sorcerer's Stone was kept?",
            options: ["a) Vault 713", "b) Vault 777", "c) Vault 312", "d) Vault 999"],
            answer: "a) Vault 713",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of the magical creature that guards the entrance to the Gryffindor common room?",
            options: ["a) The Fat Friar", "b) The Grey Lady", "c) The Bloody Baron", "d) The Fat Lady"],
            answer: "d) The Fat Lady",
            id: "characters",
            points: 1,
            bonusPoints: 2,
        },
    ],

    "spells": [
        {
            question: "What spell is used to illuminate the tip of a wand?",
            options: ["a) Lumos", "b) Nox", "c) Expelliarmus", "d) Alohomora"],
            answer: "a) Lumos",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which spell is used to conjure a flock of birds?",
            options: ["a) Accio", "b) Expecto Patronum", "c) Avis", "d) Incendio"],
            answer: "c) Avis",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the incantation for the spell that unlocks doors and windows?",
            options: ["a) Alohomora", "b) Expelliarmus", "c) Protego", "d) Wingardium Leviosa"],
            answer: "a) Alohomora",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The charm used to clear the target's airways is:",
            options: ["a) Episkey", "b) Ferula", "c) Stupefy", "d) Incarcerous"],
            answer: "a) Episkey",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which spell is used to disarm an opponent?",
            options: ["a) Expelliarmus", "b) Protego", "c) Sectumsempra", "d) Obliviate"],
            answer: "a) Expelliarmus",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the incantation for the spell that creates a temporary barrier to repel physical entities?",
            options: ["a) Expulso", "b) Repello Muggletum", "c) Protego Totalum", "d) Levicorpus"],
            answer: "c) Protego Totalum",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The charm to make objects levitate is:",
            options: ["a) Expelliarmus", "b) Wingardium Leviosa", "c) Accio", "d) Lumos"],
            answer: "b) Wingardium Leviosa",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which spell is used to produce a jet of water from the caster's wand?",
            options: ["a) Aguamenti", "b) Incendio", "c) Protego", "d) Stupefy"],
            answer: "a) Aguamenti",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What spell is known for its ability to erase memories?",
            options: ["a) Obliviate", "b) Crucio", "c) Imperio", "d) Sectumsempra"],
            answer: "a) Obliviate",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which spell is used to mend broken objects?",
            options: ["a) Reparo", "b) Expulso", "c) Diffindo", "d) Episkey"],
            answer: "a) Reparo",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The spell to make objects disappear is:",
            options: ["a) Evanesco", "b) Engorgio", "c) Reducto", "d) Expelliarmus"],
            answer: "a) Evanesco",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the incantation for the spell that causes the victim's legs to bind together?",
            options: ["a) Petrificus Totalus", "b) Impedimenta", "c) Incarcerous",
                "d) Levicorpus"],
            answer: "d) Levicorpus",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The charm used to produce a swarm of flying keys is:",
            options: ["a) Wingardium Leviosa", "b) Alohomora", "c) Avis", "d) Colloportus"],
            answer: "c) Avis",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which spell is used to transform one object into another?",
            options: ["a) Transfiguro", "b) Engorgio", "c) Stupefy", "d) Levicorpus"],
            answer: "a) Transfiguro",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The incantation for the spell that causes a target to swell is:",
            options: ["a) Engorgio", "b) Reducto", "c) Protego", "d) Expelliarmus"],
            answer: "a) Engorgio",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which spell is used to summon objects towards the caster?",
            options: ["a) Accio", "b) Expelliarmus", "c) Protego", "d) Lumos"],
            answer: "a) Accio",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the incantation for the stunning spell?",
            options: ["a) Stupefy", "b) Expelliarmus", "c) Expecto Patronum", "d) Protego"],
            answer: "a) Stupefy",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The charm to vanish small objects is:",
            options: ["a) Evanesco", "b) Reducto", "c) Wingardium Leviosa", "d) Accio"],
            answer: "a) Evanesco",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What spell is used to create a magical barrier around an area?",
            options: ["a) Protego", "b) Expelliarmus", "c) Stupefy", "d) Incendio"],
            answer: "a) Protego",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The incantation for the spell that produces a magical light at the caster's wand tip is:",
            options: ["a) Lumos Maxima", "b) Nox", "c) Lumos Solem", "d) Lumos"],
            answer: "d) Lumos",
            id: "spells",
            points: 1,
            bonusPoints: 2,
        },
    ],

    "random": [
        {
            question: "What magical creature is known for its ability to change its appearance to match its surroundings?",
            options: ["a) Niffler", "b) Thestral", "c) Chameleon Ghoul", "d) Demiguise"],
            answer: "d) Demiguise",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The Yule Ball is a magical event that takes place during which wizarding tournament?",
            options: ["a) Triwizard Tournament", "b) Quidditch World Cup", "c) Gobstones Championship", "d) Wizard Chess Tournament"],
            answer: "a) Triwizard Tournament",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which magical object allows the user to become invisible?",
            options: ["a) Invisibility Cloak", "b) Sneakoscope", "c) Time-Turner", "d) Deluminator"],
            answer: "a) Invisibility Cloak",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of the wizarding prison guarded by Dementors?",
            options: ["a) Azkaban", "b) Nurmengard", "c) Durmstrang", "d) Gringotts"],
            answer: "a) Azkaban",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which plant is known for its ability to scream when touched?",
            options: ["a) Mandrake", "b) Venomous Tentacula", "c) Devil's Snare", "d) Whomping Willow"],
            answer: "b) Venomous Tentacula",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The magical creatures that pull the carriages from the Hogwarts Express are:",
            options: ["a) Hippogriffs", "b) Thestrals", "c) Blast-Ended Skrewts", "d) Abraxans"],
            answer: "b) Thestrals",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The Triwizard Tournament consists of how many tasks?",
            options: ["a) Three", "b) Four", "c) Five", "d) Six"],
            answer: "a) Three",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the primary ingredient in the Polyjuice Potion?",
            options: ["a) Mandrake Root", "b) Boomslang Skin", "c) Fluxweed", "d) Bezoar"],
            answer: "c) Fluxweed",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which magical object reveals the deepest desires of the heart?",
            options: ["a) Pensieve", "b) Mirror of Erised", "c) Time-Turner", "d) Sneakoscope"],
            answer: "b) Mirror of Erised",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The Room of Requirement appears when a person is in need. What is its nature?",
            options: ["a) Bathroom", "b) Classroom", "c) Storage Room", "d) Anything the seeker requires"],
            answer: "d) Anything the seeker requires",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which magical creature is known for its ability to transform into different objects?",
            options: ["a) Niffler", "b) Kneazle", "c) Boggart", "d) Animagus"],
            answer: "d) Animagus",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The magical plant that is deadly upon touch and is used in the Triwizard Tournament is:",
            options: ["a) Devil's Snare", "b) Whomping Willow", "c) Mimbulus Mimbletonia", "d) Venemous Tentacula"],
            answer: "a) Devil's Snare",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of the magical creature that serves as the messenger for witches and wizards?",
            options: ["a) Thestral", "b) Hippogriff", "c) Owl", "d) House-elf"],
            answer: "c) Owl",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The Unforgivable Curses include all of the following except:",
            options: ["a) Imperius Curse", "b) Cruciatus Curse", "c) Sectumsempra Curse", "d) Avada Kedavra Curse"],
            answer: "c) Sectumsempra Curse",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of the giant spider in the Forbidden Forest?",
            options: ["a) Aragog", "b) Fluffy", "c) Norbert", "d) Buckbeak"],
            answer: "a) Aragog",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The magical creature that can only be seen by those who have witnessed death is:",
            options: ["a) Thestral", "b) Hippogriff", "c) Fawkes", "d) Blast-Ended Skrewt"],
            answer: "a) Thestral",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of the Quidditch team from Bulgaria?",
            options: ["a) Tutshill Tornadoes", "b) Ballycastle Bats", "c) Puddlemere United", "d) Vratsa Vultures"],
            answer: "d) Vratsa Vultures",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "Which magical object allows the user to go back in time?",
            options: ["a) Time-Turner", "b) Pensieve", "c) Deluminator", "d) Invisibility Cloak"],
            answer: "a) Time-Turner",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "The magical contract created by Goblet of Fire is known as:",
            options: ["a) Unbreakable Vow", "b) Fidelius Charm", "c) Triwizard Oath", "d) Binding Magical Contract"],
            answer: "c) Triwizard Oath",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
        {
            question: "What is the name of the Quibbler's eccentric editor?",
            options: ["a) Rita Skeeter", "b) Xenophilius Lovegood", "c) Luna Lovegood", "d) Gilderoy Lockhart"],
            answer: "b) Xenophilius Lovegood",
            id: "random",
            points: 1,
            bonusPoints: 2,
        },
    ]
};


// Function to randomize questions for a given category
function randomizeQuestions(category, question) {
    // Extract questions for the specified category
    const questionCategory = question[category];
    // Check if there are no more questions left for the category
    if (!questionCategory.length) {
        return "There are no more questions left";
    }
    // Generate a random index to select a question
    let randomIndex = Math.floor(Math.random() * questionCategory.length);
    // Retrieve the random question
    let randomElement = questionCategory[randomIndex];
    // Add the selected question to the list of past questions
    pastQuestions.push(randomElement);
    // Remove the selected question from the available questions
    questionCategory.splice(randomIndex, 1);
    // Update the questions object with the modified question list
    questions[category] = questionCategory;
    // Return the randomly selected question
    return randomElement;
}

// Function to render a question in the specified category
function renderQuestion(category, questions) {
    // Get a random question for the specified category
    const question = randomizeQuestions(category, questions);
    // Get the parent element to render the question
    const questionParent = document.getElementById("question");
    questionParent.innerText = "";
    // Render the question and options
    //The insertAdjacentHTML() method inserts HTML code into a specified position.
    //beforeend: Before the end of the element (last child)
    //Reference: https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp
    questionParent.insertAdjacentHTML("beforeend", `<div id=${question.id}>
            <h2>${question.question}</h2>
            <ul class="question">${question.options.map(item => (`<li class="question-item" id=${item.split(" ")[0]}>${item}</li>`)).join("")}</ul>
        </div>`);
    // Add an event listener to handle user's answer
    const answer = document.getElementById(question.id);
    answer.addEventListener("click", handleAnswer);
    // Reset the timer for the next question
    timeToNext = timer;
    // // Create a new interval for the timer
    interval = createInterval();
}
renderQuestion(category, questions);

// Function to handle the selected answer
function handleAnswer(e) {
    // Get the clicked element
    const eTarget = e.target;
    if (!eTarget.classList.contains("question-item")) {
        return;
    }
    //Clear the timer interval 
    clearInterval(interval);
    // Extract the text content of the clicked element (the chosen answer)
    const answer = eTarget.textContent;
    // Find the corresponding question in the pastQuestions array based on the id
    const findAnswer = pastQuestions[pastQuestions.length - 1]
    // Check if the chosen answer is correct
    if (findAnswer.answer === answer) {
        // Add the 'answer-active' class for styling
        eTarget.classList.add("answer-active");
        // Check the timer value and update the pointCounter accordingly
        if (timeToNext < 15000) {
            pointCounter += findAnswer.points;
        }
        if (timeToNext > 15000) {
            pointCounter += findAnswer.bonusPoints;
        }

        // Check if there are no more questions in the category, redirect to score.html
        if (!questions[category].length) {
            localStorage.setItem("score", pointCounter)
            window.location.assign(`score.html`);
        }

        // If there are more questions, render the next question after a delay
        if (questions[category]) {
            setTimeout(() => {
                renderQuestion(category, questions);
            }, 3000);
        }
    }
    // If the chosen answer is incorrect
    if (findAnswer.answer !== answer) {
        // Increment the count of incorrect answers
        wrongAnswersCount += 1;

        // Add the 'wrong-active' class for styling
        eTarget.classList.add("wrong-active");

        // Display the correct answer after a delay
        setTimeout(() => {
            const correctAnswer = document.getElementById(findAnswer.answer.split(" ")[0]);
            correctAnswer.classList.add("answer-active");
        }, 2000);

        // Check if it's game over after 5 incorrect answers
        if (wrongAnswersCount >= 5) {
            setTimeout(() => {
                window.location.assign(`game-over.html`);
            }, 5000);
            return;
        }

        // Continue the game by rendering the next question after a delay
        setTimeout(() => {
            renderQuestion(category, questions);
        }, 3000);
    }
}

//Function that manages a countdown timer, updates the display, and triggers actions when the timer 
//reaches zero (rendering next question, ending game if player answered late more than 3 times)
function createInterval() {
    // Set up a recurring timer using setInterval
    return setInterval(() => {
        // Decrease the remaining time by 10 milliseconds
        timeToNext -= 10;
        // Check if the remaining time has reached or gone below zero
        if (timeToNext <= 0) {
            // Reset the timer to its initial value
            timeToNext = timer;
            // Render the next question, indicating a late answer
            renderQuestion(category, questions);
            // Increment the count of late answers
            lateAnswers += 1;
            // Check if the user has given late answers three times, redirect to game-over.html
            if (lateAnswers >= 3) {
                setTimeout(() => {
                    window.location.assign(`game-over.html`);
                }, 1000);
                return;
            }
        }
        // Update the timer display with the remaining time in seconds 
        // The toFixed() method rounds the number to a specified number of decimals
        // Reference: https://www.w3schools.com/jsref/jsref_tofixed.asp
        timerDisplay.textContent = (timeToNext / 1000).toFixed(3);
    }, 10);
}
