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
            
            //********************************************************LOOPS******************************************************
            
            
            else if (ASTHelper.isForStatement(astElement)) { this.generateVectorForForStatement(astElement); }    
            else if (ASTHelper.isWhileStatement(astElement)) { this.generateVectorForWhileStatement(astElement); }   
            else if (ASTHelper.isDoWhileStatement(astElement)) { this.generateVectorForDoWhileStatement(astElement); }    
            
            
            
            
            
           //*********************************************************************************************************************

            
            
            else if (ASTHelper.isBreakStatement(astElement)) { this.generateVectorForBreakStatement(astElement); }
            else if (ASTHelper.isContinueStatement(astElement)) { this.generateVectorForContinueStatement(astElement); }
            
            else if (ASTHelper.isIfStatement(astElement)) { this.generateVectorForIfStatement(astElement); }
            else if (ASTHelper.isTryStatement(astElement)) { this.generateVectorForTryStatement(astElement); }
            else if (ASTHelper.isCatchClause(astElement)) { this.generateVectorForCatchClause(astElement); }

            else if (ASTHelper.isExpressionStatement(astElement)) { this.generateVectorForExpressionStatement(astElement); }
            else if (ASTHelper.isLabeledStatement(astElement)) { this.generateVectorForLabeledStatement(astElement); }
            
            else if (ASTHelper.isAssignmentExpression(astElement)) { this.generateVectorForAssignmentExpression(astElement); }
            
            else if (ASTHelper.isCallExpression(astElement)) { this.generateVectorForCallExpression(astElement); }
            
            else if (ASTHelper.isUpdateExpression(astElement)) { this.generateVectorForUpdateExpression(astElement); }
            else if (ASTHelper.isLogicalExpression(astElement)) { this.generateVectorForLogicalExpression(astElement); }
            else if (ASTHelper.isUnaryExpression(astElement)) { this.generateVectorForUnaryExpression(astElement); }
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
        catch(e) { alert("Error when generating vector for block statement: " + e);}
    },
    
    generateVectorForLabeledStatement: function(labeledStatement)
    {
    	try
    	{
    		  if(!ASTHelper.isLabeledStatement(labeledStatement)) { alert("Sent argument is not a labeled statement when generating vector!"); return; }
    		  
    		  labeledStatement.characteristicVector = new CharacteristicVector();
    		  
    		  this.generate(labeledStatement.label);
    		  this.generate(labeledStatement.body);
    		  
    		 labeledStatement.characteristicVector.join(labeledStatement.label.characteristicVector);
    		 labeledStatement.characteristicVector.join(labeledStatement.body.characteristicVector);
   		      		  	  
    		 labeledStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.LabeledStatement]++;
    	    	
    	}
    	catch ( e ) { alert("Error when generating vector for labeled statement: " + e);}
    },
    
    generateVectorForCallExpression: function(callExpression)
    {
    	try
    	{
    		 if(!ASTHelper.isCallExpression(callExpression)) { alert("Sent argument is not a call expression when generating vector!"); return; }
    		 
    		 callExpression.characteristicVector = new CharacteristicVector();
    		 
    		 callExpression.arguments.forEach(function(arguments)
    		            {
    		                this.generate(arguments);
    		                callExpression.
    		                characteristicVector.join(arguments.characteristicVector);
    		            }, this);
    		
    		 callExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.CallExpression]++;
     	    
    		 
    	}
    	catch (e) { alert("Error when generating vector for call expression: " + e);}
    	
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
        catch(e) { alert("Error when generating vector for expressionStatement: " + e); }
    },
    
    generateVectorForAssignmentExpression: function(assignmentExpression)

    {
    	try
    	{
    		if(!ASTHelper.isAssignmentExpression(assignmentExpression)) { alert("Sent argument is not a assignment expression when generating vector!"); return; }
    	
    		assignmentExpression.characteristicVector = new CharacteristicVector();
    		
    		this.generate(assignmentExpression.left);
            this.generate(assignmentExpression.right);
    		
    		assignmentExpression.characteristicVector.join(assignmentExpression.left.characteristicVector);
    		
    		assignmentExpression.characteristicVector.join(assignmentExpression.right.characteristicVector);    		
    		
    		assignmentExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.AssignmentExpression]++;
    	
    	}
    	catch (e) { alert("Error when generating vector for Assignment Expression: " + e); }
    },

    generateVectorForUnaryExpression: function(unaryExpression)
    {
    	try
    	{
    		if(!ASTHelper.isUnaryExpression(unaryExpression)) { alert("Sent argument is not an unary expression when generating vector!"); return; }
    		
    		unaryExpression.characteristicVector = new CharacteristicVector();

            this.generate(unaryExpression.argument);          
            unaryExpression.characteristicVector.join(unaryExpression.argument.characteristicVector);
    		
    		if(ASTHelper.isUnaryMathOperator(unaryExpression.operator))
            {
                unaryExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.UnaryMathExpression]++;
            }
            else if (ASTHelper.isUnaryLogicalOperator(unaryExpression.operator))
            {
                unaryExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.UnaryLogicalExpression]++;
            }
            else if (ASTHelper.isUnaryBitOperator(unaryExpression.operator))
            {
                unaryExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.UnaryBitExpression]++;
            }
            else if (ASTHelper.isUnaryObjectOperator(unaryExpression.operator))
            {
                unaryExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.UnaryObjectExpression]++;
            }
    	}
    	catch (e) { alert("Error when generating vector for Unary Expression: " + e); }
    	
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
        catch(e) { alert("Error when generating vector for Binary Expression: " + e);}
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
        catch(e) { alert("Error when generating vector for Function: " + e);}
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
        catch(e) { alert("Error when generating vector for Program: " + e); }
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
        catch(e) { alert("Error when generating vector for Variable Declaration: " + e); }
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
        catch(e) { alert("Error when generating vector for Variable Declarator: " + e); }
    },

    generateVectorForIdentifier: function(identifier)
    {
        try
        {
            if(!ASTHelper.isIdentifier(identifier)) { alert("Sent argument is not an identifier when generating vector!"); return; }

            identifier.characteristicVector = new CharacteristicVector();
            identifier.characteristicVector[CharacteristicVector.RELEVANT_NODES.Identifier]++;
        }
        catch(e) { alert("Error when generating vector for Identifier: " + e); }
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
        catch(e) { alert("Error when generating vector for Literal: " + e); }
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
	        
	        this.generate(ifStatement.consequent);
		        
		    ifStatement.characteristicVector.join(ifStatement.consequent.characteristicVector);
	        
	        
	        if (ifStatement.alternate != null) 
	        {
	        	this.generate(ifStatement.alternate);
	        	ifStatement.characteristicVector.join(ifStatement.alternate.characteristicVector);	       	        
	        }
	        
	       
	        ifStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.IfStatement]++;
		}
		catch (e) { alert ("Error when generating vector for If Statement: " + e); }            

	},
	
	generateVectorForForStatement: function (forStatement)
	{
		try
		{
			if(!ASTHelper.isForStatement(forStatement)) { alert("Sent argument is not a for statement when generating vector!"); return; }
			
			forStatement.characteristicVector = new CharacteristicVector();
			
			
			if (forStatement.init != null)
			{
				this.generate(forStatement.init);
				forStatement.characteristicVector.join(forStatement.init.characteristicVector);
			}
			
			if (forStatement.test != null)
			{
				this.generate(forStatement.test);
				forStatement.characteristicVector.join(forStatement.test.characteristicVector);
			}
			
			if (forStatement.update != null)
			{
				this.generate(forStatement.update);
				forStatement.characteristicVector.join(forStatement.update.characteristicVector);
			}
			
			this.generate(forStatement.body);
			forStatement.characteristicVector.join(forStatement.body.characteristicVector);
			
			forStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.ForStatement]++;
			
			
		}
		catch (e) { alert("Error when generating vector for For Statement: " + e); }
		
	},
	
	generateVectorForWhileStatement: function (whileStatement)
	{
		try
		{
			if(!ASTHelper.isWhileStatement(whileStatement)) { alert("Sent argument is not a while statement when generating vector!"); return; }
			
			whileStatement.characteristicVector = new CharacteristicVector();
			
			this.generate(whileStatement.body);
			whileStatement.characteristicVector.join(whileStatement.body.characteristicVector);			
			
			this.generate(whileStatement.test);
			whileStatement.characteristicVector.join(whileStatement.test.characteristicVector);		
			
			whileStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.WhileStatement]++;
			
		}
		catch (e) { alert("Error when generating vector for While Statement: " + e); }
		
	},
	
	generateVectorForDoWhileStatement: function (dowhileStatement)
	{
		try
		{
			if(!ASTHelper.isDoWhileStatement(dowhileStatement)) { alert("Sent argument is not a do while statement when generating vector!"); return; }
			
			dowhileStatement.characteristicVector = new CharacteristicVector();
			
			this.generate(dowhileStatement.body);
			dowhileStatement.characteristicVector.join(dowhileStatement.body.characteristicVector);			
			
			this.generate(dowhileStatement.test);
			dowhileStatement.characteristicVector.join(dowhileStatement.test.characteristicVector);		
			
			dowhileStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.DoWhileStatement]++;
			
		}
		catch (e) { alert("Error when generating vector for DoWhile Statement: " + e); }
		
	},
	
	generateVectorForBreakStatement: function(breakStatement)
	{
		try
		{
			if(!ASTHelper.isBreakStatement(breakStatement)) { alert("Sent argument is not a break statement when generating vector!"); return; }	
			
			breakStatement.characteristicVector = new CharacteristicVector();		
			
			if(breakStatement.label != null)
			{
				this.generate(breakStatement.label);
				breakStatement.characteristicVector.join(breakStatement.label.characteristicVector);
			}
			
			breakStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.BreakStatement]++;
			
		}
		catch (e) { alert ("Error when generating vector for Break Statement: " + e); }
		
	}, 
	
	generateVectorForContinueStatement: function(continueStatement)
	{
		try
		{
			if(!ASTHelper.isContinueStatement(continueStatement)) { alert("Sent argument is not a continue statement when generating vector!"); return; }	
			
			continueStatement.characteristicVector = new CharacteristicVector();		
			
			if(continueStatement.label != null)
			{
				this.generate(continueStatement.label);
				continueStatement.characteristicVector.join(continueStatement.label.characteristicVector);
			}
			
			continueStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.ContinueStatement]++;
			
		}
		catch (e) { alert ("Error when generating vector for Continue Statement: " + e); }
	},
		
    generateVectorForUpdateExpression: function(updateExpression)
    {
    	try
    	{
    		if(!ASTHelper.isUpdateExpression(updateExpression)) { alert("Sent argument is not an update expression when generating vector!"); return; }	
			
    		updateExpression.characteristicVector = new CharacteristicVector();
    		
    		this.generate(updateExpression.argument);
    		
    		updateExpression.characteristicVector.join(updateExpression.argument.characteristicVector);
    				
	        updateExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.UpdateExpression]++;
    	}
    	catch (e) { alert ("Error when generating vector for Update Expression: " + e); }
    },
    
    generateVectorForLogicalExpression: function (logicalExpression)
    {
    	try
    	{
    		if(!ASTHelper.isLogicalExpression(logicalExpression)) { alert("Sent argument is not a logical expression when generating vector!"); return; }	
    		
    		logicalExpression.characteristicVector = new CharacteristicVector();
    		
    		this.generate(logicalExpression.left);
    		this.generate(logicalExpression.right);
    		

            logicalExpression.characteristicVector.join(logicalExpression.left.characteristicVector);
            logicalExpression.characteristicVector.join(logicalExpression.right.characteristicVector);

    		
    		logicalExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.LogicalExpression]++;
    	}
    	catch (e) { alert ("Error when generating vector for Logical Expression: " + e); }
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