var CombinationsVectorCalculator = 
{
        generateCombinationsVector: function(program)
        {
            var combinations = MergeableNodeDetector.getChildrenCombinations(MergeableNodeDetector.getMergeableNodes(program));
            return combinations.map(function(combination)
            {
                var characteristicVector = new CharacteristicVector();
                combination.forEach(function(item)
                {
                    characteristicVector.join(item.characteristicVector);
                });

                return {
                    combination: combination,
                    characteristicVector: characteristicVector,
                    noOfTokens: characteristicVector.sum()
                }
            });
        },

        groupCombinationsVectorsByNumOfTokens: function(combinationsVectors)
        {
            var groups = [];

            combinationsVectors.forEach(function(combinationVector)
            {
                if(groups[combinationVector.noOfTokens] == null) { groups[combinationVector.noOfTokens] = []; }
                
                if(combinationVector.noOfTokens != 1)
                {
                	groups[combinationVector.noOfTokens].push(combinationVector);
                }
            });

            return groups;
        },

        getPotentialCandidates: function(characteristicVectorGroups, maxDistance)
        {
        	var differences = [];
        	
        	characteristicVectorGroups.forEach(function(characteristicVectorGroup)
        	{
        		var group = [];
        		
        		characteristicVectorGroup.forEach(function(characteristicVectorItem)
   				{
        			group.push(characteristicVectorItem);
   				});
        		
        		for(i = 0; i < group.length; i++)
        		{
        			if(group[i+1] != null)        				
        			differences.push(VectorDistanceCalculator.calculateHammingDistance(group[i].characteristicVector, group[i+1].characteristicVector));     			
        		}
        	}); 	
        	return differences;
        }
};