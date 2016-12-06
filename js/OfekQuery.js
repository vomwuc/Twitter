/**
 * Created by Jbt on 12/5/2016.
 */

function getElementsFromQuery(queryInStringArray){
    var documentElementsArray = Array.from(document.all);

    for(queryElementNumber in queryInStringArray){
        documentElementsArray = documentElementsArray.filter(function (documentElement) {
        var hasQueryObject;
        var singleQueryString = queryInStringArray[queryElementNumber];
        switch (singleQueryString.charAt(0)){
            case '.':
                hasQueryObject = documentElement.classList.contains(singleQueryString.substr(1));
                break;
            case '#':
                hasQueryObject = documentElement.id == singleQueryString.substr(1);
                break;
            default:
                documentElementsArray.push(Array.from(documentElement.children).filter(function(child){
                    child.tagName == singleQueryString.toUpperCase();
                }));
                hasQueryObject = false;
        }
        return hasQueryObject;
    });
    }

    return documentElementsArray;
}

var OfakQuery = function (query){
    this.elements = getElementsFromQuery(query.split(" "));
    
    this.addClass = function (className) {
        this.elements.map(function(element){
            element.classList.add(className);
        });
    };

    this.removeClass = function (className) {
        this.elements.map(function(element){
            element.classList.remove(className);
        });
    };

    this.each = function(fn){
        this.elements.forEach(function(element){
            fn(element);
        });
    };

    this.map = function(fn){
        return this.elements.map(function(element){
            return fn(element);
        });
    };

    this.any = function(){
        var functionArgs = Array.prototype.slice.call(arguments);

        var succeeddFunctionsElements = this.elements.filter(function (element) {
            var failedFunctions = functionArgs.filter(function(functionArg){
                return !functionArg(element);
            });
            return failedFunctions.length == 0 ? true:false;
        });

        return succeeddFunctionsElements.length > 0 ? true:false;
    };

    this.all = function(){
        var functionArgs = Array.prototype.slice.call(arguments);

        var succeeddFunctionsElements = this.elements.filter(function (element) {
            var failedFunctions = functionArgs.filter(function(functionArg){
                return !functionArg(element);
            });
            return failedFunctions.length == 0 ? true:false;
        });

        return succeeddFunctionsElements.length == this.elements.length ? true:false;
    };

    this.filter = function(){
        var functionArgs = Array.prototype.slice.call(arguments);

        var succeeddFunctionsElements = this.elements.filter(function (element) {
            var failedFunctions = functionArgs.filter(function(functionArg){
                return !functionArg(element);
            });
            return failedFunctions.length == 0 ? true:false;
        });

        return succeeddFunctionsElements;
    };

    this.css = function(property, value){
        this.elements = this.elements.map(function(element){
            var styleElement = document.createElement("STYLE");
            var propertyElement = document.createTextNode(query + "{" +property +":"+ value+"})");
            styleElement.appendChild(propertyElement)
            element.appendChild(styleElement);
            return element;
        });
    };

    this.appendChild = function(childElement){
        this.elements = this.elements.map(function(element){
            element.appendChild(childElement);
            return element;
        });
    };

    this.getAttribute = function(attributeName){
        this.elements = this.elements.map(function(element){
            return element.getAttribute(attributeName);
        });
    };

    this.setAttribute = function(attributeName, attributeValue){
        this.elements = this.elements.map(function(element){
            var atributeElement = document.createAttribute(attributeName);
            atributeElement.set(attributeValue);
            element.appendChild(atributeElement);
            return element;
        });
    };

    this.get = function(index){
        return this.elements[index];
    };
}


function $(query){
    if(query == null || query == undefined || query == ""){
        return;
    }

    return new OfakQuery(query);
}