const compass = ['N', 'E', 'S', 'W'];

const vectors = [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: -1, y: 0}
];

const commands = {
    'R': right,
    'L': left,
    'F': forward,
    'B': back
};

function turn(rover, compass) {
    return {...rover, facing: compass[(directionOf(rover, compass) + 1) % 4]};
}

function right(rover) {
    return turn(rover, compass);
}

function left(rover) {
    return turn(rover, [...compass].reverse());
}

function move(rover, vector) {
    return {...rover, x: rover.x + vector.x, y: rover.y + vector.y};
}

function directionOf(rover, compass) {
    return compass.indexOf(rover.facing);
}

function forward(rover) {
    return move(rover, vectors[directionOf(rover, compass)]);
}

function back(rover) {
    return move(rover, vectors[(directionOf(rover, compass) + 2) % 4]);
}

function go(instructions, rover){
    return [...instructions].reduce((r, instruction) => command(instruction)(r), rover);
}

function command(instruction) {
    if(!instruction in commands){
        throw new Error('Instruction ' + instruction + ' not recognised')
    }
    return commands[instruction];
}

module.exports = {right, left, forward, back, go};