var CombinationsVectorCalculator = 
{
		generateCombinationsVector: function(program)
		{
			var combinations = [];
			var combination = [];
			
			combinations = MergeableNodeDetector.getChildrenCombinations(MergeableNodeDetector.getMergeableNodes(program));
						
			for( var i = 0; i < combinations.length; i++)
			{
				combination = combinations[i];
				
				for( var j = 0; j < combination.length; j++)
				{
					//ODE TI FALI DIO ZA JOINANJE VEKTORA KOMBINACIJA
				}
			}
			
			
		}
		
};