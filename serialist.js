function generateRow(length) {
    var row = [];
    for (var i = 0; i < length; i++) {
        var choice = 0;
        do {
            choice = parseInt(Math.random() * length);
        } while (row.indexOf(choice) > -1);
        row.push(choice);
    }
    return row;
}

var noteMap = [
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "w" }),
    new Vex.Flow.StaveNote({ keys: ["c#/4"], duration: "w" }).addAccidental(0, new Vex.Flow.Accidental("#")),
    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "w" }),
    new Vex.Flow.StaveNote({ keys: ["eb/4"], duration: "w" }).addAccidental(0, new Vex.Flow.Accidental("b")),
    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "w" }),
    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "w" }),
    new Vex.Flow.StaveNote({ keys: ["f#/4"], duration: "w" }).addAccidental(0, new Vex.Flow.Accidental("#")),
    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "w" }),
    new Vex.Flow.StaveNote({ keys: ["ab/4"], duration: "w" }).addAccidental(0, new Vex.Flow.Accidental("b")),
    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "w" }),
    new Vex.Flow.StaveNote({ keys: ["bb/4"], duration: "w" }).addAccidental(0, new Vex.Flow.Accidental("b")),
    new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "w" })
];

function rowToNotes(row) {
    var notes = [];
    for (var i = 0; i < row.length; i++) {
        notes.push(noteMap[row[i]]);
    }
    return notes;
}

function generate() {
    var canvas = $("#tone-row canvas")[0];
    var canvasContext = canvas.getContext('2d');
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

    var context = renderer.getContext();
    var staff = new Vex.Flow.Stave(10, 0, 700);
    staff.addClef("treble").setContext(context).draw();

    var toneRow = generateRow(12);

    var notes = rowToNotes(toneRow);

    var voice = new Vex.Flow.Voice({
        num_beats: 12,
        beat_value: 1,
        resolution: Vex.Flow.RESOLUTION
    }).addTickables(notes);

    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 700);

    voice.draw(context, staff);
}

$(document).ready(function () {
    generate();
});