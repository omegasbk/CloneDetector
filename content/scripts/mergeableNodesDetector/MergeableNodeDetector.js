var MergeableNodeDetector = {
    defaultMinNumOfTokens: 4,
    getMergeCombinations: function(program)
    {
        var combinations = [];

        var functions = [];
        var loops = [];
        var conditionals = [];
        var objectExpressions = [];

        ASTHelper.traverseAst(program, function(element)
        {
            if(element.characteristicVector == null || element.characteristicVector.sum() < MergeableNodeDetector.defaultMinNumOfTokens) { return; }

            if(ASTHelper.isFunction(element)) { functions.push(element);}
            else if (ASTHelper.isLoopStatement(element)) { loops.push(element);}
            else if (ASTHelper.isIfStatement(element) || ASTHelper.isSwitchStatement(element)) { conditionals.push(element); }
            else if (ASTHelper.isObjectExpression(element)) { objectExpressions.push(element); }
        });

        ValueTypeHelper.pushAll(combinations, this.getAllCombinations(program.children));

        for(var i = 0, length = functions.length; i < length; i++)
        {
            ValueTypeHelper.pushAll(combinations, this.getAllCombinations(functions[i].body.children));
        }
        for(var i = 0, length = loops.length; i < length; i++)
        {
            ValueTypeHelper.pushAll(combinations, this.getAllCombinations(loops[i].body.children));
        }
        for(var i = 0, length = conditionals.length; i < length; i++)
        {
            var conditional = conditionals[i];

            if(ASTHelper.isIfStatement(conditional))
            {
                ValueTypeHelper.pushAll(combinations, this.getAllCombinations(conditional.consequent.children));

                if(conditional.alternate != null)
                {
                    ValueTypeHelper.pushAll(combinations, this.getAllCombinations(conditional.alternate.children));
                }
            }
            else
            {
                ValueTypeHelper.pushAll(combinations, this.getAllCombinations(conditional.children));
            }
        }
        for(var i = 0, length = objectExpressions.length; i < length; i++)
        {
            ValueTypeHelper.pushAll(combinations, this.getAllCombinations(objectExpressions[i].children));
        }

        return combinations;
    },

    getAllCombinations: function(nodes)
    {
        var combinations = [];

        var expandedNodes = [];

        for(var i = 0, length = nodes.length; i < length; i++)
        {
            var node = nodes[i];

            if(ASTHelper.isBlockStatement(node)) { ValueTypeHelper.pushAll(expandedNodes, node.children); }
            else { expandedNodes.push(node); }
        }

        for(var i = 0, length = expandedNodes.length; i < length; i++)
        {
            var allCombinations = MathHelper.generateCombinations(length, i + 1);

            for(var j = 0; j < allCombinations.length; j++)
            {
                var currentCombination = allCombinations[j];
                var currentCombinationNodes = [];

                var combinationTokenNum = 0;

                for(var k = 0; k < currentCombination.length; k++)
                {
                    var selectedNode = expandedNodes[currentCombination[k]];
                    currentCombinationNodes.push(selectedNode);

                    if(selectedNode.characteristicVector == null)
                    {
                        var a = 3;
                    }

                    combinationTokenNum += selectedNode.characteristicVector.sum();
                }

                if(combinationTokenNum >= this.defaultMinNumOfTokens)
                {
                    combinations.push(currentCombinationNodes);
                }
            }
        }

        return combinations;
    }
}