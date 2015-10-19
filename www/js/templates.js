angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("views/hvorfor.html","<ion-view title=\"Jobcenter App\"><ion-content padding=true scroll=false class=\"has-header button-bottom\"><div class=\"content-container row row-center\"><h4 class=\"text-center font-normal\">Jobcenter er din nemme vej til jobcenteret for virksomheder. For at vi kan kontakte dig skal vi bruge din email og et telefonnummer.<br><br>Vi vil også gerne bede om dit navn og navnet på virksomheden samt postnummeret, hvor virksomheden er placeret.<br><br>Du kan vælge at skrive virksomhedens p- nummer. Det giver os mulighed for at kende din branche og målrette vores informationer til dig.<br><br>Dine oplysninger benyttes kun af jobcentre og videregives ikke til andre.</h4></div><div class=button-container><a ui-sref=intro class=\"button button-positive button-block\">Ok</a></div></ion-content></ion-view>");
$templateCache.put("views/intro.html","<ion-view title=Velkommen><ion-content padding=true scroll=false class=\"has-header button-bottom\"><div class=\"row row-center content-container\"><h3 class=text-center>Velkommen!<br>Udfyld venligst din profil, så vi kan give dig den bedst mulige service</h3></div><div class=button-container><a ui-sref=login class=\"button button-positive button-block\">Ok</a> <a ui-sref=hvorfor class=\"button button-calm button-outline button-block\">Hvorfor?</a></div></ion-content></ion-view>");
$templateCache.put("views/login.html","<ion-view ng-init=\"Login.loginForm.$invalid = true\" title={{$root.loginTitle}} class=login><ion-content scroll=true padding=false overflow-scroll=true class=\"has-header has-footer\"><form name=Login.loginForm><ion-list><label class=\"item listitem item-input item-floating-label\"><span class=input-label>Fornavn*</span> <input required ng-model=Login.model.firstName type=text placeholder=Fornavn*></label> <label class=\"item listitem item-input item-floating-label\"><span class=input-label>Efternavn*</span> <input required ng-model=Login.model.lastName type=text placeholder=Efternavn*></label> <label class=\"item listitem item-input item-floating-label\"><span class=input-label>Email*</span> <input required ng-model=Login.model.email type=email placeholder=Email*></label> <label class=\"item listitem item-input item-floating-label\"><span class=input-label>Telefon*</span> <input required ng-model=Login.model.phone type=tel placeholder=Telefon*></label> <label class=\"item listitem item-input item-floating-label\"><span class=input-label>Virksomhedens navn*</span> <input required ng-model=Login.model.companyName type=text placeholder=\"Virksomhedens navn*\"></label> <label class=\"item listitem item-floating-label\"><span class=input-label>Virksomhedens postnummer*</span> <input required ng-model=Login.model.companyAreacode type=tel placeholder=\"Virksomhedens postnummer*\"></label> <label class=\"item listitem item-input item-floating-label\"><span class=input-label>Virksomhedens Pnr</span> <input ng-model=Login.model.Pnr type=tel placeholder=\"Virksomhedens Pnr\"></label> <label class=\"item listitem item-input item-floating-label\"><span class=input-label>Virksomhedens CVR</span> <input ng-model=Login.model.cvr type=tel placeholder=\"Virksomhedens CVR\"></label> <label class=\"item listitem item-input item-select\"><div class=input-label>Antal medarbejdere</div><select ng-model=Login.model.numberOfEmployees><option value=1 selected>1-5</option><option value=2>6-25</option><option value=3>26-100</option><option value=4>101-250</option><option value=5>250-1000</option><option value=5>1000+</option></select></label></ion-list></form></ion-content><ion-footer-bar class=\"bar bar-custom\"><button ng-disabled=Login.loginForm.$invalid ng-click=Login.register(Login.model) class=\"button button-positive\">Gem</button></ion-footer-bar></ion-view>");
$templateCache.put("views/main.html","<ion-view title=\"Jobcenter Kalundborg\"><ion-content padding=true scroll=false class=has-header><button ng-repeat=\"link in Main.navigation track by $index\" ng-class=\"{\'button-energized\': link == \'Rekruttering\' || link == \'Fleksjob\'}\" ng-click=Main.openQuestionaire($index) class=\"button button-positive button-block\">{{::link}}</button><div class=button-container><button ui-sref=minside class=\"button button-calm button-block\">Min side</button></div></ion-content></ion-view>");
$templateCache.put("views/message.html","<ion-view class=slide-left-right title={{::Message.message.name}}><ion-content padding=true scroll=false class=has-header><div class=\"row row-center\"><div class=col><h3 class=text-center>{{::Message.message.name}}</h3><h3 class=\"text-center font-normal\">{{::Message.message.text}}</h3></div></div><div class=\"button-container row\"><div class=\"col col-50\"><button ng-click=\"Message.answer(\'false\')\" class=\"button button-stable button-block\">Nej tak</button></div><div class=\"col col-50\"><button ng-click=\"Message.answer(\'true\')\" class=\"button button-positive button-block\">Ja tak</button></div></div></ion-content></ion-view>");
$templateCache.put("views/minside.html","<ion-view class=slide-left-right title=\"Min side\"><ion-content padding=false class=\"has-header has-footer\"><ion-list><ion-item ng-repeat=\"news in MyPage.news\" ng-click=MyPage.goToMessage($index)><div class=item-icon-right><h2>{{::news.name}}</h2><p>{{::news.text}}</p><i class=\"icon ion-chevron-right icon-accessory\"></i></div></ion-item></ion-list></ion-content><ion-footer-bar class=\"bar bar-custom\"><button ui-sref=login class=\"button button-positive\">Min profil</button></ion-footer-bar></ion-view>");
$templateCache.put("views/questionaire.html","<ion-view class=slide-left-right title={{Questionaire.page.name}}><ion-content padding=false cache-view=false scroll=false class=has-header><h4 class=text-center>Hvad kan vi hjælpe med?</h4><ul class=list><ion-radio-fix required ng-repeat=\"choice in Questionaire.page.messages\" ng-click=\"Questionaire.selected = choice.id\" ng-value={{choice.id}}>{{choice.name}}</ion-radio-fix></ul><div class=\"padding button-container\"><button ng-disabled=!Questionaire.selected ng-click=\"Questionaire.goAndRegister(Questionaire.selected); Questionaire.selected = undefined\" class=\"button button-positive button-block\">Send</button></div></ion-content></ion-view>");
$templateCache.put("views/tak.html","<ion-view title=\"Tak for din henvendendelse\" class=slide-left-right><ion-content padding=true scroll=false class=has-header><div class=\"row row-center content-container\"><h3 class=\"text-center font-normal\">Tak for din henvendendelse<br>Vi kontakter dig inden for<br><span class=\"font-positive font-bold\">24 timer</span><br>Med venlig hilsen<br>Jobcenter Kalundborg</h3></div><div class=button-container><go-back-to-main></go-back-to-main></div></ion-content></ion-view>");}]);