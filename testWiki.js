$.get(
			"https://en.wikipedia.org/w/api.php?action=query&" +
            "generator=categorymembers&gcmtitle=Category:English historical novelists&gcmprop=ids" +
				"&prop=langlinks&lllimit=485&llprop=url|langname&" +
				"format=json&formatversion=2&origin=*",
			function (datosSet) {
                
                var gcmcontinue= datosSet.continue.gcmcontinue
                console.log(datosSet, gcmcontinue.split("|"))
                $.get(
                    "https://en.wikipedia.org/w/api.php?action=query&" +
                    "generator=categorymembers&gcmtitle=Category:English historical novelists&gcmcontinue="+gcmcontinue+
                        "&prop=langlinks&lllimit=485&llprop=url|langname&" +
                        "format=json&formatversion=2&origin=*",
                        function(datosSet2){
                            console.log(datosSet2)
                        })


            })