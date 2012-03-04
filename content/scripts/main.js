var CloneDetector = 
{
	handleClick: function()
	{
		try
		{
			var scriptsPathContentAst = FFHelper.getScriptsPathContentAST();
			
			alert(JSON.stringify(scriptsPathContentAst));
		}
		catch(e) { alert("Error when handling click on the toolbar button: " + e); }
	}
};