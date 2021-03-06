var astHelper = ASTHelper;
var valueTypeHelper = ValueTypeHelper;

var CodeTextGenerator = function(){};

CodeTextGenerator.generateCode = function(model)
{
    var codeGenerator = new CodeTextGenerator();

    return codeGenerator.generateJsCode(model);
};

CodeTextGenerator.prototype =
{
    generateCode: function(model)
    {
        try
        {
            return this.generateDocumentType(model.docType) + this.newLine
                 + this.generateCodeFromHtmlElement(model.htmlElement);
        }
        catch(e) { this.notifyError("Error when generating code: " + e); }
    },

    generateDocumentType: function(documentType)
    {
        var docTypeHtml = "<!DOCTYPE html";

             if (documentType === "http://www.w3.org/TR/html4/strict.dtd") { docTypeHtml += ' PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"';}
        else if (documentType === "http://www.w3.org/TR/html4/loose.dtd") { docTypeHtml += ' PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"'; }
        else if (documentType === "http://www.w3.org/TR/html4/frameset.dtd") { docTypeHtml += ' PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd"'; }
        else if (documentType === "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd") { docTypeHtml += ' PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"'; }
        else if (documentType === "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd") { docTypeHtml += ' PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"'; }
        else if (documentType === "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd") { docTypeHtml += ' PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd"'; }
        else if (documentType === "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd") { docTypeHtml += ' PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"'; }
        else { docTypeHtml + ">"; }

        return docTypeHtml + ">";
    },

    generateCodeFromHtmlElement: function(htmlElement)
    {
        try
        {
            var htmlElementContent = "";

            var code = this.whitespace + this.generateStartHtmlTagString(htmlElement.type)
                     + this.generateHtmlElementAttributes(htmlElement) + ">";

            var hasOnlyTextContent = false;

            if(htmlElement.type == "script")
            {
                this.indent();
                htmlElementContent = this.generateCodeFromScriptElement(htmlElement);
                this.deIndent();
            }
            else if(htmlElement.type == "style")
            {
                this.indent();
                htmlElementContent = this.generateCodeFromStyleElement(htmlElement);
                this.deIndent();
            }
            else if (htmlElement.type == "textNode")
            {
                return valueTypeHelper.trim(htmlElement.textContent);
            }
            else
            {
                var children = htmlElement.childNodes;

                if(children.length == 1 && children[0].type == "textNode")
                {
                    htmlElementContent = valueTypeHelper.trim(children[0].textContent);
                    hasOnlyTextContent = true;
                }
                else
                {
                    htmlElementContent += this.newLine;
                    this.indent();
                    for(var i = 0, length = children.length; i < length; i++)
                    {
                        htmlElementContent += this.generateCodeFromHtmlElement(children[i]);
                    }
                    this.deIndent();
                }
            }

            code += htmlElementContent;
            code += (hasOnlyTextContent ? "" : this.whitespace) + this.generateEndHtmlTagString(htmlElement.type) + this.newLine;

            return code;
        }
        catch(e) { this.notifyError("Error when generating htmlElement: " + e); }
    },

    generateCodeFromScriptElement: function(scriptElement)
    {
        try
        {
            return this.newLine + this.generateJsCode(scriptElement.pathAndModel.model);
        }
        catch(e) { this.notifyError("Error when generating code from script element: " + e); }
    },

    generateJsCode: function(element)
    {
        try
        {
                 if (astHelper.isProgram(element)) { return this.generateProgram(element); }
            else if (astHelper.isStatement(element)) { return this.whitespace + this.generateStatement(element) + this._SEMI_COLON + this.newLine; }
            else if (astHelper.isFunction(element)) { return this.whitespace + this.generateFromFunction(element) + this.newLine; }
            else if (astHelper.isExpression(element)) { return this.generateExpression(element); }
            else if (astHelper.isSwitchCase(element)) { return this.generateFromSwitchCase(element); }
            else if (astHelper.isCatchClause(element)) { return this.generateFromCatchClause(element); }
            else if (astHelper.isVariableDeclaration(element)) { return this.whitespace + this.generateFromVariableDeclaration(element) + this._SEMI_COLON + this.newLine; }
            else if (astHelper.isVariableDeclarator(element)) { return this.generateFromVariableDeclarator(element); }
            else if (astHelper.isLiteral(element)) { return this.generateFromLiteral(element); }
            else if (astHelper.isIdentifier(element)) { return this.generateFromIdentifier(element); }
            else if (astHelper.isObjectProperty(element)) { return this.generateFromObjectProperty(element); }
            else
            {
                this.notifyError("Error while generating code unidentified ast element: "); return "";
            }
        }
        catch(e) { alert("Error while generating code: " + e); }
    },

    generateProgram: function(programElement)
    {
        try
        {
            var code = "";

            if(programElement.body != null)
            {
                var body = programElement.body;

                for(var i = 0, length = body.length; i < length; i++)
                {
                    code += this.generateJsCode(body[i]);
                }
            }

            return code;
        }
        catch(e) { this.notifyError("Error when generating program: " + e); }
    },

    generateStatement: function(statement)
    {
        try
        {
                 if (astHelper.isEmptyStatement(statement))  { return this.generateFromEmptyStatement(statement); }
            else if (astHelper.isBlockStatement(statement)) { return this.generateFromBlockStatement(statement); }
            else if (astHelper.isExpressionStatement(statement)) { return this.generateFromExpressionStatement(statement); }
            else if (astHelper.isIfStatement(statement)) { return this.generateFromIfStatement(statement); }
            else if (astHelper.isWhileStatement(statement)) { return this.generateFromWhileStatement(statement); }
            else if (astHelper.isDoWhileStatement(statement)) { return this.generateFromDoWhileStatement(statement); }
            else if (astHelper.isForStatement(statement)) { return this.generateFromForStatement(statement); }
            else if (astHelper.isForInStatement(statement)) { return this.generateFromForInStatement(statement); }
            else if (astHelper.isLabeledStatement(statement)) { return this.generateFromLabeledStatement(statement); }
            else if (astHelper.isBreakStatement(statement)) { return this.generateFromBreakStatement(statement); }
            else if (astHelper.isContinueStatement(statement)) { return this.generateFromContinueStatement(statement); }
            else if (astHelper.isReturnStatement(statement)) { return this.generateFromReturnStatement(statement); }
            else if (astHelper.isWithStatement(statement)) { return this.generateFromWithStatement(statement); }
            else if (astHelper.isTryStatement(statement)) { return this.generateFromTryStatement(statement); }
            else if (astHelper.isThrowStatement(statement)) { return this.generateFromThrowStatement(statement); }
            else if (astHelper.isSwitchStatement(statement)) { return this.generateFromSwitchStatement(statement); }
            else { this.notifyError("Error: AST Statement element not defined: " + expression.type);  return "";}
        }
        catch(e) { this.notifyError("Error when generating code from a statement: " + e); }
    },

    generateExpression: function(expression)
    {
        try
        {
                 if (astHelper.isAssignmentExpression(expression)) { return this.generateFromAssignmentExpression(expression); }
            else if (astHelper.isUnaryExpression(expression)) { return this.generateFromUnaryExpression(expression); }
            else if (astHelper.isBinaryExpression(expression)) { return this.generateFromBinaryExpression(expression); }
            else if (astHelper.isLogicalExpression(expression)) { return this.generateFromLogicalExpression(expression); }
            else if (astHelper.isLiteral(expression)) { return this.generateFromLiteral(expression); }
            else if (astHelper.isIdentifier(expression)) { return this.generateFromIdentifier(expression); }
            else if (astHelper.isUpdateExpression(expression)) { return this.generateFromUpdateExpression(expression); }
            else if (astHelper.isNewExpression(expression)) { return this.generateFromNewExpression(expression); }
            else if (astHelper.isConditionalExpression(expression)) { return this.generateFromConditionalExpression(expression); }
            else if (astHelper.isThisExpression(expression)) { return this.generateFromThisExpression(expression); }
            else if (astHelper.isCallExpression(expression)) { return this.generateFromCallExpression(expression); }
            else if (astHelper.isMemberExpression(expression)) { return this.generateFromMemberExpression(expression); }
            else if (astHelper.isSequenceExpression(expression)) { return this.generateFromSequenceExpression(expression); }
            else if (astHelper.isArrayExpression(expression)) { return this.generateFromArrayExpression(expression); }
            else if (astHelper.isObjectExpression(expression)) { return this.generateFromObjectExpression(expression); }
            else if (astHelper.isFunctionExpression(expression)) { return this.generateFromFunction(expression, true); }
            else { this.notifyError("Error: AST Expression element not defined: " + expression.type);  return "";}
        }
        catch(e) { this.notifyError("Error when generating code from an expression:" + e); }
    },

    generateFromFunction: function(functionDecExp)
    {
        try
        {
            return  this._FUNCTION_KEYWORD + " " + (functionDecExp.id != null ? this.generateFromIdentifier(functionDecExp.id) + " " : "")
                 +  this.generateFunctionParameters(functionDecExp)
                 +  this.generateFromFunctionBody(functionDecExp);
        }
        catch(e) { alert("Error when generating code from a function:" + e); }
    },

    generateFunctionParameters: function(functionDecExp)
    {
        try
        {
            var code = this._LEFT_PARENTHESIS;

            var params = functionDecExp.params;
            for(var i = 0, length = params.length; i < length; i++)
            {
                if(i != 0) { code += ", "; }

                code += this.generateFromPattern(params[i]);
            }

            return code + this._RIGHT_PARENTHESIS;
        }
        catch(e) { this.notifyError("Error when generating code from function parameters:" + e);}
    },

    generateFromFunctionBody: function(functionDeclExp)
    {
        try
        {
            return this.generateJsCode(functionDeclExp.body);
        }
        catch(e) { this.notifyError("Error when generating code from function body:" + e); }
    },

    generateFromBlockStatement: function(blockStatement)
    {
        try
        {
            var code = this._LEFT_GULL_WING + this.newLine;

            this.indent();

            var body = blockStatement.body;
            for(var i = 0, length = body.length; i < length; i++)
            {
                code += this.generateJsCode(body[i]);
            }

            this.deIndent();

            return code + this.whitespace + this._RIGHT_GULL_WING;
        }
        catch(e) { this.notifyError("Error when generating HTML from block statement:" + e);}
    },

    generateFromEmptyStatement: function(emptyStatement)
    {
        try
        {
            return this._SEMI_COLON;
        }
        catch(e) { this.notifyError("Error when generating HTML from empty statement:" + e); }
    },

    generateFromExpressionStatement: function(expressionStatement)
    {
        try
        {
            return this.generateJsCode(expressionStatement.expression);
        }
        catch(e) { this.notifyError("Error when generating HTML from expression statement:" + e); }
    },

    generateFromAssignmentExpression: function(assignmentExpression)
    {
        try
        {
            return this.generateJsCode(assignmentExpression.left)
                + " " + assignmentExpression.operator + " "
                + this.generateJsCode(assignmentExpression.right)
        }
        catch(e) { this.notifyError("Error when generating code from assignment expression:" + e); }
    },

    generateFromUnaryExpression: function(unaryExpression)
    {
        try
        {
            var code = "";

            if(unaryExpression.prefix) { code += unaryExpression.operator;}

            if(unaryExpression.operator == "typeof"
                || unaryExpression.operator == "void"
                || unaryExpression.operator == "delete") { code += " "; }

            code += this.generateExpression(unaryExpression.argument);

            if(!unaryExpression.prefix)  { code += unaryExpression.operator; }

            return code;
        }
        catch(e) { this.notifyError("Error when generating code from unary expression:" + e); }
    },

    generateFromBinaryExpression: function(binaryExpression)
    {
        try
        {
            return this.generateJsCode(binaryExpression.left)
                 + " " + binaryExpression.operator + " "
                 + this.generateJsCode(binaryExpression.right);
        }
        catch(e) { this.notifyError("Error when generating code from binary expression:" + e); }
    },

    generateFromLogicalExpression: function(logicalExpression)
    {
        try
        {
            return this.generateJsCode(logicalExpression.left)
                 + " " + logicalExpression.operator + " "
                 + this.generateJsCode(logicalExpression.right);
        }
        catch(e) { this.notifyError("Error when generating code from logical expression:" + e); }
    },

    generateFromUpdateExpression: function(updateExpression)
    {
        try
        {
            var code = "";
            // if prefixed e.g.: ++i
            if(updateExpression.prefix) { code += updateExpression.operator;}

            code += this.generateJsCode(updateExpression.argument);

            // if postfixed e.g.: i++
            if(!updateExpression.prefix) code += updateExpression.operator;

            return code;
        }
        catch(e) { this.notifyError("Error when generating HTML from update expression:" + e); }
    },

    generateFromNewExpression: function(newExpression)
    {
        try
        {
            return this.generateJsCode(newExpression.callee) + this._LEFT_PARENTHESIS
                + this.getSequenceCode(newExpression.arguments)
                + this._RIGHT_PARENTHESIS;

        }
        catch(e) { this.notifyError("Error when generating code from new expression:" + e); }
    },

    generateFromConditionalExpression: function(conditionalExpression)
    {
        try
        {
            return this.generateJsCode(conditionalExpression.test)
                + " "+ this._QUESTION_MARK + " " + this.generateJsCode(conditionalExpression.consequent)
                + " "+ this._COLON + " " + this.generateJsCode(conditionalExpression.alternate);
        }
        catch(e) { this.notifyError("Error when generating code from conditional expression:" + e); }
    },

    generateFromThisExpression: function(thisExpression)
    {
        try
        {
            return "this";
        }
        catch(e) { this.notifyError("Error when generating code from this expression:" + e); }
    },

    generateFromCallExpression: function(callExpression)
    {
        try
        {
            return this.generateJsCode(callExpression.callee) + this._LEFT_PARENTHESIS
                +  this.getSequenceCode(callExpression.arguments)
                +  this._RIGHT_PARENTHESIS;
        }
        catch(e) { this.notifyError("Error when generating code from call expression:" + e); }
    },

    generateFromMemberExpression: function(memberExpression)
    {
        try
        {
            return this.generateJsCode(memberExpression.object)
                + (memberExpression.computed ? this._LEFT_BRACKET + this.generateJsCode(memberExpression.property) + this._RIGHT_BRACKET
                                             : this._DOT + this.generateJsCode(memberExpression.property));
        }
        catch(e) { this.notifyError("Error when generating code from member expression:" + e); }
    },

    generateFromSequenceExpression: function(sequenceExpression)
    {
        try
        {
            return this.getSequenceCode(sequenceExpression.expressions);
        }
        catch(e) { this.notifyError("Error when generating code from member expression:" + e); }
    },

    generateFromArrayExpression: function(arrayExpression)
    {
        try
        {
            return this._LEFT_BRACKET
                    + this.getSequenceCode(arrayExpression.elements)
                   + this._RIGHT_BRACKET;
        }
        catch(e) { this.notifyError("Error when generating code from array expression:" + e); }
    },

    generateFromObjectExpression: function(objectExpression)
    {
        try
        {
            if (objectExpression.properties.length == 0) { return this._LEFT_GULL_WING + this._RIGHT_GULL_WING; }

            var code = this._LEFT_GULL_WING;

            var properties = objectExpression.properties;
            for (var i = 0, length = properties.length; i < length; i++)
            {
                if(i != 0) { code += ", "; }

                code += this.generateFromObjectProperty(properties[i]);
            }

            code += this._RIGHT_GULL_WING;

            return code;
        }
        catch(e) { this.notifyError("Error when generating HTML from object expression:" + e); }
    },

    generateFromObjectProperty: function(property)
    {
       try
       {
            var code = "";

           if (property.kind == "init")
           {
               code += this.generateJsCode(property.key) + this._COLON + " "
                    + this.generateJsCode(property.value);
           }
           else
           {
               code += this.generateJsCode(property.key);

               if (astHelper.isFunctionExpression(property.value))
                   code += this.generateFromFunction(property.value);
               else
                   code += this.generateExpression(property.value);
           }

           return code;
       }
       catch(e) { this.notifyError("Error when generating code from object property: " + e); }
    },

    generateFromIfStatement: function(ifStatement)
    {
        try
        {
            var code = this._IF_KEYWORD + this._LEFT_PARENTHESIS + this.generateJsCode(ifStatement.test) + this._RIGHT_PARENTHESIS;

            code += this.generateJsCode(ifStatement.consequent);

            if(ifStatement.alternate != null) { code += this._ELSE_KEYWORD + this.generateJsCode(ifStatement.alternate); }

            return code;
        }
        catch(e) { this.notifyError("Error when generating code from if statement:" + e); }
    },

    generateFromWhileStatement: function(whileStatement)
    {
        try
        {
            return this._WHILE_KEYWORD + this._LEFT_PARENTHESIS + this.generateJsCode(whileStatement.test) + this._RIGHT_PARENTHESIS
                +  this.generateJsCode(whileStatement.body);
        }
        catch(e) { this.notifyError("Error when generating code from while statement:" + e); }
    },

    generateFromDoWhileStatement: function(doWhileStatement)
    {
        try
        {
            return this._DO_KEYWORD + this.newLine + this.generateJsCode(doWhileStatement.body)
                +  this.whitespace + this._WHILE_KEYWORD + this._LEFT_PARENTHESIS + this.generateJsCode(doWhileStatement.test) + this._RIGHT_PARENTHESIS;
        }
        catch(e) { this.notifyError("Error when generating code from do while statement:" + e); }
    },

    generateFromForStatement: function(forStatement)
    {
        try
        {
            return this._FOR_KEYWORD + this._LEFT_PARENTHESIS
                +  this.generateJsCode(forStatement.init) + this._SEMI_COLON
                +  this.generateJsCode(forStatement.test) + this._SEMI_COLON
                +  this.generateJsCode(forStatement.update) + this._RIGHT_PARENTHESIS
                +  this.generateJsCode(forStatement.body);
        }
        catch(e) { this.notifyError("Error when generating code from for statement:" + e); }
    },

    generateFromForInStatement: function(forInStatement)
    {
        try
        {
            return this._FOR_KEYWORD + this._LEFT_PARENTHESIS
                +  this.generateJsCode(forInStatement.left) + " " +  this._IN_KEYWORD + " "
                +  this.generateJsCode(forInStatement.right) + this._RIGHT_PARENTHESIS
                +  this.generateJsCode(forInStatement.body);
        }
        catch(e) { this.notifyError("Error when generating code from for...in statement:" + e); }
    },

    generateFromBreakStatement: function(breakStatement)
    {
        try
        {
            return this._BREAK_KEYWORD + (breakStatement.label != null ? this.generateFromIdentifier(breakStatement.label) : "");
        }
        catch(e) { this.notifyError("Error when generating code from break statement:" + e); }
    },

    generateFromContinueStatement: function(continueStatement)
    {
        try
        {
            return this._CONTINUE_KEYWORD + (continueStatement.label != null ? this.generateFromIdentifier(continueStatement.label) : "");
        }
        catch(e) { this.notifyError("Error when generating code from continue statement:" + e); }
    },

    generateFromReturnStatement: function(returnStatement)
    {
        try
        {
            return this._RETURN_KEYWORD + " " +
                + (returnStatement.argument != null ? this.generateExpression(returnStatement.argument) : "");
        }
        catch(e) { this.notifyError("Error when generating code from return statement:" + e); }
    },

    generateFromWithStatement: function(withStatement)
    {
        try
        {
            return this._WITH_KEYWORD + this._LEFT_PARENTHESIS
                 + this.generateExpression(withStatement.object) + this._RIGHT_PARENTHESIS
                 + this.generateStatement(withStatement.body);
        }
        catch(e) { this.notifyError("Error when generating code from with statement:" + e); }
    },

    generateFromThrowStatement: function(throwStatement)
    {
        try
        {
            return this._THROW_KEYWORD + " " + this.generateExpression(throwStatement.argument);
        }
        catch(e) { this.notifyError("Error when generating code from throw statement:" + e); }
    },

    generateFromSwitchStatement: function(switchStatement)
    {
        try
        {

            var code = this._SWITCH_KEYWORD + this._LEFT_PARENTHESIS + this.generateExpression(switchStatement.discriminant) + this._RIGHT_PARENTHESIS;

            code += this.newLine + this.whitespace + this._LEFT_GULL_WING;

            this.indent();

            for(var i = 0; i < switchStatement.cases.length; i++)
            {
                code += this.generateFromSwitchCase(switchStatement.cases[i]);
            }

            this.deIndent();

            code += this.newLine + this.whitespace + this._RIGHT_GULL_WING;

            return code;
        }
        catch(e) { this.notifyError("Error when generating code from switch statement:" + e); }
    },

    generateFromSwitchCase: function(switchCase)
    {
        try
        {
            var code = "";
            if(switchCase.test === null){ code += this._DEFAULT_KEYWORD + this._SEMI_COLON; }
            else
            {
                code +=this._CASE_KEYWORD + this.generateExpression(switchCase.test) + this._SEMI_COLON + this.newLine;
            }

            for(var i = 0; i < switchCase.consequent.length; i++)
            {
                code += this.generateStatement(switchCase.consequent[i]);
            }

            return code;
        }
        catch(e) { this.notifyError("Error when generating code from switch case:" + e); }
    },

    generateFromTryStatement: function(tryStatement)
    {
        try
        {
            var code = this._TRY_KEYWORD +  this.generateJsCode(tryStatement.block);

            // catch clauses
            for(var i = 0; i < tryStatement.handlers.length; i++)
            {
                code += this.generateFromCatchClause(tryStatement.handlers[i]);
            }

            if(tryStatement.finalizer != null)
            {
                code += this._FINALLY_KEYWORD + this.generateJsCode(tryStatement.finalizer);
            }

            return code;
        }
        catch(e) { this.notifyError("Error when generating code from try statement:" + e); }
    },

    generateFromLabeledStatement: function(labeledStatement)
    {
        try
        {
            return this.generateFromIdentifier(labeledStatement.label) + this._SEMI_COLON
                + this.generateHtml(labeledStatement.body);
        }
        catch(e) { alert("Error when generating code from labeled statement:" + e); }
    },

    generateFromVariableDeclaration: function(variableDeclaration)
    {
        try
        {
            var code = this._VAR_KEYWORD + " ";

            var declarators = variableDeclaration.declarations;
            for (var i = 0, length = declarators.length; i < length; i++)
            {
                var declarator = declarators[i];

                if(i != 0) { code += this._COMMA; }

                code += this.generateFromVariableDeclarator(declarator);
            }

            return code;
        }
        catch(e) { this.notifyError("Error when generating code from variable declaration:" + e);}
    },

    generateFromVariableDeclarator: function(variableDeclarator)
    {
        try
        {
            return this.generateFromPattern(variableDeclarator.id)
                +  (variableDeclarator.init != null ? " = " + this.generateJsCode(variableDeclarator.init) : "");
        }
        catch(e) { alert("Error when generating code from variableDeclarator - CodeMarkupGenerator:" + e);}
    },

    generateFromPattern: function(pattern)
    {
        try
        {
            if(astHelper.isIdentifier(pattern)) { return this.generateFromIdentifier(pattern);}
        }
        catch(e) { this.notifyError("Error when generating code from pattern:" + e);}
    },

    generateFromCatchClause: function(catchClause)
    {
        try
        {

            return this._CATCH_KEYWORD + this._LEFT_PARENTHESIS + this.generateJsCode(catchClause.param) + this._RIGHT_PARENTHESIS
                +  this.generateStatement(catchClause.body)
        }
        catch(e) { this.notifyError("Error when generating code from catch clause:" + e);}
    },

    generateFromIdentifier: function(identifier)
    {
        try
        {
            return identifier.name;
        }
        catch(e) { this.notifyError("Error when generating code from an identifier:" + e);}
    },

    generateFromLiteral: function(literal)
    {
        try
        {
            if (valueTypeHelper.isString(literal.value)) { return "\"" + literal.value + "\""; }
            else if (valueTypeHelper.isBoolean(literal.value) || valueTypeHelper.isNull(literal.value)
                  || valueTypeHelper.isNumber(literal.value)) { return literal.value; }
            else if(valueTypeHelper.isObject(literal.value))
            {
                if(literal.value.constructor != null && literal.value.constructor.name === "RegExp")
                {
                    return literal.value.toString();
                }
                else //over JSON conversion
                {
                    return atob(literal.value.RegExpBase64);
                }
            }
        }
        catch(e) { this.notifyError("Error when generating HTML from literal:" + e);}
    },

    getSequenceCode: function(sequence)
    {
        try
        {
            var code = "";

            for(var i = 0, length = sequence.length; i < length; i++)
            {
                if(i != 0) { code += this._COMMA +  " "; }

                code += this.generateJsCode(sequence[i]);
            }

            return code;
        }
        catch(e) { this.notifyError("Error when generating sequence code:" + e); }
    },

    generateCodeFromStyleElement: function(styleElement)
    {
        try
        {
            var cssText = "";

            var rules = styleElement.cssRules;

            for(var i = 0, length = rules.length; i < length; i++)
            {
                cssText += rules[i].cssText;
            }

            return cssText;
        }
        catch(e) { this.notifyError("Error when generating code from style element: " + e); }
    },

    generateStartHtmlTagString: function(tagName)
    {
        return "<" + tagName;
    },

    generateHtmlElementAttributes: function(htmlElement)
    {
        try
        {
            var attributes = htmlElement.attributes;
            var attributesText = "";

            for(var i = 0, length = attributes.length; i < length; i++)
            {
                var attribute = attributes[i];

                attributesText += " " + attribute.name + '="' + attribute.value + '"';
            }

            return attributesText;
        }
        catch(e) { this.notifyError("Error when generating html element attributes: " + e); }
    },

    generateEndHtmlTagString: function(tagName)
    {
        return "</" + tagName + ">";
    },

    whitespace: "",
    newLine: "\r\n",
    indent: function() { this.whitespace += "  "; },
    deIndent: function()  { this.whitespace = this.whitespace.replace(/\s\s$/, "");},

    notifyError: function(message) { alert("Error when generating code text: " + message); },

    _LEFT_GULL_WING:  "{",
    _RIGHT_GULL_WING: "}",
    _LEFT_PARENTHESIS: "(",
    _RIGHT_PARENTHESIS: ")",
    _LEFT_BRACKET : "[",
    _RIGHT_BRACKET: "]",
    _SEMI_COLON: ";",
    _QUESTION_MARK: "?",
    _COLON: ":",
    _DOT: ".",
    _COMMA: ",",
    _IF_KEYWORD: "if",
    _ELSE_KEYWORD: "else",
    _FOR_KEYWORD: "for",
    _WHILE_KEYWORD: "while",
    _DO_KEYWORD: "do",
    _WITH_KEYWORD: "with",
    _IN_KEYWORD: "in",
    _FUNCTION_KEYWORD: "function",
    _BREAK_KEYWORD: "break",
    _CONTINUE_KEYWORD: "continue",
    _TRY_KEYWORD: "try",
    _CATCH_KEYWORD: "catch",
    _FINALLY_KEYWORD: "finally",
    _THROW_KEYWORD: "throw",
    _RETURN_KEYWORD: "return",
    _VAR_KEYWORD: "var",
    _SWITCH_KEYWORD: "switch",
    _CASE_KEYWORD: "case",
    _DEFAULT_KEYWORD: "default"
};