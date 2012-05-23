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

                groups[combinationVector.noOfTokens].push(combinationVector);
            });

            return groups;
        },

        getPotentialCandidates: function(characteristicVectorGroups, maxDistance)
        {

        }
};