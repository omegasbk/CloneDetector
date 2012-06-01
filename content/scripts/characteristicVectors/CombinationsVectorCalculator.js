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
            var potentialCandidates = [];

            //Go through all groups
            for(var i = 0, groupsLength = characteristicVectorGroups.length; i < groupsLength; i++)
            {
                var currentGroup = characteristicVectorGroups[i];

                if(currentGroup == null) { continue; }

                var compareWithGroups = [];

                //compare with the following maxDistance groups ( from here to i+maxDistance)
                var endGroupIndex = i + maxDistance;
                endGroupIndex = endGroupIndex < groupsLength ? endGroupIndex : groupsLength - 1;

                for(var j = i; j <= endGroupIndex; j++)
                {
                    if(characteristicVectorGroups[j] != null)
                    {
                        compareWithGroups.push(characteristicVectorGroups[j]);
                    }
                }

                //For each vector in the current group
                for(j = 0, currentGroupLength = currentGroup.length; j < currentGroupLength; j++)
                {
                    var characteristicVector = currentGroup[j];

                    //compare with vectors in the current group
                    for(var k = j + 1; k < currentGroupLength; k++)
                    {
                        var compareWithCharacteristicVector = currentGroup[k];
                        if(characteristicVector.characteristicVector.calculateSimilarity(compareWithCharacteristicVector.characteristicVector) < maxDistance) { potentialCandidates.push({first:characteristicVector, second:compareWithCharacteristicVector})};
                        
                    }

                    //compare with all vectors in the following groups
                    for(k = i; k < compareWithGroups.length; k++)
                    {
                        var compareWithGroup = compareWithGroups[k];

                        for(var l = 0, compareGroupLength = compareWithGroup.length; l < compareGroupLength; l++)
                        {
                            var compareWithCharacteristicVector = compareWithGroup[l];

                            //How to compare if they are really similar
                            if(characteristicVector.characteristicVector.calculateSimilarity(compareWithCharacteristicVector.characteristicVector) < maxDistance) { potentialCandidates.push({first:characteristicVector, second:compareWithCharacteristicVector})};
                        }
                    }
                }
            }

            return potentialCandidates;

        	/*var differences = [];

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
        	return differences;*/
        }
};