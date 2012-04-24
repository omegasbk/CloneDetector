/**
 * Created by Jomaras.
 * Date: 28.03.12.@07:45
 */
var VectorGenerator = {
    generate: function(astElement)
    {
        try
        {
            if(ASTHelper.isProgram(astElement)) { this.generateVectorForProgram(astElement);}
            else if (ASTHelper.isFunction(astElement)) { this.generateVectorForFunction(astElement); }
            else if (ASTHelper.isBlockStatement(astElement)) { this.generateVectorForBlockStatement(astElement); }
            else if (ASTHelper.isVariableDeclaration(astElement)) { this.generateVectorForVariableDeclaration(astElement); }
            else if (ASTHelper.isVariableDeclarator(astElement)) { this.generateVectorForVariableDeclarator(astElement); }
            
            //********************************************************LOOPS******************************************************

            else if (ASTHelper.isForStatement(astElement)) { this.generateVectorForForStatement(astElement); }
            else if (ASTHelper.isForInStatement(astElement)) { this.generateVectorForForInStatement(astElement); }
            
            else if (ASTHelper.isWhileStatement(astElement)) { this.generateVectorForWhileStatement(astElement); }
            else if (ASTHelper.isDoWhileStatement(astElement)) { this.generateVectorForDoWhileStatement(astElement); }
            
            
           //*********************************************************************************************************************

            else if (ASTHelper.isObjectExpression(astElement)) { this.generateVectorForObjectExpression(astElement); }
            else if (ASTHelper.isMemberExpression(astElement)) { this.generateVectorForMemberExpression(astElement); }
            else if (ASTHelper.isWithStatement(astElement)) { this.generateVectorForWithStatement(astElement); }
            
            
            else if (ASTHelper.isThisExpression(astElement)) { this.generateVectorForThisExpression(astElement); }
            else if (ASTHelper.isArrayExpression(astElement)) { this.generateVectorForArrayExpression(astElement); }
            
            
            
            
            
            else if (ASTHelper.isNewExpression(astElement)) { this.generateVectorForNewExpression(astElement); }
            
            else if (ASTHelper.isSequenceExpression(astElement)) { this.generateVectorForSequenceExpression(astElement); }
            
            else if (ASTHelper.isBreakStatement(astElement)) { this.generateVectorForBreakStatement(astElement); }
            else if (ASTHelper.isContinueStatement(astElement)) { this.generateVectorForContinueStatement(astElement); }
            
            else if (ASTHelper.isIfStatement(astElement)) { this.generateVectorForIfStatement(astElement); }
            else if (ASTHelper.isSwitchStatement(astElement)) { this.generateVectorForSwitchStatement(astElement); }
            else if (ASTHelper.isSwitchCase(astElement)) { this.generateVectorForSwitchCase(astElement); }
            else if (ASTHelper.isConditionalExpression(astElement)) { this.generateVectorForConditionalExpression(astElement); }
            
            else if(ASTHelper.isReturnStatement(astElement)) { this.generateVectorForReturnStatement(astElement); }
            
            else if(ASTHelper.isThrowStatement(astElement)) { this.generateVectorForThrowStatement(astElement); }
            
            else if (ASTHelper.isTryStatement(astElement)) { this.generateVectorForTryStatement(astElement); }
            else if (ASTHelper.isCatchClause(astElement)) { this.generateVectorForCatchClause(astElement); }

            else if (ASTHelper.isExpressionStatement(astElement)) { this.generateVectorForExpressionStatement(astElement); }
            else if (ASTHelper.isLabeledStatement(astElement)) { this.generateVectorForLabeledStatement(astElement); }
            
            else if (ASTHelper.isAssignmentExpression(astElement)) { this.generateVectorForAssignmentExpression(astElement); }
            
            else if (ASTHelper.isCallExpression(astElement)) { this.generateVectorForCallExpression(astElement); }
            
            //else if (ASTHelper.isLetStatement(astElement)) { this.generateVectorForLetStatement(astElement); }
            
            
            else if (ASTHelper.isUpdateExpression(astElement)) { this.generateVectorForUpdateExpression(astElement); }
            else if (ASTHelper.isLogicalExpression(astElement)) { this.generateVectorForLogicalExpression(astElement); }
            else if (ASTHelper.isUnaryExpression(astElement)) { this.generateVectorForUnaryExpression(astElement); }
            else if (ASTHelper.isBinaryExpression(astElement)) { this.generateVectorForBinaryExpression(astElement); }
            else if (ASTHelper.isIdentifier(astElement)) { this.generateVectorForIdentifier(astElement); }
            else if (ASTHelper.isLiteral(astElement)) { this.generateVectorForLiteral(astElement); }
            
            
            //NETESTIRANI
            
            else if (ASTHelper.isYieldExpression(astElement)) { this.generateVectorForYieldExpression(astElement); }
            else if (ASTHelper.isComprehensionExpression(astElement)) { this.generateVectorForComprehensionExpression(astElement); }
            else if (ASTHelper.isGeneratorExpression(astElement)) { this.generateVectorForGeneratorExpression(astElement); }
            
            else if (ASTHelper.isPattern(astElement)) { this.generateVectorForPattern(astElement); }
           
            //else if (ASTHelper.isComprehensionBlock(astElement)) { this.generateVectorForComprehensionBlock(astElement); }
            
            else { alert("Unhandled element when generating vector: " + astElement.type); }
        }
        catch(e)
        {
            alert("Error when generating vector: " + e);
        }
    },

   
    generateVectorForPattern: function(pattern)
    {
        try
        {
            if(!ASTHelper.isPattern(pattern)) { alert("Sent argument is not a pattern when generating vector!"); return; }

            pattern.characteristicVector = new CharacteristicVector();
            

           if (ASTHelper.isArrayPattern(pattern))
            {
            	 if(!ASTHelper.isArrayPattern(pattern)) { alert("Sent argument is not an array pattern when generating vector!"); return; }
            	 
            	
 
                 pattern.elements.forEach(function(pattern)
                        {
                	 
                			if(pattern.elements != null)
                			{
                				this.generate(elements);
                				pattern.characteristicVector.join(pattern.elements.characteristicVector);                		        				
                			}
                        }, this);

                 pattern.characteristicVector[CharacteristicVector.RELEVANT_NODES.ArrayPattern]++;
                
            }
            else if (ASTHelper.isObjectPattern(pattern))
            {
            	 if(!ASTHelper.isObjectPattern(pattern)) { alert("Sent argument is not an object pattern when generating vector!"); return; }

                
                pattern.properties.forEach(function(pattern)
                        {
                            this.generate(pattern.key);
                            pattern.characteristicVector.join(pattern.key.characteristicVector);
                            this.generate(pattern.value);
                            pattern.characteristicVector.join(pattern.value.characteristicVector);
                        }, this);
                
                pattern.characteristicVector[CharacteristicVector.RELEVANT_NODES.ObjectPattern]++;              
                
            }
        }
        catch(e) { alert("Error when generating vector from Pattern"); }
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
        catch(e) { alert("Error when generating vector for Block Statement: " + e);}
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
    	catch ( e ) { alert("Error when generating vector for Labeled Statement: " + e);}
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
    		                callExpression.characteristicVector.join(arguments.characteristicVector);
    		            }, this);
    		
    		 callExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.CallExpression]++;
     	    
    		 
    	}
    	catch (e) { alert("Error when generating vector for Call Expression: " + e); }
    	
    },
    
    
    generateVectorForObjectExpression: function(objectExpression)
    {
    	try
    	{
    		if(!ASTHelper.isObjectExpression(objectExpression)) { alert("Sent argument is not an object expression when generating vector!"); return; }
    		 
    		objectExpression.characteristicVector = new CharacteristicVector();
    		 
    		objectExpression.properties.forEach(function(properties)
    					{
    						
	   		                this.generate(properties.key);
	   		                objectExpression.characteristicVector.join(properties.key.characteristicVector);
	   		                
	   		                this.generate(properties.value);
	   		                objectExpression.characteristicVector.join(properties.value.characteristicVector);
	   		               
	   		                if(properties.kind == "init") objectExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.ObjectInitExpression]++;
	   		                if(properties.kind == "get") objectExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.ObjectGetExpression]++;
	   		                if(properties.kind == "set") objectExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.ObjectSetExpression]++; 		             
 		                	   		                
	   		            }, this);
    		  		 	
    		//NEMA KIND PROPERTY-a 
    		
    		 objectExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.ObjectExpression]++;
      	    
	    }
    	catch (e) { alert("Error when generating vector for Object Expression: " + e); }
    },
    
    generateVectorForMemberExpression: function(memberExpression)
    {
    	try
    	{

    		if(!ASTHelper.isMemberExpression(memberExpression)) { alert("Sent argument is not a member expression when generating vector!"); return; }
    		 
    		memberExpression.characteristicVector = new CharacteristicVector();
    		
    		this.generate(memberExpression.object);
            memberExpression.characteristicVector.join(memberExpression.object.characteristicVector);
              
            this.generate(memberExpression.property);
            memberExpression.characteristicVector.join(memberExpression.property.characteristicVector);
               
            
    		memberExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.MemberExpression]++;
       	    
    	}
    	catch (e) { alert("Error when generating vector for Member Expression: " + e); }
    },
    
    generateVectorForWithStatement: function (withStatement)
    {
    	try
    	{
    		if(!ASTHelper.isWithStatement(withStatement)) { alert("Sent argument is not a with statement when generating vector!"); return; }
   		 
    		withStatement.characteristicVector = new CharacteristicVector();
    		
    		this.generate(withStatement.object);
            withStatement.characteristicVector.join(withStatement.object.characteristicVector);
              
            this.generate(withStatement.body);
            withStatement.characteristicVector.join(withStatement.body.characteristicVector);
            
    		withStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.WithStatement]++;
       	    
    	}
    	catch (e) { alert("Error when generating vector for With Statement: " + e); }
    },
    
    
    generateVectorForThisExpression: function (thisExpression)
    {
    	try
    	{
    		if(!ASTHelper.isThisExpression(thisExpression)) { alert("Sent argument is not a this expression when generating vector!"); return; }
      		 
    		thisExpression.characteristicVector = new CharacteristicVector();
    		
    		thisExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.ThisExpression]++;
       	    
    		
    	}
    	catch (e) { alert("Error when generating vector for This Expression: " + e); }
    	
    },
    
    generateVectorForArrayExpression: function (arrayExpression)
    {
    	try
    	{

    		if(!ASTHelper.isArrayExpression(arrayExpression)) { alert("Sent argument is not an array expression when generating vector!"); return; }
   		 
    		arrayExpression.characteristicVector = new CharacteristicVector();
    		
    		this.generate(arrayExpression.elements);
    		arrayExpression.elements.forEach(function(elements)
		            {
		    			if (arrayExpression.elements != null)
		        		{		
				                 this.generate(elements);
				                 arrayExpression.characteristicVector.join(elements.characteristicVector);
		        		}
		            }, this);
    		    		 
    		arrayExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.ArrayExpression]++;
       	    
    		
    		
    	}
    	catch (e) { alert("Error when generating vector for Array Expression: " + e); }
    	
    	
    },
    
    generateVectorForNewExpression: function (newExpression)
    {
    	try
    	{
    		if(!ASTHelper.isNewExpression(newExpression)) { alert("Sent argument is not a new expression when generating vector!"); return; }
      		 
    		newExpression.characteristicVector = new CharacteristicVector();
    		
    		
    		//NE VALJA CONSTUCTOR, MISLIM DA JE NETOCNO NAPISANO NA PAPIRU
    		/*
    		this.generate(newExpression.constructor);
            newExpression.characteristicVector.join(newExpression.constructor.characteristicVector);
            */
            newExpression.arguments.forEach(function(arguments)
                    {
                        this.generate(arguments);
                        newExpression.characteristicVector.join(arguments.characteristicVector);
                    }, this);

    		
    		newExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.NewExpression]++;
       	    
    	}
    	catch (e) { alert("Error when generating vector for New Expression: " + e); }
    },
    
    generateVectorForSwitchStatement: function (switchStatement)
    {
    	try
    	{
    		if(!ASTHelper.isSwitchStatement(switchStatement)) { alert("Sent argument is not a switch statement when generating vector!"); return; }
     		 
    		switchStatement.characteristicVector = new CharacteristicVector();
    		
    		this.generate(switchStatement.discriminant);
			switchStatement.characteristicVector.join(switchStatement.discriminant.characteristicVector);
			
			switchStatement.cases.forEach(function(cases)
		            {
		                 this.generate(cases);
		                 switchStatement.characteristicVector.join(cases.characteristicVector);
		            }, this);
    		
    		switchStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.SwitchStatement]++;
       	    
    	}
    	catch (e) { alert("Error when generating vector for Switch Statement: " + e); }
    },
    
    generateVectorForSwitchCase: function (switchCase)
    {
    	try
    	{
    		if(!ASTHelper.isSwitchCase(switchCase)) { alert("Sent argument is not a switch case when generating vector!"); return; }
     		 
    		switchCase.characteristicVector = new CharacteristicVector();
    		
    		if(switchCase.test != null)
    		{
    			 this.generate(switchCase.test);
    			 switchCase.characteristicVector.join(switchCase.test.characteristicVector);    	            
    		}
    		
    		switchCase.consequent.forEach(function(consequent)
            {
                 this.generate(consequent);
                 switchCase.characteristicVector.join(consequent.characteristicVector);
            }, this);

    		switchCase.characteristicVector[CharacteristicVector.RELEVANT_NODES.SwitchCase]++;
       	    
    	}
    	catch (e) { alert("Error when generating vector for Switch Case: " + e); }
    },
    
    generateVectorForConditionalExpression: function (conditionalExpression)
    {
    	try
    	{
    		if(!ASTHelper.isConditionalExpression(conditionalExpression)) { alert("Sent argument is not a conditional expression when generating vector!"); return; }
     		 
    		conditionalExpression.characteristicVector = new CharacteristicVector();
    		
    		this.generate(conditionalExpression.test);
    		conditionalExpression.characteristicVector.join(conditionalExpression.test.characteristicVector);    	            
    		
    		this.generate(conditionalExpression.alternate);
    		conditionalExpression.characteristicVector.join(conditionalExpression.alternate.characteristicVector);
    		
    		this.generate(conditionalExpression.consequent);
    		conditionalExpression.characteristicVector.join(conditionalExpression.consequent.characteristicVector);
    		
    		conditionalExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.ConditionalExpression]++;
       	    
    	}
    	catch (e) { alert("Error when generating vector for Conditional Expression: " + e); }
    },
    
    
    generateVectorForReturnStatement: function (returnStatement)
    {
    	try
    	{
    		if(!ASTHelper.isReturnStatement(returnStatement)) { alert("Sent argument is not a return statement when generating vector!"); return; }

            returnStatement.characteristicVector = new CharacteristicVector();       
            
            if( returnStatement.argument != null)
            {
            	this.generate(returnStatement.argument);
            	returnStatement.characteristicVector.join(returnStatement.argument.characteristicVector);
                
            }

     		returnStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.ReturnStatement]++;    	

    	}
    	catch (e) { alert("Error when generating vector for Return Statement: " + e); }
    },
    
    generateVectorForThrowStatement: function (throwStatement)
    {
    	try
    	{
    		if(!ASTHelper.isThrowStatement(throwStatement)) { alert("Sent argument is not a throw statement when generating vector!"); return; }

            throwStatement.characteristicVector = new CharacteristicVector();       
            
            if( throwStatement.argument != null)
            {
            	this.generate(throwStatement.argument);
            	throwStatement.characteristicVector.join(throwStatement.argument.characteristicVector);
                
            }

     		throwStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.ThrowStatement]++;    	

    	}
    	catch (e) { alert("Error when generating vector for Throw Statement: " + e); }
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
        catch(e) { alert("Error when generating vector for Expression Statement: " + e); }
    },
    
    generateVectorForAssignmentExpression: function(assignmentExpression)

    {
    	try
    	{
    		if(!ASTHelper.isAssignmentExpression(assignmentExpression)) { alert("Sent argument is not a assignment expression when generating vector!"); return; }
    	
    		assignmentExpression.characteristicVector = new CharacteristicVector();
    		
    		this.generate(assignmentExpression.left);
            //this.generate(assignmentExpression.right);
    		
    		assignmentExpression.characteristicVector.join(assignmentExpression.left.characteristicVector);
    		
    		//assignmentExpression.characteristicVector.join(assignmentExpression.right.characteristicVector);    		
    		
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
    
    generateVectorForSequenceExpression: function(sequenceExpression)
    {
    	try
    	{
    		if(!ASTHelper.isSequenceExpression(sequenceExpression)) { alert("Sent argument is not a sequence expression when generating vector!"); return; }

            sequenceExpression.characteristicVector = new CharacteristicVector();
            
            sequenceExpression.expressions.forEach(function(expressions)
    	            {
    	            	this.generate(expressions);
    	                sequenceExpression.characteristicVector.join(expressions.characteristicVector);
    	            }, this);
            
            sequenceExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.SequenceExpression]++;

    	}
    	catch (e) { alert ("Error when generating vector for Sequence Expression: " + e); }
    },

    generateVectorForVariableDeclaration: function(variableDeclaration)
    {
        try
        {
            if(!ASTHelper.isVariableDeclaration(variableDeclaration)) { alert("Sent argument is not a variable declaration when generating vector!"); return; }

            variableDeclaration.characteristicVector = new CharacteristicVector();
            
            if (variableDeclaration.kind == "let") variableDeclaration.characteristicVector[CharacteristicVector.RELEVANT_NODES.LetStatement]++;
            
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
	
	generateVectorForForInStatement: function (forinStatement)
	{
		try
		{
			if(!ASTHelper.isForInStatement(forinStatement)) { alert("Sent argument is not a for in statement when generating vector!"); return; }
			
			forinStatement.characteristicVector = new CharacteristicVector();
			
			this.generate(forinStatement.left);
			forinStatement.characteristicVector.join(forinStatement.left.characteristicVector);			
			
			this.generate(forinStatement.right);
			forinStatement.characteristicVector.join(forinStatement.right.characteristicVector);			
						
			this.generate(forinStatement.body);
			forinStatement.characteristicVector.join(forinStatement.body.characteristicVector);			
			
			forinStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.ForInStatement]++;
			
			
			//MISLIM DA JE EACH NEBITAN (each:boolean) =)
		}
		catch (e) { alert("Error when generating vector for for in statement: " + e); }
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
	
	/**
	generateVectorForLetStatement: function (letStatement)
	{
		try
		{
			if(!ASTHelper.isLetStatement(letStatement)) { alert("Sent argument is not a let statement when generating vector!"); return; }
			
			letStatement.characteristicVector = new CharacteristicVector();
			
			
			
			letStatement.characteristicVector[CharacteristicVector.RELEVANT_NODES.LetStatement]++;
			
		}
		catch (e) { alert("Error when generating vector for Let Statement: " + e); }
		
	},*/
		
	
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
    },
    
    //NETESTIRANI
    generateVectorForYieldExpression: function (yieldExpression)
    {
    	try
    	{
    		if(!ASTHelper.isYieldExpression(yieldExpression)) { alert("Sent argument is not a yield expression when generating vector!"); return; }	
    		
    		yieldExpression.characteristicVector = new CharacteristicVector();
    		
    		if( yieldExpression.argument != null)
    		{
    			this.generate(yieldExpression.argument);
    			yieldExpression.characteristicVector.join(yieldExpression.argument.characteristicVector);    			
    		}
    			
    		yieldExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.YieldExpression]++;
    	}
    	catch (e) { alert ("Error when generating vector for Yield Expression: " + e); }
    },
    
    generateVectorForComprehensionExpression: function (comprehensionExpression)
    {
    	try
    	{
    		if(!ASTHelper.isComprehensionExpression(comprehensionExpression)) { alert("Sent argument is not a comprehension expression when generating vector!"); return; }	
    		
    		comprehensionExpression.characteristicVector = new CharacteristicVector();
    		
    		this.generate(comprehensionExpression.body);
    		comprehensionExpression.characteristicVector.join(comprehensionExpression.body.characteristicVector);
    		

            comprehensionExpression.blocks.forEach(function(comprehensionExpression)
            {
                this.generate(comprehensionExpression);
                comprehensionExpression.characteristicVector.join(comprehensionExpression.blocks.characteristicVector);
            }, this);
    		
    		
    		if( comprehensionExpression.filter != null)
    		{
    			this.generate(comprehensionExpression.filter);
    			comprehensionExpression.characteristicVector.join(comprehensionExpression.filter.characteristicVector);    			
    		}
    			
    		comprehensionExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.ComprehensionExpression]++;
    	}
    	catch (e) { alert ("Error when generating vector for Comprehension Expression: " + e); }
    },
    
    generateVectorForGeneratorExpression: function (generatorExpression)
    {
    	try
    	{
    		if(!ASTHelper.isGeneratorExpression(generatorExpression)) { alert("Sent argument is not a generator expression when generating vector!"); return; }	
    		
    		generatorExpression.characteristicVector = new CharacteristicVector();
    		
    		this.generate(generatorExpression.body);
    		generatorExpression.characteristicVector.join(generatorExpression.body.characteristicVector);
    		

            generatorExpression.blocks.forEach(function(generatorExpression)
            {
                this.generate(generatorExpression);
                generatorExpression.characteristicVector.join(generatorExpression.blocks.characteristicVector);
            }, this);
    		
    		
    		if( generatorExpression.filter != null)
    		{
    			this.generate(generatorExpression.filter);
    			generatorExpression.characteristicVector.join(generatorExpression.filter.characteristicVector);    			
    		}
    			
    		generatorExpression.characteristicVector[CharacteristicVector.RELEVANT_NODES.GeneratorExpression]++;
    	}
    	catch (e) { alert ("Error when generating vector for Generator Expression: " + e); }
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
    
    
    
    ObjectInitExpression: "ObjectInitExpression",    
    ObjectGetExpression: "ObjectGetExpression",
    ObjectSetExpression: "ObjectSetExpression",
    
    
    
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
    LetExpression: "LetExpression",

    ArrayPattern: "ArrayPattern",
    ObjectPattern: "ObjectPattern"
};