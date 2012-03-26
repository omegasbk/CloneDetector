var CloneDetector = 
{
	handleClick: function()
	{
		try
		{
			FFHelper.openWindow
            (
                "chrome://CloneDetector/content/windows/ASTViewer.xul",
                "ASTViewer",
                {
                    getAst: FFHelper.getTextContentAST
                }
            );
		}
		catch(e) { alert("Error when handling click on the toolbar button: " + e); }
	}
};