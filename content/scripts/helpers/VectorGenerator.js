/**
 * Created by Jomaras.
 * Date: 28.03.12.@07:45
 */
var VectorGenerator = {
    generate: function(astElement)
    {
        try
        {
            if(ASTHelper.isProgram(astElement)) { this.generateVectorForProgram(astElement); }
            else if (ASTHelper.isFunction(astElement)) { this.generateVectorForFunction(astElement); }
            else if (ASTHelper.isBlockStatement(astElement)) { this.generateVectorForBlockStatement(astElement); }
            else if (ASTHelper.isVariableDeclaration(astElement)) { this.generateVectorForVariableDeclaration(astElement); }
            else if (ASTHelper.isVariableDeclarator(astElement)) { this.generateVectorForVariableDeclarator(astElement); }

          
            /**
             *  my code
            */
            
            

            else if (ASTHelper.isIfStatement(astElement)) { this.generateVectorForIfStatement(astElement); }
            else if (ASTHelper.isTryStatement(astElement)) { this.generateVectorForTryStatement(astElement); }
            else if (ASTHelper.isCatchClause(astElement)) { this.generateVectorForCatchClause(astElement); }

            else if (ASTHelper.isExpressionStatement(astElement)) { this.generateVectorForExpressionStatement(astElement); }
            
            else if (ASTHelper.isAssignmentExpression(astElement)) { this.generateVectorForAssignmentExpression(astElement); }

            else if (ASTHelper.isBinaryExpression(astElement)) { this.generateVectorForBinaryExpression(astElement); }
            else if (ASTHelper.isIdentifier(astElement)) { this.generateVectorForIdentifier(astElement); }
            else if (ASTHelper.isLiteral(astElement)) { this.generateVectorForLiteral(astElement); }
            
            else { alert("Unhandled element when generating vector: " + astElement.type); }
        }
        catch(e)
        {
            alert("Error when generating vector: " + e);
        }
    },

    generateVectorForBlockStatement: function(blockStatement)
    {
        try
        {
            if(!ASTHelper.isBlockStatement(blockStatement)) { alert("Sent argument is not a block statement when generating vector!"); return; }

            blockStatement.characteristicVector = new CharacteristicVector();

            blockStatement.body.forEach(function(statement)
            {
                this.generate(statement);
                blockStatement.characteristicVector.join(statement.characteristicVector);
            }, this);
        }
        catch(e) { alert("Error when generating vector from block statement: " + e);}
    },

    generateVectorForExpressionStatement: function(expressionStatement)
    {
        try
        {
            if(!ASTHelper.isExpressionStatement(expressionStatement)) { alert("Sent argument is not a expressionStatement when generating vector!"); return; }

            expressionStatement.characteristicVector = new CharacteristicVector();

            this.generate(expressionStatement.expression);

            expressionStatement.characteristicVector.join(expressionStatement.expression.characteristicVector);
            
        }
        catch(e) { alert("Error when generating vector from expressionStatement: " + e); }
    },
    
    generateVectorForAssignmentExpression: function(assignmentExpression)
    {
    	try
    	{
    		if(!ASTHelper.isAssignmentExpression(assignmentExpression)) { alert("Sent argument is not a assignmentExpression when generating vector!"); return; }
    	
    		assignmentExpression.characteristicVector = new CharacteristicVector();
    		
    		this.generate(assignmentExpression.left);
            this.generate(assignmentExpression.right);
    		
    		assignmentExpression.characteristicVector.join(assignmentExpression.left.characteristicVector);
    		
    		assignmentExpression.characteristicVector.join(assignmentExpression.right.characteristicVector);    		
    		
    		assignmentExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.AssignmentExpression]++;
    	
    	}
    	catch (e) { alert("Error when generating vector for assignmentExpression: " + e); }
    },

    generateVectorForBinaryExpression: function(binaryExpression)
    {
        try
        {
            if(!ASTHelper.isBinaryExpression(binaryExpression)) { alert("Sent argument is not a binary expression when generating vector!"); return; }

            binaryExpression.characteristicVector = new CharacteristicVector();

            this.generate(binaryExpression.left);
            this.generate(binaryExpression.right);

            binaryExpression.characteristicVector.join(binaryExpression.left.characteristicVector);
            binaryExpression.characteristicVector.join(binaryExpression.right.characteristicVector);

            //Own contribution
            if(ASTHelper.isBinaryEqualityOperator(binaryExpression.operator))
            {
                binaryExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.BinaryEqualityExpression]++;
            }
            else if (ASTHelper.isBinaryMathOperator(binaryExpression.operator))
            {
                binaryExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.BinaryMathExpression]++;
            }
            else if (ASTHelper.isBinaryRelationalOperator(binaryExpression.operator))
            {
                binaryExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.BinaryRelationalExpression]++;
            }
            else if (ASTHelper.isBinaryBitOperator(binaryExpression.operator))
            {
                binaryExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.BinaryBitExpression]++;
            }
            else if (ASTHelper.isBinaryObjectOperator(binaryExpression.operator))
            {
                binaryExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.BinaryObjectExpression]++;
            }
            else if (ASTHelper.isBinaryXmlOperator(binaryExpression.operator))
            {
                binaryExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.BinaryXmlExpression]++;
            }

        }
        catch(e) { alert("Error when generating vector from binary expression: " + e);}
    },
    
    generateVectorForFunction: function(functionElement)
    {
        try
        {
            if(!ASTHelper.isFunction(functionElement)) { alert("Sent argument is not a function when generating vector!"); return; }

            functionElement.characteristicVector = new CharacteristicVector();

            if(functionElement.id != null)
            {
                this.generate(functionElement.id);
                functionElement.characteristicVector.join(functionElement.id.characteristicVector);
            }

            functionElement.params.forEach(function(parameter)
            {
                this.generate(parameter);
                functionElement.characteristicVector.join(parameter.characteristicVector);
            }, this);

            this.generate(functionElement.body);
            functionElement.characteristicVector.join(functionElement.body.characteristicVector);

            if(ASTHelper.isFunctionDeclaration(functionElement))
            {
                functionElement.characteristicVector[CharacteristicVector.RELEVANT_NODES.FunctionDeclaration]++;
            }
            else if(ASTHelper.isFunctionExpression(functionElement))
            {
                functionElement.characteristicVector[CharacteristicVector.RELEVANT_NODES.FunctionExpression]++;
            }
        }
        catch(e) { alert("Error when generating vector from function: " + e);}
    },

    generateVectorForProgram: function(program)
    {
        try
        {
            if(!ASTHelper.isProgram(program)) { alert("Sent argument is not a program when generating vector!"); return; }

            program.characteristicVector = new CharacteristicVector();

            program.body.forEach(function(programStatement)
            {
               this.generate(programStatement);
               program.characteristicVector.join(programStatement.characteristicVector);
            }, this);
        }
        catch(e) { alert("Error when generating vector from program: " + e); }
    },

    generateVectorForVariableDeclaration: function(variableDeclaration)
    {
        try
        {
            if(!ASTHelper.isVariableDeclaration(variableDeclaration)) { alert("Sent argument is not a variable declaration when generating vector!"); return; }

            variableDeclaration.characteristicVector = new CharacteristicVector();

            variableDeclaration.declarations.forEach(function(declarator)
            {
                this.generate(declarator);
                variableDeclaration.characteristicVector.join(declarator.characteristicVector);
            }, this);

            variableDeclaration.characteristicVector[CharacteristicVector.RELEVANT_NODES.VariableDeclaration]++;
        }
        catch(e) { alert("Error when generating vector from variable declaration: " + e); }
    },

    generateVectorForVariableDeclarator: function(variableDeclarator)
    {
        try
        {
            if(!ASTHelper.isVariableDeclarator(variableDeclarator)) { alert("Sent argument is not a variable declarator when generating vector!"); return; }

            variableDeclarator.characteristicVector = new CharacteristicVector();

            this.generate(variableDeclarator.id);
            variableDeclarator.characteristicVector.join(variableDeclarator.id.characteristicVector);

            if(variableDeclarator.init != null)
            {
                this.generate(variableDeclarator.init);
                variableDeclarator.characteristicVector.join(variableDeclarator.init.characteristicVector);
            }

            variableDeclarator.characteristicVector[CharacteristicVector.RELEVANT_NODES.VariableDeclarator]++;
        }
        catch(e) { alert("Error when generating vector for variableDeclarator: " + e); }
    },

    generateVectorForIdentifier: function(identifier)
    {
        try
        {
            if(!ASTHelper.isIdentifier(identifier)) { alert("Sent argument is not an identifier when generating vector!"); return; }

            identifier.characteristicVector = new CharacteristicVector();
            identifier.characteristicVector[CharacteristicVector.RELEVANT_NODES.Identifier]++;
        }
        catch(e) { alert("Error when generating vector for identifier: " + e); }
    },

    generateVectorForLiteral: function(literal)
    {
        try
        {
            if(!ASTHelper.isLiteral(literal)) { alert("Sent argument is not a literal when generating vector!"); return; }

            literal.characteristicVector = new CharacteristicVector();

            if(ValueTypeHelper.isNull(literal.value)) { literal.characteristicVector[CharacteristicVector.RELEVANT_NODES.NullLiteral]++; }
            else if(ValueTypeHelper.isString(literal.value)) { literal.characteristicVector[CharacteristicVector.RELEVANT_NODES.StringLiteral]++; }
            else if(ValueTypeHelper.isNumber(literal.value)) { literal.characteristicVector[CharacteristicVector.RELEVANT_NODES.NumberLiteral]++; }
            else if(ValueTypeHelper.isBoolean(literal.value)){ literal.characteristicVector[CharacteristicVector.RELEVANT_NODES.BooleanLiteral]++; }
            else if(ValueTypeHelper.isRegExp(literal.value)){ literal.characteristicVector[CharacteristicVector.RELEVANT_NODES.RegExLiteral]++; }
            else {alert("Unknown literal when generating vector!"); return; }
        }
        catch(e) { alert("Error when generating vector for literal: " + e); }
    },
    
    generateVectorForTryStatement: function(tryStatement)
    {
        try
        {
            if(!ASTHelper.isTryStatement(tryStatement)) { alert("Sent argument is not a try statement when generating vector!"); return; }

            tryStatement.characteristicVector = new CharacteristicVector();

            this.generate(tryStatement.block);

            tryStatement.characteristicVector.join(tryStatement.block.characteristicVector);

            tryStatement.handlers.forEach(function(catchClause)
            {
                this.generate(catchClause);
                tryStatement.characteristicVector.join(catchClause.characteristicVector);
            }, this);

            if(tryStatement.finalizer != null)
            {
                this.generate(tryStatement.finalizer);
                tryStatement.characteristicVector.join(tryStatement.finalizer.characteristicVector);
            }

            tryStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.TryStatement]++;
        }
        catch (e) { alert ("Error when generating vector for Try Statement: " + e); }
    },

    generateVectorForCatchClause: function(catchClause)
    {
        try
        {
            if(!ASTHelper.isCatchClause(catchClause)) { alert("Sent argument is not a catch clause when generating vector!"); return; }

            catchClause.characteristicVector = new CharacteristicVector();

            this.generate(catchClause.body);

            catchClause.characteristicVector.join(catchClause.body.characteristicVector);

            catchClause.characteristicVector[CharacteristicVector.RELEVANT_NODES.CatchClause]++;
        }
        catch (e) { alert ("Error when generating vector for Catch Clause: " + e); }
    },
    
    generateVectorForIfStatement: function(ifStatement)
	{
		try
		{
	    	if(!ASTHelper.isIfStatement(ifStatement)) { alert("Sent argument is not an if statement when generating vector!"); return; }	
			
	        ifStatement.characteristicVector = new CharacteristicVector();
	
	        this.generate(ifStatement.test);       
	             
	        ifStatement.characteristicVector.join(ifStatement.test.characteristicVector);
	        
	        if (ifStatement.consequent != null) 
	        {
		        this.generate(ifStatement.consequent);
		        
		        ifStatement.characteristicVector.join(ifStatement.consequent.characteristicVector);
	        }
	        
	        if (ifStatement.alternate != null) 
	        {
	        	this.generate(ifStatement.alternate);
	        	ifStatement.characteristicVector.join(ifStatement.alternate.characteristicVector);	       	        
	        }
	        
	       
	        ifStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.IfStatement]++;
		}
		catch (e) { alert ("Error when generating vector for If Statement:" + e); }            

	}
    
};

	

function CharacteristicVector()
{
    for(var propertyName in CharacteristicVector.RELEVANT_NODES)
    {
        this[propertyName] = 0;
    }

    this.join = function(characteristicVector)
    {
        try
        {
            if(characteristicVector == null) { alert("When joining vectors the vector can not be null!"); return; }

            for(var propertyName in CharacteristicVector.RELEVANT_NODES)
            {
                this[propertyName] += characteristicVector[propertyName];
            }
        }
        catch(e) { alert("Error when joining vectors: " + e); }
    };
};

CharacteristicVector.RELEVANT_NODES =
{
    FunctionDeclaration: "FunctionDeclaration",
    VariableDeclaration: "VariableDeclaration",
    VariableDeclarator: "VariableDeclarator",
    SwitchCase: "SwitchCase",
    CatchClause: "CatchClause",
    Identifier: "Identifier",
    StringLiteral: "StringLiteral",
    NumberLiteral: "NumberLiteral",
    BooleanLiteral: "BooleanLiteral",
    NullLiteral: "NullLiteral",
    RegExLiteral: "RegExLiteral",

    IfStatement: "IfStatement",
    LabeledStatement: "LabeledStatement",
    BreakStatement: "BreakStatement",
    ContinueStatement: "ContinueStatement",
    WithStatement: "WithStatement",
    SwitchStatement: "SwitchStatement",
    ReturnStatement: "ReturnStatement",
    ThrowStatement: "ThrowStatement",
    TryStatement: "TryStatement",
    WhileStatement: "WhileStatement",
    DoWhileStatement: "DoWhileStatement",
    ForStatement: "ForStatement",
    ForInStatement: "ForInStatement",
    LetStatement: "LetStatement",
    DebuggerStatement: "DebuggerStatement",

    ThisExpression : "ThisExpression",
    ArrayExpression: "ArrayExpression",
    ObjectExpression: "ObjectExpression",
    FunctionExpression: "FunctionExpression",
    SequenceExpression: "SequenceExpression",

    UnaryMathExpression: "UnaryMathExpression",
    UnaryBitExpression: "UnaryBitExpression",
    UnaryLogicalExpression: "UnaryLogicalExpression",
    UnaryObjectExpression: "UnaryObjectExpression",

    BinaryEqualityExpression: "BinaryEqualityExpression",
    BinaryMathExpression: "BinaryMathExpression",
    BinaryRelationalExpression: "BinaryRelationalExpression",
    BinaryBitExpression: "BinaryBitExpression",
    BinaryObjectExpression: "BinaryObjectExpression",
    BinaryXmlExpression: "BinaryXmlExpression",

    AssignmentExpression: "AssignmentExpression",
    UpdateExpression: "UpdateExpression",
    LogicalExpression: "LogicalExpression",
    ConditionalExpression: "ConditionalExpression",
    NewExpression: "NewExpression",
    CallExpression: "CallExpression",
    MemberExpression: "MemberExpression",
    YieldExpression: "YieldExpression",
    ComprehensionExpression: "ComprehensionExpression",
    GeneratorExpression: "GeneratorExpression",
    LetExpression: "LetExpression"
};