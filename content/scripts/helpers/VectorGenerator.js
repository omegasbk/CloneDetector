/**
 * Created by Jomaras.
 * Date: 28.03.12.@07:45
 */
var VectorGenerator = {
    generate: function(astElement)
    {
        try
        {
            if(ASTHelper.isProgram(astElement)) { this.generateVectorForProgram(astElement); }
            else if (ASTHelper.isVariableDeclaration(astElement)) { this.generateVectorForVariableDeclaration(astElement); }
            else if (ASTHelper.isVariableDeclarator(astElement)) { this.generateVectorForVariableDeclarator(astElement); }
            else if (ASTHelper.isIdentifier(astElement)) { this.generateVectorForIdentifier(astElement); }
            else if (ASTHelper.isLiteral(astElement)) { this.generateVectorForLiteral(astElement); }
            else { alert("Unhandled element when generating vector!"); }
        }
        catch(e) { alert("Error when generating vector: " + e); }
    },

    generateVectorForProgram: function(program)
    {
        try
        {
            if(!ASTHelper.isProgram(program)) { alert("Sent argument is not a program when generating vector!"); return; }
            program.characteristicVector = new CharacteristicVector();

            program.body.forEach(function(programStatement)
            {
               this.generate(programStatement);
               program.characteristicVector.join(programStatement.characteristicVector);
            }, this);
        }
        catch(e) { alert("Error when generating vector from program: " + e); }
    },

    generateVectorForVariableDeclaration: function(variableDeclaration)
    {
        try
        {
            if(!ASTHelper.isVariableDeclaration(variableDeclaration)) { alert("Sent argument is not a variable declaration when generating vector!"); return; }

            variableDeclaration.characteristicVector = new CharacteristicVector();

            variableDeclaration.declarations.forEach(function(declarator)
            {
                this.generate(declarator);
                variableDeclaration.characteristicVector.join(declarator.characteristicVector);
            }, this);

            variableDeclaration.characteristicVector[CharacteristicVector.RELEVANT_NODES.VariableDeclaration]++;
        }
        catch(e) { alert("Error when generating vector from variable declaration: " + e); }
    },

    generateVectorForVariableDeclarator: function(variableDeclarator)
    {
        try
        {
            if(!ASTHelper.isVariableDeclarator(variableDeclarator)) { alert("Sent argument is not a variable declarator when generating vector!"); return; }

            variableDeclarator.characteristicVector = new CharacteristicVector();

            this.generate(variableDeclarator.id);
            variableDeclarator.characteristicVector.join(variableDeclarator.id.characteristicVector);

            if(variableDeclarator.init != null)
            {
                this.generate(variableDeclarator.init);
                variableDeclarator.characteristicVector.join(variableDeclarator.init.characteristicVector);
            }

            variableDeclarator.characteristicVector[CharacteristicVector.RELEVANT_NODES.VariableDeclarator]++;
        }
        catch(e) { alert("Error when generating vector for variableDeclarator: " + e); }
    },

    generateVectorForIdentifier: function(identifier)
    {
        try
        {
            if(!ASTHelper.isIdentifier(identifier)) { alert("Sent argument is not an identifier when generating vector!"); return; }

            identifier.characteristicVector = new CharacteristicVector();
            identifier.characteristicVector[CharacteristicVector.RELEVANT_NODES.Identifier]++;
        }
        catch(e) { alert("Error when generating vector for identifier: " + e); }
    },

    generateVectorForLiteral: function(literal)
    {
        try
        {
            if(!ASTHelper.isLiteral(literal)) { alert("Sent argument is not a literal when generating vector!"); return; }

            literal.characteristicVector = new CharacteristicVector();

            if(ValueTypeHelper.isNull(literal.value)) { literal.characteristicVector[CharacteristicVector.RELEVANT_NODES.NullLiteral]++; }
            else if(ValueTypeHelper.isString(literal.value)) { literal.characteristicVector[CharacteristicVector.RELEVANT_NODES.StringLiteral]++; }
            else if(ValueTypeHelper.isNumber(literal.value)) { literal.characteristicVector[CharacteristicVector.RELEVANT_NODES.NumberLiteral]++; }
            else if(ValueTypeHelper.isBoolean(literal.value)){ literal.characteristicVector[CharacteristicVector.RELEVANT_NODES.BooleanLiteral]++; }
            else if(ValueTypeHelper.isRegExp(literal.value)){ literal.characteristicVector[CharacteristicVector.RELEVANT_NODES.RegExLiteral]++; }
            else {alert("Unknown literal when generating vector!"); return; }
        }
        catch(e) { alert("Error when generating vector for literal: " + e); }
    }
};

function CharacteristicVector()
{
    for(var propertyName in CharacteristicVector.RELEVANT_NODES)
    {
        this[propertyName] = 0;
    }

    this.join = function(characteristicVector)
    {
        try
        {
            if(characteristicVector == null) { alert("When joining vectors the vector can not be null!"); return; }

            for(var propertyName in CharacteristicVector.RELEVANT_NODES)
            {
                this[propertyName] += characteristicVector[propertyName];
            }
        }
        catch(e) { alert("Error when joining vectors: " + e); }
    };
};

CharacteristicVector.RELEVANT_NODES =
{
    FunctionDeclaration: "FunctionDeclaration",
    VariableDeclaration: "VariableDeclaration",
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
    FunctionExpression: "FunctionExpression",
    SequenceExpression: "SequenceExpression",
    UnaryExpression: "UnaryExpression",
    BinaryExpression: "BinaryExpression",
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
    LetExpression: "LetExpression"
};