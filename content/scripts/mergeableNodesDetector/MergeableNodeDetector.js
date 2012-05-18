var MergeableNodeDetector = {
		
		getMergableNodes: function(program)
	    {
	        var mergeableNodes = [];

	        var allFunctions = ASTHelper.getAllFunctions(program);

	        var directProgramChildren = program.children;

	        ValueTypeHelper.pushAll(mergeableNodes, this.getMergeableNodesFromNodeList(directProgramChildren));

	        allFunctions.forEach(function(functionElement)
	        {
	            ValueTypeHelper.pushAll(mergeableNodes, this.getMergeableNodesFromNodeList(functionElement.children));
	        }, this);

	        ValueTypeHelper.pushAll(mergeableNodes, this.getMergeableNodesFromNodeList(directProgramChildren));
	        
	        console.log(mergeableNodes);
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
	    }
}