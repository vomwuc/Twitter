/**
 * Created by Jbt on 12/5/2016.
 */

var groupTestElement = "";

function htmlStringToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

function createTestElement(testName, testValue) {
    var liName = testValue ? "passed": "failed";
    var tweetModule = "<li name='"+liName+"' class='test-element'>"+testName+"" +
                    "</li>";
    return htmlStringToElement(tweetModule);
}

function createTestsContainerElement(testContainerName) {

    var tweetModule = "<ul name='"+testContainerName+"' class='tests-element'>"+testContainerName+"" +
        "</ul>";
    return htmlStringToElement(tweetModule);
}

function isGroupPassed(){
    var isAllTestPassed = true;
    var testsElements = groupTestElement.children;
    for(testAt = 0; testAt < testsElements.length;testAt++){
        if(testsElements[testAt].getAttribute('name') == "failed"){
            isAllTestPassed = false;
        }
    }
    return isAllTestPassed;
}

function test_group(testGroupName, assertsFunction){
    groupTestElement = createTestsContainerElement(testGroupName);
    assertsFunction()
    var testsPassed = isGroupPassed() ? "passed": "failed";
    groupTestElement.className += " " + testsPassed;
    document.getElementById("tests").appendChild(groupTestElement);
}

function assert(testValue, testName){
    groupTestElement.appendChild(createTestElement(testName,testValue));
    return testValue;
}
