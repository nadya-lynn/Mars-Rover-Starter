const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

// Test 2:  tests that constructor in the Command class correctly cets the CommandType property in the new object. MODE_CHANGE and MOVE are passed in commandType.
  it("constructor sets command type", function() {
    let object = new Command("commandType");
    expect(object.commandType).toContain("commandType");
  })

// Test 3: tests that the constructor correctly sets the value property in the new object. LOW_POWER and 12000 are passed in the value.  STATUS_CHECK takes no value. 
  it("constructor sets a value passed in as the 2nd argument", function() {
    let object = new Command("commandType", "value");
    expect(object.value).toContain("value");
  })
  
});