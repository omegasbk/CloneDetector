var MergeableNodeDetector = {
		
	/*	getMergableNodes: function(program)
	    {
	        var mergeableNodes = [];


	        var allFunctions = ASTHelper.getAllFunctions(program); 
	        var directProgramChildren = program.children;

	        ValueTypeHelper.pushAll(mergeableNodes, this.getMergeableNodesFromNodeList(directProgramChildren));

	        allFunctions.forEach(function(functionElement)
	        {
	            ValueTypeHelper.pushAll(mergeableNodes, this.getMergeableNodesFromNodeList(functionElement.children)); 
	        });

	        ValueTypeHelper.pushAll(mergeableNodes, this.getMergeableNodesFromNodeList(directProgramChildren));
	    },
	    
	    
	    
	    getMergeableNodesFromNodeList: function(statements)
	    {
	         var mergeableNodes = [];

	         statements.forEach(function(statement)
	         {
	             if(statement.characteristicVector.sum() >= this.minNumberOfTokens)
	             {
	                mergeableNodes.push(statement);
	             }
	         });

	        

	         return mergeableNodes;
	    }*/
}