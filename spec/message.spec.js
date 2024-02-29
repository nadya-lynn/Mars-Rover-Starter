const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

// Test 4:    
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect(function() { new Message();}).toThrow(new Error("Message name required."));
    })

// Test 5: testing that constractor in the Message Class correctly sets the name property in a new message object.    

    it("constructor sets name", function() {
        let nameTest = new Message("Test message with two commands");
        expect(nameTest.name).toContain("Test message with two commands");
    })

// Test 6: test should confirm that the commands property of a new message object contains the data passed in from the Message (name, commands) in message.js


    it("contains a commands array passed into the constructor as the 2nd argument", function() {
        let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
        let twoCommandsTest = new Message("Test message with two commands", commands);
        expect(twoCommandsTest.commands).toEqual(commands);
        expect(twoCommandsTest.commands).toBe(commands);
    })
});
