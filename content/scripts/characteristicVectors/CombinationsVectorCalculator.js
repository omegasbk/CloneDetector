var CombinationsVectorCalculator = 
{
        generateCombinationsVector: function(program)
        {
            var nodeCombinations = MergeableNodeDetector.getMergeCombinations(program);
            var combinations = [];

            for(var i = 0, length = nodeCombinations.length; i < length; i++)
            {
                var characteristicVector = new CharacteristicVector();
                var nodeCombination = nodeCombinations[i];

                for(var j = 0, combinationsLength = nodeCombination.length; j < combinationsLength; j++)
                {
                    characteristicVector.join(nodeCombination[j].characteristicVector);
                }

                combinations.push({
                    combination: nodeCombination,
                    characteristicVector: characteristicVector,
                    noOfTokens: characteristicVector.sum()
                });
            }

            return combinations;
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

        _haveSameCombinations: function(firstVector, secondVector)
        {
            if(firstVector == null || secondVector == null) { return false; }

            if(firstVector.combination.length != secondVector.combination.length) { return false; }

            for(var i = 0, length = firstVector.combination.length; i < length; i++)
            {
               if(firstVector.combination[i] != secondVector.combination[i]) { return false; }
            }

            return true;
        },

        getPotentialCandidates: function(combinationsVectorGroups, maxDistance, minSimilarity)
        {
            var potentialCandidates = {};

            //Go through all groups
            for(var i = 0, groupsLength = combinationsVectorGroups.length; i < groupsLength; i++)
            {
                var currentGroup = combinationsVectorGroups[i];

                if(currentGroup == null) { continue; }

                var compareWithGroups = [];

                //compare with the following maxDistance groups ( from here to i+maxDistance)
                var endGroupIndex = i + maxDistance;
                endGroupIndex = endGroupIndex < groupsLength ? endGroupIndex : groupsLength - 1;

                for(var j = i + 1; j <= endGroupIndex; j++)
                {
                    if(combinationsVectorGroups[j] != null)
                    {
                        compareWithGroups.push(combinationsVectorGroups[j]);
                    }
                }

                //For each vector in the current group
                for(var j = 0, currentGroupLength = currentGroup.length; j < currentGroupLength; j++)
                {
                    var combinationsVector = currentGroup[j];

                    //compare with vectors in the current group
                    for(var k = j + 1; k < currentGroupLength; k++)
                    {
                        var compareWithCombinationsVector = currentGroup[k];

                        if(this._haveSameCombinations(combinationsVector, compareWithCombinationsVector)) { continue; }

                        if(combinationsVector.characteristicVector.calculateSimilarity(compareWithCombinationsVector.characteristicVector) >= minSimilarity
                        && !this._containSameNodesOrAreWithinEachOther(combinationsVector.combination, compareWithCombinationsVector.combination))
                        {
                            potentialCandidates[Math.min(combinationsVector.characteristicVector.id, compareWithCombinationsVector.characteristicVector.id) + "-" + Math.max(combinationsVector.characteristicVector.id, compareWithCombinationsVector.characteristicVector.id)] = {first:combinationsVector, second:compareWithCombinationsVector};
                        };
                    }

                    //compare with all vectors in the following groups
                    for(k = 0; k < compareWithGroups.length; k++)
                    {
                        var compareWithGroup = compareWithGroups[k];

                        for(var l = 0, compareGroupLength = compareWithGroup.length; l < compareGroupLength; l++)
                        {
                            var compareWithCombinationsVector = compareWithGroup[l];

                            //How to compare if they are really similar
                            if(combinationsVector.characteristicVector.calculateSimilarity(compareWithCombinationsVector.characteristicVector) >= minSimilarity
                            && !this._containSameNodesOrAreWithinEachOther(combinationsVector.combination, compareWithCombinationsVector.combination))
                            {
                                potentialCandidates[Math.min(combinationsVector.characteristicVector.id, compareWithCombinationsVector.characteristicVector.id) + "-" + Math.max(combinationsVector.characteristicVector.id, compareWithCombinationsVector.characteristicVector.id)] = {first:combinationsVector, second:compareWithCombinationsVector};
                            };
                        }
                    }
                }
            }

            var candidatesArray = [];

            for(var prop in potentialCandidates) { candidatesArray.push(potentialCandidates[prop]);}

            return candidatesArray;
        },

        _containSameNodesOrAreWithinEachOther: function(firstCombination, secondCombination)
        {
            for(var i = 0, firstLength = firstCombination.length; i < firstLength; i++)
            {
                var firstNode = firstCombination[i];

                for(var j = 0, secondLength = secondCombination.length; j < secondLength; j++)
                {
                    var secondNode = secondCombination[j];

                    if(firstNode == secondNode || ASTHelper.isAncestor(firstNode, secondNode) || ASTHelper.isAncestor(secondNode, firstNode))
                    {
                        return true;
                    }
                }
            }

            return false;
        }
};