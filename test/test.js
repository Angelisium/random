var alea_test_vid = alea(),
    alea_test_str = alea("seed_test"),
    alea_test_int = alea(215),
    alea_test_bint = alea(42n);

var rand_test_vid = new Random("undefined"), // for work like alea()
    rand_test_str = new Random("seed_test"),
    rand_test_int = new Random(215),
    rand_test_bint = new Random(42n);

const pre = document.querySelector('pre');
addTextNode = function(str) {
    let z = document.createTextNode(str);
    pre.appendChild(z);
}

for(let i=0; i<10; i++) {
    addTextNode(`Alea {}: ${alea_test_vid()} \t\t\t random {}: ${rand_test_vid.next()}\n`);
    addTextNode(`Alea {seed_test}: ${alea_test_str()} \t\t random {seed_test}: ${rand_test_str.next()}\n`);
    addTextNode(`Alea {215}: ${alea_test_int()} \t\t random {215}: ${rand_test_int.next()}\n`);
    addTextNode(`Alea {42n}: ${alea_test_bint()} \t\t\t random {42n}: ${rand_test_bint.next()}\n`);
    addTextNode(`\n`);
}

var randrange = new Random("ca8+94dx1zad8xa4z6"),
    tab = [];

for(let i=0; i<10000; i++) {
    let z = randrange.toRange(0,5);
    if(!tab[z]) tab[z] = 0;
    tab[z]++;
}
addTextNode(`${tab.toString()} \t`);

var randTab = [];
for(let i=0; i<10000; i++) {
    let z = Math.random();
    z = (z * 5) | 0;
    if(!randTab[z]) randTab[z] = 0;
    randTab[z]++;
    //addTextNode(`${randrange.toFloatRange(0.5,5.5)} \t`);
}
addTextNode(`${randTab.toString()} \n`);

var randrange = new Random("ca8+94dx1zad8xa4z6");
for(let i=0; i<20; i++) {
    addTextNode(`${randrange.toFloatRange(0.5,5.5)} \t`);
}