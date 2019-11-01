const assert = require('assert')
const {right, left, forward, back, go} = require('../rover.js')

describe('Rover', () => {
    [
        {facing: 'N', expected: 'E'},
        {facing: 'E', expected: 'S'},
        {facing: 'S', expected: 'W'},
        {facing: 'W', expected: 'N'}
    ]
        .forEach(({facing, expected}) => {
            it('turns right ' + facing + '->' + expected, () => {
                assert.deepEqual(right({facing: facing}), {facing: expected})
            });
        });

    [
        {facing: 'N', expected: 'W'},
        {facing: 'E', expected: 'N'},
        {facing: 'S', expected: 'E'},
        {facing: 'W', expected: 'S'}
    ]
        .forEach(({facing, expected}) => {
            it('turns left ' + facing + '->' + expected, () => {
                assert.deepEqual(left({facing: facing}), {facing: expected})
            });
        });
    [
        {facing: 'N', x: 0, y: 1},
        {facing: 'E', x: 1, y: 0},
        {facing: 'S', x: 0, y: -1},
        {facing: 'W', x: -1, y: 0}
    ].forEach(({facing, x, y}) => {
        it('moves forward x: ' + x + ' y: ' + y + ' when facing ' + facing, () => {
            assert.deepEqual(forward({facing: facing, x: 0, y: 0}),
                {facing: facing, x: x, y: y})
        });
    });

    [
        {facing: 'N', x: 0, y: -1},
        {facing: 'E', x: -1, y: 0},
        {facing: 'S', x: 0, y: 1},
        {facing: 'W', x: 1, y: 0}
    ].forEach(({facing, x, y}) => {
        it('moves back x: ' + x + ' y: ' + y + ' when facing ' + facing, () => {
            assert.deepEqual(back({facing: 'N', x: 0, y: 0}), {facing: 'N', x: 0, y: -1})
        });
    });

    [
        {instruction: 'R', end_facing: 'E', end_x: 0, end_y: 0},
        {instruction: 'L', end_facing: 'W', end_x: 0, end_y: 0},
        {instruction: 'F', end_facing: 'N', end_x: 0, end_y: 1},
        {instruction: 'B', end_facing: 'N', end_x: 0, end_y: -1}
    ].forEach(({instruction, end_facing, end_x, end_y}) => {
        it('executes instruction ' + instruction, () => {
            assert.deepEqual(go(instruction, {facing: 'N', x: 0, y: 0}), {facing: end_facing, x: end_x, y: end_y})
        });
    });

    [
        {sequence: 'RFFRB', facing: 'S', x:2, y:1},
        {sequence: 'FLFFLB', facing: 'S', x:-2, y:2},
        {sequence: 'BBLFFRRB', facing: 'E', x:-3, y:-2},
        {sequence: 'FFFRBBB', facing: 'E', x:-3, y:3}
    ].forEach(({sequence, facing, x, y}) => {
        it('executes sequence of instructions ' + sequence, () => {
            assert.deepEqual(go(sequence, {facing: 'N', x:0, y:0}), {facing: facing, x:x, y:y})
        })
    });

    it('reports an error when receives unrecognised instruction', () => {
        assert.throws(() => { go('X', {facing: 'N', x:0, y: 0}); }, Error, 'Instruction X not recognised');
    })
})