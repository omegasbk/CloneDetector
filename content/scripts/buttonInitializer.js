//(function()
//{
//	function installButton()
//	{
//		var id = "cloneDetectorToolbarButton";
//		var toolbarId = "nav-bar";
//	 
//		var toolbar = document.getElementById(toolbarId);
//		
//		if(toolbar != null)
//		{
//			//add the button at the end of the navigation toolbar	
//			toolbar.insertItem(id, toolbar.lastChild);
//			toolbar.setAttribute("currentset", toolbar.currentSet);
//			document.persist(toolbar.id, "currentset");
//		 
//			//if the navigation toolbar is hidden, 
//			//show it, so the user can see your button
//			toolbar.collapsed = false;
//		}
//		else
//		{
//			alert("Can not locate toolbar");
//		}
//	}
//	 
//	function firstRun(extensions)
//	{
//	    var extension = extensions.get("cloneDetector@fesb.hr");
//	 
//	    if (extension.firstRun) { installButton(); }
//	}
//	 
//	if (Application.extensions)
//	{
//		firstRun(Application.extensions);
//	}
//	else
//	{
//		//Application.getExtensions(firstRun);
//	}
//})();