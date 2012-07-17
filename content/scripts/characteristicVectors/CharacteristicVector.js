/**
 * User: Jomaras
 * Date: 17.07.12.
 * Time: 10:09
 */
function CharacteristicVector()
{
    for(var propertyName in CharacteristicVector.RELEVANT_NODES)
    {
        this[propertyName] = 0;
    }

    this.id = CharacteristicVector._ID_COUNTER++;
};

CharacteristicVector.prototype =
{
    join: function(characteristicVector)
    {
        try
        {
            if(characteristicVector == null)
            {
                alert("When joining vectors the vector can not be null!"); return;
            }

            for(var propertyName in CharacteristicVector.RELEVANT_NODES)
            {
                this[propertyName] += characteristicVector[propertyName];
            }
        }
        catch(e) { alert("Error when joining vectors: " + e); }
    },

    calculateSimilarity: function(characteristicVector)
    {
        try
        {
            var H = 0;
            var R = 0;
            var L = 0;

            for(var propertyName in CharacteristicVector.RELEVANT_NODES)
            {
                var currentVectorValue = this[propertyName];
                var targetVectorValue = characteristicVector[propertyName];

                if (currentVectorValue == targetVectorValue && currentVectorValue != 0 && targetVectorValue != 0)
                {
                    H += this[propertyName];
                }
                else if (currentVectorValue > targetVectorValue)
                {
                    L += currentVectorValue - targetVectorValue;
                }
                else if(currentVectorValue < targetVectorValue)
                {
                    R += targetVectorValue - currentVectorValue;
                }
            }

            var similarity = 2*H/(2*H + L + R);

            return similarity;
        }
        catch(e) { alert("Error when calculating similarity: " + e) }
    },

    sum: function()
    {
        try
        {
            var sum = 0;

            for(var propertyName in CharacteristicVector.RELEVANT_NODES)
            {
                sum += this[propertyName];
            }

            return sum;
        }
        catch(e) { alert("Error when summing vector parameters: " + e); }
    }
}

CharacteristicVector._ID_COUNTER = 0;

CharacteristicVector.RELEVANT_NODES =
{
    FunctionDeclaration: "FunctionDeclaration",
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