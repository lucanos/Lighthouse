whenWeAreReady(function() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            results = JSON.parse(xhttp.responseText);

            user.hq = results;

            //menu bar code            
            var ul = document.getElementsByClassName("nav navbar-nav");

            var li = document.createElement("li");
            li.classList.add("dropdown");

            var tonight = new Date();

            tonight = new Date(tonight.getTime() + (tonight.getTimezoneOffset() * 60000)); //DST offset because beacon has stupid times

            tonight.setHours(23, 59, 59, 0);


            var thismorning = new Date();
            thismorning.setDate(thismorning.getDate()); //then

            thismorning = new Date(thismorning.getTime() + (thismorning.getTimezoneOffset() * 60000)); //DST offset because beacon has stupid times

            thismorning.setHours(0, 0, 0, 0);


            var vars = "?host=" + location.hostname + "&hq=" + user.currentHqId + "&start=" + encodeURIComponent(thismorning.toISOString()) + "&end=" + encodeURIComponent(tonight.toISOString());

            var jobsummaryUrl = lighthouseUrl + "lighthouse/summary.html" + vars;
            var jobstatsUrl = lighthouseUrl + "lighthouse/stats.html" + vars;
            var jobexportUrl = lighthouseUrl + "lighthouse/advexport.html" + vars;

            var teamsummaryUrl = lighthouseUrl + "lighthouse/teamsummary.html" + vars;

            var aboutURL = "https://github.com/OSPFNeighbour/Lighthouse/blob/master/README.md" //chrome.extension.getURL("lighthouse/about.html");


            li.innerHTML = "<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"nav-text\"><img width=\"16px\" style=\"vertical-align: text-bottom;margin-right:5px\" src=\"" + lighthouseUrl + "lh.png" + "\">Lighthouse</span></a><ul class=\"dropdown-menu\"><li role=\"presentation\" class=\"dropdown-header\">Jobs</li><li><a href=\"" + jobsummaryUrl + "\">Job Summary (" + results.Code + " Today)</a></li><li><a href=\"" + jobstatsUrl + "\">Job Statistics (" + results.Code + " Today)</a></li><li><a href=\"" + jobexportUrl + "\">Job Export (" + results.Code + " Today)</a></li><li role=\"presentation\" class=\"divider\"></li><li role=\"presentation\" class=\"dropdown-header\">Teams</li><li><a href=\"" + teamsummaryUrl + "\">Team Summary (" + results.Code + " Today)</a></li><li role=\"presentation\" class=\"divider\"></li><li role=\"presentation\" class=\"dropdown-header\">About</li><li><a href=\"" + aboutURL + "\">About Lighthouse</a></li>";

            $('.nav .navbar-nav').append(li);


            //lighthouse menu



            var filtermenu = `<li class="">
                    <a href="#" class="js-sub-menu-toggle">
                        <i class="fa fa-fw"></i><img width="14px" style="vertical-align: top;margin-right:10px;float:left" src="$LHURLlh-black.png"><span class="text" style="margin-left: -20px;">Lighthouse</span>
                        <i class="toggle-icon fa fa-angle-left"></i>
                    </a>
                    <ul class="sub-menu " style="display: none;">
                        <span class="twitter-typeahead" style="margin-left: 5px;position: relative; display: inline-block; direction: ltr;">
                            <span class="label tag tag-job-status tag-disabled" id="fileropen"><span class="tag-text">Open Jobs</span></span>
                            <span class="label tag tag-job-status tag-disabled" id="filerclosed"><span class="tag-text">Closed Jobs</span></span>
                            <span class="label tag tag-rescue tag-disabled" id="filerrescue"><span class="tag-text">Rescue Jobs</span></span>
                            <span class="label tag tag-job-type tag-disabled" id="filerstorm"><span class="tag-text">Storm Jobs</span></span>
                            <span class="label tag tag-lighthouse" id="fileralltype"><span class="tag-text"><img width="14px" style="vertical-align: top;margin-right:5px" src="$LHURLlh-black.png">All Job Types</span></span>
                            <span class="label tag tag-property tag-disabled" id="filermyhq"><span class="tag-text">$UNIT Jobs</span></span>
                            <span class="label tag tag-property tag-disabled" id="filerallmyregion"><span class="tag-text">$REGION Jobs</span></span>
                        </span>
                    </ul>
            </li>`;

            filtermenu = filtermenu.replace(/\$LHURL/g, lighthouseUrl);
            filtermenu = filtermenu.replace(/\$UNIT/g, user.hq.Code);
            filtermenu = filtermenu.replace(/\$REGION/g, user.hq.ParentEntity.Code);

            $('.main-menu > li:nth-child(1)').after(filtermenu);

            $("#filerrescue").click(function() {
                filterViewModel.selectedParentJobTypes.removeAll();
                filterViewModel.selectedParentJobTypes.push({
                    Id: 5,
                    Name: "Rescue",
                    Description: "Rescue",
                    ParentId: null
                });
                filterViewModel.rescueTypeClicked({
                    Id: 5,
                    Name: "Rescue",
                    Description: "Rescue",
                    ParentId: null
                });
            })

            $("#filerstorm").click(function() {
                filterViewModel.selectedParentJobTypes.removeAll();
                filterViewModel.selectedParentJobTypes.push({
                    Id: 1,
                    Name: "Storm",
                    Description: "Storm",
                    ParentId: null
                });
                filterViewModel.rescueTypeClicked({
                    Id: 1,
                    Name: "Storm",
                    Description: "Storm",
                    ParentId: null
                });
            })

            $("#fileralltype").click(function() {
                filterViewModel.selectedParentJobTypes.removeAll();
                filterViewModel.selectedRescueTypes.removeAll();
            })


            $("#fileropen").click(function() {
                filterViewModel.selectedStatusTypes.removeAll();
                filterViewModel.selectedStatusTypes.push({
                    Id: 2,
                    Name: "Acknowledged",
                    Description: "Acknowledged",
                    ParentId: null
                });
                filterViewModel.selectedStatusTypes.push({
                    Id: 1,
                    Name: "New",
                    Description: "New",
                    ParentId: null
                });
                filterViewModel.selectedStatusTypes.push({
                    Id: 4,
                    Name: "Tasked",
                    Description: "Tasked",
                    ParentId: null
                });
                filterViewModel.selectedStatusTypes.push({
                    Id: 5,
                    Name: "Referred",
                    Description: "Referred",
                    ParentId: null
                });
            })

            $("#filerclosed").click(function() {
                filterViewModel.selectedStatusTypes.removeAll();
                filterViewModel.selectedStatusTypes.push({
                    Id: 6,
                    Name: "Complete",
                    Description: "Complete",
                    ParentId: null
                });
                filterViewModel.selectedStatusTypes.push({
                    Id: 7,
                    Name: "Cancelled",
                    Description: "Cancelled",
                    ParentId: null
                });
                filterViewModel.selectedStatusTypes.push({
                    Id: 3,
                    Name: "Rejected",
                    Description: "Rejected",
                    ParentId: null
                });
                filterViewModel.selectedStatusTypes.push({
                    Id: 8,
                    Name: "Finalised",
                    Description: "Finalised",
                    ParentId: null
                });
            })


            $("#filerallmyregion").click(function() {
                filtershowallmyregion();
            })

            $("#filermyhq").click(function() {
                filterViewModel.selectedEntities.push(user.hq);
            })

            $("#clearlocator").click(function() {
                filterViewModel.selectedEntities.removeAll();
            })




        }
    }




    xhttp.open("GET", "https://" + location.hostname + "/Api/v1/Entities/" + user.currentHqId, true);
    xhttp.send();

});




function filtershowallmyregion() {
    filterViewModel.selectedEntities.destroyAll() //flush first :-)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            results = JSON.parse(xhttp.responseText);
            console.log(results);
            results.forEach(function(d) {
                filterViewModel.selectedEntities.push(d);
            });
        }
    }
    xhttp.open("GET", "https://" + location.hostname + "/Api/v1/Entities/" + user.currentRegionId + "/Children", true);
    xhttp.send();
}



function whenWeAreReady(cb) //when external vars have loaded
{
    var waiting = setInterval(function() { //run every 1sec until we have loaded the page (dont hate me Sam)
        if (typeof user != "undefined")
            console.log("We are ready"); {
            clearInterval(waiting); //stop timer
            cb(); //call back
        }
    }, 500)
}