var VectorDistanceCalculator = 
{
	calculateHammingDistance: function(vector1, vector2)
	{
		var sum = 0;
		for(var propName in vector1)
			{
				if (ValueTypeHelper.isInteger(vector1[propName]))
				{
					var difference = vector1[propName] - vector2[propName];
					sum += difference;
				}
			}
		
		return sum;
	},
	
	calculateEucledianDistance: function(vector1, vector2)
	{
		 
	  var sum = 0;
	  for(var propName in vector1)
	        {
		  		if (ValueTypeHelper.isInteger(vector1[propName]))
		  		{
		  			var difference = vector1[propName] - vector2[propName];
		  			sum += difference*difference;
		  		}
			}
	  		
	        return Math.sqrt(sum);
	 
	}
};