const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function() {
// 7 tests here!
// Test 7: testing position, mode, generatorWatts.
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(123, "NORMAL", 110);
  
    expect(rover.position).toEqual(123);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  })

// Test 8: testing for rover receiving a message to containg a message name in receiveMessage.
  it("response returned by receiveMessage contains the name of the message", function() {
    let rover = new Rover(100);
    let commands = [new Command("Command Type", "Command Value")];
    let message = new Message ("Message Name", commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toContain("Message Name");
  })

// Test 9: testing for rover to receive two commands in a message. Rover is expecting to receive 2 messages.
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(100);
    let commands = [new Command("STATUS_CHECK"), new Command("MODE_CHANGE", "NORMAL")];
    let message = new Message ("Message Name", commands);
    let response = rover.receiveMessage(message);
    // console.log('WHATTT: ', response.results.length);
    expect(response.results.length).toEqual(2);
  })

// Test 10: testing if rover responds correctly to the status check command.
  it("responds correctly to the status check command", function() {
    let rover = new Rover(98382, "NORMAL", 110);
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Message Name", commands);

    let response = rover.receiveMessage(message);
    // console.log('WHAT: ', response.results[0].roverStatus);
    let expected = {roverStatus: {"generatorWatts": 110, "mode": "NORMAL", "position": 98382}}

    expect(response.results[0].roverStatus).toEqual(expected.roverStatus)
  })

// Test 11: testing if rover responds correctly to mode change command.
  it("responds correctly to the mode change command", function() {
    let rover = new Rover(98382, "NORMAL", 110);
    let commands = [new Command("MODE_CHANGE", "NORMAL")];
    let message = new Message("Message Name", commands);

    let response= rover.receiveMessage(message);
    let expected = {message: "Message Name", results: [{completed: true}]}

    expect(response).toEqual(expected)
  })

// Test 12: testing if rover responds with a false to LOW POWER mode since shouldn't move when the power is low.
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(100, "LOW_POWER", 110);
    let commands = [new Command("MOVE", 120)];
    let message = new Message("Message Name", commands);

    let response = rover.receiveMessage(message);
    let expected = {message: "Message Name", results: [{completed: false}]}
   
    expect(response).toEqual(expected);
  })

// Test 13: testing if rover responds with it's position when command sent is to move "MOVE".   
  it("responds with the position for the move command", function() {
    let rover = new Rover(100, "NORMAL", 110);
    let commands = [new Command("MOVE", 145)];
    let message = new Message("Message Name", commands);
    let response = rover.receiveMessage(message);
    let expected = {message: "Message Name", results: [{completed: true, position: 145}]}

    expect(response).toEqual(expected);
    expect(response.results[0].position).toEqual(commands[0].value);
  });
});
