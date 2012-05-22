var MathHelper =
{

		generateCombinations: function(endNumber, classNumber)
		{
			var tgd = tgd || {};
			tgd.Math = tgd.Math || {};

			tgd.Math.Combination = function (n, k, set)
			{
			        if (typeof tgd.Math.Combination._initialized == "undefined")
			        {

			        		tgd.Math.Combination.choose = function(n, k)
			        		{
			                        if (n < 0 || k < 0) { throw new Error("Invalid negative parameter in choose()"); }
			                        if (n < k) { return 0; }
			                        if (n == k) { return 1; }

			                        var delta;
			                        var iMax;
			                        var ans;

			                        if (k < n - k) {   delta = n - k; iMax = k;}
			                        else {  delta = k; iMax = n - k; }

			                        ans = delta + 1;

			                        for (var i = 2; i <= iMax; ++i)
			                        {
			                            ans *= (delta + i) / i;
			                        }

			                        return ans;
			                }
			        }

			        //"private" instance variables
			        this._n = n;
			        this._k = k;
			        this._set = set.sort(function(a,b) { return a - b; });
			        this._numCombinations = tgd.Math.Combination.choose(this._n, this._k);

			        if (typeof tgd.Math.Combination._initialized == "undefined")
			        {

			                // return largest value v where v < a and  Choose(v,b) <= x
			                tgd.Math.Combination._getLargestV = function(a, b, x)
			                {
			                        var v = a - 1;

			                        while (tgd.Math.Combination.choose(v, b) > x)   { --v; }

			                        return v;
			                }

			                //tgd original
			                tgd.Math.Combination.prototype.getIndex = function(set)
			                {
			                        var retVal = 0;
			                        var tempIdxArr = [];
			                        var tempIdx = 0;

			                        set = set.sort(function(a,b) { return a - b; });

			                        for (var i = 0; i < this._set.length && tempIdx != this._k; ++i)
			                        {
			                                if (set[tempIdx] == this._set[i])
			                                {
			                                    tempIdxArr[tempIdx++] = i;
			                                }
			                        }

			                        for (var i = 0; i < this._k; ++i)
			                        {
			                            tempIdxArr[i] = this._n - 1 - tempIdxArr[i];
			                        }

			                        for (var i = 0; i < this._k; ++i)
			                        {
			                            retVal += tgd.Math.Combination.choose(tempIdxArr[i], this._k - i);
			                        }

			                        return this._numCombinations - 1 - retVal;
			                }

			                //ported from msdn
			                tgd.Math.Combination.prototype.element = function(m)
			                {
			                        var retVal = [];  //the mth lexicographic combination
			                        var ans = [];  //used to calc the indexes into this._set
			                        var a = this._n;
			                        var b = this._k;
			                        var x = this._numCombinations - 1 - m;  // x is the "dual" of m

			                        for (var i = 0; i < this._k; ++i)
			                        {
		                                ans[i] = tgd.Math.Combination._getLargestV(a, b, x);  // largest value v, where v < a and vCb < x
		                                x -= tgd.Math.Combination.choose(ans[i], b);
		                                a = ans[i];
		                                b -= 1;
			                        }

			                        for (var i = 0; i < this._k; ++i)
			                        {
		                                ans[i] = (n - 1) - ans[i];
			                        }

			                        for (var i = 0; i < this._k; ++i)
			                        {
		                                retVal[i] = this._set[ans[i]];
			                        }

			                        return retVal;
			                }

			                tgd.Math.Combination.prototype.toString = function()
			                {
			                        return this._set.join();
			                }

			                tgd.Math.Combination._initialized = true;
			        }
			}

			var set = [];
			
			for(i = 0; i < endNumber; i++)
				{
					set.push(i);
				}

			var startTimeFirst = new Date();


			var a = new tgd.Math.Combination(endNumber, classNumber, set);
			var allCombinations = [];
			
			for(var i = 0; i < a._numCombinations; i++)
			{
				allCombinations.push(a.element(i));
			}
			
			

			var endTimeFirst = new Date();

			return allCombinations;
			

		}

};