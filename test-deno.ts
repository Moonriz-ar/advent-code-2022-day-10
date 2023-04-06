console.log("Welcome to Deno!");

const checkPoints = [20, 60, 100, 140, 180, 220]

interface Cpu {
    cycle: number;
    x: number;
    strength: number;
    sum: number
    
    addx(value: number): void;
    noop(): void;
    tick(): void;
    calculateStrength(): void;
}   

// constructor function
function cpu() {
    this.cycle = 0
    this.x = 1
    this.strength = 0
    this.sum = 0

    this.addx = addx
    function addx(value: number) {
        this.x = this.x + value
    }

    this.noop = noop
    function noop() {
        // does nothing
    }

    this.tick = tick
    function tick() {
        this.cycle = this.cycle + 1
        console.log("cycle", this.cycle)
        console.log("x", this.x)
        if (checkPoints.includes(cpu1.cycle)) {
            cpu1.calculateStrength()
        }
    }

    // calculate strength function
    // strength = cycle * x
    this.calculateStrength = calculateStrength
    function calculateStrength() {
        this.strength = this.cycle * this.x
        this.sum = this.sum + this.strength
        console.log("strength", this.strength)
    }
}

// sync read from file
const stackInputString = Deno.readTextFileSync("./file/input.txt").split("\n\n").filter(line => line !== "")[0];
const instructions = stackInputString.split("\n")

// initialize cpu
let cpu1:Cpu = new cpu()

// parse the file. 
// we need to parse the instructions, and also the num value in addx
instructions.forEach(instruction => {
    console.log(instruction)
    const splited = instruction.split(" ")
    const method = splited[0]
    const value = Number(splited[1])

    // execute
    executeInstruction(cpu1, method, value)
});

// execute instruction
function executeInstruction(cpu: Cpu, method: string, value: number) {
    switch (method) {
        case 'noop':
            cpu.tick()
            cpu.noop()
            break
        case 'addx':
            cpu.tick()
            cpu.tick()
            cpu.addx(value)
            break
        default:
            console.log("instruction not defined")
            break
    }    
}

// console log sum of the six signal strengths
console.log(cpu1.sum)

// write it to output file
Deno.writeTextFileSync("./file/output.txt", `The sum of the six signal strengths is ${cpu1.sum}`)