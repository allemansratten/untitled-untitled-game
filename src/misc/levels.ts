import { Level } from "../rules/level"
import { RegExpEvent } from "../rules/regExpEvent"
import { OccurrenceRule } from "../rules/occurrenceRule"
import { CompositeRule } from "../rules/compositeRule"
import { CompareOccurencesRule } from "../rules/compareOccurencesRule"
import { PalindromeEvent } from "../rules/palindromeEvent"
import { UniqueIngredientsEvent } from "../rules/uniqueIngredientsEvent"

export let levels: Level[] = [
    // Vilda 1: Uvodni, seznami hrace s prvky na obrazovce [ot]
    new Level([
        new OccurrenceRule(new RegExpEvent("t"), 1, undefined,
            "must have at least one tomato"),
        new OccurrenceRule(new RegExpEvent("o"), 1, undefined,
            "must have at least one onion"),
    ], 1),
    // Vilda 2: Uvodni, rekne hracovi, ze toto bude puzzle hra o špízu [tpt]
    new Level([
        new OccurrenceRule(new RegExpEvent("t"), 2, undefined,
            "must have at least two tomatoes"),
        new OccurrenceRule(new RegExpEvent("tt"), undefined, 0,
            "must not have two consecutive tomatoes"),
    ], 1, 6),
    // Sach 4 [pep]
    new Level([
        new OccurrenceRule(new RegExpEvent('^p$|^p[otp]|[otp]p$|[otp]p[otp]'), undefined, 0,
            "all peppers must be adjacent to an eggplant"),
        new OccurrenceRule(new RegExpEvent('^e|e$'), undefined, 0,
            "eggplants must not be on the edge"),
        new CompareOccurencesRule(
            new RegExpEvent('p'), new RegExpEvent('o'), (x, y) => { return x > y },
            "there are more peppers than onions"),
        new OccurrenceRule(new RegExpEvent('t'), undefined, 0,
            "tomatoes are not allowed"),
    ], 1, 4),
    // Vilda 3: Lehka uloha [petp]
    new Level([
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent("^e$|[poe]e$|^e[epo]"), undefined, 0),
        ], "all eggplants must be adjacent to a tomato"),
        new OccurrenceRule(new RegExpEvent("etp|pte"), 1, undefined,
            "must contain a tomato next to a pepper and eggplant"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent("^t|t$"), undefined, 0),
            new OccurrenceRule(new RegExpEvent("^e|e$"), undefined, 0),
        ], "tomatoes and eggplants must not be placed on the edge"),
        new OccurrenceRule(new RegExpEvent("o"), undefined, 0,
            "onions are forbidden"),
    ], 1, 5),
    // Jirka 1 [etopot]
    new Level([
        new CompareOccurencesRule(new RegExpEvent("e"), new RegExpEvent("p"), (x, y) => { return x >= y },
            "the number of eggplants is greater or equal to the number of peppers"),
        new OccurrenceRule(new RegExpEvent('(^|[^' + "p" + '])' + "o" + '($|[^' + "p" + '])'), undefined, 0,
            "each onion must be adjacent to a pepper"),
        new OccurrenceRule(new RegExpEvent('(^|[^' + "t" + '])' + "o" + '($|[^' + "t" + '])'), undefined, 0,
            "each onion must be adjacent to a tomato"),
        new CompareOccurencesRule(new RegExpEvent("o"), new RegExpEvent("p"), (x, y) => { return x > y },
            "the number of onions is greater than the number of peppers"),
    ], 1, 7),
    // Jirka 3 [ptoeotp]
    new Level([
        new OccurrenceRule(new RegExpEvent('^o|o$'), undefined, 0,
            "onions must not be at the edge"),
        new OccurrenceRule(new UniqueIngredientsEvent(), 4, 4,
            "must contain all four kinds of ingredients"),
        new OccurrenceRule(new RegExpEvent('(^|[^o])e'), undefined, 0,
            "each eggplant must be immediately to the right of an onion"),
        new OccurrenceRule(new PalindromeEvent(), 1, 1,
            "must be a palindrome (stays the same when reversed)"),
    ], 1, 7),
    // Jirka 2 [tpopopt]
    new Level([
        new CompareOccurencesRule(new RegExpEvent("t"), new RegExpEvent("e"), (x, y) => { return x > y },
            "the number of tomatoes is greater than the number of eggplants"),
        new CompareOccurencesRule(new RegExpEvent("t"), new RegExpEvent("o"), (x, y) => { return x == y },
            "the number of onions and tomatoes is equal"),
        new OccurrenceRule(new PalindromeEvent(), 1, 1,
            "must be a palindrome (stays the same when reversed)"),
        new OccurrenceRule(new RegExpEvent("o" + '($|[^' + "p" + '])'), undefined, 0,
            "each onion must be immediately to the left of a pepper"),
    ], 1, 7),
    // Vilda 4: Uvodni pro dva spizy, vysvetluje, ze staci splneni na alespon jednom [o, ootp]
    new Level([
        new OccurrenceRule(new RegExpEvent("o"), 2, undefined,
            "must have at least two onions"),
        new OccurrenceRule(new RegExpEvent("o"), 1, 1,
            "must have exactly one onion"),
        new OccurrenceRule(new RegExpEvent("tp"), 1, undefined,
            "must contain a tomato followed by pepper"),
        new OccurrenceRule(new RegExpEvent(""), 0, undefined,
            "(each rule must be satisfied by at least one skewer)"),
    ], 2),
    // Sach 3 [ptoe, pp]
    new Level([
        new OccurrenceRule(new UniqueIngredientsEvent(), 4, undefined,
            "must contain all four different ingredients"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('(^|[^o])p($|[^o])'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('(^|[^e])t($|[^e])'), 1, undefined),
        ], "there must be a pepper which is not next to an onion and there is a tomato which is not next to an eggplant"),
        new OccurrenceRule(new RegExpEvent(".o."), 1, undefined,
            "must contain an onion which is not at one of the edges"),
        new OccurrenceRule(new RegExpEvent("."), 2, 2,
            "must have exactly two pieces"),
        new OccurrenceRule(new RegExpEvent(".t."), 1, undefined,
            "must contain a tomato which is not at one of the edges"),
    ], 2, 4),
    // Sachova uloha 1
    new Level([
        new OccurrenceRule(new RegExpEvent('^p.*p$'), 1, 1,
            "must have a pepper on both edges"),
        new CompareOccurencesRule(
            new RegExpEvent('p'), new RegExpEvent('opo'), (x, y) => { return x === y },
            "peppers must be adjacent to onions on both sides"
        ),
        new OccurrenceRule(new RegExpEvent('^(tt|ee|pp|oo)*$'), 1, 1,
            "ingredients form pairs (each item must be adjacent to exactly one item of the same ingredient)"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('.'), 3, 3),
            new OccurrenceRule(new UniqueIngredientsEvent(), 3, 3),
        ], "must have exactly three pieces and their ingredients must all be different"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('(^|[^e])t($|[^e])'), undefined, 0),
            new OccurrenceRule(new RegExpEvent('ete'), undefined, 0),
        ], "each tomato must be adjacent to exactly one eggplant"),
    ], 2, 4),
    // Vasek 1: Prvni tezsi uloha, kterou jsme vytvorili [epe, pept]
    new Level([
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('....'), undefined, 0),
            new OccurrenceRule(new RegExpEvent('p'), 1, 1),
        ], "must be at most three pieces, exactly one pepper"),
        new OccurrenceRule(new RegExpEvent('e'), 0, 1, "at most one eggplant"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('p'), 2, undefined),
            new OccurrenceRule(
                new RegExpEvent('.p.'), 1, undefined,
                "must have at least one pepper which is not at the edge"
                ),
            ], "at least two peppers, from which at least one is not at the edge"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('(^|[^e])p($|[^e])'),
            undefined, 0, "p must be adjacent to >= 1 e"),
            new OccurrenceRule(new RegExpEvent('epe'), undefined, 0),
        ], "there must be exactly one eggplant next to each pepper"),
        new CompositeRule([
            new OccurrenceRule(new PalindromeEvent(), 1, undefined),
            new OccurrenceRule(new RegExpEvent('^.(..)*$'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('e'), 1, undefined),
        ], "must be a palindrome of an odd length containing an eggplant"),
    ], 2, 4),
    // Sachova uloha 2
    new Level([
        new OccurrenceRule(new RegExpEvent('pet'), 1, undefined,
            'must contain the sequence "pepper - eggplant - tomato"'),
        new OccurrenceRule(new RegExpEvent('^p|p$'), 1, undefined,
            'must have a pepper on at least one of the edges'),
        new OccurrenceRule(new RegExpEvent('op|po'), 1, undefined,
            "there must be a pepper which is adjacent to an onion"),
        new CompositeRule([
            new CompareOccurencesRule(
                new RegExpEvent('p'), new RegExpEvent('e'), (x, y) => { return x >= y },
            ),
            new CompareOccurencesRule(
                new RegExpEvent('p'), new RegExpEvent('t'), (x, y) => { return x < y },
            ),
        ], "there must be at least as many peppers as eggplants, but fewer peppers than tomatoes"),
        new OccurrenceRule(new RegExpEvent('t.t'), 1, undefined,
            "there must be an item surrounded with tomatoes from both sides"),
    ], 2, 4),
    // Vasek 2: Prvni vygenerovana uloha
    new Level([
        new OccurrenceRule(new RegExpEvent('o'), 2, undefined, "at least two onions"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('.t.'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('^t|t$'), 1, undefined)
        ], "must contain a tomato at the edge and a tomato not at the edge"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('.o.'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('^o|o$'), 0, 0)
        ], "must contain an onion and onions must not be at the edge"),
        new OccurrenceRule(new UniqueIngredientsEvent(), 2, 2,
        "must contain exactly two kinds of ingredients"),
        new OccurrenceRule(new RegExpEvent('.'), 0, 2,
        "must be at most two pieces of vegetables in total"),
    ], 2, 4),
    // Dummy uloha na konci (technicke duvody)
    new Level([], 0),
]
