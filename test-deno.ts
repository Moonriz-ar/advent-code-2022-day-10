// cycles in which wish to know the signal strength, to calculate the sum
const checkPoints = [20, 60, 100, 140, 180, 220]

// Cpu for clock circuit
class Cpu {
    // clock circuit ticks at constant rate, each tick is a cycle
    cycle = 0;
    // x is register, starts with 1
    x = 1;
    // signal strength per cycle is equal to cycle * register
    strength = 0;
    // sum is the total of signal strength of the checkpoints cycles
    sum = 0;
    
    // adds the value to the register count
    addx(value: number) {
        this.x = this.x + value
    }

    // does nothing
    noop() {
    }

    // each tick is a cycle. If the cycle number is included in the checkpoint, calculates the cycle strength and adds the strength to the sum
    tick() {
        this.cycle = this.cycle + 1
        // console.log("cycle", this.cycle)
        // console.log("x", this.x)
        if (checkPoints.includes(cpu1.cycle)) {
            cpu1.calculateStrength()
            cpu1.calculateSum()
        }
    }

    calculateStrength() {
        this.strength = this.cycle * this.x
        // console.log("strength", this.strength)
    }
    
    calculateSum() {
        this.sum = this.sum + this.strength
        // console.log("sum", this.sum)
    }
}   

// sync read from file
const stackInputString = Deno.readTextFileSync("./file/input.txt").split("\n\n").filter(line => line !== "")[0];
const instructions = stackInputString.split("\n")

// initialize cpu
const cpu1:Cpu = new Cpu()

// parse the file. 
// we need to parse the instructions, and also the num value in addx
instructions.forEach(instruction => {
    const splited = instruction.split(" ")
    const method = splited[0]
    const value = Number(splited[1])

    // execute
    executeInstruction(cpu1, method, value)
});

// execute instruction
function executeInstruction(cpu: Cpu, method: string, value: number) {
    switch (method) {
        // noop takes one cycle to complete. It has no other effect.
        case 'noop':
            cpu.tick()
            cpu.noop()
            break
        // addx takes two cycles to complete. After two cycles, the x register is increased by the value
        case 'addx':
            cpu.tick()
            cpu.tick()
            cpu.addx(value)
            break
        default:
            // console.log("instruction not defined")
            break
    }    
}

// console log sum of the six signal strengths
// console.log(cpu1.sum)

// write it to output file
Deno.writeTextFileSync("./file/output.txt", `The sum of the six signal strengths is ${cpu1.sum}`)