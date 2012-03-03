var CloneDetector = 
{
	handleClick: function()
	{
		try
		{
			var scriptSources = "";
		
			alert(FFHelper.getScriptsPathsContent());
		}
		catch(e) { alert("Error when handling click on the toolbar button: " + e); }
	}
};