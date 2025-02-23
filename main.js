import fs from "fs"
import promptSync from "prompt-sync";
import Graph from 'graphology';


const prompt = promptSync();
const cfg = [];

function validateInput(promptText, min, max) {
    const input = parseInt(prompt(promptText), 10);
    if (isNaN(input) || input < min || input > max) {
        throw new Error(`Input must be an integer between ${min} and ${max}`);
    }
    return input;
}

function saveToFile(content) {
    const filePath = "test_cases.txt";
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, "utf8");
    } else {
        const separator = "\n\n" + "=".repeat(50) + "\n\n";
        fs.appendFileSync(filePath, separator + content, "utf8");
    }
}

function main() {
    try {
        //Input and validation
        const aMin = validateInput("Enter minimum value for 'a': ", 1, 1000);
        const aMax = validateInput("Enter maximum value for 'a': ", aMin, 1000);
        const bMin = validateInput("Enter minimum value for 'b': ", 1, 1000);
        const bMax = validateInput("Enter maximum value for 'b': ", bMin, 1000);

        //Tester name
        const testerName = prompt("Enter tester name: ");

        //Shape selection
        const shape = prompt("Choose shape (T = Triangle, R = Rectangle): ").toUpperCase();
        if (shape !== "T" && shape !== "R") {
            throw new Error("Invalid shape choice. Choose 'T' or 'R'.");
        }
        cfg[5] = [6, 7];

        //Formula calc
        const formula = shape === "T" ? "1/2 * a * b" : "a * b";
        if (shape === "T") {
            console.log("1/2 * a * b")
        } else {
            console.log("a * b")
        }


        const calculate = (a, b) => (shape === "T" ? 0.5 * a * b : a * b);

        
        //Select Test
        const testCaseMethod = prompt(
            "Choose test case method (B = BVA, W = Worse case, R = Robustness, WR = Worse case robustness): "
        ).toUpperCase();
        if (!["B", "W", "R", "WR"].includes(testCaseMethod)) {
            throw new Error("Invalid test case method.");
        }


        //Generate test cases
        const start = Date.now();
        const testCases = [];
        const generateTestCases = (aValues, bValues, calculate) => {
            for (let i = 0; i < aValues.length; i++) {
                for (let j = 0; j < bValues.length; j++) {
                    if (aValues[i] >= 1 && aValues[i] <= 1000 && bValues[j] >= 1 && bValues[j] <= 1000) {
                        const expectedResult = calculate(aValues[i], bValues[j]);
                        testCases.push({
                            testCaseNumber: testCases.length + 1,
                            a: aValues[i],
                            b: bValues[j],
                            expectedResult,
                        });
                    }
                }
            }
        };

        switch (testCaseMethod) {
            case "B":
                generateTestCases(
                    [aMin, aMin + 1, aMax - 1, aMax],
                    [bMin, bMin + 1, bMax - 1, bMax],
                    calculate
                );
                break;
            case "W":
                generateTestCases([aMin, aMax], [bMin, bMax], calculate);
                break;
            case "R":
                generateTestCases([0, aMin, aMax, 1001], [0, bMin, bMax, 1001], calculate);
                break;
            case "WR":
                generateTestCases(
                    [0, aMin - 1, aMin, aMax, aMax + 1, 1001],
                    [0, bMin - 1, bMin, bMax, bMax + 1, 1001],
                    calculate
                );
                break;
        }

        //Save to file
        const date = new Date();
        const heading =
            `Heading:
a min: ${aMin}, max: ${aMax}
b min: ${bMin}, max: ${bMax}
Selected shape: ${shape === "T" ? "Triangle" : "Rectangle"}
Selected method: ${testCaseMethod}
Formula: ${formula}
Tester name: ${testerName}
Run start date and time: ${date.toISOString()} \n`;

        const body =
            `Body: 
${testCases.map((tc) => `Test case ${tc.testCaseNumber}: a=${tc.a}, b=${tc.b}, expected=${tc.expectedResult}`).join("\n")}`;

        const footer =
            `Footer:
Number of test cases: ${testCases.length}
Run end date and time: ${new Date().toISOString()}
Execution time: ${Date.now() - start} ms`;

        saveToFile(heading + body + footer);
        console.log("Test cases appended to 'test_cases.txt'");
    } catch (error) {
        onsole.error(`Error: ${error.message}`);
    }

    cfg[11] = [14];
    cfg[12] = [14];
    cfg[13] = [14];
    
    for(let i = 0; i < cfg.length; i++) {
        console.log(`Node ${i} : ${cfg[i]}`)
    }
}

main();