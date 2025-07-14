
function getKey(e) {
      return 1 == e
          ? ["@", "!", "#", "$"]
          : 3 == e
          ? [
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z",
            ]
          : 4 == e
          ? [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
            ]
          : void 0;
          
}

for (var t = [1, 6, 0, 1, 2, 2, 22, 16, 21, 9, 16, 10, 14, 20, 1, 13], n = "", s = 0; s < 16; s++)
    0 == s || 4 == s
        ? (n += getKey(1)[t[s]])
        : s < 4 || 9 == s || 14 == s
        ? (n += t[s])
        : 6 == s || 8 == s
        ? (n += getKey(3)[t[s]])
        : s < 12 || 13 == s
        ? (n += getKey(4)[t[s]])
                    : s < 16 && (n += getKey(3)[t[s]]);
        
var dec_data =
    "tUxQ8fSw4Y0nXiq%2BO5yjCKk9f2FnnGaulB%2BQ4wMMkx9DQTu%2Bx9%2Bf5unIkoarLemzh4n%2Btkh1%2FKY0PwzrJ9chw%2F7JLbI9gt9rxD%2BCW8BRdCo4%2BaMK2kyRG5FgJGD5XaksnCOld1uDVKOMH4N25xFmfk8Tcq4lP%2BuJVe4V%2FzsMRREP3Q8Xad%2FdIqvVQPlvbLRDuuVdNUhBv2VH7kYojgwUqf0ZCSJtDK117XtfrKSY3oa4vLeTXAJpog887AE5DeY7FCJy0Xs68IoHTLeCeTeu1kWerp2uEWhTaum2jGlR3WBRKt04%2BGcJQxxm6yFykueGNh1nBgZu%2F%2FrFkUXjq6HOLvE2XEtLlD1XXNNtlQO9z40iH1nOyuU9qZz7BQkdwIjrq3y1Pm6JiiGFCbyuCu4hJnx44usDwflo%2BMzLN85f1r8%3D"


console.log(n)