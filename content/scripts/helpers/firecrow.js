 

var CodeTextGenerator = 
{
generateJsCode: function(element)
    {
        try
        {
                 if (ASTHelper.isProgram(element)) { return this.generateProgram(element); }
            else if (ASTHelper.isStatement(element)) { return this.whitespace + this.generateStatement(element) + this._SEMI_COLON + this.newLine; }
            else if (ASTHelper.isFunction(element)) { return this.whitespace + this.generateFromFunction(element) + this.newLine; }
            else if (ASTHelper.isExpression(element)) { return this.generateExpression(element); }
            else if (ASTHelper.isSwitchCase(element)) { return this.generateFromSwitchCase(element); }
            else if (ASTHelper.isCatchClause(element)) { return this.generateFromCatchClause(element); }
            else if (ASTHelper.isVariableDeclaration(element)) { return this.whitespace + this.generateFromVariableDeclaration(element) + this._SEMI_COLON + this.newLine; }
            else if (ASTHelper.isVariableDeclarator(element)) { return this.generateFromVariableDeclarator(element); }
            else if (ASTHelper.isLiteral(element)) { return this.generateFromLiteral(element); }
            else if (ASTHelper.isIdentifier(element)) { return this.generateFromIdentifier(element); }
            else { this.notifyError("Error while generating code unidentified ast element: "); return ""; }
        }
        catch(e) { alert("Error while generating code: " + e); }
    }
}