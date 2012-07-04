var MergeableNodeDetector = {
		
		getMergeableNodes: function(program)
	    {
	        var mergeableNodes = [];

	        var allFunctions = ASTHelper.getAllFunctions(program);

	        var directProgramChildren = program.children;

	        ValueTypeHelper.pushAll(mergeableNodes, this.getMergeableNodesFromNodeList(directProgramChildren));

	        allFunctions.forEach(function(functionElement)
	        {
	            ValueTypeHelper.pushAll(mergeableNodes, this.getMergeableNodesFromNodeList(functionElement.children));
	        }, this);

	        return mergeableNodes;
	    },

	    getMergeableNodesFromNodeList: function(statements)
	    {
	         var mergeableNodes = [];
	         minNumberOfTokens = 4;

	         statements.forEach(function(statement)
	         {
	             if(statement.characteristicVector.sum() >= this.minNumberOfTokens)
	             {
	                mergeableNodes.push(statement);
	             }
	         });


	         return mergeableNodes;
	    }, 
	    
	    getChildrenCombinations: function(mergeableNodes)
	    {
	    	var mergeableNodesChildren = [];
	    	var childrenCombinations = [];
	    	var brojac = 0;
	    	
	    	mergeableNodes.forEach(function(mergeableNode)
	    	{
	    		
	    		for(var i = 0; i < mergeableNode.children.length; i++)
	    		{
	    			brojac++;	
	    			var allCombinations = MathHelper.generateCombinations(mergeableNode.children.length, i+1);	    			
	    			
	    			for(var j = 0; j < allCombinations.length; j++)
	    			{
	    				var currentCombination = allCombinations[j];
	    				var currentCombinationNodes = [];
	    				
	    				for(var k = 0; k < currentCombination.length; k++)
	    				{
	    					currentCombinationNodes.push(mergeableNode.children[currentCombination[k]]);
	    				}
	    				
	    				childrenCombinations.push(currentCombinationNodes);
	    			}
	    		}
	    	});

	        //this._checkChildrenCombinations(childrenCombinations);
	   
	    	return childrenCombinations;	    	    	
	    },

        _checkChildrenCombinations: function(childrenCombinations)
        {
            var combinationIds = [];
            childrenCombinations.forEach
            (
                 function (childCombination)
                 {
                     var combinationId = [];

                     childCombination.forEach(function(combination)
                     {
                        combinationId.push(combination.loc.start.line + "-" + combination.loc.start.column);
                     });

                     combinationIds.push(combinationId);
                 }
             );

             for(var i = 0; i < combinationIds.length - 1; i++)
             {
                for (var j = i+1; j < combinationIds.length; j++)
                {
                    var ithArray = combinationIds[i];
                    var jthArray = combinationIds[j];

                    if(ithArray.length != jthArray.length) { continue; }

                     ithArray.sort();
                     jthArray.sort();

                     var areEqual = true;
                     for(var k = 0; k < ithArray.length; k++)
                     {
                         if(ithArray[k] != jthArray[k])
                         {
                            areEqual = false;
                            break;
                         }
                     }

                     if(areEqual && ithArray.length != 0)
                     {
                        console.log("Double");
                     }
                }
            }
        }
	    
}