var FFHelper = 
{
	getScriptsPathsContent: function(callbackFunction)
	{
		try
		{
			var scriptElements = this.getScriptElements();
			var scriptsPathsContent = [];
			
			scriptElements.forEach(function(script, index)
			{
				var request = new XMLHttpRequest();
				
				if(script.src == null || script.src == "")
				{
					scriptsPathsContent.push({ path: this.getPageDocument().location.href, content : script.textContent });
				}
				else
				{
					var xhReq = new XMLHttpRequest();
					
					xhReq.open("GET", script.src, false);
					xhReq.send(null);
					
					scriptsPathsContent.push({path: script.src, content: xhReq.responseText });
				}
			}, this);
			
			return scriptsPathsContent;
		}
		catch(e) { alert("Error when executing FFHelper.getScriptsPathsContent: " + e);}
	},
	
	getPageDocument: function()
	{
		return content.document;
	},
	
	getScriptElements: function()
	{
		try
		{
			var pageDocument = this.getPageDocument();
			
			return this.convertToArray(pageDocument.querySelectorAll("script"));
		}
		catch(e) { alert("Exception in FFHelper.getScriptElements: " + e); }
	},
	
	getScriptPaths: function()
	{
		try
		{
			var scriptPaths = [];
			
			var scriptElements = this.getScriptElements();
			
			scriptElements.forEach(function(element)
			{
				scriptPaths.push(element.src);
			});
			
			return scriptPaths;
		}
		catch(e) { alert("Exception in FFHelper.getScriptPaths: " + e); }
	},
	
	convertToArray: function(elements)
	{
		try
		{
			var elementsArray = [];
			
			for(var i = 0; i < elements.length; i++)
			{
				elementsArray.push(elements[i]);
			}	
			
			return elementsArray;
		}
		catch(e) { alert("Exception in FFHelper.convertToArray: " + e); }
	}
};